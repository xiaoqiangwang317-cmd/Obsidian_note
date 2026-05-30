---
up:
related:
date: 2026-05-31
---
# 引：先Embedding

## 一、Embedding 在大模型金字塔中的位置

根据你之前建立的 DeepSeek 版金字塔，Embedding **跨越两个层级**，具体如下：

### 1. 作为“模型结构组件”：位于第 2 层（模型算法层）

text

第 2 层：模型算法层
│
├── 架构选择（Transformer / 多模态）
│
├── 核心设计
│      ├── Attention 机制
│      ├── MoE
│      ├── Positional Embeddings (RoPE, ALiBi)
│      └── 【Tokenization + Embedding 层】 ← 这里
│
└── 训练范式

**Embedding 层的角色**：这是模型最底层的“查表”操作——把 token id 映射成高维向量。这个 Embedding 层是**模型的一部分**，随主模型一起训练，参数量通常为 `词表大小 × 向量维度`（如 5万 × 768）[](https://developer.baidu.com/article/detail.html?id=7171230)。

### 2. 作为“独立向量化模型”：位于第 5 层（应用与交互层）

text

第 5 层：应用与交互层
│
├── Prompt Engineering
│
├── RAG（检索增强生成）← Embedding 模型的核心应用场景
│      ├── 【Embedding 模型】（将知识库文档向量化）
│      ├── 向量数据库（Milvus / Faiss）
│      └── 相似度检索
│
├── Agent
│
└── Workflow

**独立 Embedding 模型**（如你问的 BGE、GTE、E5、M3E）是专门用于**把任意文本变成向量**的独立模型，不属于大语言模型本身，而是作为 RAG 系统的“检索端”存在[](https://livebook.manning.com/book/ai-engineering-in-practice/chapter-2/)。

### 3. 两张图总结

|类型|位置|作用|例子|
|---|---|---|---|
|**Embedding 层**|第 2 层（模型内部）|LLM 的“输入入口”，把 token 转成向量|GPT、LLaMA 内部的词嵌入矩阵|
|**独立 Embedding 模型**|第 5 层（RAG 工具链）|把整个文本转成向量，用于检索|BGE、GTE、E5、M3E|

> **一句话**：Embedding 层是 LLM 的“嘴”和“耳朵”的接口，独立 Embedding 模型是 RAG 系统的“眼睛”——用来从知识库里找相关文档。

## 二、主流 Embedding 模型对比综述

### 1. 模型总览

|模型|来源|开源|向量维度|最大长度|语言支持|
|---|---|---|---|---|---|
|**BGE-M3**|BAAI（智源）|✅|1024|**8192**|多语言（100+）|
|**BGE-large-zh**|BAAI|✅|768|512|中文为主|
|**GTE-large**|阿里巴巴|✅|768|8192|中英文|
|**E5-large**|微软|✅|1024|512|英文为主，多语言版可用|
|**M3E-base**|MokaAI|✅|768|512|中文[](https://gitcode.csdn.net/69bb7ef854b52172bc627ac4.html)|

### 2. 各模型详细分析

#### **BGE-M3（当前开源最强）**

由智源研究院发布，是目前 RAG 场景下最推荐的 Embedding 模型[](https://gitcode.csdn.net/69bb7ef854b52172bc627ac4.html)。

**三大亮点**：

1. **多语言统一**：一个模型支持 100+ 种语言，中英文混合检索表现极好
    
2. **三种检索能力一体**：
    
    - Dense（向量检索）→ Milvus/Pinecone
        
    - Sparse（类 BM25 关键词检索）→ 可替代传统分词检索
        
    - ColBERT（精细匹配）→ 在最终阶段做重排序
        
3. **超长上下文（8192）**：可直接处理整篇文档，不需要提前切块
    

**适合场景**：多语言 RAG、长文档检索、需要混合检索的高精度场景

#### **BGE-large-zh（中文垂直领域首选）**

专注于中文语义理解，在中文检索任务上表现突出。

**核心优势**：

- 训练数据以中文为主（千亿 token 级）[](https://jishuzhan.net/article/2038843535838416897)
    
- 768 维平衡效果好
    
- 开源生态成熟
    

**局限**：

- 最大长度仅 512（需做好文本分块）
    
- 英文表现一般
    

**适合场景**：纯中文知识库、国内企业 RAG

#### **GTE（阿里巴巴，轻量高性价比）**

阿里团队出品，GTE-large 支持 8192 长度，GTE-small 主打轻量[](https://jishuzhan.net/article/2038843535838416897)。

|版本|维度|速度|适合场景|
|---|---|---|---|
|GTE-small|384|极快|高 QPS、边缘部署|
|GTE-base|768|快|通用场景（性价比最高）|
|GTE-large|1024|中等|高精度场景|

#### **E5（微软，英文 Embedding 标杆）**

E5（EmbEddings from bidirEctional Encoder rEpresentations）是微软推出的 Embedding 模型，英文效果极强[](http://arxiv.org/pdf/2407.08275#3#2)。

**使用技巧**：需要在 query 和 passage 前加特定前缀：

- query 格式：`query: {你的问题}`
    
- passage 格式：`passage: {文档内容}`
    

这样训练出来的模型能明确区分“问句”和“文档”。

#### **M3E（中文开源轻量选择）**

M3E（Moka Massive Mixed Embedding）是完全开源的中文 Embedding 模型，训练数据包含 200GB+ 中文语料[](https://gitcode.csdn.net/69bb7ef854b52172bc627ac4.html)。

**特点**：

- 完全开源，可随意修改
    
- 部署门槛低
    
- 中文语义不错，适合中小型项目
    

### 3. 关键选型维度

#### ① 语言匹配

|场景|推荐模型|
|---|---|
|纯中文|BGE-large-zh、M3E|
|中英混合|**BGE-M3**、GTE-large|
|纯英文|E5-large、GTE|
|多语言（中+英+日+法等）|**BGE-M3**、multilingual-E5[](https://jishuzhan.net/article/2038843535838416897)|

#### ② 文档长度

- 短文本（<512）：大部分模型都可以
    
- 长文本（>512，如财报、论文）：必须选 **BGE-M3**（8192）或 **GTE-large**（8192）
    

#### ③ 性能/成本权衡

|优先级|推荐|维度|显存|
|---|---|---|---|
|效果优先|BGE-M3|1024|4GB+|
|性价比|BGE-base / GTE-base|768|2GB|
|速度优先|GTE-small|384|CPU 可跑[](https://jishuzhan.net/article/2038843535838416897)|

#### ④ 对称 vs 非对称检索

- **对称检索**：query 和 document 形式相似（如相似文档找相似文档）
    
- **非对称检索**：query 短、document 长 → **RAG 的标准场景**
    

建议优先选原生支持非对称的模型（E5、BGE、GTE 均可）[](https://jishuzhan.net/article/2038843535838416897)。

### 4. 选型决策树（实际项目参考）

text

开始
  │
  ▼
Q1：语言？
  ├── 纯中文 ──→ BGE-large-zh / M3E
  ├── 中英混合 ──→ BGE-M3 / GTE-large
  └── 多语言（3种以上）──→ BGE-M3
  │
  ▼
Q2：文档平均长度？
  ├── >512 token ──→ BGE-M3（唯一可处理 8192）
  └── <512 token ──→ 任选
  │
  ▼
Q3：硬件限制？
  ├── 4G+ 显存 ──→ BGE-M3
  ├── 2G 显存 ──→ BGE-base / GTE-base
  └── CPU/边缘设备 ──→ GTE-small
  │
  ▼
输出推荐模型

### 5. 重要提醒

1. **Embedding ≠ Reranker**
    
    - Embedding：向量粗筛（双塔，快）
        
    - Reranker：精排交叉编码（慢但准）
        
    - 最佳实践：**两者配合使用**[](https://jishuzhan.net/article/2038843535838416897)
        
2. **换模型 = 重建向量库**  
    向量库是基于 Embedding 模型的语义空间构建的。一旦换了 Embedding 模型，向量空间完全改变，旧向量无法直接与新模型兼容，必须重建索引[](https://jishuzhan.net/article/2038843535838416897)。
    
3. **必须用业务数据实测**  
    排行榜不代表你的业务效果好。选型后一定用你的数据做 Hit Rate 和 MRR 测试[](https://www.cnblogs.com/clnchanpin/p/19200528)。
    

### 6. 总结表（可保存）

|你的场景|首选模型|备选|
|---|---|---|
|中文 RAG（效果优先）|**BGE-large-zh**|M3E|
|中文 RAG（长文档）|**BGE-M3**|—|
|中英混合 RAG|**BGE-M3**|GTE-large|
|英文 RAG|**E5-large**（加 query: 前缀）|GTE|
|多语言 RAG（3 种以上）|**BGE-M3**|multilingual-E5|
|边缘/高 QPS|**GTE-small**|M3E-small|
|学术/实验（完全免费）|**M3E**|—|
## 一句话结论

> **是的，用 Embedding 模型把文本变成向量后，直接存在向量数据库里。**

这个过程就是你未来的标准操作：

text

原始文本 (如：PDF、Markdown、数据库记录)
    ↓ 文本切块 (Chunking)
["段落1", "段落2", ...]
    ↓ Embedding 模型
[[0.12, -0.34, ...], [0.23, 0.56, ...], ...]  (向量)
    ↓ 写入操作
存入向量数据库 (如：Milvus, Faiss, Qdrant, ChromaDB)

---

## 一、向量库里到底存了什么？

你只需要记住三样东西：

|存储内容|类型|说明|
|---|---|---|
|**原始文本**|字符串 (String)|便于检索后展示或发给 LLM|
|**向量**|浮点数数组 (Float32[])|用于相似度计算|
|**元数据 (Metadata)**|JSON / 键值对|用来过滤数据（如：时间戳、作者、分类）|

**直观理解**：  
向量库就像一个“带索引的 Excel 表格”，有一列是文本，一列是向量，还有几列是各种标签。

---

## 二、你现在可以从“直觉”进入“选型”了

既然你理解了“存向量”这个动作，下一步重要的就是**怎么选向量数据库**。

一个简单的参照表：

|场景|推荐数据库|理由|
|---|---|---|
|**1. 本地开发/实验**|ChromaDB (内存模式) 或 Faiss (扁平索引)|极简、API 友好、无需运维|
|**2. 国产化/大厂内部/学习**|**Milvus (或 Zilliz Cloud)**|工业标准，功能最强，支持混合检索|
|**3. 云上 Startup / 快速验证**|Pinecone / Qdrant Cloud|托管服务，省心省力|
|**4. 纯本地离线/边缘设备**|LlamaIndex + SQLite + Faiss|零依赖，纯文件存储|

**Milvus 是目前你最值得学的**，因为：

- 它支持**向量+标量过滤（元数据过滤）** 结合查询
    
- 它是毕业的顶级项目，生态最全
    
- 大厂基本都有用或参考它的设计
    

---

## 三、一个重要误区提醒

> **误区**：向量数据库里只存向量。

**真相**：

- **纯存向量的叫“索引文件”**（如 Faiss 生成的 `.index` 文件），不叫向量数据库。
    
- **向量数据库必须能存文本和元数据，并且支持 CRUD（增删改查）操作。**
    

所以你会听到人说“我把向量存进 Faiss 了”，这不够——你还需要把原始文本存到别的数据库里（如 Redis、MySQL），或者用类似于 LlamaIndex 这种帮你同时管理向量+原始数据的框架。

---

## 四、你现在可以形成这个完整流程了

text

离线任务（你写一次脚本就行）：
用户手册.pdf → 拆段落 → Embedding → 存进 Milvus/Chroma
在线请求（你的 Agent 后端）：
用户问：“没法开机怎么办？”
    ↓
Embedding 算出向量 → 去 [[Milvus]] 里搜索 → 拿到最像的 3 段文本
    ↓
把这 3 段 + 用户问题 -> 发给 LLM
    ↓
LLM 回答