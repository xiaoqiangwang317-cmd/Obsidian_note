---
up:
related:
date: 2026-05-30
---
## 一、这道题的正确答案
![[image-1780155645668.webp|400x90]]

**正确选项：A. 来自图像-文本的正样本梯度，以及作为其他样本负样本时的梯度**

### 为什么 C 不对？

C 说“来自两个方向的正样本梯度”，这**不完整**。在 CLIP 的对比学习中：

- 对于正样本对 (i, j)，图像特征 zizi​ 的梯度不仅来自它与文本 tjtj​ 的正样本匹配
    
- 还来自它作为**负样本**出现在其他文本对中：即图像 i 与 batch 内其他 N-1 个文本构成负样本，每个负样本都会贡献梯度
    

所以完整答案是 **A**：正样本梯度 + 作为负样本时的梯度。

---

## 二、CLIP 原理详解

### 1. 核心架构

CLIP（Contrastive Language-Image Pre-training）包含两个编码器：

text

图像 ──→ 图像编码器 (ViT/ResNet) ──→ 图像特征 I_i
文本 ──→ 文本编码器 (Transformer) ──→ 文本特征 T_j

两个特征被归一化到同一嵌入空间（单位超球面）。

### 2. 训练目标：对比损失

给定 batch size = N，有 N 个图文对 (I_i, T_i)。

构建相似度矩阵 S，其中 S_ij = I_i · T_j（点积）。

- **正样本**：对角线位置 (i, i)，相似度应接近 1
    
- **负样本**：非对角线位置 (i, j) 且 i ≠ j，相似度应接近 0
    

**损失函数**（InfoNCE 形式，不考虑温度 τ）：

text

Loss_image = -∑_i log( exp(S_ii) / ∑_j exp(S_ij) )
Loss_text = -∑_j log( exp(S_jj) / ∑_i exp(S_ij) )
总 Loss = (Loss_image + Loss_text) / 2

### 3. 梯度分析（对应本题）

对于图像特征 I_i，它在 Loss 中出现的位置：

- **正样本项**：S_ii（分母和分子都包含，导数复杂但贡献为正方向）
    
- **负样本项**：作为分母中 S_ij（j ≠ i）出现，每个负样本贡献梯度
    

所以梯度来源 = 正样本梯度 + (N-1) 个负样本梯度。

这就是为什么 **A 正确**。

### 4. 关键设计

|设计|作用|
|---|---|
|对称损失|同时优化图→文和文→图方向|
|大 batch size|提供更多负样本，学得更好（原始 CLIP 用 32768）|
|可学习温度 τ|控制分布的锐度（softmax 的平滑程度）|
|单位归一化|让点积直接等于余弦相似度|

---

## 三、大模型从文本到多模态的发展史

### 阶段一：纯文本时代（2018-2020）

|模型|时间|核心贡献|
|---|---|---|
|BERT|2018|双向 Transformer，预训练+微调|
|GPT-1/2/3|2018-2020|自回归生成，规模扩展|
|T5|2019|统一的文本到文本框架|

**特点**：只能处理文本，但证明了 Transformer + 大规模预训练的有效性。

---

### 阶段二：图文对比学习（2021）

|模型|时间|核心贡献|
|---|---|---|
|**CLIP**|2021|图文对比学习，零样本分类|
|ALIGN|2021|用 18 亿噪声图文对，类似 CLIP|
|Florence|2021|统一理解+生成+检索|

**突破**：首次将图像和文本映射到同一空间。

**处理方法**：

- 图像：ViT 或 ResNet → 序列 patch → Transformer
    
- 文本：Transformer
    
- 训练：对比损失
    

---

### 阶段三：图文生成（2021-2022）

|模型|时间|核心贡献|
|---|---|---|
|DALL-E|2021|自回归生成图像|
|DALL-E 2|2022|Diffusion + CLIP 先验|
|Stable Diffusion|2022|开源，Latent Diffusion|
|Imagen|2022|纯 Diffusion，不用 CLIP|

**处理方法**：

- 文本 → 文本编码器（T5 或 CLIP text encoder）
    
- 图像生成 → Diffusion 模型（UNet + Attention）
    
- 核心：Latent space（在压缩空间做 Diffusion，省显存）
    

---

### 阶段四：视频理解（2022-2023）

|模型|时间|核心贡献|
|---|---|---|
|ViViT|2022|视频的纯 Transformer|
|TimeSformer|2022|分离时空 Attention|
|VideoCLIP|2022|视频-文本对比学习|
|VideoLLaMA|2023|视频 + LLM|

**视频处理方法**：

text

原始视频 (T×H×W)
    ↓
采样帧 + 切 patch
    ↓
时空 patch (T × (H×W) 个)
    ↓
时空位置编码（帧号 + 空间坐标）
    ↓
Transformer（或时空分离 Attention）
    ↓
视频特征

|方法|原理|
|---|---|
|帧采样|每秒取 1-2 帧，每帧用 ViT 处理，然后时序建模|
|时空 patch|直接切成 3D patch (时间×高×宽)|
|时空分离 Attention|先做空间 Attention，再做时间 Attention（省计算）|

---

### 阶段五：音频处理（2022-2023）

|模型|时间|核心贡献|
|---|---|---|
|AudioCLIP|2022|CLIP 扩展到音频|
|HuBERT|2022|音频的自监督学习|
|WavLM|2022|更强的音频表示|
|ImageBind|2023|6 种模态统一空间|

**音频处理方法**：

text

原始音频波形（1D，16kHz）
    ↓
方法1：声谱图（2D，时间×频率）
    ↓
当作“单通道图像” → ViT
    ↓
方法2：直接 token 化波形（1D）
    ↓
Transformer

|方法|原理|优缺点|
|---|---|---|
|声谱图法|用 CNN 或 ViT 处理声谱图|成熟，可复用图像模型|
|波形 token 法|直接处理原始波形|端到端，更难训练|
|对比学习|音频-文本/图像对齐|零样本音频分类|

---

### 阶段六：统一多模态大模型（2023-2024）

|模型|时间|核心贡献|
|---|---|---|
|GPT-4V|2023|GPT-4 支持图像输入|
|Gemini|2023|原生多模态（文+图+视频+音频）|
|Sora|2024|视频生成，时空 patch + Diffusion|
|Chameleon|2024|早期融合，所有模态统一 token|

**核心趋势**：从“独立编码器 + 对比学习” → “统一 Transformer 处理所有模态”

---

## 四、各模态处理方法总结表

|模态|如何变成 token|编码器|代表模型|
|---|---|---|---|
|文本|BPE/SentencePiece → token id|Transformer|GPT, BERT|
|图像|切 patch (16×16) → 线性投影|ViT, ResNet|CLIP, ViT|
|视频|时空 patch 或 帧采样 + 时间编码|时空 Transformer|ViViT, Sora|
|音频|声谱图 → patch 或 波形 token|CNN + Transformer|AudioCLIP, HuBERT|
|统一|不同模态 token 加模态标记|统一 Transformer|Gemini, Chameleon|

---

## 五、一个整体的时间线图

text

2018 ──→ BERT (纯文本)
  │
2019 ──→ GPT-2 (纯文本)
  │
2020 ──→ GPT-3 (纯文本大规模)
  │
2021 ──→ CLIP (图文对比)
  │    └── ViT (图像 Transformer)
  │
2022 ──→ DALL-E 2, Stable Diffusion (图文生成)
  │    └── ViViT (视频理解)
  │    └── AudioCLIP (音频理解)
  │
2023 ──→ GPT-4V (多模态理解)
  │    └── VideoLLaMA (视频+LLM)
  │    └── ImageBind (6 模态统一)
  │
2024 ──→ Sora (视频生成)
       └── Gemini (原生多模态)

---

## 六、核心结论

1. **CLIP 的核心**：对比学习 + 双塔架构，图/文映射到同一空间
    
2. **本题答案 A**：梯度来自正样本 + 作为负样本时的贡献
    
3. **多模态底层**：本质都是 **序列化 + Transformer**，只是不同模态需要各自的“Tokenization”方法
    
4. **发展趋势**：从单模态 → 图文对比 → 生成 → 更多模态 → 统一 Transformer