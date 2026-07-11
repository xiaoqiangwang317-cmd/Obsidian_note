---
up:
related:
date: 2026-07-11
---

## 1. 定义（Definition）

> **Embedding（嵌入）是一种表示学习（Representation Learning）技术，用于将离散对象（Discrete Objects）映射到连续向量空间（Continuous Vector Space），使神经网络能够学习对象之间的语义关系。**

Embedding 并不是一种网络结构，而是一种**输入表示（Input Representation）**方法。

常见的离散对象包括：

- Token（词、子词）
    
- 字符（Character）
    
- 用户 ID
    
- 商品 ID
    
- 类别标签（Category）
    
- 节点（Graph Node）
    
- 时间类别（星期、月份等）
    

---

# 2. 为什么需要 Embedding？

神经网络只能处理连续数值，而不能直接理解离散编号。

例如：

```text
Apple  → ID = 152
Google → ID = 981
Orange → ID = 317
```

这里的编号只是**索引（Index）**，没有任何数学意义。

如果直接输入：

```text
152
981
317
```

模型可能误认为：

```text
981 > 317 > 152
```

这种大小关系没有实际意义。

Embedding 的目标就是：

```text
Token ID
      │
      ▼
Dense Vector
```

让模型学习真正有意义的向量表示。

---

# 3. 数学定义

设：

词表大小（Vocabulary Size）

                $V$  

Embedding 维度

                $d$

Embedding 本质就是一个可训练矩阵：

              $E\in\mathbb{R}^{V\times d}$

例如：

```text
Vocabulary = 50000

Embedding Dimension = 768
```

则：

                $E\in\mathbb{R}^{50000\times768}$

输入 Token：

                    $i$

输出：

                 $x_i = E[i]$

即：

**取矩阵第 i 行作为该 Token 的表示。**

---

# 4. 工程实现（Implementation）

在 PyTorch 中：

```python
nn.Embedding(50000,768)
```

几乎等价于：

```python
weight = nn.Parameter(torch.randn(50000,768))

output = weight[token_ids]
```

因此：

Embedding 本质上就是：

> **一个可训练参数矩阵（Trainable Parameter Matrix） + 数组索引（Array Lookup）。**

这里所谓：

Lookup（查表）

并不是数据库查询。

而是：

```python
weight[152]
```

这种数组访问。

时间复杂度：

                              $O(1)$

---

# 5. 初始化方式

Embedding 与其他神经网络参数一样：

通常随机初始化。

例如：

```text
Normal Distribution

N(0,\sigma^2)
```

或者：

```text
Uniform Distribution
```

训练过程中：

```text
随机初始化

↓

Forward

↓

Loss

↓

Backward

↓

更新Embedding Matrix
```

最终：

Embedding 学习出具有语义关系的向量空间。

对于预训练模型：

例如：

BERT

GPT

LLaMA

Embedding 通常直接加载已经训练好的参数。

---

# 6. Embedding 学到了什么？

Embedding 并不是学习：

```text
Apple = 水果
```

这种知识。

而是学习：

**向量空间（Vector Space）。**

使：

语义相近

↓

向量距离更近。

例如：

```text
King

Queen

Prince

Princess
```

自然聚在一起。

Embedding 学习的是：

> **对象之间的相对几何关系（Relative Geometry）。**

而不是绝对坐标。

因此：

不同模型：

Embedding 数值可以完全不同。

但语义结构通常相似。

---

# 7. Embedding 的分类

## （1）Lookup Embedding

输入：

```text
Token ID
```

输出：

```text
Embedding Vector
```

实现：

```python
nn.Embedding(...)
```

典型应用：

- NLP
    
- 推荐系统
    
- 图神经网络
    

---

## （2）Projection Embedding

输入：

连续特征。

例如：

```text
7维特征

↓

Linear

↓

512维
```

很多论文仍称：

Value Embedding。

实现：

```python
nn.Linear(...)
```

或：

```python
Conv1d(...)
```

常见于：

- 时间序列
    
- Vision Transformer
    
- 多模态模型
    

---

## （3）Position Embedding

表示：

输入的位置。

典型：

Transformer。

例如：

```text
Token Embedding

+

Position Embedding
```

提供序列顺序信息。

---

## （4）Segment / Type Embedding

表示：

输入属于哪一种类型。

典型：

BERT：

Sentence A

Sentence B

---

# 8. 静态 Embedding 与上下文表示

静态 Embedding：

例如：

Word2Vec

一个词：

始终对应一个向量。

例如：

```text
Apple

↓

固定向量
```

Transformer：

输入 Embedding：

仍然固定。

真正发生变化的是：

经过 Attention 后得到的：

Hidden Representation。

例如：

```text
Apple（水果）

↓

Representation A
```

```text
Apple（公司）

↓

Representation B
```

因此：

现代 Transformer 真正学习的是：

**Contextual Representation（上下文表示）**

而不是：

Input Embedding。

---

# 9. Embedding 在神经网络中的位置

Embedding 属于：

**输入表示层（Input Representation Layer）**

而不是：

主干网络。

例如：

CNN：

```text
Input

↓

Embedding

↓

CNN

↓

Classifier
```

RNN：

```text
Embedding

↓

LSTM
```

Transformer：

```text
Embedding

↓

Self-Attention
```

推荐系统：

```text
User Embedding

Item Embedding

↓

MLP
```

---

# 10. Embedding 与 One-Hot 的区别

|特性|One-Hot|Embedding|
|---|---|---|
|是否可学习|✗|✓|
|是否稠密|✗|✓|
|是否表达语义|✗|✓|
|输入维度|类别数|可自由设定|
|参数量|无|有|
|是否现代模型主流|否|是|

One-Hot 负责唯一标识类别。

Embedding 负责学习类别之间的关系。

---

# 11. 优点与局限

**优点**

- 能学习语义关系
    
- 稠密表示，存储效率高
    
- 可端到端训练
    
- 适用于各种离散对象
    

**局限**

- 静态 Embedding 无法处理一词多义
    
- 依赖训练数据质量
    
- 高维 Embedding 增加参数量
    
- 不同模型的 Embedding 数值不可直接比较
    

---

# 12. 核心结论（科研视角）

> **Embedding 是现代深度学习中最基础的表示学习模块之一，其目标是将离散对象映射为可学习的连续向量表示。从数学上看，它是一个可训练矩阵；从工程实现上看，它是一块连续存储的参数矩阵，通过数组索引（Lookup）完成高效访问；从机器学习角度看，它学习的是对象之间的语义几何关系，而不是对象本身的知识；从模型结构上看，它属于输入表示层，可广泛应用于 Transformer、CNN、RNN、推荐系统、图神经网络及时间序列模型，而并非 Transformer 独有。**

---
