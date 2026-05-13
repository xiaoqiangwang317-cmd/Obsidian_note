---
up:
related:
aliases:
  - Simple Dynamic String
  - 简单动态字符串
date: 2026-05-13
---
SDS 全称 Simple Dynamic String，中文叫“简单动态字符串”。
带有**长度信息**和**容量信息**的可扩容字符串。
```
struct sdshdr {
    len;      // 已使用长度
    alloc;    // 总可用空间
    flags;    // 类型信息
    buf[];    // 真正的数据
}

```

> [!NOTE] 特点
> - **SDS不仅可以保存文本数据也可以保存二进制数据**。使用len去标志结束而不是"/0"
> - **SDS由于维护长度信息，所以获取长度的时间复杂度是O(1)**
> - **杜绝缓冲区溢出**，在进行字符串拼接时先去检测空间容量，再进行扩容。
