---
up:
related:
date: 2026-06-24
---
# 一、人工智能到底是什么？

先回答最本质的问题：

> AI的目标是什么？

答案：

**让机器表现出类似人类智能的能力。**

包括：

```
感知理解推理决策学习行动
```

例如：

```
看到图片↓知道是猫听到语音↓知道你说什么读到文章↓理解意思收到问题↓给出答案
```

这些都属于人工智能。

---

# 二、人工智能学科全景图


## 人工智能（AI）
│
### 1. 学习范式（Learning Paradigm）
│   │
│   ├──[[监督学习]]
│   ├──[[无监督学习]]
│   ├──[[半监督学习]]
│   ├──[[自监督学习]]  ★
│   └──[[强化学习]]
│
### 2. 模型架构（Model Architecture）
│   │
│   ├──传统机器学习
│   │   ├──[[线性回归]]
│   │   ├──[[逻辑回归]]
│   │   ├──[[决策树]]
│   │   ├──[[随机森林]]
│   │   ├──[[XGBoost]]
│   │   └──[[SVM]]      1990
│   │
 |	 └──神经网络（Neural Network）  
│    |   │  
│    |   ├──[[单层感知机]]（Perceptron）1957  
│    |   ├──[[多层感知机]]（MLP）  1986-2006
│    |   │  
│    |   └──深度学习（Deep Learning）  2012
│    |      ├──[[CNN]]
 |     |      |   ├── [[AlexNet]]
 |     |      |   ├── [[VGG]]
 |     |      |   ├── [[GoogleNet]]
 |     |      |   ├──[[ResNet]]
 |     |      |    |    ├── ResNet-18
 |     |      |    |    ├── ResNet-34
 |     |      |    |    ├── ResNet-50
 |     |      |    |    ├── ResNet-101
 |     |      |    |    └── ResNet-152
 |     |      |   └──[[DenseNet]]
 |     |      |
 |     |     ├──[[RNN]]  
 |     |      |    ├──[[LSTM]]  
 |     |      |    └──[[GRU]]  
 |     |     ├──Transformer  
 |     |      |       ├── [[Transformer]]
 |     |      |       ├── [[ViT]]
 |     |      |        |    ├── ViT-B/16
 |     |      |        |    ├── ViT-L/16
 |     |      |        |    ├── ViT-H/14
 |     |      |       ├── [[BERT]]
 |     |      |       ├── [[GPT]]
 |     |      |       ├── [[Informer]]
 |     |      |       └──[[DenseNet]]
 |     |      |
 |           ├──[[GNN]]  
 |           └──[[Diffusion]]
 |
### 3. 网络组件
│
|	├── 01 基础计算层
|	│   ├── Linear
|	│   ├── Conv
|	│   ├── Embedding
|	│   ├── Pooling
|	│   └── ...
|	│
|	├── 02 激活函数
|	│   ├── Sigmoid
|	│   ├── Tanh
|	│   ├── ReLU
|	│   ├── GELU
|	│   ├── SiLU
|	│   └── Softmax
|	│
|	├── 03 注意力机制
|	│   ├── Self-Attention
|	│   ├── Multi-Head Attention
|	│   ├── Cross Attention
|	│   └── ...
|	│
|	├── 04 归一化
|	│   ├── BatchNorm
|	│   ├── LayerNorm
|	│   ├── RMSNorm
|	│   └── ...
|	│
|	├── 05 网络连接
|	│   ├── Residual
|	│   ├── Skip Connection
|	│   └── Dense Connection
|	│
|	├── 06 位置表示
|	│   ├── Positional Encoding
|	│   ├── RoPE
|	│   └── ...
|	│
|	├── 07 前馈模块
|	│   ├── MLP
|	│   ├── FFN
|	│   ├── GLU
|	│   ├── SwiGLU
|	│   └── MoE
|	│
|	├── 08 正则化
|	│   ├── Dropout
|	│   ├── DropPath
|	│   └── ...
|	│
|	└── 09 输出头
|	    ├── Projection Head
|	    ├── Classification Head
|	    └── Decoder Head
|
### 4. 训练方法（Training）

|	├── 01 损失函数（Loss）
|	│   ├── 交叉熵损失（Cross Entropy）
|	│   ├── InfoNCE
|	│   ├── 均方误差（MSE）
|	│   ├── 三元组损失（Triplet Loss）
|	│   ├── KL散度（KL Divergence）
|	│   └── ...
|	│
|	├── 02 优化器（Optimizer）
|	│   ├── SGD（随机梯度下降）
|	│   ├── Momentum（动量）
|	│   ├── AdaGrad
|	│   ├── RMSProp
|	│   ├── Adam
|	│   ├── AdamW
|	│   ├── LARS
|	│   └── ...
|	│
|	├── 03 学习率策略（Learning Rate Scheduler）
|	│   ├── 固定学习率
|	│   ├── StepLR
|	│   ├── MultiStepLR
|	│   ├── Cosine Annealing
|	│   ├── Warmup
|	│   └── ...
|	│
|	├── 04 数据增强（Data Augmentation）
|	│   ├── Random Crop（随机裁剪）
|	│   ├── Random Flip（随机翻转）
|	│   ├── Color Jitter（颜色扰动）
|	│   ├── Gaussian Blur（高斯模糊）
|	│   ├── Mixup
|	│   ├── CutMix
|	│   └── ...
|	│
|   ├──  05 正则化策略（Regularization）
|	    ├── Dropout
|	    ├── DropPath
|	    ├── Label Smoothing（标签平滑）
|	    ├── Weight Decay（权重衰减）
|	    ├── Early Stopping（提前停止）
|	    └── ...
|	    
### 5. 研究领域（Research Area）
│   │
│   ├──计算机视觉（CV）
│   ├──自然语言处理（NLP）
│   ├──语音处理（Speech）
│   ├──推荐系统（RecSys）
│   ├──机器人（Robotics）
│   ├──时间序列分析
│   ├──网络智能
│   └──多模态（Multimodal）
│
### 6. 大模型生态（LLM Ecosystem）
 │
 │    │   ├──Claude
 │    │   ├──Qwen
 │    │   └──DeepSeek
 │    │
 │    ├──RAG
 │    ├──Agent
 │    ├──Tool Calling
 │    ├──MCP
 │    ├──Function Calling
 │    └──AI Application

---

# 三、AI发展史（非常重要）

这是建立全局认知最快的方法。

---

## 第一代AI：规则时代

1950~1990

核心思想：

```
人写规则--机器执行规则
```

例如：

```
if 发烧 and 咳嗽:    感冒
```

---

优点：

```
可解释
```

缺点：

```
规则写不完
```

现实世界太复杂。

---

这被称为：

```
Symbolic AI 符号主义AI
```

---

## 第二代AI：机器学习时代

1990~2012

核心思想：

```
数据
↓
自动学习规则
```

替代：

```
人工编写规则
```

---

代表算法：

- 决策树
- SVM
- 随机森林
- XGBoost

---

第一次让AI真正落地。

---

## 第三代AI：深度学习时代

2012~

标志事件：

ImageNet 2012

---

核心思想：

```
神经网络自动提取特征
```

替代：

```
人工特征工程
```

---

出现：

- CNN
- RNN
- LSTM

---

CV和语音领域爆发。

---

## 第四代AI：Transformer时代

2017~

标志论文：

Attention Is All You Need

---

提出：

```
Self-Attention
```

统一：

```
NLP
CV
推荐时间序列
```

---

## 第五代AI：大模型时代

2022~

核心：

```
预训练+Scaling Law
```

---

出现：

- OpenAI GPT
- Anthropic Claude
- Google DeepMind Gemini
- DeepSeek DeepSeek
- Alibaba Cloud Qwen

---

# 四、现代AI的核心基础

实际上就三件事：

```
数据算法算力
```

---

## 数据（Data）

AI的粮食。

例如：

```
图片
文本
视频
语音
日志
网络流量
```

---

你研究方向里的：

```
RTTHop Count丢包率
```

也是数据。

---

## 算法（Algorithm）

学习规律的方法。

例如：

```
线性回归
CNN
Transformer
```

---

## 算力（Compute）

训练模型需要：

- GPU
- TPU
- 集群

---

没有算力：

```
模型再好也跑不起来
```

---

# 五、机器学习（AI核心）

机器学习是AI最重要的部分。

---

## 监督学习

有标签。

```
图片↓猫
```

---

## 无监督学习

无标签。

```
自动聚类
```

---

## 自监督学习

自己造标签。

例如：
* BERT
* GPT
* MAE


---

## 强化学习

奖励驱动。

例如：

```
AlphaGo
机器人控制
```

---

# 六、深度学习（现在主流）

深度学习本质：

```
多层神经网络
```

---

## CNN

处理图片。

```
猫狗分类目标检测医学影像
```

---

## RNN

处理序列。

早期NLP主力。

---

## LSTM

解决长期依赖问题。

---

## Transformer

当前统治AI。

---

# 七、AI三大应用方向

---

## 计算机视觉（CV）

输入：

```
图片视频
```

输出：

```
分类检测分割
```

典型：

- 人脸识别
- 自动驾驶

---

## 自然语言处理（NLP）

输入：

```
文本
```

输出：

```
理解生成翻译问答
```

---

典型：

- ChatGPT
- DeepSeek

---

## 语音处理

输入：

```
声音
```

输出：

```
文字语义语音
```

---

例如：

- Siri
- 小爱同学