---
up:
related:
date: 2026-05-11
---
## 1. 介绍

Hash 是一个键值对（key - value）集合，其中 value 的形式如： value=[{field1，value1}，...{fieldN，valueN}]。Hash 特别适合用于存储对象。
![[image-1778658635030.webp|697]]

## 2. 内部实现
Hash的底层使用的的是[[压缩列表]]或者[[哈希表]]，小用压缩列表
后续Redis将压缩列表替换为[[Listpack]]


> [! Node]
> 	HSET key field value              # 写入
> 	HGET key field                 # 由field获取
> 	HGETALL key                  # 获得该key的所有属性
> 	HDEL key field        # 删除




