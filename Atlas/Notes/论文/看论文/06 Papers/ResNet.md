---
up:
related:
date: 2026-06-26
---
# 论文

Deep Residual Learning for Image Recognition

---

# 会议

CVPR 2016

---

# 一句话总结

提出残差学习（Residual Learning）和Shortcut Connection，使神经网络能够稳定训练数十层甚至上百层，解决深层网络退化问题。

---

# 任务

图像分类（Image Classification）

---

# 领域

计算机视觉（CV）

---

# 学习范式

[[监督学习]]

└── [[深度学习]]

---

# 模型

[[CNN]]

└── [[ResNet]]

---

# 输入

Image

---

# 输出

Class Probability

---

# 核心流程

Image

↓

Convolution

↓

Residual Block

↓

Shortcut Connection

↓

Global Average Pooling

↓

Fully Connected

↓

Softmax

↓

Prediction

---

# 创新

1. 提出Residual Learning（残差学习）思想
    
2. 引入Shortcut Connection（跳跃连接）
    
3. 成功训练50/101/152层超深神经网络
    
4. 缓解深层网络退化（Degradation Problem）
    

---

# 不足

1. 网络结构相比普通CNN更加复杂
    
2. 当网络较浅时优势并不明显
    
3. 残差连接增加了一定的存储开销
    
4. 后续更深模型仍需要进一步优化计算效率（如Bottleneck）
    

---

# 启发

1. 不一定学习完整映射，学习变化量可能更容易优化。
    
2. 保留已有信息，再学习修改量，可以提高训练稳定性。
    
3. Skip Connection成为后来大量深度模型的重要设计思想。
    
4. 可以推广到图像、时间序列、图数据等多种任务。
    

---

# 与我的论文关系

对应创新点：

基于时空对比学习的路径状态表征

ResNet：

Feature → Feature + Residual

我的论文：

Network State → Network State Representation

共同思想：

保留已有状态

↓

学习状态变化量

↓

提高复杂网络训练稳定性

如果以后网络层数继续增加，可以考虑在Transformer或时空编码器中引入Residual Block，提高模型训练稳定性。

---

# 🧠 我的思考

## 我的理解

ResNet真正创新的不是卷积，而是改变了学习目标。

普通CNN学习整个映射：

H(x)

ResNet学习的是：

Residual = H(x) - x

最后输出：

H(x)=x+Residual

如果这一层不用修改，只需要Residual=0即可，而不用重新学习整个输入，因此优化更加容易。

Shortcut就像高速公路，既保证了原始信息能够直接传递，又保证反向传播时梯度始终存在一条恒等路径，因此能够训练非常深的网络。

我把它理解成Git版本管理：

普通CNN：

每次重新提交整个项目。

ResNet：

每次只提交修改(diff)。

---

## 我的疑问

1. 为什么Residual一定比直接学习H(x)更容易优化？
    
2. Shortcut是否一定能够完全解决梯度消失？
    
3. Bottleneck为什么能够进一步降低计算量？
    
4. DenseNet相比ResNet到底改进了什么？
    

---

## 我的灵感

1. 网络测量是否也可以学习"路径状态变化量"而不是完整状态？
    
2. 时序预测是否可以预测Residual而不是预测原始值？
    
3. 图神经网络是否可以加入Residual提高深层训练能力？
    
4. 我的Transformer编码器是否可以设计Residual State Learning模块？
    

---

## 能否借鉴到我的论文

⭐⭐⭐⭐⭐

可以。

主要借鉴思想：

不是重新学习整个路径状态，而是学习路径状态的变化量（Residual Representation）。

如果未来模型继续加深，可以引入Residual Connection，提高训练稳定性。

---

## 一句话评价

ResNet最大的贡献不是提出了新的卷积，而是把"学习整个映射"变成了"学习变化量"，这一思想奠定了现代深度神经网络的基础。