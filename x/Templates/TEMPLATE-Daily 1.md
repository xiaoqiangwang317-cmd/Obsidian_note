<%*
let d = moment(tp.file.title, "YYYY-MM-DD");
let q = "Q" + (Math.floor(d.month() / 3) + 1);
let w = d.isoWeek().toString().padStart(2, '0');
-%>
---
week: '[[<% d.format("YYYY") %>-W<% w %>]]'
date: '<% tp.file.title %>'
cssclasses: hide-properties

---

> [!info] [[<% d.format("YYYY")%>]] / [[<%d.format("YYYY")%>-<% q %>|<% q %>]] / [[<% d.format("YYYY-MM") %>|<% d.format("MMMM") %>]] / [[<% d.format("YYYY") %>-W<% w %>|Week <% d.isoWeek() %>]]

 > [!info] ❮ [[<% d.clone().subtract(1, 'days').format("YYYY-MM-DD") %>]] | <% tp.file.title %> | [[<% d.clone().add(1, 'days').format("YYYY-MM-DD") %>]] ❯
<%*
let birth = "2006-06-16";
let death = moment(birth).add(80, 'years');
let daysLeft = death.diff(moment(tp.file.title, "YYYY-MM-DD"), 'days');
%>
> [!error] 死亡倒计时：**<% daysLeft %> 天**
## ☑️Tasks
- [ ] 

## 📕Diary
- 🛏️
- 
**Success**


## ⚛️Checklists
**Habits**
- 🧘[meditation::]
- 📖[reading::]

🥦**Health**
- [ ] 鱼油
- [ ] 维生素D
- [ ] 肌酸

💪**Body**
- [workout::]
	- [ ] 蛋白粉

**End-of-Day Checklist**
- [ ] 检查邮箱
- [ ] 备份笔记库




















![[On This Day.base]] 
