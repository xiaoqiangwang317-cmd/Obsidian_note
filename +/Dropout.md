---
up:
related:
date: 2026-07-12
---
如果把 **Dropout** 放到整个深度学习的发展历史里，它属于**神经网络的正则化（Regularization）技术**，主要解决的是**过拟合（Overfitting）**问题。

它不是一种新的网络结构（像 CNN、Transformer），也不是一种新的优化算法（像 Adam），而是一种**训练技巧（Training Trick）**。

---

# 一句话理解

> **Dropout = 训练时随机关闭一部分神经元，让网络不要过度依赖某几个特征，从而提高泛化能力。**

可以把它理解成：

> **神经网络版的"抽查制度"。**

每次训练，都会随机让一部分神经元"请假"，网络不得不学会依赖更多的信息，而不是依赖某几个固定神经元。

---

# 为什么会出现 Dropout？

先回到 2012 年左右。

那时候：

- CNN开始流行（AlexNet）
    
- 网络越来越深
    
- 参数越来越多
    

例如：

```
输入
 ↓
1000个神经元
 ↓
1000个神经元
 ↓
输出
```

参数数量已经达到：

```
几百万
几千万
```

于是出现一个问题：

> **训练集准确率99%，测试集只有80%。**

这就是

> **Overfitting（过拟合）**

即模型把训练数据"背下来"了，而不是学到了普遍规律。

---

# 传统解决方法

在 Dropout 出来以前，人们主要靠：

```
增加数据
Data Augmentation

↓

L2正则

↓

Early Stopping

↓

减少模型参数
```

但是效果有限。

---

# Dropout 的思想

2014 年，Nitish Srivastava 等人提出了 Dropout。

核心思想只有一句：

> **训练的时候，每一次随机丢掉一部分神经元。**

例如：

原来网络：

```
A ----\
B ----- Hidden ---- Output
C ----/
```

第一次训练：

```
A ----\
B --X  Hidden ---- Output
C ----/
```

第二次训练：

```
A --X
B ---- Hidden ---- Output
C ----/
```

第三次：

```
A ----\
B ---- Hidden --X
C ----/
```

每一次训练：

网络结构都不一样。

所以：

**一次训练，其实是在训练很多很多不同的小网络。**

最后测试时：

全部神经元一起工作。

---

# 数学表达

假设某一层输出：

$h=f(Wx+b)$

Dropout 会生成一个随机掩码（Mask）：

$m_i \sim Bernoulli(1-p)$

其中：

- (p)：Dropout概率
    
- (1-p)：保留概率
    

于是：

$\tilde h = m \odot h$

这里：

$m=  \begin{bmatrix}  1\  0\  1\  0  \end{bmatrix}$

那么：

```
原输出

[2
 5
 8
 3]

↓

Dropout后

[2
 0
 8
 0]
```

两个神经元直接变成0。

---

# PyTorch 是怎么实现的？

例如：

```python
import torch
import torch.nn as nn

drop = nn.Dropout(p=0.5)

x = torch.tensor([[1.,2.,3.,4.]])
```

训练模式：

```python
drop.train()

y = drop(x)
```

可能输出：

```
tensor([[2.,0.,6.,0.]])
```

为什么不是

```
1 0 3 0
```

因为 PyTorch 使用的是 **Inverted Dropout（反向 Dropout）**。

保留的神经元都会乘：

$\frac{1}{1-p}$

例如：

```
p=0.5
```

保留下来的：

```
1

↓

2
```

这样：

整体期望不会变化。

公式：

$\tilde h=\frac{m}{1-p}\odot h$

---

# 为什么测试时不用 Dropout？

训练：

```
随机关闭
```

测试：

```
全部打开
```

因为：

测试的时候希望：

**尽可能利用所有已经学到的特征。**

所以：

```python
model.eval()
```

以后：

Dropout 自动失效。

---

# 它为什么有效？

原因其实有三个。

## ① 防止共适应（Co-adaptation）

这是论文提出的核心观点。

例如：

```
A
↓

B
↓

C
```

如果：

B 永远都存在，

A 就会越来越依赖 B。

最后：

只要 B 出一点问题，

整个网络都崩。

Dropout：

```
今天B没了

↓

A只能学会依赖别人
```

于是：

网络更加鲁棒。

---

## ② 相当于集成学习（Ensemble）

论文里还有一个经典解释：

每一次 Dropout：

其实都在训练一个新的子网络。

例如：

```
1000个神经元

↓

可能产生

2^1000

种不同网络
```

当然：

不会真的训练这么多个。

但是：

随机采样很多子网络。

测试时：

全部神经元一起工作。

效果近似：

> **很多模型投票（Ensemble）的平均效果。**

---

## ③ 相当于加噪声

Dropout：

其实就是给隐藏层加随机噪声。

很多现代方法：

也是这个思想。

例如：

```
DropBlock

Stochastic Depth

LayerDrop

Random Erasing
```

都是：

随机扰动训练。

---

# 在 CNN 和 Transformer 中的应用

## CNN（如 AlexNet、VGG）

通常放在：

```
Conv

↓

Conv

↓

Flatten

↓

FC

↓

Dropout

↓

FC
```

主要用于**全连接层**，因为参数最多，最容易过拟合。

---

## Transformer

一般放在：

```
Embedding

↓

Dropout

↓

Attention

↓

Dropout

↓

FFN

↓

Dropout
```

不仅作用于隐藏层，还常用于：

- Embedding 输出
    
- Attention 权重
    
- FFN 输出
    
- 残差连接之后（具体位置依模型实现而定）
    

Dropout 已成为 Transformer 的标准组成部分。

---

# 为什么现代大模型很少强调 Dropout？

近年来，大规模 Transformer（LLM）中，Dropout 的重要性有所下降，原因包括：

- 数据规模巨大，本身就能缓解过拟合；
    
- 参数量虽大，但训练数据远超传统场景；
    
- 更常使用 **Weight Decay、学习率调度、Label Smoothing** 等正则化方法；
    
- 部分大型预训练模型会将 Dropout 设置得很低（如 0.1）甚至在某些阶段关闭。
    

但在**中小规模数据集、分类任务、微调任务**中，Dropout 依然非常常见且有效。

---
