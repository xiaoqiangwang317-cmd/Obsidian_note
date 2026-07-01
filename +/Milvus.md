---
up:
related:
date: 2026-05-31
---
## 一、一句话定义

> **Milvus 是一个开源的、云原生的分布式向量数据库，专为海量向量数据的高性能相似性搜索而设计。**

截至2025年底，Milvus 在 GitHub 上已获得 **超过 40,000 颗星**，被超过 10,000 家企业用于生产环境[](https://blog.milvus.io/zh/blog/milvus-exceeds-40k-github-stars.md)。它是 LF AI & Data 基金会的顶级项目，由 Zilliz 公司开发维护[](https://developer.aliyun.com/article/1731114)。

---

## 二、解决什么问题？（为什么需要 Milvus）

### 传统数据库的困境

|问题|说明|
|---|---|
|**语义理解缺失**|传统数据库做精确匹配（`WHERE name = "猫"`），无法理解“可爱的毛茸茸宠物”和“猫”的语义相似性|
|**高维检索低效**|128-1024维的向量空间中，暴力计算相似度复杂度爆炸|
|**无法处理非结构化数据**|图片、音频、视频需要先转成向量，但传统库没有针对向量的索引[](https://developer.baidu.com/article/detail.html?id=7190511)|

### Milvus 的解决方案

> **把非结构化数据 → Embedding 向量 → Milvus 存储 + ANN 索引 → 毫秒级相似度检索**

一个直观对比：某电商平台用 Milvus 实现“拍照搜同款”，搜索转化率提升 18%，响应时间控制在 20ms 以内[](https://developer.baidu.com/article/detail.html?id=7190511)。

---

## 三、核心架构：存算分离的云原生设计

这是 Milvus 最核心的技术特点，也是你理解它“为什么能撑住大规模并发”的关键。

### 架构全景图

text

┌─────────────────────────────────────────────────────────────┐
│                      访问层（Access Layer）                   │
│              无状态 Proxy（负载均衡 + 请求路由）                │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    协调层（Coordinator）                      │
│  Root Coord │ Query Coord │ Data Coord │ Index Coord        │
│         （基于 Raft 协议保证元数据一致性）                       │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    工作节点层（Worker Nodes）                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │Query Node│ │Data Node │ │Index Node│                    │
│  │（查询）   │ │（数据写入）│ │（索引构建）│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                       存储层（Storage）                       │
│  元存储(etcd) │ 日志存储(WAL) │ 对象存储(MinIO/S3)            │
└─────────────────────────────────────────────────────────────┘

### 四大核心层详解[](https://milvus.io/docs/zh/architecture_overview.md?source=post_page-----1459a0be937d--------------------------------)

|层级|组件|职责|
|---|---|---|
|**访问层**|Proxy（无状态）|接收客户端请求，验证、路由、聚合结果|
|**协调层**|4 类 Coordinator|集群“大脑”：管理元数据、调度任务、负载均衡|
|**工作节点层**|Query/Data/Index Node|执行实际计算：查询、写入、建索引|
|**存储层**|etcd + WAL + S3|数据持久化：元数据、日志、向量/索引文件|

### 关键设计亮点

**1. 存算分离**

- 计算节点（Query Node）可以独立扩缩容
    
- 存储层用廉价的 S3/OSS，冷热数据分离
    
- 某金融场景测试：10亿级向量查询延迟稳定在 8ms 以内，存储成本降低 60%[](https://developer.baidu.com/article/detail.html?id=7190511)
    

**2. 云原生 + Kubernetes 原生**

- 所有组件都可以容器化部署
    
- 支持 K8s 环境下的自动扩缩容和故障恢复[](https://cloud.alauda.cn/knowledge/zh/solutions/How_to_Use_Milvus.html)
    

**3. WAL（Write-Ahead Log）持久化**

- 写入先记日志，保证数据不丢
    
- Milvus 2.6+ 内置 Woodpecker（零磁盘 WAL），直接写对象存储[](https://milvus.io/docs/zh/architecture_overview.md?source=post_page-----1459a0be937d--------------------------------)
    

---

## 四、索引类型：速度与精度的权衡

Milvus 支持 10+ 种索引，这是你在实际选型时需要做的核心决策[](https://developer.baidu.com/article/detail.html?id=7190511)[](https://developer.baidu.com/article/detail.html?id=7183745)[](https://developer.baidu.com/article/detail.html?id=7202603)。

|索引类型|查询延迟|内存占用|构建速度|适用场景|
|---|---|---|---|---|
|**FLAT**|高（暴力扫描）|低|极快|精确检索，数据量 < 100 万|
|**IVF_FLAT**|中|中|中|百亿级数据，容忍部分误差|
|**IVF_PQ**|中|低（量化压缩）|中|内存受限的大规模场景|
|**HNSW**|**极低**|**极高**|慢|低延迟要求，高维向量|
|**DISKANN**|中|极低|极高|超大规模，冷数据，内存不足[](https://developer.baidu.com/article/detail.html?id=7202603)|

### 选型决策树

text

数据量 < 100万？
   ├── 是 → FLAT（精确检索）
   └── 否 → 延迟要求？
            ├── < 10ms → HNSW（牺牲内存换速度）
            └── 可接受 > 50ms → IVF_PQ（省内存）

### 代码示例：创建索引

python

from pymilvus import connections, Collection
connections.connect(host="localhost", port="19530")
collection = Collection("my_collection")
# 创建 HNSW 索引
index_params = {
    "metric_type": "IP",        # 内积相似度（L2归一化后=余弦）
    "index_type": "HNSW",
    "params": {"M": 32, "efConstruction": 200}
}
collection.create_index("embedding", index_params)

---

## 五、核心能力：不只是向量检索

### 1. 混合检索（Hybrid Search）

Milvus 2.5+ 支持**向量检索 + 标量过滤 + 全文检索（BM25）** 的组合查询[](https://blog.milvus.io/zh/blog/milvus-exceeds-40k-github-stars.md)。

**示例**：搜索“红色连衣裙”，同时过滤价格在 100-500 元之间

python

results = collection.search(
    data=[query_vector],
    anns_field="embedding",
    param={"metric_type": "IP"},
    limit=10,
    expr="price >= 100 and price <= 500"  # 标量过滤
)

这种混合查询比纯向量检索快 3-5 倍[](https://developer.baidu.com/article/detail.html?id=7183745)。

### 2. 多模态支持

同一平台可存储和检索文本、图像、音频、视频的向量[](https://developer.aliyun.com/article/1670788)[](https://developer.aliyun.com/article/1731114)。

**智能驾驶场景案例**：某车企用 Milvus 存储车载摄像头、激光雷达、毫米波雷达的多模态数据，实现“用文字搜视频片段”（如“暴雨+夜间+行人遮挡”），快速挖掘长尾场景[](https://developer.aliyun.com/article/1670788)。

### 3. 多租户与分区

- **Collection**：类似关系库的“表”，不同业务隔离
    
- **Partition**：Collection 内的逻辑分区，按时间/类别分区可提升查询效率
    
- 单个集群支持 **10 万+ 个 Collection**[](https://blog.milvus.io/zh/blog/milvus-exceeds-40k-github-stars.md)
    

---

## 六、生产环境实践要点

### 1. 性能调优关键参数[](https://developer.baidu.com/article/detail.html?id=7202603)

|参数|索引|推荐值|说明|
|---|---|---|---|
|`nlist`|IVF 系列|√(数据量)/100|聚类中心数，越大构建越慢但精度越高|
|`nprobe`|IVF 系列（查询时）|8-64|探测的聚类数，越大越准但越慢|
|`efConstruction`|HNSW|200-500|构建时的动态列表大小|
|`efSearch`|HNSW（查询时）|64-2048|查询时的搜索范围|

### 2. 部署方式选择

|场景|推荐方式|理由|
|---|---|---|
|本地开发/实验|**Docker Compose**|一条命令拉起，轻量验证|
|生产自建|**K8s + Milvus Operator**|官方支持，自动容灾|
|云上托管|**Zilliz Cloud / 阿里云 Milvus**|免运维、自动扩缩容，成本比自建低 20%+[](https://developer.aliyun.com/article/1670788)|

### 3. 监控指标（Prometheus + Grafana）[](https://developer.baidu.com/article/detail.html?id=7183745)

- **P99 查询延迟**：> 200ms 触发告警
    
- **索引构建队列**：积压 > 50 需扩容
    
- **存储使用率**：> 80% 触发自动扩容
    

---

## 七、与其他向量数据库对比[](https://developer.aliyun.com/article/1731114)

|产品|开源协议|部署模式|核心优势|适用场景|
|---|---|---|---|---|
|**Milvus**|Apache 2.0|私有化/托管|**分布式强、功能全、生态丰富**|企业私有化、大规模生产|
|**Pinecone**|闭源|纯云托管|零运维、开箱即用|创业公司、快速上线|
|**Weaviate**|BSD|私有化/托管|内置 Embedding、低代码|轻量 RAG、中小企业|
|**Chroma**|Apache 2.0|单机|极轻量、Python 原生|原型验证、个人开发|
|**FAISS**|MIT|算法库|ANN 算法标杆|算法研究、离线批处理|

---

## 八、真实案例：Milvus × 联想[](https://zilliz.com.cn/blog/Milvus-Lenovo-boosts-inventory-turnover-10p)

**场景**：售后供应链物料管理（上百万种物料）

**痛点**：

- 物料描述混乱（如“5B20G15011”对应“MB C N20P N2830 2G”）
    
- 人工分类效率低、易出错
    
- 新员工难以判断补货时机
    

**Milvus 方案**：

1. 物料描述 + 图片 → Embedding → 存 Milvus
    
2. 新物料通过相似度检索自动归类
    
3. 采购决策时，检索历史相似案例做参考
    

**结果**：

- 库存周转率提升 **10%**
    
- 复盘效率提升 **20%**
    

---

## 九、与你之前的对话的衔接

|之前讨论的概念|在 Milvus 中的对应|
|---|---|
|Embedding 模型（BGE/E5）|生成向量后存入 Milvus 的 `embedding` 字段|
|向量库的“存什么”|Collection（表）→ 存向量 + 原始文本 + 元数据|
|L2 归一化 + 点积|Milvus 中设置 `metric_type="IP"`|
|RAG 系统的检索层|Milvus 负责“从知识库里找最相关的 chunk”|
|Chunk 切分|决定你往 Milvus 里写什么粒度的文本|

---

## 十、记忆口诀

> **存算分离弹性好，四种索引按需挑**  
> **混合检索能过滤，分区多租不混淆**  
> **K8s 部署是标配，监控告警不能少**

---

## 总结表（快速复习）

| 问题         | 答案                                          |
| ---------- | ------------------------------------------- |
| Milvus 是什么 | 开源、云原生、分布式向量数据库                             |
| 核心架构       | 存算分离：Proxy → Coordinator → Worker → Storage |
| 最常用索引      | HNSW（低延迟）、IVF_PQ（省内存）、FLAT（小数据精确）           |
| 关键能力       | 向量检索 + 标量过滤 + 全文检索                          |
| 部署方式       | Docker（开发）、K8s（生产）、云托管（免运维）                 |
| 对应金字塔      | **第 5 层（RAG 工具链）**                          |