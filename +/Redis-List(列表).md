---
up:
  - "[[Redis数据结构]]"
related:
date: 2026-05-11
---
## 1. 介绍
List列表是简单的字符串列表，**按照插入顺序排序**，从头或者尾部添加。
## 2. 内部实现
List类型的底层数据结构是

> [! Node]
> LPUSH key value      # 左侧插入
> RPUSH key value      # 右侧插入
> LPOP key             # 左侧弹出
> RPOP key             # 右侧弹出
> LRANGE key 0 -1      # 查看全部





