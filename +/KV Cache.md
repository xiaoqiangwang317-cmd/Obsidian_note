---
up:
related:
date: 2026-05-31
---
## 一、一句话定义

> **KV Cache 是在 Transformer 自回归生成过程中，把已经计算过的 token 的 Key 和 Value 矩阵缓存下来，避免在生成每个新 token 时重复计算历史 token 的 K 和 V。**

---

## 二、解决的问题（为什么需要 KV Cache）

### 没有 KV Cache 时（朴素推理）

生成第 tt 个 token 时：

- 输入序列长度为 tt
    
- 重新计算**所有 tt 个 token** 的 Q、K、V
    
- 再算 Attention
    

复杂度：**每一步都是 O(t²)**  
总复杂度：**O(T³)**（T 是总生成长度）

👉 **非常慢，完全不可用**

### 有 KV Cache 时

生成第 tt 个 token 时：

- 历史 1 到 t−1t−1 的 K 和 V **已经在缓存中**
    
- 只需要**计算第 tt 个 token 的 K 和 V**
    
- 拼接后做 Attention
    

复杂度：**每一步 O(t)**  
总复杂度：**O(T²)**，实际工程中快非常多

---

## 三、KV Cache 的核心原理（图解版）

### Prefill 阶段（处理 Prompt）

text

输入：token1, token2, token3, token4
       ↓      ↓      ↓      ↓
    计算K1,V1  K2,V2  K3,V3  K4,V4
       ↓      ↓      ↓      ↓
            缓存 [K1..K4, V1..V4]

### Decode 阶段（生成第 5 个 token）

text

输入：token5（新生成的）
       ↓
    计算 K5, V5（只算这一个！）
       ↓
    K_cache = [K1..K4, K5]
    V_cache = [V1..V4, V5]
       ↓
    Q5 与 K_cache 做 Attention
       ↓
    输出 token6 的概率

> **关键**：K1..K4 和 V1..V4 都是从缓存读的，**不重算**。

---

## 四、KV Cache 的显存占用（非常重要）

### 显存公式

KV Cache 大小=2×L×d×layers×batch×bytesKV Cache 大小=2×L×d×layers×batch×bytes

|变量|含义|典型值|
|---|---|---|
|2|K 和 V 各一份|常数|
|L|序列长度（token 数）|4096, 32768|
|d|每个 head 的维度|128|
|layers|Transformer 层数|32, 80|
|batch|并发请求数|1~数十|
|bytes|精度（FP16/BF16）|2 字节|

### 举例：LLaMA 2 7B

- layers = 32
    
- d = 128
    
- 精度 FP16（2 字节）
    

**单个 token 的 KV Cache 大小**：

2×128×32×2=16,384 字节=16 KB2×128×32×2=16,384 字节=16 KB

**生成 4096 个 token**：

4096×16 KB≈64 MB（单请求）4096×16 KB≈64 MB（单请求）

**并发 32 个请求**：

64×32≈2 GB64×32≈2 GB

👉 **KV Cache 是推理时的主要显存消耗来源**

---

## 五、KV Cache 带来的问题（你第 7 题之后的深层考点）

|问题|描述|解决方案|
|---|---|---|
|**显存碎片**|不同请求长度不同，动态分配释放导致碎片|PagedAttention（vLLM）|
|**显存爆炸**|长文本 + 高并发时，KV Cache 撑爆显存|分块预分配 / 共享 Prompt|
|**带宽瓶颈**|Decode 阶段需要读取大量历史 KV，卡在显存带宽|FlashAttention、量化 KV|
|**无法无限长**|生成长度越长，KV Cache 线性增长|滑动窗口 / 循环缓存|

---

## 六、KV Cache 的进阶技术

### 1. PagedAttention（vLLM）

- 把 KV Cache 切成固定大小的“页”
    
- 不要求连续显存，像操作系统虚拟内存一样管理
    
- **解决显存碎片 + 允许更大的并发**
    

### 2. FlashAttention + KV Cache

- FlashAttention 本身不依赖 KV Cache 存在
    
- 但有了 KV Cache，FlashAttention 可以增量计算
    

### 3. KV Cache 量化

- 把 K 和 V 从 FP16 压缩到 INT8 或 INT4
    
- 显存减半/减 75%，精度损失小
    

### 4. 滑动窗口 / 循环 KV Cache

- 只保留最近 N 个 token 的 KV
    
- 用于长文本但“早期信息不重要”的场景
    

### 5. Prompt Sharing / Prefix Cache

- 如果多个请求的 Prompt 相同（如系统提示），共用一份 KV Cache
    
- 特别适合 Agent / RAG 场景
    

---

## 七、你的第 7 题在 KV Cache 知识中的位置

|考点|对应内容|
|---|---|
|Prefill 阶段缓存了 10 个 token|初始 KV Cache|
|已生成 5 个 token|这些 token 的 KV 已被缓存|
|第 6 个 token 新增几个 KV|**1 个**（只算新 token）|
|易错点|误以为要重算所有历史 KV|

---

## 八、KV Cache 与金字塔层级的关系

|项目|答案|
|---|---|
|属于训练还是推理|**推理（Inference）**|
|金字塔第几层|**第 4 层（模型优化与部署层）**|
|具体子层|推理加速|
|与 Decode 阶段的关系|Decode 阶段的核心依赖|

---

## 九、记忆口诀

> **历史 K 和 V，只算一次存起来**  
> **新来一个 token，只加自己那份 K**  
> **显存吃在 Cache 上，优化就用分页带**

---

## 十、总结表（快速复习）

|问题|答案|
|---|---|
|KV Cache 存什么|历史 token 的 Key 和 Value|
|什么时候生成|Prefill 阶段（首批）+ 每生成一个新 token 时|
|什么时候使用|Decode 阶段的每一步 Attention|
|每步新增计算量|只算新 token 的 K 和 V|
|主要代价|显存随序列长度线性增长|
|典型优化|PagedAttention、量化、滑动窗口|