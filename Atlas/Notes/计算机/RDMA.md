---
up:
aliases:
tags:
  - 深度学习
  - 数据传输
date_create: 2026-04-16 10:14
---

远程直接访问内存，通过网卡直接访问内存，不同于[TCP](TCP)协议，要经过内核处理。
包括三种类型
1. InfiniBand：原生 RDMA 网络
2. RoCE：把 RDMA 语义搬到以太网上
	- **RoCEv1**：更接近二层以太网内使用
	- **RoCEv2**：在 **UDP/IP/Ethernet** 上跑，能跨三层网络路由
3. iWARP：把 RDMA 建在 TCP/IP 上