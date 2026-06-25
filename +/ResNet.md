---
up:
related:
date: 2026-06-25
---
# 一、为什么会有 ResNet？

先看一个奇怪现象。

理论上：

```
网络层数越多
↓
表达能力越强
↓
效果应该越好
```

例如：

```
5层CNN
10层CNN
20层CNN
50层CNN
100层CNN
```

按理说越深越厉害。

---

但研究人员发现：

```
20层 > 10层
34层 > 20层
到了56层反而变差了
到了100层更差
```

这叫：

> Degradation Problem（退化问题）

注意：

这不是过拟合。

训练集准确率都下降了。

---

# 二、问题出在哪里？

假设有一个网络：

```
输入
 ↓
卷积 
 ↓
卷积 
 ↓
卷积
 ↓
输出
```

如果后面新增几层：

```
输入 ↓卷积 ↓卷积 ↓卷积 ↓卷积 ↓卷积 ↓输出
```

理论上新增层可以学成：

```
恒等映射Identity Mapping
```

即：

```
输出 = 输入
```

这样性能至少不会变差。

---

但实际上：

神经网络很难学到这个东西。

导致：

```
层数越深
梯度越难传播
训练越困难
```

---

# 三、ResNet的核心思想

来自经典论文：

Deep Residual Learning for Image Recognition

作者：

Kaiming He 等人。

他们提出：

> 不直接学习目标函数，而是学习“残差”。

---

原来学习：

```
H(x)
```

即：

```
输入↓输出
```

---

改成学习：

```
F(x)=H(x)-x
```

于是：

```
H(x)=F(x)+x
```

---

图示：

```
      x      │      │──────────┐      ↓          │    卷积         │      ↓          │    卷积         │      ↓          │      F(x)       │      │          │      └────+─────┘           ↓       F(x)+x
```

这条直接连过去的线：

```
x ─────────►
```

叫：

> Skip Connection（跳跃连接）

或者：

> Shortcut Connection（捷径连接）

---

# 四、为什么叫残差？

因为学的是：

```
F(x)=H(x)-x
```

即：

```
目标值减输入值
```

剩下的部分。

数学上叫：

```
Residual
```

残差。

所以：

```
Residual Network↓ResNet
```

---

# 五、残差块（Residual Block）

ResNet最小组成单位：

```
输入 ↓Conv ↓BN ↓ReLU ↓Conv ↓BN ↓+ ↑输入直接跳过来 ↓ReLU ↓输出
```

简化图：

```
x│├────────────┐│            │↓            │Conv         │↓            │Conv         │↓            │F(x)         ││            │└─────+──────┘      ↓   F(x)+x
```

这就是：

> Residual Block

---

# 六、ResNet解决了什么？

最核心：

### 1 梯度消失

普通网络：

```
梯度↓一层层往回传↓越来越小↓前面层学不到
```

---

ResNet：

```
梯度↓直接通过Shortcut回传
```

路径更短。

训练更稳定。

---

### 2 可以训练超深网络

传统CNN：

```
20层30层已经很难
```

---

ResNet：

```
50层101层152层
```

都能训练。

---

# 七、常见ResNet型号

### ResNet18

```
18层
```

轻量。

---

### ResNet34

```
34层
```

经典入门。

---

### ResNet50

```
50层
```

工业界最常用。

---

### ResNet101

```
101层
```

精度更高。

---

### ResNet152

```
152层
```

当年 ImageNet 冠军。

---

关系：

```
ResNet18    ↓ResNet34    ↓ResNet50    ↓ResNet101    ↓ResNet152
```

---

# 八、PyTorch里的ResNet

最常见代码：

```
from torchvision.models import resnet50model = resnet50()
```

加载预训练模型：

```
from torchvision.models import resnet50model = resnet50(weights="DEFAULT")
```

这就是很多图像任务的起点。

---

# 九、ResNet和Transformer是什么关系？

很多人容易搞混。

```
CNN时代│├── LeNet├── AlexNet├── VGG└── ResNet
```

---

后来：

```
Transformer时代│├── ViT├── Swin Transformer├── DeiT└── CLIP
```

---

所以：

```
ResNet=CNN代表作Transformer=新一代架构
```

但很多模型仍然会结合ResNet。

例如：

- Mask R-CNN
- Faster R-CNN
- CLIP（早期版本）

都曾使用 ResNet 作为视觉骨干网络（Backbone）。

---

# 十、一句话记忆

如果面试官问：

**“什么是 ResNet？”**

你可以直接回答：

> ResNet（残差网络）是一种深层卷积神经网络，其核心创新是引入残差连接（Skip Connection），通过学习残差映射并让梯度直接传播，解决了深层网络训练中的梯度消失和网络退化问题，从而能够有效训练50层、100层甚至更深的神经网络。

---

## 超实用的小技巧（面试高频）

记住 CNN 的发展史：

```
LeNet ↓AlexNet ↓VGG ↓ResNet ↓DenseNet ↓Transformer(ViT)
```

面试官问：

**“为什么会出现 ResNet？”**

标准答案：

```
因为随着CNN层数增加，出现网络退化和梯度传播困难问题，ResNet通过残差连接解决了这一问题，使超深网络训练成为可能。
```