---
up:
aliases:
tags:
  - 深度学习
date_create: 2026-04-15 22:34
---

NCCL是NVIDIA给多张GPU做高速协同的库，主要包括
两类
1. collective communication(协同)
2. **point-to-point send**（点到点）
例如GPU之间有[NVLink](NVLink.md)就走NVLink，没有 NVLink 但支持 **[PCIe](PCIE.md) P2P**，它会走 P2P；如果连 P2P 都不适合，就可能退到 **SHM（共享内存）**；跨机器时则会走 **NET**，也就是网络层。