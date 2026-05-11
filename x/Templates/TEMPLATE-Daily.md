<%*
let d = moment(tp.file.title, "YYYY-MM-DD");
let q = "Q" + (Math.floor(d.month() / 3) + 1);
let w = d.isoWeek().toString().padStart(2, '0');
-%>
---
week: '[[<% d.format("YYYY") %>-W<% w %>]]'
date: '<% tp.file.title %>'
cssclasses:
  - hide-properties
  - daily
  <% "- " + tp.date.now("dddd", 0, tp.file.title, "YYYYMMDD").toLowerCase() %>
---

## [[<% d.format("YYYY")%>]] / [[<%d.format("YYYY")%>-<% q %>|<% q %>]] / [[<% d.format("YYYY-MM") %>|<% d.format("MMMM") %>]] / [[<% d.format("YYYY") %>-W<% w %>|Week <% d.isoWeek() %>]]
# DAILY NOTE
##### ❮ [[<% d.clone().subtract(1, 'days').format("YYYY-MM-DD") %>]] | <% tp.file.title %> | [[<% d.clone().add(1, 'days').format("YYYY-MM-DD") %>]] ❯
---
### 📋 Activity Inventory（今日活动清单）
> 从 [[<% d.format("YYYY") %>-W<% w %>]] 的周活动清单中选取今日任务

| id  | Estimating | Item        | DDL | Important | Emergency |
| --- | ---------- | ----------- | --- | --------- | --------- |
| 00  |            | 长期任务-梳理每日任务 | ∞   | 🔴        | ⚠️        |
| 00  |            | 长期任务-复盘每日任务 | ∞   | 🔴        | ⚠️        |
| 01  |            |             |     |           |           |
| 02  |            |             |     |           |           |
| 03  |            |             |     |           |           |
| 04  |            |             |     |           |           |
| 05  |            |             |     |           |           |

> Important: 🔴高 🟡中 ⚪低 ｜ Emergency: ⚠️紧急 ⏳不紧急

---
### 🍅 Records（番茄记录）
#### Tracking
- 中断 → 0 番茄
- 5 分钟内完成 → 0 番茄
- 超过 5 分钟 → 回顾后继续
- 第一轮：① 计划中 → ❶ 已完成
- 第二轮：② 计划中 → ❷ 已完成
- 第三轮：③ 计划中 → ❸ 已完成
- 特殊符号：★ 提前结束 ｜ ✕ 内部打断 ｜ ☒ 外部打断

操作：`button-pomodoro-sync` `button-pomodoro-done` `button-pomodoro-internal` `button-pomodoro-external` `button-pomodoro-early` `button-pomodoro-mark`

| TaskId | Start time | TO DO       | Status | Estimating | Tracking |
| ------ | ---------- | ----------- | ------ | ---------- | -------- |
| 00 | xx:xx | 长期任务-梳理每日任务 | TD | 1 | ① |
| 00 | xx:xx | 长期任务-复盘每日任务 | TD | 1 | ① |
| 01     |            |             |        |            |          |
| 02     |            |             |        |            |          |
| 03     |            |             |        |            |          |
| 04     |            |             |        |            |          |
| 05     |            |             |        |            |          |
| 06     |            |             |        |            |          |
| 07     |            |             |        |            |          |

> Status：TD 待开始 ｜ W 进行中 ｜ D 已完成 ｜ C 已取消
>

---
### 🚨 Emergency Issue（突发情况）
| TaskId | Start time | Emergency issue | Status | Tracking |
|---|---|---|---|---|
| 01 | | | | |

> Status：TD 待开始 ｜ W 进行中 ｜ D 已完成 ｜ C 已取消 ｜ Tracking：记录处理过程和结果

---
### 🔍 Daily Review（每日回顾）
#### 自动统计

```dataviewjs
await dv.view("x/Views/daily-review");
```

#### 当日纪要
- 

---
### ⚛️ Habits
#### 学习
- 🍅 [pomodoro::]

#### 🥦 Health
- 💪 [exercise::]
- 💊 [supplements::]
- 🌙 [early_sleep::]

---
<%*
let birth = "2003-01-18";
let death = moment(birth).add(80, 'years');
let daysLeft = death.diff(moment(tp.file.title, "YYYY-MM-DD"), 'days');
%>
> [!error] 死亡倒计时：**<% daysLeft %> 天**

![[On This Day.base]]
