---
up:
  - "[[Redis数据结构]]"
related:
date: 2026-05-11
---
## 1. 介绍
List列表是简单的字符串列表，**按照插入顺序排序**，从头或者尾部添加。
## 2. 内部实现
List类型的底层数据结构是[[双向链表]]或[[压缩列表]]实现
但是在 Redis 3.2 版本之后，List 数据类型底层数据结构就只由[[ quicklist ]]实现了，替代了双向链表和压缩列表；而从 Redis 7.0 起，quicklist 节点内部用来保存元素的压缩列表也被 [[listpack ]]替代。
## 3. 应用场景


> [! Node]
> LPUSH key value      # 左侧插入
> RPUSH key value      # 右侧插入
> LPOP key             # 左侧弹出
> RPOP key             # 右侧弹出
> LRANGE key 0 -1      # 查看全部





