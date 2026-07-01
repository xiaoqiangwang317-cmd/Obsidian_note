---
up:
related:
date: 2026-06-25
---
论文：

SimCLR: A Simple Framework for Contrastive Learning of Visual Representations

会议：

ICML 2020

---

# 一句话总结

通过数据增强构造正样本对，利用InfoNCE进行对比学习，实现无监督表征学习。

---

# 任务

表征学习（Representation Learning）

---

# 领域

计算机视觉（CV）

---

# 学习范式

[[自监督学习]]

└── [[对比学习]]

---

# 模型

[[CNN]]

└── [[+/ResNet]]

---

# 输入

Image

---

# 输出

Embedding

---

# 核心流程

Image

↓

Data Augmentation

↓

Positive Pair

↓

Encoder

↓

Projection Head

↓

InfoNCE Loss

↓

Embedding

---

# 创新

1. 提出简单统一的对比学习框架
2. 使用数据增强构造正样本
3. 利用InfoNCE学习表征

---

# 不足

1. 需要大Batch
2. 需要大量负样本
3. 训练成本高

---

# 启发

1. 无标签数据也能学习表示
2. 对比学习可以迁移到时间序列
3. 对比学习可以迁移到网络测量
4. 对比学习适合标签稀缺场景

---

# 与我的论文关系

对应创新点1：

基于时空对比学习的路径状态表征

SimCLR：

Image → Embedding

我的论文：

Network State → Embedding

本质相同：

构造不同视图

↓

学习鲁棒表示

↓

服务下游任务