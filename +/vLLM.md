---
up:
related:
date: 2026-05-31
---
vLLM 是目前工业界最流行的高性能大模型推理引擎之一，由 UC Berkeley 提出，现在由开源社区维护。下面我从“是什么、解决什么问题、怎么解决、效果如何”四个维度给你完整拆解。

---

## 一、一句话定义

> **vLLM 是一个专为大语言模型设计的高吞吐量推理引擎，核心创新是 PagedAttention 机制，通过类似操作系统虚拟内存的方式管理 KV Cache，大幅降低显存碎片、提升并发能力。**

---

## 二、背景：传统推理系统的痛点

### 问题 1：KV Cache 显存碎片严重

回顾我们之前讲的 **KV Cache**：每个请求在生成过程中，需要为历史 token 存储 K 和 V 向量。传统方案中，KV Cache 以**连续内存**方式分配。

**后果**：

- 不同请求长度不同，预分配空间难确定
    
- 显存中产生大量“空洞”（碎片）
    
- 某社区测试显示：传统方案显存利用率**不足 40%**[](https://developer.baidu.com/article/detail.html?id=6898758)
    

### 问题 2：静态批处理效率低

传统方案需要等请求“凑够一批”才能执行，导致：

- 短请求要等长请求
    
- GPU 利用率低（经常 < 60%）
    

---

## 三、核心创新：PagedAttention

### 3.1 核心思想：虚拟内存 for KV Cache

PagedAttention 借鉴操作系统的**分页虚拟内存**机制[](https://blog.vllm.com.cn/2025/09/05/anatomy-of-vllm.html)[](https://news.qiniu.com/archives/1765423853054)：

|对比维度|传统 Attention|PagedAttention|
|---|---|---|
|内存分配|连续空间|分页（非连续）|
|分配单位|按请求整体|按固定大小 Block（如 16 token/block）|
|碎片问题|严重|几乎无|
|内存利用率|~40%|**90%+**[](https://developer.baidu.com/article/detail.html?id=6860639)|

### 3.2 工作机制

text

每个请求有自己的逻辑页表
        ↓
逻辑页 → 物理页（由全局管理器分配）
        ↓
物理页可以不连续，但逻辑上连续
        ↓
Attention 计算时通过页表找到真正的物理地址

**关键数据结构**（来自 vLLM 源码）：

cpp

struct PageTableEntry {
    uint64_t physical_addr;  // 物理页地址
    bool is_valid;           // 是否有效
    uint32_t access_count;   // 访问计数（用于冷热分离）
};

### 3.3 带来的好处

1. **消除内存碎片**：物理页大小固定，可灵活分配释放
    
2. **支持超长序列**：逻辑上可以连续，物理上不要求连续
    
3. **零拷贝共享**：多个请求可共享相同的 Prompt KV（如系统提示词）[](https://blog.vllm.com.cn/2025/09/05/anatomy-of-vllm.html)
    
4. **缓存初始化时间**：从 2.3s 压缩至 320ms[](https://developer.baidu.com/article/detail.html?id=6888822)
    

---

## 四、其他关键技术

### 4.1 Continuous Batching（持续批处理）

**核心逻辑**：不等所有请求完成，动态调整批次[](https://blog.vllm.com.cn/2025/09/05/anatomy-of-vllm.html)[](https://developer.baidu.com/article/detail.html?id=6888822)

text

传统批处理：
[请求1][请求2][请求3] → 一起执行 → 最慢的决定了整体时间
Continuous Batching：
[请求1(生成token5)] [请求2(生成token2)] [请求3(生成token1)]
        ↓
请求3完成后，立即加入新请求4，不等待请求1、2

**效果**：

- GPU 利用率从 62% → **89%**[](https://developer.baidu.com/article/detail.html?id=6898758)
    
- 平均延迟从 120ms → **45ms**[](https://developer.baidu.com/article/detail.html?id=6888822)
    

### 4.2 Chunked Prefill（分块预填充）

**问题**：长 Prompt 的 Prefill 阶段计算量大，会阻塞 Decode 请求。

**解法**：把长 Prefill 拆成多个 Chunk，中间穿插 Decode 请求[](https://blog.vllm.com.cn/2025/09/05/anatomy-of-vllm.html)[](https://developer.baidu.com/article/detail.html?id=6888822)。

### 4.3 Prefix Caching（前缀缓存）

多个请求共享相同的系统提示词（如"你是一个AI助手..."）时，共用 KV Cache，避免重复计算[](https://blog.vllm.com.cn/2025/09/05/anatomy-of-vllm.html)。

### 4.4 投机采样集成

支持小模型快速生成候选 Token，大模型并行验证，典型如 Eagle 投机解码[](https://blog.vllm.com.cn/2025/10/09/blackwell-inferencemax.html)。

### 4.5 P/D 解耦（预填充/解码分离）

将 Prefill 和 Decode 放到不同的 GPU 集群：

- **Prefill 集群**：高带宽 GPU，负责计算密集型 Attention
    
- **Decode 集群**：低功耗 GPU，负责内存密集型的逐 token 生成[](https://developer.baidu.com/article/detail.html?id=6888822)
    

**效果**：175B 模型推理成本降低 **58%**[](https://developer.baidu.com/article/detail.html?id=6888822)

---

## 五、系统架构

vLLM 采用**分层设计**[](https://developer.baidu.com/article/detail.html?id=6898758)[](https://docs.vllm.ai/en/v0.15.0/design/arch_overview/)：

text

用户交互层（Python/C++ SDK，OpenAI 兼容 API）
        ↓
引擎控制层（LLMEngine / AsyncLLMEngine）
        ↓
调度优化层（Scheduler + PagedAttention）
        ↓
计算执行层（Worker + Model Runner）
        ↓
资源管理层（GPU 内存池 + 页表管理）
        ↓
硬件抽象层（CUDA / ROCm / 国产卡）

两种主要使用方式[](https://docs.vllm.ai/en/v0.15.0/design/arch_overview/)：

|模式|命令|适用场景|
|---|---|---|
|离线推理|`llm.generate(prompts)`|批量处理|
|在线服务|`vllm serve <model>`|API 服务|

---

## 六、性能数据

|指标|数据|来源|
|---|---|---|
|显存利用率|40% → **90%+**|[](https://developer.baidu.com/article/detail.html?id=6898758)[](https://developer.baidu.com/article/detail.html?id=6860639)|
|吞吐量提升|相比 HuggingFace **3.2 倍**|[](https://developer.baidu.com/article/detail.html?id=6898758)|
|P99 延迟|可低至 **15ms**|[](https://developer.baidu.com/article/detail.html?id=6888822)|
|Blackwell 优化|相比 Hopper 吞吐量提升 **4 倍**|[](https://blog.vllm.com.cn/2025/10/09/blackwell-inferencemax.html)|

---

## 七、与其他推理框架对比

|框架|核心特点|适用场景|
|---|---|---|
|**vLLM**|PagedAttention，高吞吐|通用首选|
|**HuggingFace**|易用但慢|实验、小规模|
|**TensorRT-LLM**|NVIDIA 官方，极致性能|生产环境（NVIDIA 卡）|
|**SGLang**|类似 vLLM，前端更丰富|复杂生成任务|
|**TGI**|HuggingFace 官方，成熟|生产环境（偏稳定）|

---

## 八、与金字塔层级的对应

|项目|答案|
|---|---|
|属于训练还是推理|**推理**|
|金字塔第几层|**第 4 层（模型优化与部署层）**|
|具体子层|推理服务框架|
|与 KV Cache 的关系|vLLM 用 PagedAttention 管理 KV Cache|
|与 Decode 阶段的关系|Continuous Batching 优化 Decode 阶段的批处理|

---

## 九、记忆口诀

> **页式管理破碎片，连续批处理压延迟**  
> **前缀缓存省重复，P/D 解耦降成本**  
> **vLLM 一出，推理性能翻倍**

---

## 十、总结表（快速复习）

|问题|答案|
|---|---|
|vLLM 是什么|高性能 LLM 推理引擎|
|核心创新|PagedAttention（分页 KV Cache）|
|主要解决的问题|显存碎片 + 批处理效率低|
|关键技术|Continuous Batching、Chunked Prefill、Prefix Caching、P/D 解耦|
|使用方式|`LLM` 类（离线）+ `vllm serve`（在线服务）|
|与 KV Cache 的关系|用页表管理 KV Cache，逻辑连续、物理分页|
|性能提升|显存利用率 90%+，吞吐 3-4 倍提升|