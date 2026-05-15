---
up:
related:
date: 2026-05-15
---
- **Self-Attention 机制的本质：**
    
    - **核心考点：** 解释 $Q$ (Query), $K$ (Key), $V$ (Value) 的物理含义。为什么在计算 Attention Score 时需要除以 $\sqrt{d_k}$？（为了防止内积过大导致 Softmax 梯度消失）。
        
    - **复杂度：** Self-Attention 的时间复杂度是 $O(N^2 \cdot d)$（$N$ 为序列长度，$d$ 为维度），这是限制长文本的关键。
        
- **位置编码（Positional Encoding）：**
    
    - **核心考点：** Transformer 本身没有序列顺位信息，如何加入的？需要了解绝对位置编码（Sinusoidal）和目前主流的旋转位置编码（RoPE，能够更好地处理长上下文和相对位置）。
        
- **推理加速技术（KV Cache）：**
    
    - **核心考点：** 为什么大模型推理是逐字生成的？在生成第 $t$ 个 Token 时，如何复用前 $t-1$ 个 Token 的计算结果（缓存 $K$ 和 $V$ 矩阵，以空间换时间）。