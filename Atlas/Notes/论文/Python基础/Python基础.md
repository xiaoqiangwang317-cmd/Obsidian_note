---
up:
related:
date: 2026-06-22
---
### 1.前言

**Python是解释型语言**

解释型vs**编译型**

![image-20260121100907526](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121100907526.png?lastModify=1782109450)

编译型语言要根据不同平台生成不同的可执行文件

优点：同一运行平台，代码只需要编译一次，且执行效率高

缺点：跨平台性差，大型项目编译时间较长，开发效率略低

**解释型**vs编译型

![image-20260121101555025](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121101555025.png?lastModify=1782109450)

优点：跨平台性好 无需编译 开发调试灵活高效

缺点：每次运行都需要重新解释 执行效率低

**PyCharm快捷键**

##### 一、编辑 & 编码（你每天用最多的）

##### ✍️ 基础编辑

|功能|快捷键|
|---|---|
|自动补全|`Ctrl + Space`|
|智能补全|`Ctrl + Shift + Space`|
|参数提示|`Ctrl + P`|
|快速修复 / 建议|`Alt + Enter`|
|注释 / 取消注释|`Ctrl + /`|
|多行注释|`Ctrl + Shift + /`|
|格式化代码|`Ctrl + Alt + L`|
|优化 import|`Ctrl + Alt + O`|

---

##### ✂️ 光标 & 选中

|功能|快捷键|
|---|---|
|复制当前行|`Ctrl + D`|
|删除当前行|`Ctrl + Y`|
|上下移动行|`Alt + Shift + ↑ / ↓`|
|扩展选中|`Ctrl + W`|
|收缩选中|`Ctrl + Shift + W`|
|多光标|`Alt + 鼠标左键`|

---

##### 二、代码导航（读代码神器）

##### 🧭 跳转相关

|功能|快捷键|
|---|---|
|跳到定义|`Ctrl + B` / `Ctrl + Click`|
|查看实现|`Ctrl + Alt + B`|
|查看类结构|`Ctrl + F12`|
|最近文件|`Ctrl + E`|
|最近编辑位置|`Ctrl + Shift + Backspace`|

---

##### 🔍 搜索

|功能|快捷键|
|---|---|
|当前文件查找|`Ctrl + F`|
|全局查找|`Ctrl + Shift + F`|
|当前文件替换|`Ctrl + R`|
|全局替换|`Ctrl + Shift + R`|
|**Search Everywhere（王炸）**|`Double Shift`|

> **双 Shift = 文件 + 类 + 方法 + 命令 + 设置** 👉 真正的“记不住快捷键也能飞”

---

##### 三、调试 Debug（你一旦熟就回不去）

##### 🐞 调试基础

|功能|快捷键|
|---|---|
|启动调试|`Shift + F9`|
|继续|`F9`|
|Step Over|`F8`|
|Step Into|`F7`|
|Step Out|`Shift + F8`|
|停止|`Ctrl + F2`|

---

##### 🧠 高阶调试

|功能|快捷键|
|---|---|
|运行到光标|`Alt + F9`|
|查看表达式|`Alt + F8`|
|切换断点|`Ctrl + F8`|

---

##### 四、重构（写得快 ≠ 写得乱）

##### 🔨 重构核心

|功能|快捷键|
|---|---|
|重命名（变量 / 类 / 方法）|`Shift + F6`|
|提取变量|`Ctrl + Alt + V`|
|提取方法|`Ctrl + Alt + M`|
|提取常量|`Ctrl + Alt + C`|
|内联|`Ctrl + Alt + N`|

---

##### 五、运行 & 项目管理

##### ▶️ 运行

|功能|快捷键|
|---|---|
|运行|`Shift + F10`|
|重新运行|`Ctrl + F5`|
|运行配置|`Alt + Shift + F10`|

---

##### 🗂️ 窗口 / 面板

|功能|快捷键|
|---|---|
|显示项目栏|`Alt + 1`|
|终端|`Alt + F12`|
|Python Console|`Alt + 4`|
|关闭当前 Tab|`Ctrl + F4`|
|切换 Tab|`Alt + ← / →`|

---

##### 六、Mac 对照（常见差异）

|Windows|Mac|
|---|---|
|Ctrl|Command (⌘)|
|Alt|Option (⌥)|
|Shift|Shift|

---

##### 🚀 超实用效率 Tips（强烈建议你用）

##### 1️⃣ 快捷键可视化训练

`Help → Keymap Reference` 👉 打印一张放桌子旁，**一周肌肉记忆形成**

---

##### 2️⃣ 不记快捷键也能飞

- **双 Shift + 想做的事**
    
- 比如输入：`reformat`、`rename`、`run`
    

---

##### 3️⃣ 重构优先于重写

你写代码时优先：

- `Alt + Enter`
    
- `Ctrl + Alt + M / V`
    

👉 PyCharm 比你更懂“怎么改更优雅”

---

##### 4️⃣ 自定义 Keymap（强烈建议）

Settings → Keymap

- 把常用功能绑到顺手的键
    
- 比如把 **Format Code** 绑到一个更顺的组合
    

### 2.基础

#### 2.1字面量

**学习**

> 字面量就是直接写在代码中的具体值

**代码**
```python
'张三'  
18  
65.2  
​  
"李四"  
22  
74.6  
​  
'''王五'''  
25  
80  
​  
print(25)  
print(80)
```

![image-20260121105531971](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121105531971.png?lastModify=1782109450)

#### 2.2变量

**学习**

> 一旦新的变量出现，就必须立即与某个值建立绑定关系

**代码**
```python
name = '张三'  
age = 18  
weight = 64.2  
# 解释型语言 边写边解释  
print('今天是1月1日，体重是', weight)  
weight = 59  
print('今天是1月2日，体重是', weight)  
weight = 58  
print('今天是1月3日，体重是', weight)  
​  
# 最后一次修改的结果  
print('张三的体重是', weight)  
print('对于', weight, '这个体重，张三不是很满意')  
print('张三决定开始减肥，希望体重比', weight, '还要小')

```
**结果**

![image-20260121105508563](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121105508563.png?lastModify=1782109450)

#### 2.3标识符命名规则

**学习**

> - 程序中所有我们可以自己起名的内容，都是标识符
>     
>     - 只能包含：数字、字母、下划线，且不能以数字开头，不能包含空格
>         
>     - 标识符区分大小写，例如Name和name是两个不同的标识符
>         
>     - 标识符不能使用关键字
>         
>     - 标识符尽量不要与内置函数同名
>         
>     - 标识符虽然没有长度限制，但应追求：简洁清晰，具有描述性
>         

![image-20260121111310396](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121111310396.png?lastModify=1782109450)

官方推荐

![image-20260121141833022](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121141833022.png?lastModify=1782109450)

**代码**
```python
# 只能包含：数字、字母、下划线，且不能以数字开头，不能包含空格  
name2 = '张三'  
age_2 = 18  
_weight_ = 59.4  
​  
# 标识符区分大小写，例如Name和name是两个不同的标识符  
name = '熊大'  
Name = '熊二'  
print(name, Name)  
```
结果

![image-20260121142012657](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121142012657.png?lastModify=1782109450)

#### 2.4常量

学习

> 一旦被赋值，就不希望被修改的量
> 
> 一般约定使用全大写变量名来表示常量，涉及到多个单词时，用下划线做分隔
> 
> 没有强制的常量机制，所谓常量，本质还是变量，只是约定好不去修改

代码
```python
AGE = 18  
ADULT_AGE = 18  
MAX_USERS = 1000  
PASSING_SCORE = 60  
​  
print(AGE, ADULT_AGE, MAX_USERS, PASSING_SCORE)
```

结果

![image-20260121163455555](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121163455555.png?lastModify=1782109450)

注意：

![image-20260121163702013](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121163702013.png?lastModify=1782109450)

#### 2.5注释

学习

> - 是对代码的备注和解释，在代码执行时，通常不起任何作用
>     
> - 注释的分类：
>     
>     - 单行注释 #后的一行内容，会被视为注释
>         
>     - 多行注释 使用三个单引号，或三个双引号的方式编写 （备注：Python中其实并没有真正的多行注释语法，上述方式编写本质只是一个字符串字面量）
>         
>     - 文件编码注释 写在文件开头 用于指定当前文件的字符编码
>         

代码
```python
#coding=utf-8 (万国码 python3默认 不再写)

#coding=iso8859-1
```
结果

![image-20260121213635814](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121213635814.png?lastModify=1782109450)

![image-20260121213819158](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121213819158.png?lastModify=1782109450)

#### 2.6字符编码

学习

> 存储时，务必采用合适的字符编码
> 
> 存储时，采用哪种方式编码，读取时就必须采用相同方式解码

![image-20260121214604011](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260121214604011.png?lastModify=1782109450)

#### 2.7数据类型

学习

> 字符串 整型 浮点型 ...

代码
```python
print(type('张三'))  
print(type(18))  
print(type(65.2))  
  
name = '张三'  
print(type(name))

```
结果

![image-20260126161720871](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126161720871.png?lastModify=1782109450)

#### 2.7.1整型

学习

> 所谓整型，就是没有小数点的数字，可以是正数，也可以是负数，也可以是0
> 
> 当数很大时 我们可以使用下划线将数字进行分组 来让数字变得更易读
> 
> Python中整数的上限值，取决于执行代码的计算机的内存和处理能力

代码
```python
所谓整型，就是没有小数点的数字，可以是正数，也可以是负数，也可以是0  
age = 18  
temp = -15  
score = 0  
# 当数很大时 我们可以使用下划线将数字进行分组 来让数字变得更易读  
salary = 300_000  
house_price = 3_200_000  
graduates = 12_000_000  
print(salary, house_price, graduates)  
# Python中整数的上限值，取决于执行代码的计算机的内存和处理能力  
a = 9 ** 9999  
print(a)
```
结果

![image-20260126162115245](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126162115245.png?lastModify=1782109450)

> 注意：Python中整数的上限值，取决于执行代码的计算机的内存和处理能力
```python
# Python中整数的上限值，取决于执行代码的计算机的内存和处理能力  
a = 9 ** 9999  
b = a + 100  
sys.set_int_max_str_digits(0)  
print(a)
```

结果 执行成功

![image-20260126162324463](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126162324463.png?lastModify=1782109450)

#### 2.7.2浮点型

学习

> 浮点型就是带有小数点的数字
> 
> 浮点型的科学计数法表示

代码

```python
# 浮点型就是带有小数点的数字  
weight = 65.2  
balance = 1425.58  
out_temp = -25.2  
price = 120.0  
print(type(price))  
  
# 浮点型的科学计数法表示  
speed_of_sound = 3.4e+2  # 3.4乘以10的2次方  
print(speed_of_sound)  
  
world_population = 7.8e9  # 7.8乘以10的9次方  
distance_sun_earth = 1.496E8  # 1.496乘以10的8次方  
speed_of_light = 2.998E+8  # 2.998乘以10的8次方  
  
print(world_population)  
print(distance_sun_earth)  
print(speed_of_light)  
  
one_ml = 1e-3  # 1乘以10的-3次方  
one_mg = 1E-3  # 1乘以10的-3次方  
  
print(one_ml)  
print(one_mg)
```
结果

![image-20260126163616619](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126163616619.png?lastModify=1782109450)

#### 2.7.3字符串

##### 2.7.3.1字符串四种定义方式

学习

> 单引号和双引号的写法是等价的，二者都不能直接换行（要用圆括号才能换行），单引号用的多
> 
> 三个单引号的写法，可以直接换行，并且可以作为多行注释使用
> 
> 三个双引号的写法，可以直接换行，也可以作为多行注释使用，还能作为文档字符串使用。

代码
```python
# 单引号和双引号的写法是等价的，二者都不能直接换行（要用圆括号才能换行），单引号用的多  
message1 = '尚硅谷，让天下没有难学的技术！'  
message2 = "尚硅谷，让天下没有难学的技术！"  
  
# 三个单引号的写法，可以直接换行，并且可以作为多行注释使用  
message3 = '''尚硅谷，让天下没有难学的  
技术！'''  
  
# 三个双引号的写法，可以直接换行，也可以作为多行注释使用，还能作为文档字符串使用。  
message4 = """尚硅谷，让天下没有  
难学的技术！"""  
  
print(message3)  
print(message4)
```
结果

![image-20260126165833939](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126165833939.png?lastModify=1782109450)

##### 2.7.3.2 字符串格式化输出

学习

> 按照预先定义的格式，将变量或计算结果，插入到字符串中并输出
> 
> 写法一: 直接用加号进行拼接,写起来很麻烦而且代码很乱，而且只能是字符串之间拼接
> 
> 写法二：使用占位符 %s占位字符串 %f占位浮点数 %i占位整数 %d占位十进制的整数 %s是万能的
> 
> 写法三: 使用f-string,是目前python官方最推荐的方式

代码

```python
# 按照预先定义的格式，将变量或计算结果，插入到字符串中并输出  
name = '张三'  
gender = '男'  
weight = 65.2  
age = 12  
  
# 写法一: 直接用加号进行拼接,写起来很麻烦而且代码很乱，而且只能是字符串之间拼接  
# info1 = '我叫' + name + ',我是' + gender + '生' + '我的体重是' + weight  
# info2 = '我叫' + name + ',我是' + gender + '生' + '我的年龄是' + age  
# print(info1)  
  
# 写法二：使用占位符  
# %s占位字符串 %f占位浮点数 %i占位整数 %d占位十进制的整数 %s是万能的  
info3 = '我叫%s,我是%s生，我的体重是%d,我的年龄是%d' % (name, gender, weight, age)  
print(info3)  
  
# 写法三: 使用f-string,是目前python官方最推荐的方式  
info4 = f'我叫{name},我是{gender}生,我体重是{weight},年龄是{age}'  
print(info4)
```
结果

![image-20260126172449643](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126172449643.png?lastModify=1782109450)

##### 2.7.3.3 字符串占位符精度控制

学习

> **%m.ns** 字符串占位：
> 
> m: 1.字符串的最小宽度，位数不够会自动使用空格补全，位数小于字符串长度则不起作用 2.正数是右对齐，负数是左对齐
> 
> n:精度控制，最多输出n个字符（若n大于实际字符串长度，则不起作用）
> 
> **%m.nf** ==**浮点数占位：**==
> 
> m: 1.控制整体宽度（整体宽度 = 整数宽度+小数点+小数宽度） 2.位数不够空格来补，位数小于整体宽度，则自动失效 3.正数是右对齐，负数是左对齐
> 
> ==**n:**== 精度控制，保留n位小数（n的默认值为6），不够0来补，截断时会四舍五入
> 
> **%m.nd** 整数占位：
> 
> m: 1.最小宽度，位数不够会自动使用空格补全，位数小于字符串长度则不起作用 2.正数是右对齐，负数是左对齐
> 
> n: 精度控制，含义：最少用n位显示数字，位数不够用0来补，位数小于整数位，则自动失效

**字符串占位：**

代码
```python
# 按照预先定义的格式，将变量或计算结果，插入到字符串中并输出  
name = '张三'  
gender = '男'  
weight = 65.45  
age = 12  
  
info = '我叫%4s,性别是%s,体重是%f,年龄是%d' % (name, gender, weight, age)  
print(info)
```
结果

![image-20260126211844016](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126211844016.png?lastModify=1782109450)

注意1：字符串的最小宽度，位数不够会自动使用空格补全，位数小于字符串长度则不起作用

![image-20260126212037568](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126212037568.png?lastModify=1782109450)

注意2：正数是右对齐，负数是左对齐

![image-20260126212159468](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126212159468.png?lastModify=1782109450)

代码

```python
# 按照预先定义的格式，将变量或计算结果，插入到字符串中并输出  
name = '张三'  
gender = '男'  
weight = 65.45  
age = 12  
  
info = '我叫%.1s,性别是%s,体重是%f,年龄是%d' % (name, gender, weight, age)  
print(info)
```
结果

![image-20260126212422015](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126212422015.png?lastModify=1782109450)

注意1：若n大于实际字符串长度，则不起作用

![image-20260126212530721](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126212530721.png?lastModify=1782109450)

![image-20260126212626781](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126212626781.png?lastModify=1782109450)

两个一起使用
```python
info = '我叫%4.1s,性别是%s,体重是%f,年龄是%d' % (name, gender, weight, age)  
print(info)
```

![image-20260126212744740](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126212744740.png?lastModify=1782109450)

```python
info = '我叫%-4.1s,性别是%3.2s,体重是%f,年龄是%d' % (name, gender, weight, age)  
print(info)
```
![image-20260126213137685](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126213137685.png?lastModify=1782109450)

[*]**浮点数占位：**

[*]n: 精度控制，保留n位小数（n的默认值为6），不够0来补，截断时会四舍五入

weight = 65.45  
age = 12  
  
info = '我叫%-4.1s,性别是%3.2s,体重是%.3f,年龄是%d' % (name, gender, weight, age)  
print(info)

![image-20260126213531761](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126213531761.png?lastModify=1782109450)

info = '我叫%-4.1s,性别是%3.2s,体重是%.1f,年龄是%d' % (name, gender, weight, age)  
print(info)

![image-20260126213627146](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126213627146.png?lastModify=1782109450)

补充例子

![image-20260126213827325](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126213827325.png?lastModify=1782109450)

![image-20260126213905592](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126213905592.png?lastModify=1782109450)

m: 1. 控制整体宽度（整体宽度 = 整数宽度+小数点+小数宽度） 2.位数不够空格来补，位数小于整体宽度，则自动失效 3. 正数是右对齐，负数是左对齐

info = '我叫%-4.1s,性别是%3.2s,体重是%9.3f,年龄是%d' % (name, gender, weight, age)  
print(info)

![image-20260126214649801](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126214649801.png?lastModify=1782109450)

2. 位数不够空格来补，位数小于整体宽度，则自动失效
    

![image-20260126214832907](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126214832907.png?lastModify=1782109450)

3. 正数是右对齐，负数是左对齐
    

![image-20260126214923183](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126214923183.png?lastModify=1782109450)

**整数占位：**

m: 1.最小宽度，位数不够会自动使用空格补全，位数小于字符串长度则不起作用 2.正数是右对齐，负数是左对齐

```python
# 按照预先定义的格式，将变量或计算结果，插入到字符串中并输出  
name = '张三'  
gender = '男'  
weight = 65.55  
age = 12  
  
info = '我叫%-4.1s,性别是%3.2s,体重是%-9.3f,年龄是%4d' % (name, gender, weight, age)  
print(info)

```
![image-20260126215251828](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126215251828.png?lastModify=1782109450)

![image-20260126215330020](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126215330020.png?lastModify=1782109450)

![image-20260126215414493](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126215414493.png?lastModify=1782109450)

n: 精度控制，含义：最少用n位显示数字，位数不够用0来补，位数小于整数位，则自动失效

![image-20260126215720764](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126215720764.png?lastModify=1782109450)

![image-20260126215756568](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126215756568.png?lastModify=1782109450)

两个一起用
```python
# 按照预先定义的格式，将变量或计算结果，插入到字符串中并输出  
name = '张三'  
gender = '男'  
weight = 65.55  
age = 12  
  
info = '我叫%-4.1s,性别是%3.2s,体重是%-9.3f,年龄是%6.4d' % (name, gender, weight, age)  
print(info)
```
![image-20260126215921481](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260126215921481.png?lastModify=1782109450)

##### 2.7.3.4 字符串转义字符

学习

> 是一种在字符串中用于表示特殊含义的字符组合，通常以反斜杠开头，通常用于表示那些在字符串中不能直接写出的字符
> 
> 使用 \ '输出'
> 
> 使用 "输出"
> 
> 使用 \n 进行换行
> 
> 使用 \\输出\
> 
> 使用 \b 删除前一个字符
> 
> 使用 \r 使光标回到本行开头，覆盖输出
> 
> 使用 \t 表示水平制表符（让光标跳转到下一个制表位）

代码

```python
# 是一种在字符串中用于表示特殊含义的字符组合，通常以反斜杠开头，通常用于表示那些在字符串中不能直接写出的字符  
print("-----------------------------------------------")  
# 使用 \'输出'  
print("在Python中，可以使用\'包裹一个字符串")  
# 使用 \"输出"  
print("在Python中，可以使用\"包裹一个字符串")  
# 使用 \n 进行换行  
print("注册会员需要以下信息：\n姓名\n年龄\n手机号")  
# 使用\\ 输出\  
print('D:\\nice')  
  
print("-----------------------------------------------")  
# 使用 \b 删除前一个字符  
print('helloo\b')  
# 使用 \r 使光标回到本行开头，覆盖输出  
print('67%\r68%')  
# 使用 \t 表示水平制表符（让光标跳转到下一个制表位）  
print('1234123412341234')  
print('ab\tcd')  
print('abc\td')  
print('abcd\ta')

注意1：关于制表位

# 使用 \t 表示水平制表符（让光标跳转到下一个制表位）  
print('1234123412341234')  
print('ab\tcd')  
print('abc\td')  
print('abcd\ta')
```
![image-20260127094317054](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260127094317054.png?lastModify=1782109450)

![image-20260127101615880](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260127101615880.png?lastModify=1782109450)

![image-20260127101659569](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260127101659569.png?lastModify=1782109450)

解决
```python
print('1234123412341234')  
print('ab\tcd'.expandtabs(4))  
print('abc\td'.expandtabs(4))  
print('abcd\ta'.expandtabs(4))
```
![image-20260127101915144](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260127101915144.png?lastModify=1782109450)

结果

![image-20260127102742007](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260127102742007.png?lastModify=1782109450)

#### 2.8数据类型转换

学习

> 用户输入的内容都是字符串，若需要进行数学运算，就必须进行数据类型转换
> 
> 对文件进行写入操作时，要将其他类型的数据转为字符串
> 
> 从数据库中读取出的内容都是字符串，若需要进行数学运算，也需要基础类型转换

代码

```python
# 使用str()将指定数据转换为字符串  
result1 = str(18)  
result2 = str(18)  
result3 = str(1.8e3)  
result4 = str(12_000)  
print(type(result1), result1)  
print(type(result2), result2)  
print(type(result3), result3)  
print(type(result4), result4)

```
结果

![image-20260129100742141](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129100742141.png?lastModify=1782109450)

代码

```python
# 使用int()将指定数据转换为整型  
result1 = int(15.6)  
result2 = int('79')  
result3 = int(' 79 ')  
result4 = int(48)  
print(type(result1), result1)  
print(type(result2), result2)  
print(type(result3), result3)  
print(type(result4), result4)  
# 以下是错误示例  
int('   7   9   ')  
int('79个')  
int('15.6')
```
结果

![image-20260129100813568](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129100813568.png?lastModify=1782109450)

![image-20260129100854905](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129100854905.png?lastModify=1782109450)

代码

```python
## 把指定数据转为浮点型：float()  
result1 = float(18)  
result2 = float('15.6')  
result3 = float(' 5.7 ')  
result4 = float(14.8)  
result5 = float('48')  
print(type(result1), result1)  
print(type(result2), result2)  
print(type(result3), result3)  
print(type(result4), result4)  
# 注意  
print(type(result5), result5)  
# # 以下是反例  
float('  5.   7    ')  
float('你好')  
float('5.7元')  
float('5.23.12')
```
结果

![image-20260129101027533](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129101027533.png?lastModify=1782109450)

#### 2.9运算符

![image-20260129101401733](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129101401733.png?lastModify=1782109450)

##### 2.9.1算数运算符

学习

> 加 减 乘 除 取整 取余 指数

代码
```python
# 加  
print(9 + 7)  
# 减  
print(7 - 2)  
# 乘  
print(3 * 4)  
# 除  
print(9 / 3)  
# 取整  
print(9 // 6)  
# 取余  
print(9 % 6)  
# 指数  
print(2 ** 3)
```
结果

![image-20260129102007810](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129102007810.png?lastModify=1782109450)

##### 2.9.2赋值_复合赋值运算符

学习

> 加 减 乘 除 取整 取模 指数

代码
```python
age = 18  
age += 1  
print(age)  
  
# 加法运算符  
price = 52  
freight = 6  
price += freight  
print(price)  
  
# 减法运算符  
price = 52  
freight = 6  
price -= freight  
print(price)  
  
# 乘法运算符  
price = 100  
discount = 0.8  
price *= discount  
print(price)  
  
# 除法复合运算符  
pay = 100  
num = 5  
pay /= 5  
print(pay)  
  
# 取整赋值运算符  
apple = 31  
num = 14  
apple //= num  
print(apple)  
  
# 取模赋值运算符  
seconds = 386  
minutes = 60  
seconds %= minutes  
print(seconds)  
  
# 指数赋值运算符  
a = 2  
b = 3  
a **= b  
print(a)
```
结果

![image-20260129160457806](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260129160457806.png?lastModify=1782109450)

##### 2.9.3比较运算符

学习

> 比较运算符
> 
> == 判断左右两侧是否相等
> 
> != 判断左右两侧是否不等
> 
> > 左侧是否大于右侧
> 
> < 左侧是否小于右侧
> 
> > = 左侧是否大于等于右侧
> 
> <= 左侧是否小于等于右侧

代码
```python
# 使用==判断左右两侧是否相等  
# a = 5  
# b = 7  
# c = '5'  
# result = a == c  
# print(a)  
# print(c)  
​  
# 使用!=判断左右两侧是否相等  
# a = 5  
# b = 7  
# c = '5'  
# result = a != c  
# print(a)  
# print(c)  
# print(result)  
​  
# 使用 > 判断左侧是否大于右侧  
a = 9  
b = 7  
c = '5'  
result = a > b  
print(result)  
​  
# 使用 < 判断左侧是否大于右侧  
a = 3  
b = 7  
c = '5'  
result = a < b  
print(result)  
​  
# 使用 >= 判断左侧是否大于等于右侧  
a = 6  
b = 7  
c = '5'  
result = a >= b  
print(result)  
​  
# 使用 <= 判断左侧是否小于等于右侧  
a = 9  
b = 7  
c = '5'  
result = a <= b  
print(result)  
​  
# 以上这些比较运算符，同样适用于字符串  
# python中字符串进行比较时，是依次比较每个字符的unicode编码  
msg1 = 'abc'  
msg2 = 'abc2'  
print(msg1 != msg2)  
​  
# 使用ord()查看指定字符的unicode编码  
print(ord('a'))  
print(ord('我'))  
​  
# 使用chr()将unicode编码转为字符  
# 先比较长度后比较内容  
print(chr(97))  
print(chr(25105))  
​  
msg1 = 'abc'  
msg2 = 'xyz'  
msg3 = '我爱你'  
msg4 = '中国'  
msg5 = 'abc'  
msg6 = 'abcdef'  
print(msg1 >= msg5)
```
结果

![image-20260604195855439](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260604195855439.png?lastModify=1782109450)

##### 2.9.4布尔类型

学习

> 布尔类型 bool

代码
```python
a = True  
b = False  
print(type(a), a)  
print(type(b), b)
```

结果

![image-20260604200214874](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260604200214874.png?lastModify=1782109450)

##### 2.9.5逻辑运算符

学习

> and 逻辑与 判断其两侧的值，是否都为True
> 
> or 逻辑或 判断其两侧的值，是否至少有一个为True
> 
> not 逻辑非 用于对一个值取反

代码

```python
# and 逻辑与 判断其两侧的值，是否都为True  
print('--------# and 逻辑与 判断其两侧的值，是否都为True--------')  
print(True and True)  
print(True and False)  
print(False and True)  
print(False and False)  
  
# 1. and 具备逻辑短路的能力  
# 3/0 不会被运行 因为他被前面的false已经为false 后面的3/0就被短路掉了  
print(False and 3 / 0)  
# print(True and 3 / 0)  
# 2. and返回的不一定是布尔值，他返回的是某个参与计算的值本身  
# 规则：and会先看左边，如果左边为“假”,就直接返回左边，否则返回右边  
# 备注：若参与and运算的值不是布尔值，那Python会自动转为布尔值，然后再进行逻辑操作  
print(2 - 2 and True)  
print('' and True)  
print(True and 8 / 2)  
print(3 + 3 and 3 * 4)  
  
print('----------------------------------------------------')  
# or 逻辑或 判断其两侧的值，是否至少有一个为True  
print('--------# or 逻辑或 判断其两侧的值，是否至少有一个为True--------')  
print(True or True)  
print(True or False)  
print(False or True)  
print(False or False)  
  
# or同样具备逻辑短路的能力  
print(True or 3 / 0)  
print(9 > 3 or 3 / 0)  
# or返回的也不一定是布尔值，他返回的是参与计算的值本身  
# 规则：or会先看左边，如果左边为‘真’,就直接返回左边，否则返回右边  
# 备注：若参与or运算的值不是布尔值，那Python会自动转为布尔值，然后再进行逻辑操作  
print(7 - 2 or False)  
print('你好' or '尚硅谷')  
print(False or 8 / 2)  
print(2 - 2 or 3 * 4)  
  
print('----------------------------------------------------')  
# not 逻辑非 用于对一个值取反  
# not 的返回值一定是布尔值  
print(not True)  
print(not False)  
print(not 3 > 2)  
print(not 3 < 2)  
print(not 0)  
print(not 9 // 4)  
print(not 'abc')  
```

结果

![image-20260606224450068](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606224450068.png?lastModify=1782109450)

![image-20260606224159931](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606224159931.png?lastModify=1782109450)

![image-20260606224738100](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606224738100.png?lastModify=1782109450)

#### 2.10进制

学习

![image-20260606225328551](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606225328551.png?lastModify=1782109450)

![image-20260606225307560](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606225307560.png?lastModify=1782109450)

![image-20260606225702236](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606225702236.png?lastModify=1782109450)

![image-20260606225827463](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260606225827463.png?lastModify=1782109450)

代码

```python
# 0b开头表示二进制  
num1 = 0b11001  
# 0o开头表示八进制  
num2 = 0o1034  
# 0x开头表示十六进制  
num3 = 0x1cf  
  
# Python中所有的非十进制数字，只是代码层面的编写方式，是给程序员看的  
# Python在对上面的num1, num2, num3进行计算、打印等操作时，会自动将其转为十进制  
print(num1, num2, num3)  
print(num1 + 1)  
print(str(num2))  
print(num3 > 400)  
  
# 使用bin()将十进制转为二进制  
result1 = bin(25)  
# 使用oct()将十进制转为八进制  
result2 = oct(540)  
# 使用hex()将十进制转为十六进制  
result3 = hex(463)  
print(result1, result2, result3)  
  
# 将其他进制转为十进制数字  
# 二进制转十进制  
res1 = int('0b11001', 2)  
# 八进制转十进制  
res2 = int('0o1034', 8)  
# 十六进制转十进制  
res3 = int('0x1cf', 16)  
print(res1, res2, res3)
```
结果

![image-20260607190900402](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607190900402.png?lastModify=1782109450)

#### 2.11输入语句

学习

> # 优雅input写法  
> age = input('请输入你的年龄：')

代码
```python
print('请输入你的年龄')  
# input获得的都是字符串类型  
age = input()  
print(type(age))  
print(f'你今年的年龄是{age}')
```

结果

![image-20260607192137190](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607192137190.png?lastModify=1782109450)

#### 4.1单分支

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\062de213ff7387e1c67322dff5effd43_720.png)

![img](file:///C:\Users\行走的面包树\Documents\Tencent Files\1955976653\nt_qq\nt_data\Pic\2026-06\Ori\c1a0923d9fff813bc15a3bf4d19f668a.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\631a37ecca04632d8277da969f98fadf_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d4bc9b5353dbba89a08fb9a4524f14e7_720.png)

代码
```python
# age = 15  
age = int(input('请输入你的年龄：'))  
if age >= 18:  
    print("你是成年人")  
    print("成年人的世界，虽不容易，但很精彩！")  
print('欢迎你来学习Python')

```

结果

![image-20260607193721687](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607193721687.png?lastModify=1782109450)

![image-20260607193742425](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607193742425.png?lastModify=1782109450)

#### 4.2双分支

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\bf17673dd619c40501aa25736d4e41bd_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d4a417d7df181f4c36bd8cdfbf4f5a45_720.png)

代码
```python
age = int(input('请输入你的年龄：'))  
if age >= 18:  
    print("你是成年人")  
    print("成年人的世界，虽不容易，但很精彩！")  
else:  
    print("你是未成年人")  
    print("好好加油，努力学习，未来可期！")
```

结果

![image-20260607194123554](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607194123554.png?lastModify=1782109450)

![image-20260607194109204](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607194109204.png?lastModify=1782109450)

#### 4.3多分支

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\5f49ef7757abd392f429fb6fd1651d64_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\650c5f2ac568358954c719083f218cf6_720.png)

代码
```python
age = int(input('请输入你的年龄：'))  
if age <= 10:  
    print('你是幼儿')  
elif age <= 18:  
    print('你是青少年')  
elif age <= 30:  
    print('你是青年')  
elif age <= 50:  
    print('你是中年')  
elif age <= 60:  
    print('你是中老年')  
else:  
    print('你是老年')
```
结果

![image-20260607194900591](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607194900591.png?lastModify=1782109450)

#### 4.4嵌套分支

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\0ef7aa4d938213400b7595808d627724_720.png)

代码
```python
age = int(input('请输入你的年龄：'))  
has_report = input('你是否提交了体检报告？（是/否）')  
level = int(input('请输入你的会员等级（1/2/3）'))  
  
print('****程序的识别结果如下：****')  
if 18 <= age <= 45:  
    print('你的年龄符合比赛要求')  
    if has_report == '是':  
        print('你已提交体检报告！')  
        print('你可以参加比赛')  
        if level == 1:  
            print(f'尊敬的{level}会员，比赛结束后，您可以领取纪念T恤一件！')  
        elif level == 2:  
            print(f'尊敬的{level}会员，比赛结束后，您可以领取专业跑鞋一双！')  
        elif level == 3:  
            print(f'尊敬的{level}会员，比赛结束后，您可以领取运动耳机一副！')  
    elif has_report == '否':  
        print('你未提交体检报告，不能参加比赛')  
    else:  
        print('你输入的体检报告有误！')  
else:  
    print('抱歉，参赛年龄需要在18-45之间')
```

结果

![image-20260607200420026](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607200420026.png?lastModify=1782109450)

#### 4.5while循环

学习
![img](file:///C:\Users\行走的面包树\Documents\Tencent Files\1955976653\nt_qq\nt_data\Pic\2026-06\Ori\24418342f9ee6c7c8198976ee79e5fff.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e7793a0cf77006e0b6aad01f79a1c9fe_720.png)

代码
```python
n = 1  
while n <= 10:  
    print(f'第{n}次你好啊')  
    n += 1  
print(f'我是while循环以外的代码，执行到这里的时候，循环已经结束了，此时n是：{n}')
```

结果

![image-20260607202250971](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607202250971.png?lastModify=1782109450)

#### 4.6while循环案例

学习

> n += 1 要有 状态的覆写 或转换

代码

```python
print('你现在身处密室，需要正确回答问题之后，才能逃出密室！')  
riddle = '你是什么人？'  
answer = '你的心上人'  
guess = ''  
while guess != answer:  
    print(f'问题：{riddle}')  
    guess = input('请输入答案：')  
    if guess == answer:  
        print('答案正确，逃脱成功！')  
    else:  
        print('回答错误，请再想想！')
```
结果

![image-20260607202151136](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607202151136.png?lastModify=1782109450)

#### 4.7for循环

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\197fc371f8c1f8c456852a0868bef903_720.png)

重点：range的这个范围，区间**左闭右开**
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e6141853025abf3f273f9ba2a87b0e2b_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\dd93df19146441ffb676f9cd3460620b_720.png)

代码

```python
# 使用for循环遍历range()所指定的数字范围  
for n in range(1, 11):  
    print(f'第{n}次你好啊')  
print(f'我是for循环以外的代码，执行到这里时，循环已经结束了，此时的n是：{n}')  
  
# 使用for循环遍历字符串  
for m in 'abcdef':  
    print(m)  
  
# 展示由于误操作造成的死循环  
# 备注：for循环还能遍历很多我们没有讲到的东西，比如：元组、列表、对象...  
nums = [1, 2, 3]  
for i in nums:  
    nums.append(i)  
    print(i)
```

结果

![image-20260607204205408](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607204205408.png?lastModify=1782109450)

#### 4.8for循环案例

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\79caee677385531927cda7b8ed7d1379_720.png)

代码

```python
# 加密代码  
# text = input('请输入要加密的文字：')  
# secret = ''  
# for t in text:  
#     secret += chr(ord(t) + 1)  
# print(f'经过加密后的内容为：{secret}')  
  
# 解密代码  
secret = input('请输入要解密的文字：')  
text = ''  
for s in secret:  
    text += chr(ord(s) - 1)  
print(f'经过解密后的内容为：{text}')
```
结果

![image-20260607205522383](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607205522383.png?lastModify=1782109450)

#### 4.9对比while与for

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\32cb296a35b203488e2df81714c640c1_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7ed64025d535f20e49314edae80db3d7_720.png)

代码

```python
# for循环实现  
day = 1  
for day in range(1, 31):  
    print(f'*********第{day}天*********')  
    for group in range(1, 4):  
        print(f'这是第{group}组仰卧起坐')  
    print(f'第{day}天任务已完成！明天继续！')  
print(f'为期{day}天的健身计划完成，我的腹肌在闪闪发光！')  
  
# while循环实现  
day = 1  
while day <= 30:  
    print(f'*************第{day}天***************')  
    group = 1  
    while group <= 3:  
        print(f'这是第{group}组仰卧起坐')  
        group += 1  
    print(f'第{day}天任务已完成！明天继续！\n')  
    day += 1  
print(f'为期{day - 1}天的健身计划完成，我的腹肌在闪闪发光！')
```
结果

![image-20260607211145761](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607211145761.png?lastModify=1782109450)

#### 4.10 九九乘法表

代码
```python
print('你好', end='!')  
print('尚硅谷', end='@')  
print('\n')  
  
print('你好', end='')  
print('尚硅谷', end='')  
print('\n')  
  
for i in range(1, 10):  
    print('\n')  
    for j in range(1, i + 1):  
        print(f'{i}*{j}={i * j}', end=' ')
```
结果

![image-20260607213024639](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607213024639.png?lastModify=1782109450)

#### 4.11 continue与break

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\701f6dad6266a99cf96c7acfe00c7b10_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\abb0c700f77882ddaacd380948af759f_720.png)

代码
```python
# 测试 continue  
# for day in range(1, 5):  
#     print(f'*********第{day}天**********')  
#     print('吃饭')  
#     continue  
#     print('睡觉')  
​  
# for day in range(1, 5):  
#     print(f'*********第{day}天**********')  
#     print('吃饭')  
#     if day == 2:  
#         continue  
#     print('睡觉')  
​  
# for day in range(1, 5):  
#     if day == 2:  
#         continue  
#     print(f'*********第{day}天**********')  
#     print('吃饭')  
#     print('睡觉')  
​  
# for day in range(1, 5):  
#     print(f'*********第{day}天**********')  
#     print('吃饭')  
#     for item in range(1, 3):  
#         print(f'面包{item}')  
#         if day == 4 and item == 2:  
#             continue  
#         print(f'牛奶{item}')  
#     print('睡觉')  
​  
# 测试 break  
for day in range(1, 5):  
    print(f'*********第{day}天**********')  
    print('吃饭')  
    for item in range(1, 3):  
        print(f'面包{item}')  
        if item == 2:  
            break  
        print(f'牛奶{item}')  
    print('睡觉')
```
结果

![image-20260607215318905](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607215318905.png?lastModify=1782109450)

#### 4.12综合案例

代码

```python
print('欢迎来到：答案闯关挑战赛（输入q可随时退出）', end='\n')  
count = 0  
flag = False  
​  
# 题目与答案  
ques1, ans1 = 'Python中用于输出的函数是?', 'print'  
ques2, ans2 = 'Python中用于表示逻辑“并且”的关键字是?', 'and'  
ques3, ans3 = 'Python属于编译型还是解释型?', '解释型'  
​  
# 依旧定义变量  
# 最多可尝试次数  
max_tries = 3  
# 总关卡数  
total_levels = 3  
# 是否处于可游戏状态  
is_playing = True  
​  
# 根据题目数量开始循环  
for level in range(1, total_levels + 1):  
    # 打印当前是第几关  
    print(f'*********第{level}关*********')  
    # 取出当前关卡所对应的题目和答案  
    if level == 1:  
        question, answer = ques1, ans1  
    elif level == 2:  
        question, answer = ques2, ans2  
    else:  
        question, answer = ques3, ans3  
​  
    tries = 1  
    while tries <= max_tries:  
        # 向用户提问  
        user_input = input(question)  
        # 根据用户的输入，来决定做什么  
        if user_input == answer:  
            print('回答正确！ \n')  
            break  
        elif user_input == '':  
            print('您的输入为空，请重新作答！\n')  
            continue  
        elif user_input == 'q':  
            is_playing = False  
            print('您已退出游戏！ \n')  
            break  
        else:  
            # 计算剩余次数  
            leave = max_tries - tries  
            # 判断是否还有剩余次数  
            if leave > 0:  
                tries += 1  
                print(f'回答错误，您还剩{leave}次机会！ \n')  
                continue  
            else:  
                print(f'挑战失败，本题的正确答案是：{answer},游戏结束！')  
                is_playing = False  
                break  
​  
    if not is_playing:  
        break  
# 通关逻辑  
if is_playing:  
    print('恭喜您！全部通关！')
```
结果

![image-20260607224151967](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260607224151967.png?lastModify=1782109450)

#### 5.1函数-基本使用

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\03fb2946afd6f9fe3200e8ef2a9bb295_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\ce962fc95269337e552278307377b173_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\4455cc567a06d488335b1724cb5d5a7c_720.png)

内置函数：[https://docs.python.org/zh-cn/3.13/library/functions.html](https://docs.python.org/zh-cn/3.13/library/functions.html)

模块：[https://docs.python.org/zh-cn/3.13/py-modindex.html](https://docs.python.org/zh-cn/3.13/py-modindex.html)
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7dc840160b99146acf04281d503016d2_720.png)

代码
```python
# 定义函数  
def welcome():  
    print('Welcome to Python!')  
  
  
# 调用函数（让函数中的代码运行起来）  
welcome()
```

结果

![image-20260609103228844](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260609103228844.png?lastModify=1782109450)

#### 5.2参数使用（位置参数，关键字参数）

学习

位置参数
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\ee3bff91467c5d97ea677d1dabe049fc_720.png)

关键字参数
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\57e8436f19036bb3d74bcda912783fb0_720.png)

代码

```python
def order(num, dish):  
    print(f'您点的是：{num}份{dish}')  
    print(f'{dish}可是很好吃的！')  
    print(f'你只点了{num}份，够吃吗？')  
  
  
order(1, '辣椒炒肉')  
order(2, '辣子鸡')  
# order(3)  
# order(4,'宫保鸡丁',7)
```

结果

![image-20260609103721083](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260609103721083.png?lastModify=1782109450)

#### 5.6限制传参
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\bbd512eb163ce4fe616cb9b6727b0863_720.png)

```python
# 定义函数（使用/和*限制传参方式）  
def greet(name, /, gender, *, age, height):  
    print(f'我叫{name},性别{gender},年龄是{age},身高是{height}cm')  
  
  
# 正确示例  
greet('张三', '男', age=18, height=172)  
greet('张三', gender='男', age=18, height=172)  
  
# 错误示例  
greet(name='张三', gender='男', age=18, height=172)  
  
# 错误示例  
# def greet1(name, *, gender, /, age, height):  
#     print(f'我叫{name},性别{gender},年龄是{age},身高是{height}cm')
```

![image-20260610193432544](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610193432544.png?lastModify=1782109450)

#### 5.7参数默认值
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\a35dd99e9b0b7772f93539f39fff30dd_720.png)

**注意：默认参数必须要放在必选参数的后面，或者说：某个形参，一旦设置了默认值，那他后面的所有形参，也必须要写默认值！**
```python
# 定义函数（设置参数默认值）  
def greet(name, gender, age, height, msg='你好'):  
    print(f'我叫{name},性别{gender},年龄{age},身高{height}cm')  
    print(f'我想说：{msg}')  
  
  
# 调用函数  
greet('张三', '男', 18, 172)  
greet('张三', '男', 18, 172, 'hello')  
greet('张三', '男', 18, 172, msg='hello ya')  
  
# 错误显示  
# def greet1(name, gender, age, msg='你好', height):  
#     print(f'我叫{name},性别{gender},年龄{age},身高{height}cm')  
#     print(f'我想说：{msg}')  
  
  
# 实例 print函数底层给end参数设置了默认值  
# 即使后面不写 会自动填上一个 '\n' 的默认值  
print('尚硅谷')  
# 写了其他的会覆写  
print('尚硅谷', end='!!!')
```

![image-20260610204033723](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610204033723.png?lastModify=1782109450)

#### 5.8可变参数

可变位置参数
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\5546faf9618b86d366e0e57cbb984935_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\95f7d269579eef93082225efb03bf807_720.png)

可变关键字参数
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7a92cc82ce664f786a7bb7e165259678_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\8c540fff10b1f956e039f79e4326c3eb_720.png)

**注意点1：**

可变位置参数、可变关键字参数，可以同时使用，但必须先写可变位置参数
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\3d062f02127c245019bd1de05f4fcb86_720.png)

**注意点2：**

可变位置参数、可变关键字参数，也能与其他类型的参数一起使用
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\c36a5554143cf50009f7df04599867b8_720.png)
```python
# 定义函数（使用*args去接收：可变位置参数）  
def test1(*args):  
    # 此处args的值，是一种新的数据类型，叫：元组  
    print(args)  
​  
​  
# 调用函数  
test1('张三', '男', 18, 172)  
​  
​  
# 只能把位置参数交给args，关键字参数不行  
# test1('张三', '男', age=18, height=172)  
​  
​  
# 定义函数（使用 **kwargs去接收：可变关键字参数）  
def test2(**kwargs):  
    # 此处kwargs的值，是一种新的数据类型，叫：字典  
    print(kwargs)  
​  
​  
# 调用函数  
test2(name='张三', gender='男', age=18, height=172)  
​  
​  
# 定义函数（同时使用：可变位置参数、可变关键字参数）  
def test3(a, b, *args, c='尚硅谷', **kwargs):  
    print('@@@@@@@@@@@@@@@@@@@@@')  
    print(a)  
    print(b)  
    print(c)  
    print(args)  
    print(kwargs)  
​  
​  
# 调用函数  
test3('抽烟', '喝酒', '张三', '男', c='atguigu', age=18, height=172)
```

![image-20260610213804350](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610213804350.png?lastModify=1782109450)

#### 5.9特殊的字面量none

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\a2b1b51132cd43f25c313e1c28a15007_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\b4aef574aeb04b75128b97c506de885e_720.png)

代码

```python
# None是一个特殊的字面量，他表示：空值/无值/无意义  
msg = None  
​  
# None的类型是 NoneType  
print(type(msg))  
​  
# Node转为布尔值是False  
print(bool(msg))  
if not msg:  
    print('你好')  
​  
# 不能参与数学运算，也不能与字符串拼接  
result1 = msg + 'hello'  
print(result1)
```

结果

![image-20260610221355740](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610221355740.png?lastModify=1782109450)

#### 5.10函数返回值

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\b172afd09aa056d375eded31771df8a7_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7a11930911c1c5ba87a43bbaeed6f193_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\479a97553edf49c00c05b546943c341a_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\8ce35bf3d0ef57786e7908ee3f70b946_720.png)

就算不写return的返回值，最后函数也会含有return值

如果一个函数返回值是None，我们也经常说这个函数没有返回值

代码
```python
# 定义函数  
def add(n1, n2):  
    print(f'我收到了：{n1}、{n2},二者相加是：{n1 + n2}')  
    answer = n1 + n2  
    return answer  
  
  
# 调用函数  
result = add(100, 200)  
print(result)  
  
res = print('hello')  
print(res)  
print(type(res))
```
结果

![image-20260610223802786](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610223802786.png?lastModify=1782109450)

#### 5.11全局/局部作用域

**学习**
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\9ec4e79c8e98de6c891796b8bcd58e8e_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\ff620e2550e861061f92402a18ce19d9_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\c6fb3e9b4b89433d2b9775c3976b9b77_720.png)

#声明a是全局变量

修改局部变量为全局变量 global a

细节

**代码**

```python
# 全局作用域 与 局部作用域，以及global的使用  
a = 100  
b = 200  
  
  
def test():  
    # 局部转全局  
    # global a  
    a = 300  
    c = '尚硅谷'  
    d = '你好啊'  
    print('函数打印a', a)  
    print('函数打印b', b)  
    print('函数打印c', c)  
    print('函数打印d', d)  
  
  
test()  
print("*************************")  
print('全局打印a', a)  
print('全局打印b', b)  
  
# 局部报错  
# print(c)  
# print(d)
```

**结果**

![image-20260610225250059](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610225250059.png?lastModify=1782109450)

加上global

![image-20260610225337756](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610225337756.png?lastModify=1782109450)

全局作用域和全局变量，会在程序开始时创建，在程序结束后销毁
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\c2fe511e154203933a16293671decc22_720.png)
```python
# 全局作用域 与 局部作用域，以及global的使用  
a = 100  
b = 200  
​  
​  
def test():  
    # 局部转全局  
    global a  
    a = 300  
    c = '尚硅谷'  
    d = '你好啊'  
    print('函数打印a', a)  
    print('函数打印b', b)  
    print('函数打印c', c)  
    print('函数打印d', d)  
​  
​  
test()  
print("*************************")  
print('全局打印a', a)  
print('全局打印b', b)  
​  
# 局部报错  
# print(c)  
# print(d)  
​  
# 局部作用域和局部变量，会在函数调用时创建，在函数执行结束后自动销毁  
# def test2():  
#     m = 100  
#     m += 1  
#     print(f'我是test2函数中打印的m:{m}')  
#  
# test2()  
# test2()  
​  
n = 100  
​  
​  
def test3():  
    global n  
    n += 1  
    print(f'我是test3函数中打印的n:{n}')  
​  
​  
test3()  
test3()  
test3()  
print(n)  
```

![image-20260610231541635](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260610231541635.png?lastModify=1782109450)

#### 5.12函数_嵌套调用

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\0ab6c80112bb747f99ad9131566c63a8_720.png)

主要看压栈的过程
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d0f64ce58550eacf2e02347616551926_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7e8751b1b3afd02b917f8b37bb23203a_720.png)

代码
```python
# 函数嵌套调用测试1  
def greet(name, msg):  
    print(f'我叫{name},我想说的话在下面：')  
    speak(msg)  
    print('嗯，我想说的结束了')  
  
  
def speak(msg):  
    print('-------------')  
    print(msg)  
    print('-------------')  
  
  
greet('张三', '你好啊')

# 函数嵌套调用测试1  
def greet(name, msg):  
    print(f'我叫{name},我想说的话在下面：')  
    speak(msg)  
    print('嗯，我想说的结束了')  
  
  
def speak(msg):  
    print('-------------')  
    print(msg)  
    print('-------------')  
  
  
greet('张三', '你好啊')  
  
  
# 函数嵌套调用测试2  
def test1():  
    print('进入test1函数')  
    test2()  
    print('退出test1函数')  
  
  
def test2():  
    print('进入test2函数')  
    test3()  
    print('退出test2函数')  
  
  
def test3():  
    print('进入test3函数')  
    print('***正在执行 test3 函数***')  
    print('退出test3函数')  
  
test1()  

```
结果

![image-20260611093930829](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611093930829.png?lastModify=1782109450)

![image-20260611094939864](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611094939864.png?lastModify=1782109450)

#### 5.13函数_递归调用

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\b55f0c266ce85935354378f7ef402fd5_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\cbd63fd07ffdce17a16b0f9ef9863d16_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\0b5ae47320cd9525396ae01f90ce4191_720.png)

代码
```python
# 使用递归打印n次‘你好啊’(从大到小)  
def welcome(n):  
    print(f'你好啊{n}')  
    if n > 1:  
        welcome(n - 1)  
  
  
# 调用函数  
welcome(5)  
print('-------------')  
  
  
# 使用递归打印n次‘你好啊’（从小到大）  
def welcome(n):  
    if n > 1:  
        welcome(n - 1)  
    print(f'你好啊{n}')  
  
  
# 调用函数  
welcome(5)
```

结果

![image-20260611100557264](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611100557264.png?lastModify=1782109450)

#### 5.14函数_递归的应用

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\4c35375f97d74ca0f504e2471032e3da_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e66fcbe4e16c59fa57ac2804be64729c_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\f12ed42681a8bcfbe5796cce93e69146_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e22e30dd17c7138cfd86b2d4d96a3662_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\f7d3fb6f894a3f4b38a28ed4356b1e60_720.png)

代码
```python
# 使用递归求阶乘  
def factorial(num):  
    if num == 1:  
        return 1  
    else:  
        return num * factorial(num - 1)  
  
  
result = factorial(5)  
print(result)
```

结果

![image-20260611101943769](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611101943769.png?lastModify=1782109450)

#### 5.15函数_说明文档

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\f01c9f28ae1a0abe91a8a0c4e31073d0_720.png)

代码
```python
def add(n1, n2):  
    """  
    计算两个数相加的结果  
    :param n1: 第1个数  
    :param n2: 第2个数  
    :return:  
    """  
    return n1 + n2  
  
  
result = add(1, 2)  
print(result)
```

结果

#### 5.16函数_综合案例

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\38b423679e22211c804d4a23f6a775c0_720.png)

代码
```python
def calc_total(*nums):  
    return sum(nums)  
  
  
def calc_avg(total, days=7):  
    return total / days  
  
  
def check_success(total, goal=120):  
    if total >= goal:  
        return '恭喜！挑战成功！'  
    else:  
        return '抱歉！挑战失败！'  
  
  
def main(title, duration):  
    print(f'{title}{duration}天挑战赛（请输入每天的数量）')  
    num1 = int(input('第1天：'))  
    num2 = int(input('第2天：'))  
    num3 = int(input('第3天：'))  
    num4 = int(input('第4天：'))  
    num5 = int(input('第5天：'))  
    num6 = int(input('第6天：'))  
    num7 = int(input('第7天：'))  
  
    # 计算总数  
    total = calc_total(num1, num2, num3, num4, num5, num6, num7)  
    # 计算平均值  
    avg = calc_avg(total)  
    # 判断挑战是否成功  
    result = check_success(total)  
    # 打印相关信息  
    print(f'{title}{duration}天健身总结')  
    print(f'总数：{total},平均值：{avg:.1f}')  
    print(result)  
  
  
main('仰卧起坐', 7)
```

结果

![image-20260611155455875](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611155455875.png?lastModify=1782109450)

#### 5.17何为数据容器

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d113be6a25bdd245a91f2937faa931d3_720.png)

#### 6.1定义列表

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7fd1b06d887931d7cb5e48f5817c8d37_720.png)

代码
```python
# 定义有内容的列表  
list1 = [34, 56, 21, 56, 11]  
list2 = ['北京', '尚硅谷', '你好啊']  
list3 = [23, '尚硅谷', True, None]  
list4 = [23, '尚硅谷', True, None, [100, 200, 300]]  
# 定义空列表（列表中的数据，后期会通过特定写法填充）  
list5 = []  
list6 = list()  
  
print(list1, type(list1))  
print(list2, type(list2))  
print(list3, type(list3))  
print(list4, type(list4))

```

结果

![image-20260611163640623](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611163640623.png?lastModify=1782109450)

#### 6.2列表下标

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\75e629c170cc926506699eba231d27cb_720.png)

代码

```python
# 定义一个列表  
nums = [10, 20, 30, 40, 50]  
  
# 测试正索引  
print(nums[0])  
print(nums[1])  
print(nums[2])  
print(nums[3])  
print(nums[4])  
print('----------------------------------')  
# 测试负索引  
print(nums[-1])  
print(nums[-2])  
print(nums[-3])  
print(nums[-4])  
print(nums[-5])  
print('----------------------------------')  
# 测试错误索引  
# print(nums[5])  
  
# 定义一个嵌套列表  
nums2 = [10, 20, ['你好啊', '尚硅谷'], 40, 50]  
# 取出尚硅谷  
print(nums2[2][1])
```
结果

![image-20260611165649014](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611165649014.png?lastModify=1782109450)

#### 6.3列表增删改查

**新增**

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\7c6b5919d0bff04335d201e8db51b94f_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\8944782629a33dd74e0a24ef73a5c8aa_720.png)

代码
```python
# 新增操作  
# 方式一：通过列表的append方法，在列表的尾部追加一个元素  
nums = [10, 20, 30, 40]  
nums.append(50)  
  
# 方式二：通过列表的insert方法，在列表的指定下标处添加一个元素  
nums = [10, 20, 30, 40]  
nums.insert(2, 666)  
print(nums)  
  
# 方式三：通过列表的extend方法，将可迭代对象中的内容依次取出，追加到列表尾部  
nums = [10, 20, 30, 40]  
nums.extend('尚硅谷')  
nums.extend(range(1, 4))  
nums.extend([70, 80, 90])  
print(nums)
```

结果

![image-20260611193207547](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611193207547.png?lastModify=1782109450)

**删除**

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\5fa95a828c253bd7503d71ef479ac1bf_720.png)

代码
```python
# 删除操作  
# 方式一：通过列表的pop方法，删除指定位置的元素，并返回该元素  
nums = [10, 20, 10, 40, 50]  
result = nums.pop(1)  
print(nums)  
print(result)  
  
# 方式二：通过列表的remove方法，删除列表中第一次出现的指定值  
nums = [10, 20, 10, 40, 50]  
nums.remove(10)  
print(nums)  
  
# 方式三：通过列表的clear方法，删除列表中所有的元素（清空列表）  
nums = [10, 20, 10, 40, 50]  
nums.clear()  
print(nums)  
  
# 方式四：通过del关键字，删除指定元素  
nums = [10, 20, 10, 40, 50]  
del nums[3]  
print(nums)

```

结果

![image-20260611194638616](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611194638616.png?lastModify=1782109450)

**修改**

学习
![img](file:///C:\Users\行走的面包树\Documents\Tencent Files\1955976653\nt_qq\nt_data\Pic\2026-06\Ori\bbbfd00f061f1628c71b317a26f7520c.png)

代码

```python
# 修改操作  
nums = [10, 20, 10, 40, 50]  
nums[2] = 66  
print(nums)
```

结果

![image-20260611195122701](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611195122701.png?lastModify=1782109450)

**查询**

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d5d8eae9aaac0f3c25983400e0ed7e88_720.png)

代码

```python
# 查询操作  
nums = [10, 20, 10, 40, 50]  
print(nums[3])
```

结果

![image-20260611195757633](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611195757633.png?lastModify=1782109450)

#### 6.4列表常用方法

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\5ac5fe72576f63ad117bb2754a5960ef_720.png)

代码
```python
# 1.使用index方法，查找指定元素在列表中第一次出现的下标，返回值是:元素下标  
fruits = ['香蕉', '苹果', '橙子', '香蕉']  
result = fruits.index('苹果')  
print(result)  
​  
# 2.使用count方法，统计某个元素在列表中出现的次数，返回值是：元素出现的次数 （不包含嵌套元素）  
nums = [10, 20, 10, 30, 10, 40, [10, 10, 10]]  
result = nums.count(66)  
print(result)  
​  
# 3.使用reverse方法，对列表进行反转（会改变原列表）  
nums = [23, 11, 32, 30, 17, [6, 7, 8, 9]]  
nums.reverse()  
print(nums)  
​  
# 4.使用sort方法，对列表排序（默认从小到大），若想从大到小，可以将reverse参数设为True  
# 4.1 若列表中的元素：都是数字，则按照数字的大小顺序进行排序  
nums = [23, 11, 32, 30, 17]  
nums.sort(reverse=True)  
print(nums)  
​  
# 4.2 若列表中的元素：既有数字又有字符串，那就会报错  
# nums = [23, 11, 32, 30, 17, '尚硅谷']  
# nums.sort()  
# print(nums)  
​  
# 4.3 若列表中的元素：都是字符串，则按照字符串的 Unicode 编码大小进行排序  
msg_list = ['北京', '北硅谷', '北好']  
msg_list.sort()  
print(msg_list)  
print(ord('京'), ord('好'), ord('硅'))  
​  
# 所有的列表方法，都只作用于当前层的元素（浅层）不会自动进入嵌套的里层结构中
```

结果

![image-20260611202816570](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611202816570.png?lastModify=1782109450)

总结
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\aaf78c33939a7039f6a2968f96c1978e_720.png)

#### 6.5列表常用内置函数

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\518f29c3b3e076375345b73d5d06bdda_720.png)

代码
```python
# 1. 使用内置的sorted函数，返回一个排序后的新容器（不改变原容器，默认顺序：从小到大）  
# 1.1 若列容器中的元素：都是数字，则按照数字的大小顺序进行排序  
nums = [23, 11, 32, 30, 17]  
# 默认从小到大，加关键字从大到小  
result = sorted(nums, reverse=True)  
print(nums)  
print(result)  
​  
# 1.2 若列容器中的元素：既有数字，又有字符串，那就会报错  
# nums = [23, 11, 32, 30, 17, '尚硅谷']  
sorted(nums)  
​  
# 1.3 若列容器中的元素：都是字符串，则按字符串的Unicode编码大小进行排序  
msg_list = ['北京', '尚硅谷', '你好']  
result = sorted(msg_list)  
print(msg_list)  
print(result)  
​  
# 2.使用内置的len函数，获取容器中元素的总数量，返回值是：元素总数量  
nums = [10, 20, 10, 30, 10, 40, [50, 60, 70]]  
result = len(nums)  
print(result)  
​  
# 3.使用内置的max函数，获取容器中的最大值，返回值是：最大值  
# 3.1 若容器中的元素：都是数字，那max返回的是最大的数  
nums = [23, 11, 32, 30, 17]  
result = max(nums)  
print(nums)  
print(result)  
​  
# 3.2 若容器中的元素：既有数字，又有字符串，那就会报错  
# nums = [23, 11, 32, 30, 17, '尚硅谷']  
# max(nums)  
​  
# 3.3 若容器中的元素：都是字符串，则按字符串的Unicode编码大小进行排序  
msg_list = ['北京', '尚硅谷', '你好']  
result = max(msg_list)  
print(msg_list)  
print(result)  
​  
# 3.4 max函数也可以接收多个值，并筛选出最大值  
result = max(33, 45, 12, 78, 99)  
print(result)  
​  
# 4.使用内置的min函数，获取容器中的最小值，返回值是：最小值  
# 备注：min函数的使用方式与注意点与max函数一样,只不过min函数返回的是最小值  
nums = [23, 11, 32, 30, 17]  
result = min(nums)  
print(nums)  
print(result)  
​  
# 5.使用内置的sum函数，对容器中的数据进行求和（元素只能是数值）  
nums = [10, 20, 30, 40, 50]  
result = sum(nums)  
print(result)
```

结果

![image-20260611211149652](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611211149652.png?lastModify=1782109450)

#### 6.6列表循环遍历

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d2c7e55fa8876e0ebfb39fcc806b944a_720.png)

代码
```python
# 定义一个成绩列表  
score_list = [62, 50, 60, 48, 80, 20, 95]  
​  
# 使用while循环遍历列表  
index = 0  
while index < len(score_list):  
    print(score_list[index])  
    index += 1  
​  
for item in score_list:  
    print(item)  
​  
for index in range(len(score_list)):  
    print(score_list[index])  
​  
for index, item in enumerate(score_list):  
    print(index, item)  
​  
# 使用for循环遍历列表  
for item in score_list:  
    print(item)  
​  
# 使用for循环遍历列表（通过range函数和len函数按照索引遍历）  
for index in range(len(score_list)):  
    print(index)  
​  
# 使用 for循环遍历列表（通过enumerate函数，同时获取下标（索引值）和元素）  
for index, item in enumerate(score_list, start=5):  
    print(index, item, score_list[0])  
print('最后的打印', score_list[0])

```

结果

![image-20260611213611017](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611213611017.png?lastModify=1782109450)

#### 6.7列表小练习

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\35d63a26d24ef84a525df7f662c94ff0_720.png)

代码
```python
print('请输入学生成绩，输入"结束"停止录入')  
score_list = []  
​  
# 持续循环，让用户输入学生成绩  
while True:  
    data = input('请输入成绩：')  
    if data == '结束':  
        break  
    else:  
        score_list.append(int(data))  
​  
# 如果score_list中有数据，则开始统计  
if score_list:  
    # 统计平均分  
    avg = sum(score_list) / len(score_list)  
    # 合适人数  
    pass_count = 0  
    # 优秀人数  
    excellent_count = 0  
    # 遍历列表，开始统计  
    for item in score_list:  
        if item >= 60:  
            pass_count += 1  
        if item >= 90:  
            excellent_count += 1  
    # 合格率  
    pass_rate = pass_count / len(score_list) * 100  
    # 优秀率  
    excellent_rate = excellent_count / len(score_list) * 100  
    # 打印信息  
    print('***********统计信息如下*************')  
    print(f'总人数为：{len(score_list)}')  
    print(f'最高分为：{max(score_list)}')  
    print(f'最低分为：{min(score_list)}')  
    print(f'合格人数：{pass_count}人')  
    print(f'合格率：{pass_rate:.1f}%')  
    print(f'优秀人数:{excellent_count}人')  
    print(f'优秀率为：:{excellent_rate:.1f}%')  
    print(f'平均分数：{avg:.1f}')  
else:  
    print('你没有输入任何成绩！')
```

结果

![image-20260611215534254](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260611215534254.png?lastModify=1782109450)

#### 6.8列表总结

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\a3cc59bdff8fb9cdf9c09019d15ab21c_720.png)

#### 6.9元组

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e186b6d305d43da79145a55d0fe23e85_720.png)

注意1：**元组中的元素不可修改**
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\5f6fe718cead3e49d40c8b15bc7470bb_720.png)

<img src="file:///C:\Users\行走的面包树\Documents\Tencent Files\1955976653\nt_qq\nt_data\Pic\2026-06\Ori\e11411e767c826ee49dd721bd9b633a7.png" alt="img" style="zoom:67%;" />

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\2c75aa23d46d437f89c0e736bc051738_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\d30eba63621b8f7a1d85e6cd9fc9eaba_720.png)

代码
```python
# 定义元组  
​  
t1 = (28, 67, 21, 67, 11)  
t2 = ('北京', '尚硅谷', '你好')  
t3 = (100, True, '你好', None)  
t4 = (100, True, '你好', None, (50, 60, 70))  
​  
print(type(t1), t1)  
print(type(t2), t2)  
print(type(t3), t3)  
print(type(t4), t4)  
​  
# 元组的下标  
t1 = (28, 67, 21, 67, 11)  
print(t1[3])  
print(t1[-1])  
​  
# 元组中如果存放了可变类型（列表），那可变类型中的内容仍可修改  
t2 = (28, 67, 21, 67, 11, [100, 200, 300, ('你好', '尚硅谷')])  
​  
# t2[5] = 400  
​  
# 改只能改可变类型里面对应的元素  
t2[5][2] = 400  
print(t2)  
​  
# t2[5][3][0] = 'hello'  
​  
# 元组中的元素不可修改  
t1 = (28, 67, 21, 67, 11)  
# t1[0] = 100  
​  
# 定义空元组  
t3 = ()  
t4 = tuple()  
print(type(t3), t3)  
print(type(t4), t4)  
​  
# 定义只有一个元素的元组  
t5 = ('你好',)  
t6 = (18,)  
print(type(t5), t5)  
print(type(t6), t6)  
​  
# 常用方法  
# index方法：获取指定元素在元组中第一次出现的下标  
t7 = (28, 67, 21, 67, 11)  
result7 = t1.index(67)  
print(result7)  
​  
# count方法：统计指定元素在元组中出现的次数  
t8 = (28, 67, 21, 67, 11)  
result8 = t1.count(67)  
print(result8)  
​  
# max函数，返回元组中的最大值  
t9 = (23, 11, 32, 30, 17)  
res9 = max(t9)  
print(res9)  
​  
# min函数，返回元组中的最小值  
t10 = (23, 11, 32, 30, 17)  
res10 = max(t10)  
print(res10)  
​  
# len函数，返回元组中元素的个数（元组长度）  
t11 = (23, 11, 32, 30, 17)  
res11 = len(t11)  
print(res11)  
​  
# sorted函数，对元组进行排序（不修改元组，返回一个新的列表）  
t12 = (23, 11, 32, 30, 17)  
res12 = sorted(t12)  
# 返回的是列表  
print(res12)  
# 返回的是元组  
print(tuple(res12))  
​  
# sum函数，统计元组中所有元素的和（元素必须是数字）  
t13 = (23, 11, 32, 30, 17)  
res = sum(t13)  
print(res)
```

结果

![image-20260612101306446](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612101306446.png?lastModify=1782109450)

#### 7.0函数_解包列表或元素传参

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\1a43e04a6abcb5411b2d38c026738481_720.png)

代码
```python
# 定义函数时，使用 *args,将收到的多个参数，打包成一个元组  
def test(*args):  
    print(f'我是test函数，我收到的参数是：{args},参数类型是：{type(args)}')  
  
  
list1 = [100, 200, 300, 400]  
tuple1 = ('你好', '北京', '尚硅谷')  
  
# 函数调用时，正常传递：列表 或 元组  
test(list1)  
# test(tuple1)  
  
# 函数调用时，使用*对：列表或元组进行解包后，再传递参数  
test(*list1)  # 此种写法相当于：test(100, 200, 300, 400)  
test(*tuple1)  # 此种写法相当于：test('你好', '北京', '尚硅谷')
```

结果

![image-20260612105308462](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612105308462.png?lastModify=1782109450)

#### 7.1元组

学习

代码
```python
# 定义元组  
​  
t1 = (28, 67, 21, 67, 11)  
t2 = ('北京', '尚硅谷', '你好')  
t3 = (100, True, '你好', None)  
t4 = (100, True, '你好', None, (50, 60, 70))  
​  
print(type(t1), t1)  
print(type(t2), t2)  
print(type(t3), t3)  
print(type(t4), t4)  
​  
# 元组的下标  
t1 = (28, 67, 21, 67, 11)  
print(t1[3])  
print(t1[-1])  
​  
# 元组中如果存放了可变类型（列表），那可变类型中的内容仍可修改  
t2 = (28, 67, 21, 67, 11, [100, 200, 300, ('你好', '尚硅谷')])  
​  
# t2[5] = 400  
​  
# 改只能改可变类型里面对应的元素  
t2[5][2] = 400  
print(t2)  
​  
# t2[5][3][0] = 'hello'  
​  
# 元组中的元素不可修改  
t1 = (28, 67, 21, 67, 11)  
# t1[0] = 100  
​  
# 定义空元组  
t3 = ()  
t4 = tuple()  
print(type(t3), t3)  
print(type(t4), t4)  
​  
# 定义只有一个元素的元组  
t5 = ('你好',)  
t6 = (18,)  
print(type(t5), t5)  
print(type(t6), t6)  
​  
# 常用方法  
# index方法：获取指定元素在元组中第一次出现的下标  
t7 = (28, 67, 21, 67, 11)  
result7 = t1.index(67)  
print(result7)  
​  
# count方法：统计指定元素在元组中出现的次数  
t8 = (28, 67, 21, 67, 11)  
result8 = t1.count(67)  
print(result8)  
​  
# max函数，返回元组中的最大值  
t9 = (23, 11, 32, 30, 17)  
res9 = max(t9)  
print(res9)  
​  
# min函数，返回元组中的最小值  
t10 = (23, 11, 32, 30, 17)  
res10 = max(t10)  
print(res10)  
​  
# len函数，返回元组中元素的个数（元组长度）  
t11 = (23, 11, 32, 30, 17)  
res11 = len(t11)  
print(res11)  
​  
# sorted函数，对元组进行排序（不修改元组，返回一个新的列表）  
t12 = (23, 11, 32, 30, 17)  
res12 = sorted(t12)  
# 返回的是列表  
print(res12)  
# 返回的是元组  
print(tuple(res12))  
​  
# sum函数，统计元组中所有元素的和（元素必须是数字）  
t13 = (23, 11, 32, 30, 17)  
res = sum(t13)  
print(res)  
​  
​  
# 实际开发中的元组，不一定是我们自己定义的，比如函数的可变参数*args就是一个元组  
def demo(*args):  
    return sum(args)  
​  
​  
result = demo(100, 200, 300)  
print(result)  
​  
# 元组的循环遍历  
t1 = (23, 11, 32, 30, 17)  
​  
# while循环遍历  
index = 0  
while index < len(t1):  
    print(t1[index])  
    index += 1  
​  
print('----------')  
# for循环遍历  
for item in t1:  
    print(item)
```

结果

![image-20260612105420569](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612105420569.png?lastModify=1782109450)

#### 7.2字符串

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\26009b7fd34b3f544d3629893b8eaa26_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\9b0daa01456b655ba39d8bd2340e1485_720.png)

代码
```python
字符串基本操作

# 字符串的下标  
msg = 'welcome to atguigu'  
print(msg[3])  
print(msg[-1])  
​  
# 字符串中的字符，不可修改  
msg = 'welcome to atguigu'  
msg[0] = 'a'  
​  
# 字符串不能嵌套  
# msg = 'welcome to"hello" atguigu'  
msg = 'welcome to\'hello\' atguigu'  
print(msg[11])

字符串常用方法

# 常用方法  
msgs = 'welcome to atguigu'  
result = msgs.index('t')  
print(result)  
​  
# split方法：将字符串按照指定字符进行分隔，并将分隔后的内容存入一个列表  
# msg1 = '尚硅谷@atguigu@你好'  
# result = msg.index('@')  
# print(msg1)  
# print(result)  
​  
# replace方法：将字符串中的某个字符片段，替换成目标字符串（不修改原字符串，返回新字符串）  
# msg = 'welcome to atguigu'  
# result = msg.replace('g', 'G')  
# print(msg)  
# print(result)  
​  
# count方法：统计指定字符，在字符串中出现的次数  
miss = 'welcome to atguigu'  
result = miss.count('g')  
print(result)

字符串strip方法

# strip方法：从某个字符串中删除指定字符串中的任意字符  
# 规则：从字符串两端快开始删除，直到遇到第一个不在指定字符串中的字符就停下  
message = '666尚6硅6谷666'  
result = message.strip('6')  
print(result)  
​  
message = '1234尚12硅34谷4321'  
result = message.strip('1324')  
print(message)  
print(result)  
​  
msg3 = '34215尚12硅34谷4132'  
result = msg.count('5432')  
print(msg3)  
print(result)  
​  
msg4 = '  尚硅谷  '  
result = msg4.strip()  
print(msg4)  
print(result)
```
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\fb377f5098c50e4ec47a98ca9ad77965_720.png)
```
msg6 = 'welcome to atguigu'  
result = len(msg6)  
print(result)  
​  
# 常用内置函数  
# len函数：统计字符串中字符的个数（字符串长度）  
msg = 'welcome to atguigu'  
result = len(msg)  
print(result)  
​  
# 字符串的循环遍历  
msg = 'welcome to atguigu'  
# while循环遍历  
index = 0  
while index < len(msg):  
    print(msg[index])  
    index += 1  
​  
print('-------------')  
​  
# for循环遍历  
for item in msg:  
    print(item)

```
结果

![image-20260612151303523](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612151303523.png?lastModify=1782109450)

#### 7.3序列的切片操作

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e56548d8fa271522a3dace3120b5b4d9_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\85989cb7bb7c3d6ad03005df6bb942f9_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\da758fac93c9ade353dd6d16f7676e53_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\ea084334788d8375e30fdacdb84a1322_720.png)

代码
```python
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[0:5:1]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[1:8:2]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[1:8:3]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[1:8:3]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[::]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[3::]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[:5:]  
print(list2)  
​  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[7:2:-1]  
print(list2)  
​  
# 一个特殊情况：当同时省略起始索引和结束索引时，如果步长为负数，那Python会自动对调，起始和结束位置  
list1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]  
list2 = list1[::-1]  
print(list2)

# 对元组进行切片  
tuple1 = (10, 20, 30, 40, 50, 60, 70, 80, 90, 100)  
tuple2 = tuple1[0:5:1]  
print(tuple2)  
  
# 对字符串进行切片  
msg1 = 'welcome to atguigu'  
msg2 = msg1[2:9:2]  
print(msg2)
```

结果

![image-20260612154458783](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612154458783.png?lastModify=1782109450)

![image-20260612155427146](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612155427146.png?lastModify=1782109450)

#### 7.4序列的其他操作

学习

相加
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\0b2f6761297ad0f3ce507928f70075bb_720.png)

相乘
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\c223275c0619e72893d3d5202811b6ac_720.png)

代码
```python
# 序列相加  
list1 = [10, 20, 30, 40]  
list2 = [50, 60, 70, 80]  
list3 = list1 + list2  
print(list3)  
  
# 元组相加  
tuple1 = (10, 20, 30, 40)  
tuple2 = (50, 60, 70, 80)  
tuple3 = tuple1 + tuple2  
print(tuple3)  
  
str1 = 'hello'  
str2 = 'atguigu'  
str3 = str1 + str2  
print(str3)
```

结果

![image-20260612161146815](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612161146815.png?lastModify=1782109450)

#### 7.5集合_定义集合

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\df5e8da4405e49e8918024cf9c05d51c_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\e0a4821cec7741914f27f56a99884b46_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\0798a47d9dcaab289f11add06170ec52_720.png)

注意：集合中不能嵌套**可变集合**，但可以嵌套**不可变集合**
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\218339268d5172bcea4fdf44cf57dd43_720.png)

哈希值：是根据内容计算出来的![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\3e5832a30ac1a58e49bd7f1bbb877b31_720.png)

代码
```python
# 定义有内容的【可变集合】  
s1 = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100}  
s2 = {'你好', 'hello', '你好', 'atguigu', '北京'}  
s3 = {10, '你好', True, 1, 12.4}  
print(type(s1), s1)  
print(type(s2), s2)  
print(type(s3), s3)  
s2.add('尚硅谷')  
print(s2)  
​  
# 定义有内容的【不可变集合】  
s1 = frozenset({10, 20, 30, 40, 50, 60, 70, 80, 90, 100})  
s2 = frozenset({'你好', 'hello', '你好', 'atguigu', '北京'})  
s3 = frozenset({10, '你好', True, 1, 12.4})  
print(type(s1), s1)  
print(type(s2), s2)  
print(type(s3), s3)  
​  
# frozenset 接收的参数，可以是任意可迭代对象，但最终返回的一定是【不可变集合】  
s1 = frozenset([10, 20, 30, 40, 50])  
s2 = frozenset((10, 20, 30, 40, 50))  
s3 = frozenset('hello')  
print(type(s1), s1)  
print(type(s2), s2)  
print(type(s3), s3)  
​  
# 定义空集合（可变集合）  
s1 = set()  
print(type(s1), s1)  
​  
# 不能直接写{}来定义空集合，因为直接写{}定义的是：空字典  
s2 = {}  
print(type(s2), s2)  
​  
# 定义空集合（不可变集合）  
s3 = frozenset()  
print(type(s3), s3)  
​  
# 集合中不能嵌套【可变集合】，但可以嵌套【不可变集合】  
# 通俗理解：只有“不可变”的东西，才能安全的放进集合里  
s1 = {10, 20, 30, 40, 50}  
s2 = frozenset({100, 200, 300, 400, 500})  
l1 = [666, 777, 888]  
t1 = ('hello', 'atguigu', '北京')  
​  
# s1是可变的 只有不可变的东西，才能安全的放进集合里  
# s3 = {11, 22, 33, s1} # 报错  
# s3 = {11, 22, 33, s2}  
# s3 = {11, 22, 33, l1} # 报错  
s3 = {11, 22, 33, t1}  
print(s3)
```

结果

![image-20260612184048486](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612184048486.png?lastModify=1782109450)

![image-20260612190020853](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612190020853.png?lastModify=1782109450)

#### 7.6集合_增删改查

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\0e5b9b0ab923a47eade94b5326551b45_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\a19d2bdd12fc900ad7a6eb98069029e0_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\a817585159a5ee66f6a257b7e078a074_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\24b9468d3f7301db1f1961a945fb29a3_720.png)
代码
```python
# 增  
# 向集合中添加元素  
s1 = {10, 20, 30, 40, 50}  
s1.add(60)  
print(s1)  
​  
# 向集合中批量添加元素  
s1 = {10, 20, 30, 40, 50}  
s1.update([60, 70])  
s1.update((80, 90))  
s1.update({100, 200})  
print(s1)  
​  
# 删  
# remove方法：从集合中移除元素（移除不存在的元素，会报错）  
# s1 = {10, 20, 30, 40, 50}  
# s1.remove(80)  
# print(s1)  
​  
# discard方法：从集合中移除元素（移除不存在的元素，不会报错）  
s1 = {10, 20, 30, 40, 50}  
s1.discard(20)  
print(s1)  
​  
# pop方法：从集合中移除一个任意元素，返回值是移除的那个元素  
s1 = {10, 20, 30, 40, 50}  
s2 = {'你好', '北京', '尚硅谷', 'hello'}  
result = s2.pop()  
print(s2)  
print(result)  
​  
# clear方法：清空集合  
s3 = {10, 20, 30, 40, 50}  
s3.clear()  
print(s3)

# 改  
# 使用 add + remove的组合，来实现修改的效果  
s4 = {10, 20, 30, 40, 50}  
s4.remove(20)  
s4.add(66)  
print(s4)
```

结果

![image-20260612192450290](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612192450290.png?lastModify=1782109450)

![image-20260612193015343](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612193015343.png?lastModify=1782109450)

总结
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\739f2d7db64423a2111496d055dbdbbd_720.png)

#### 7.7集合_常用方法

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\3a2a12bb53468c778f51fe43cfaa317e_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\ffb239f2b15fc850781ce387fbd28669_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\11ad8675e8cca0650a7778d9250c78f3_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\eb74dee465ad5a9da069c6c6f2cc2559_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\4d7d7b458b927c403baef064a0823acd_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\1b6a656478e2bdb5151ce03aa5c09b54_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\1dfc0d638a51ca5f4266a2c07202269f_720.png)

代码
```python
# 集合A.difference(集合B)  
# 作用：找出集合中，不同于集合B的元素（集合A 和 集合B 都不变，返回的是一个新的集合）  
# s1 = {10, 20, 30, 40, 50}  
# s2 = {30, 40, 50, 60, 70}  
# result = s1.difference(s2)  
# print(result)  
​  
# 集合A.difference_update(集合B):  
# 作用：从集合A中，删除集合B中存在的元素（集合A会被修改，集合B不会）  
s1 = {10, 20, 30, 40, 50}  
s2 = {30, 40, 50, 60, 70}  
s2.difference_update(s1)  
print(s1)  
print(s2)  
​  
# 集合A.union(集合B)  
# 作用：合并两个集合，集合A 和 集合B 都不变，返回的是一个新的集合  
s1 = {10, 20, 30, 40, 50}  
s2 = {30, 40, 50, 60, 70}  
result = s1.union(s2)  
print(s1)  
print(s2)  
print(result)  
​  
# 集合A.issubset(集合B)  
# 作用：判断集合A是否为集合B的子集  
# 如果 集合A的所有元素都在集合B中，那就返回True，否则返回False  
s1 = {10, 20, 30, 40, 50}  
s2 = {30, 40, 50, 60, 70}  
s3 = {30, 40, 50}  
# s3是s1的子集  
result = s3.issubset(s1)  
print(result)  
​  
# 集合A.issuperset(集合B)  
# 作用：判断集合A是否是集合B的超集  
# 如果集合A中，包含了集合B中的所有元素，那就返回True，否则返回False  
# s1 = {10, 20, 30, 40, 50}  
# s2 = {30, 40, 50, 60, 70}  
# s3 = {30, 40, 50}  
# # s1是s3的超集  
# result = s1.issuperset(s3)  
# print(result)  
​  
# 集合A.isdisjoint(集合B):  
# 作用：判断集合A和集合B是否没有交集  
# 如果没有交集，返回True；只要有一个公共元素，就返回False  
s1 = {10, 20, 30, 40, 50}  
s2 = {30, 40, 50, 60, 70}  
s3 = {80, 90}  
result = s1.isdisjoint(s3)  
print(result)
```

结果

![image-20260612202815817](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260612202815817.png?lastModify=1782109450)

#### 7.8集合_数学运算

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\afbb3bf6a5ed898afbc553615472554c_720.png)

代码
```python
s1 = {10, 20, 30, 40, 50, 60}  
s2 = {40, 50, 60, 70, 80, 90}  
​  
# 并集  
result = s1 | s2  
print(result)  
​  
# 交集  
result = s1 & s2  
print(result)  
​  
# 差集  
result = s1 - s2  
print(result)  
​  
# 对称差集  
result = s1 ^ s2  
print(result)
```

结果

![image-20260615092320983](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615092320983.png?lastModify=1782109450)

#### 7.9集合_循环遍历

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\3ecb24464e9a8e185c8462806e2ac066_720.png)

代码
```python
s1 = {10, 20, 30, 40, 50}  
​  
# 集合不能使用while循环遍历  
# index = 0  
# while index < len(s1):  
#     print(s1[index])  
#     index += 1  
​  
# 集合可以使用for循环遍历  
for item in s1:  
    print(item)
```

结果

![image-20260615092903324](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615092903324.png?lastModify=1782109450)

![image-20260615093107685](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615093107685.png?lastModify=1782109450)

#### 7.10集合_总结

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\02a960b50415e5d30e2d38d7da97db6a_720.png)

#### 8.1字典_定义字典

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\f9efa12aa8b3ece2d7f1958aa62aa5e1_720.png)

代码
```python
# 定义有内容的字典  
d1 = {'张三': 72, '李四': 60, '王五': 85}  
print(type(d1), d1)  
​  
# 字典中的key不能重复，若出现重复，则后写的会覆盖之前写的  
d1 = {'张三': 72, '李四': 60, '王五': 85, '张三': 99}  
print(d1)  
​  
# 定义空字典  
d1 = {}  
d2 = dict()  
print(type(d1), d1)  
print(type(d2), d2)  
​  
# 字典中的key必须是不可变类型，但value可以是任意类型  
# 通俗理解：只有不可变的东西，才能作为key  
d1 = {250: 72, '李四': 60, '王五': 85}  
d2 = {('抽烟', '喝酒'): 72, '李四': 60, '王五': 85}  
print(d1)  
print(d2)  
# 错误示例：将列表作为key,是不行的  
# d2 = {['抽烟', '喝酒']: 72, '李四': 60, '王五': 85}  
​  
# 字典可以嵌套  
student_dict = {  
    2025001: {  
        '姓名': '张三',  
        '年龄': 18,  
        '成绩': 72  
    },  
    2025002: {'姓名': '李四', '年龄': 19, '成绩': 72},  
    2025003: {'姓名': '王五', '年龄': 20, '成绩': 60}  
​  
}****
```

结果

![image-20260615102549328](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615102549328.png?lastModify=1782109450)

#### 8.2字典_增删改查

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\2fef6facb9599f181aa7f6d2413e5175_720.png)

代码
```python
# 查询  
d1 = {'张三': 72, '李四': 60, '王五': 85}  
# 直接取值，若键（key）不存在，会报错  
result = d1['张三']  
print(result)  
# 安全取值，若键(key)不存在，会返回默认值（若没有默认值，则会返回None）  
result = d1.get('奥特曼', '抱歉，key不存在！')  
print(result)  
​  
# 新增  
# d1 = {'张三':72, '李四':60, '王五':85}  
# d1['赵六'] = 100  
# print(d1)  
​  
# 修改  
# d1 = {'张三': 72, '李四': 60, '王五': 85}  
# # 修改的写法，与新增的写法一样，若字典中有对应的key，就是修改；若没有，就是新增  
# d1['张三'] = 97  
# print(d1)  
#  
# # 批量修改  
# d1.update({'李四': 40, '王五': 67})  
# print(d1)  
​  
# 删除  
d1 = {'张三': 72, '李四': 60, '王五': 85}  
​  
# # 删除指定key所对应的那组键值对  
# del d1['张三']  
# print(d1)  
​  
# 删除指定key所对应的那组键值对，并返回这个key所对应的值  
result = d1.pop('张三')  
print(d1)  
print(result)  
​  
# pop方法可以设置默认值  
# 默认值可以保证：当要删除的key不存在的情况下，程序不会报错，并且返回这个默认值  
result = d1.pop('奥特曼', '删除失败！')  
print(d1)  
print(result)  
​  
# 清空字典  
d1.clear()  
print(d1)
```

结果

![image-20260615102637856](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615102637856.png?lastModify=1782109450)

#### 8.3字典_常用方法

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\123ada5b9c74669b3aa6c9942dbc5e7d_720.png)

代码
```python
# # keys方法：用于获取字典中所有的键  
# d1 = {'张三': 72, '李四': 60, '王五': 85}  
#  
# # keys方法的返回值不是list,而是一种叫做dict_keys的类型  
# result = d1.keys()  
# print(result)  
# print(type(result))  
#  
# # dict_keys和列表类似，可以被遍历，但要注意的是：他不能通过下标访问元素  
# for item in result:  
#     print(item)  
#  
# # 报错代码  
# # print(result[0])  
#  
# # 借助内置的list函数，可以将dict_keys转换成list  
# l1 = list(result)  
# print(l1)  
# print(type(l1))  
​  
# values方法：获取字典中所有的值  
# d1 = {'张三': 72, '李四': 60, '王五': 85}  
# values方法的返回值类型是：dict_values,它的特点是dict_keys一样  
# result = d1.values()  
# print(result)  
# print(type(result))  
​  
# items方法: 获取字典中所有的键值对（每组键值对以元组的形式呈现）  
d1 = {'张三': 72, '李四': 60, '王五': 85}  
# items方法返回的类型是：dict_items,它的特点也和dict_keys一样  
result = d1.items()  
print(result)  
print(type(result))
```

结果

![image-20260615104839885](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615104839885.png?lastModify=1782109450)

#### 8.4字典_循环遍历

学习

> 字典不能使用while循环遍历，但可以使用for循环遍历

代码
```python
# 字典不能使用while循环遍历，但可以使用for循环遍历  
d1 = {'张三': 72, '李四': 60, '王五': 85}  
for key in d1:  
    # 打印的是key  
    print(f'{key}的成绩是{d1[key]}')  
print(d1)  
​  
for key in d1.keys():  
    # 打印的是key  
    print(f'{key}的成绩是{d1[key]}')
```

结果

![image-20260615105444169](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615105444169.png?lastModify=1782109450)

#### 8.5字典_总结

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\be82e15e04f2b4621a4f08b486da5a86_720.png)

#### 8.6数据容器通用操作

代码
```python
# 以下这五个函数：既能定义对应的【空容器】，又能将【其他类型】转换成对应的数据类型  
​  
# 1.list函数 a.定义空列表 b.将可迭代对象转换成列表  
res1 = list(range(8))  
res2 = list('欢迎来到尚硅谷')  
res3 = list({10, 20, 30, 40, 50})  
res4 = list({'张三': 75, '李四': 60, '王五': 85}.items())  
print(type(res1), res1)  
print(type(res2), res2)  
print(type(res3), res3)  
print(type(res4), res4)  
​  
# 2.tuple函数 a.定义空元组 b.将可迭代对象转换成元组  
res1 = tuple(range(8))  
res2 = tuple('欢迎来到尚硅谷')  
res3 = tuple({10, 20, 30, 40, 50})  
res4 = tuple({'张三': 75, '李四': 60, '王五': 85}.items())  
print(type(res1), res1)  
print(type(res2), res2)  
print(type(res3), res3)  
print(type(res4), res4)  
​  
# 3.set函数 a.定义空集合 b.将可迭代对象转换成集合  
res1 = set(range(8))  
res2 = set('欢迎来到尚硅谷')  
res3 = set({10, 20, 30, 40, 50})  
res4 = set({'张三': 75, '李四': 60, '王五': 85}.items())  
print(type(res1), res1)  
print(type(res2), res2)  
print(type(res3), res3)  
print(type(res4), res4)  
​  
# 4.str函数 a.定义字符串 b.将任意对象转换成字符串  
res1 = str(range(8))  
res2 = str('欢迎来到尚硅谷')  
res3 = str({10, 20, 30, 40, 50})  
res4 = str({'张三': 75, '李四': 60, '王五': 85}.items())  
res5 = str(False)  
res6 = str(None)  
res7 = str(100)  
print(type(res1), res1)  
print(type(res2), res2)  
print(type(res3), res3)  
print(type(res4), res4)  
print(type(res5), res5)  
print(type(res6), res6)  
print(type(res7), res7)  
​  
# 5.dict函数 a.定义空字典 b.将可迭代对象转换成字典  
# 备注：交给dict函数的内容必须是键值对才可以，否则会报错  
res1 = dict({'张三': 75, '李四': 60, '王五': 85})  
res2 = dict([('张三', 75), ('李四', 60), ('王五', 85)])  
res3 = dict((('张三', 75), ('李四', 60), ('王五', 85)))  
res4 = dict({('张三', 75), ('李四', 60), ('王五', 85)})  
print(type(res1), res1)  
print(type(res2), res2)  
print(type(res3), res3)  
print(type(res4), res4)  
​  
# 所有的数据容器，都支持【成员运算符】：in/ not in作用：判断某个元素是否在于容器中  
hobby = ['抽烟', '喝酒', '烫头']  
nums = (10, 20, 30, 40, 50)  
message = 'hello,atguigu'  
citys = {'北京', '天津', '上海'}  
score = {'张三', 75, '李四', 60}  
​  
print('喝酒' in hobby)  
print(20 in nums)  
print('hel' in message)  
print('上海' in citys)  
print('李华' in score)  
​  
print('喝酒' not in hobby)  
print(20 not in nums)  
print('hel' not in message)  
print('上海' not in citys)  
print('李华' not in score)
```

结果

![image-20260615114811652](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615114811652.png?lastModify=1782109450)

#### 8.7数据容器小练习

学习

代码
```python
# 练习一：水果清单  
fruits = {  
    '苹果': 4.5,  
    '香蕉': 3.2,  
    '橙色': 5.8  
}  
​  
# 需求1：打印所有的水果  
for key in fruits:  
    print(f'{key}: {fruits[key]}')  
​  
# 需求2：找到最贵水果  
# res = max(fruits, key=fruits.get)  
# print(res)  
print(fruits.get('苹果'))
```

结果

![image-20260616103440382](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260616103440382.png?lastModify=1782109450)

#### 8.8数据容器总结

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\ba766fd2515e9fc1c3a97d2787fcad42_720.png)

![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\562820e2e88f076f7c0f449fc9208d79_720.png)

#### 9.1面向对象
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\a57b1ccadf825f37c439938b01324598_720.png)

**这一章重点看代码**

#### 9.2类的定义

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\54433af0f1a1d7b180dae12e64c9ed77_720.png)
代码
```python
# 定义一个Person类（类名通常使用：大驼峰写法）  
class Person:  
    # 说明：当一个函数被定义在了类中时，那这个函数就被称为：方法  
    # __init__方法：初始化方法，主要作用：给当前正在创建的实例对象添加属性  
    # __init__方法收到的参数：当前正在创建的实例对象（self）、其他的自定义参数  
    # 当以后编写代码去创建Person实例的时候，Python会自动调用__init__  
    def __init__(self, name, age):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age
```

结果

![image-20260615153945054](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615153945054.png?lastModify=1782109450)

#### 9.3创建实例

学习
![img](file:///D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\1bf1cbe2d1a0bae89e7d90340eabdd44_720.png)
代码
```python
# 定义一个Person类（类名通常使用：大驼峰写法）  
class Person:  
    # 说明：当一个函数被定义在了类中时，那这个函数就被称为：方法  
    # __init__方法：初始化方法，主要作用：给当前正在创建的实例对象添加属性  
    # __init__方法收到的参数：当前正在创建的实例对象（self）、其他的自定义参数  
    # 当以后编写代码去创建Person实例的时候，Python会自动调用__init__  
    def __init__(self, name, age):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
​  
​  
# 创建Person类的实例对象  
p1 = Person('张三', 18)  
p2 = Person('李四', 23)  
print(p1)  
print(p2)  
​  
# 如果直接打印一个实例的话，我们是看不到实例身上的属性的  
# 通过.语法可以访问或修改实例身上的属性  
print(p1.name)  
print(p1.age)  
print('-' * 20)  
print(p2.name)  
print(p2.age)  
p1.name = '阿三'  
​  
# 通过实例.__dict__可以查看实例身上的所有属性  
print(p1.__dict__)  
print(p2.__dict__)  
​  
# 实例创建完毕后，依然可以通过 实例.属性名 = 值 去给实例追加属性  
p1.address = '北京昌平洪福科技园'  
print(p1.__dict__)
```

结果

![image-20260615154108806](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615154108806.png?lastModify=1782109450)

#### 9.4自定义方法

学习
```python
> # 自定义方法（给实例添加行为）  
> # speak方法收到的参数是：调用speak方法的实例对象（self）、其它参数  
> # speak方法只有一份，保存在Person类身上的，所有Person类的实例对象，都可以调用到speak方法  
> def speak(self, msg):  
>  print(f'我叫{self.name},年龄是{self.age},我想说{msg}')  
>   
> # 所有Person类的实例对象，都可以调用speak方法  
> # 当执行p1.speak()的时候，查找speak方法的过程：1.实例对象自身（p1）=> 2.实例的缔造者Person类身上  
> p1.speak('好好学习')  
> p2.speak('天天向上')  
>   
> # 验证一下上述的查找过程  
> def speak():  
>  print('巴拉巴拉巴拉')  
>   
> # 在实例上追加一个属性  
> p1.speak = speak  
> print(p1)  
> print(Person.__dict__)  
> print(p1.__dict__)  
> print(p2.__dict__)  
> p1.speak()
```

代码
```python
# 定义一个Person类（类名通常使用：大驼峰写法）  
class Person:  
    # 说明：当一个函数被定义在了类中时，那这个函数就被称为：方法  
    # __init__方法：初始化方法，主要作用：给当前正在创建的实例对象添加属性  
    # __init__方法收到的参数：当前正在创建的实例对象（self）、其他的自定义参数  
    # 当以后编写代码去创建Person实例的时候，Python会自动调用__init__  
    def __init__(self, name, age):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
  
    # 自定义方法（给实例添加行为）  
    # speak方法收到的参数是：调用speak方法的实例对象（self）、其它参数  
    # speak方法只有一份，保存在Person类身上的，所有Person类的实例对象，都可以调用到speak方法  
    def speak(self, msg):  
        print(f'我叫{self.name},年龄是{self.age},我想说{msg}')  
  
  
# 创建Person类的实例对象  
p1 = Person('张三', 18)  
p2 = Person('李四', 22)  
  
# 所有Person类的实例对象，都可以调用speak方法  
# 当执行p1.speak()的时候，查找speak方法的过程：1.实例对象自身（p1）=> 2.实例的缔造者Person类身上  
p1.speak('好好学习')  
p2.speak('天天向上')  
  
  
# 验证一下上述的查找过程  
def speak():  
    print('巴拉巴拉巴拉')  
  
  
# 在实例上追加一个属性  
p1.speak = speak  
print(p1)  
print(Person.__dict__)  
print(p1.__dict__)  
print(p2.__dict__)  
p1.speak()
```

结果

![image-20260615154519349](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615154519349.png?lastModify=1782109450)

#### 9.5实例属性

代码
```python
# 定义一个Person类（类名通常使用：大驼峰写法）  
class Person:  
    def __init__(self, name, age):  
        # 通过【实例.属性名 = 值】给实例添加的属性，就叫实例属性  
        # 实例属性只能通过实例访问，不能通过类访问  
        # 每个实例都有自己的【独一份的】实例属性，各个实例之间是互不干扰的  
        self.name = name  
        self.age = age
```


#### 9.6类属性

学习

代码
```python
# 定义一个Person类  
class Person:  
    # max_age、planet他们都是类属性，类属性是保存在类身上的  
    # 类属性可以通过类访问，也可以通过实例访问  
    # 类属性通常用于保存：公共数据  
    max_age = 120  
    planet = '地球'  
  
    # 初始化方法  
    def __init__(self, name, age):  
        # 给实例添加属性  
        self.name = name  
        self.age = age  
  
  
# 验证一下：类属性是保存在类身上的  
print(Person.__dict__)  
  
# 创建Person类的实例对象  
p1 = Person('张三', 18)  
p2 = Person('李四', 22)  
  
print(p1.__dict__)  
print(p2.__dict__)
```

结果

![image-20260615154630469](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615154630469.png?lastModify=1782109450)

#### 9.6实例方法

学习

代码
```python
# 定义一个Person类（类名通常使用：大驼峰写法）  
class Person:  
    # 初始化方法（给实例添加属性）  
    def __init__(self, name, age):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
  
    # 下面的speak方法、run方法，都保存在类身上，但他们主要是供实例调用，所以他们都叫：实例方法  
    def speak(self, msg):  
        print(f'我叫{self.name},年龄是{self.age},我想说：{msg}')  
  
    # 自定义方法（给实例添加行为）  
    def run(self, distance):  
        print(f'{self.name}疯狂奔跑了{distance}')  
  
  
# 创建Person类的实例对象  
p1 = Person('张三', 18)  
p2 = Person('李四', 22)  
  
print(Person.__dict__)  
print(p1.__dict__)  
print(p2.__dict__)  
  
# 通过实例调用实例方法  
p1.speak('hello')  
p1.run(300)  
  
# 通过类去调用实例方法(能调用，但不推荐)  
Person.run(p2, 100)  
p2.run(100)

```

结果

![image-20260615183221230](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615183221230.png?lastModify=1782109450)

#### 9.7类方法

学习

代码
```python
from datetime import datetime  
​  
# 定义一个Person类（类名通常使用：大驼峰写法）  
class Person:  
    # 类属性  
    max_age = 120  
    planet = '地球'  
​  
    # 初始化方法（给实例添加属性）  
    def __init__(self, name, age, gender):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
    # 下面的speak方法、run方法，都保存在类身上，但他们主要是供实例调用，所以他们都叫：实例方法  
    def speak(self, msg):  
        print(f'我叫{self.name},年龄是{self.age},性别{self.gender},我想说：{msg}')  
​  
    def run(self, distance):  
        print(f'{self.name}疯狂奔跑了{distance}')  
​  
    # 使用 @classmethod 装饰过的方法，就叫类方法，类方法是保存在类身上的  
    # 类方法收到的参数：当前类本身cls、自定义参数  
    # 因为收到了cls参数，所以类方法是可以访问类属性的  
    # 类方法通常用于实现：与类相关的逻辑，例如：操作 类 级别的信息、一些工厂方法  
    @classmethod  
    def change_planet(cls, value):  
        cls.planet = value  
        print('我是test1', cls, value)  
​  
    @classmethod  
    def create(cls, info_str):  
        # 从info_str中获取到有效信息  
        name, year, gender = info_str.split('-')  
        print('我是test2')  
        # 获取当前年份  
        current_year = datetime.now().year  
        # 计算年龄  
        age = current_year - int(year)  
        # 创建并返回Person类的实例对象  
        return cls(name, age, gender)  
​  
​  
# 类方法需要通过类调用  
Person.change_planet('月球')  
print(Person.__dict__)  
​  
# 创建Person实例  
p1 = Person('张三', 18, '男')  
p2 = Person('李四', 22, '男')  
print(p1.planet)  
print(p2.planet)  
​  
# 测试一下类方法 ---create  
p3 = Person.create('李华-2003-女')  
print(p3.__dict__)  
​  
# 注意点：类方法，也能通过实例调用到，但是非常不推荐  
p4 = p1.create('李华-2003-女')  
print(p4.__dict__)
```

结果

![image-20260615183534718](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615183534718.png?lastModify=1782109450)

#### 9.8静态方法

学习

代码
```python
# 定义一个Person类（类名通常使用：大驼峰写法）  
from datetime import datetime  
​  
​  
class Person:  
    # 初始化方法（给实例添加属性）  
    def __init__(self, name, age, gender):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
    # 静态方法  
    # 使用 @staticmethod 装饰过的方法，就叫：静态方法，静态方法也是保存在类身上的  
    # 静态方法只是单纯的定义在类中，它不会收到：self、cls参数，它收到的参数都是自定义参数  
    # 由于静态方法没有收到：self、cls参数，所以其内部不会访问任何：类和实例相关的内容  
    # 静态方法通常用于定义：与类相关的工具方法  
    @staticmethod  
    def is_adult(year):  
        # 获取当前的年份  
        current_year = datetime.now().year  
        # 计算年龄  
        age = current_year - year  
        # 返回结果（成年True，未成年False）  
        return age >= 18  
​  
    @staticmethod  
    def mask_idcard(idcard):  
        return idcard[:6] + '**********' + idcard[-4:]  
​  
​  
# 验证一下：静态方法，静态方法也是保存在类身上的  
print(Person.__dict__)  
​  
# 静态方法需要通过类去调用  
result1 = Person.is_adult(2015)  
print(result1)  
​  
result2 = Person.mask_idcard('212101198802030028')  
print(result2)  
​  
# 注意点：通过实例也能调用到静态方法，但非常不推荐  
p1 = Person('张三', 18, '男')  
res = p1.mask_idcard('212101198802030028')  
print(res)

```

结果

![image-20260615191249679](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615191249679.png?lastModify=1782109450)

#### 9.9继承

学习

**主要看代码**

代码
```python
# 定义一个Person类  
class Person:  
    # 初始化方法（给实例添加属性）  
    def __init__(self, name, age, gender):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
    def speak(self, msg):  
        print(f'{self.name} is {self.age} years old')  
​  
​  
# 定义一个Student类（子类、派生类） 继承自Person类（父类、超类、基类）  
class Student(Person):  
    def __init__(self, name, age, gender, stu_id, grade):  
        # 在子类中，有两种方式去调用父类的初始化方法，来实现对继承属性：name,age,gender的初始化操作  
        # 方式1(更推荐)  
        super().__init__(name, age, gender)  
        # 方式2  
        Person.__init__(self, name, age, gender)  
​  
        # 子类独有的属性，需要自己手动完成初始化  
        self.stu_id = stu_id  
        self.grade = grade  
​  
    def study(self):  
        print(f'我叫{self.name},我在努力的学习，争取做到{self.grade}年级的第一名')  
​  
​  
# 创建Student类的实例对象  
s1 = Student('李华', 16, '男', '2025001', '初二')  
print(s1.__dict__)  
print(type(s1))  
​  
​  
def speak(data):  
    print('我是s1自身的speak方法', data)  
​  
​  
s1.speak = speak  
​  
# 查找speak方法的过程：1.实例自身（s1）=> 2.Student类 => 3.Person类  
s1.speak('你好')  
s1.study()
```

结果

![image-20260615200508412](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615200508412.png?lastModify=1782109450)

#### 9.10方法重写

学习

代码
```python
# 定义一个Person类  
class Person:  
    # 初始化方法（给实例添加属性）  
    def __init__(self, name, age, gender):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
    def speak(self, msg):  
        print(f'{self.name} is {self.age} years old')  
​  
​  
# 定义一个Student类，继承自Person类  
class Student(Person):  
    def __init__(self, name, age, gender, stu_id, grade):  
        super().__init__(name, age, gender)  
        self.stu_id = stu_id  
        self.grade = grade  
​  
    # 方法重写：当子类中定义了一个与父类中相同的方法，那么子类中的方法就会‘覆盖’父类的方法  
    def speak(self, msg):  
        super().speak(msg)  
        print(f'我是学生，我的学号是{self.stu_id},我正在读{self.grade},我想说{msg}')  
​  
​  
s1 = Student('李华', 12, '男', '2025001', '初二')  
s1.speak('好好学习')
```

结果

![image-20260615205208128](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615205208128.png?lastModify=1782109450)

#### 9.11两个常用方法

学习

代码
```python
# 定义一个Person类  
class Person:  
    # 初始化方法（给实例添加属性）  
    def __init__(self, name, age, gender):  
        # 语法：self.属性名 = 值  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
# 定义一个Student类，继承自Person类  
class Student(Person):  
    def __init__(self, name, age, gender, stu_id, grade):  
        super().__init__(name, age, gender)  
        self.stu_id = stu_id  
        self.grade = grade  
​  
p1 = Person('张三', 18, '男')  
s1 = Student('李华', 12, '男', '2025001', '初二')  
# 方法一：isinstance(instance,Class),作用：判断某个对象是否为指定类或其子类的实例  
print(isinstance(s1, Student))  
print(isinstance(p1, Person))  
print(isinstance(s1, Person))  
print(isinstance(p1, Student))  
​  
# 方法二：issubclass(Class1,Class2),作用：判断某个类是否是另一个类的子类  
print(issubclass(Student, Person))  
print(issubclass(Person, Student))

```

结果

![image-20260615205308416](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615205308416.png?lastModify=1782109450)

#### 9.12多重继承

学习

**了解知道**

代码
```python
# 概念：多重继承指一个类同时继承多个父类，从而拥有多个父类的属性和方法  
# 举例：就像孩子不仅继承爸爸的长相，也能继承妈妈的性格  
class Person:  
    def __init__(self, name, age, gender):  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
    def speak(self):  
        print(f'我叫{self.name},年龄是{self.age},性别是{self.gender}')  
​  
​  
class Worker:  
    def __init__(self, company):  
        self.company = company  
​  
    def do_work(self):  
        print(f'我在{self.company}做兼职')  
​  
​  
class Student(Person, Worker):  
    def __init__(self, name, age, gender, company, stu_id, grade):  
        Person.__init__(self, name, age, gender)  
        Worker.__init__(self, company)  
        self.stu_id = stu_id  
        self.grade = grade  
​  
    def study(self):  
        print(f'我在努力的学习，争取做{self.grade}年级的第一名')  
​  
​  
s1 = Student('张三', 18, '男', '麦当劳', '2025001', '初二')  
print(s1.__dict__)  
s1.speak()  
s1.do_work()  
s1.study()  
​  
# 类的__mro__属性：用于记录属性和方法的查找顺序  
# 通过实例去查找属性或方法时，会先在实例自身上去查找，如果没有，就按照__mro__记录的顺序去查找  
print(Student.__mro__)
```

结果

![image-20260615211700691](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615211700691.png?lastModify=1782109450)

#### 9.13三种访问权限

学习

![image-20260615212825428](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615212825428.png?lastModify=1782109450)

![image-20260615214101651](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615214101651.png?lastModify=1782109450)

代码
```python
class Person:  
    def __init__(self, name, age, idcard):  
        self.name = name  # 公有属性：当前类中、子类中、类外部、都可以访问  
        self._age = age  # 受保护的属性：当前类中、子类中、都可以访问  
        self.__idcard = idcard  # 私有属性：仅能在当前类中访问  
​  
    def speak(self):  
        print(f'我叫：{self.name},年龄：{self._age},身份证：{self.__idcard}')  
​  
​  
p1 = Person('张三', 18, '110101199001011234')  
p1.speak()  
​  
​  
class Student(Person):  
    def hello(self):  
        print(f'我是学生（{self.name}-{self._age}-{self.__idcard}）')  
​  
​  
# s1 = Student('张三', 18, '110101199001011234')  
# s1.hello()  
​  
p1 = Person('张三', 18, '110101199001011234')  
print(p1.name)  
# 在类的外部，如果强制访问【受保护的属性】也能访问到，但十分不推荐  
# p1._age  
# print(p1._age)  
# 在类的外部，如果强制访问【私有属性】不能访问到，而且会报错！  
# print(p1.__idcard)  
​  
# Python底层是通过重命名的方式，实现私有属性的  
print(p1.__dict__)  
print(p1._Person__idcard)
```

**结果**

私有属性不能访问
![[0c30d2a489f11fbfb3972635fa2d53ec_0.png]]
![image-20260615213023640](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615213023640.png?lastModify=1782109450)

#### 9.14 getter和setter

学习

![image-20260615221527671](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260615221527671.png?lastModify=1782109450)

代码
```python
class Person:  
    def __init__(self, name, age, idcard):  
        self.name = name  # 公有属性：当前类中、子类中、类外部、都可以访问  
        self._age = age  # 受保护的属性：当前类中、子类中、都可以访问  
        self.__idcard = idcard  # 私有属性：仅能在当前类中访问  
​  
    # 注册age属性getter方法，当访问Person实例的age属性时，下面的age方法就会被自动调用  
    @property  
    def age(self):  
        return self._age  
​  
    @age.setter  
    def age(self, value):  
        self._age = value  
​  
​  
p1 = Person('John', 21, '123')  
print(p1.name)  
print(p1.age)  
p1.age = 99  
print(p1.age)
```


结果

![image-20260616103551959](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260616103551959.png?lastModify=1782109450)

#### 9.15魔法方法

学习
![[image-1782128411301.webp|400x210]]
代码
```python
# 概念：以__XXX__命名的特殊方法（双下划线开头和结尾）  
# 特点：不需要我们手动调，我们只要准备好这些方法，Python会在特定场景下，去自动调用  
class Person:  
    def __init__(self, name, age, gender):  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
    # 当执行print(Person的实例对象) 或 str(Person的实例对象) 时调用  
    def __str__(self):  
        return f'{self.name}-{self.age}-{self.gender}'  
​  
    # 当执行len(Person的实例对象) 时调用  
    def __len__(self):  
        return len(p1.__dict__)  
​  
    # 当执行 Person实例对象1 < Person实例对象2 时调用  
    def __lt__(self, other):  
        return self.age < other.age  
​  
    # 当执行 Person实例对象1 > Person实例对象2 时调用  
    def __gt__(self, other):  
        return self.age > other.age  
​  
    # 当执行 Person实例对象1 == Person实例对象2 时调用  
    def __eq__(self, other):  
        return self.__dict__ == other.__dict__  
​  
    # 当访问Person实例对象身上不存在的属性时调用  
    def __getattr__(self, item):  
        return f'您访问的{item}属性不存在'  
​  
​  
p1 = Person('张三', 18, '男')  
p2 = Person('李四', 19, '女')  
# 其实底层在调用p1.__str__()方法  
# res1 = str(p1)  
# res2 = str(p2)  
# print(res1)  
# print(res2)  
# res = len(p1)  
# print(p1 < p2)  
# print(p1 > p2)  
print(p1 == p2)  
print(p1.address)
```

结果

![image-20260616151804290](file:///D:/ObsidianVaults/Obsidian_note/Atlas/Notes/%E8%AE%BA%E6%96%87/Python%E5%9F%BA%E7%A1%80/Assets/image-20260616151804290.png?lastModify=1782109450)

#### 9.16object类

学习

代码
```python
**# Python中，所有的类中都继承了object类,即：object类是所有类的顶层父类  
class Person(object):  
    def __init__(self, name, age, gender):  
        self.name = name  
        self.age = age  
        self.gender = gender  
​  
​  
# 验证一下：所有的类继承了object类  
print(issubclass(Person, object))  
print(issubclass(int, object))  
​  
print('------------')  
# 因为 object 是所有类的父类，所以 Python 中的所有对象，都间接是 object 类的实例  
p1 = Person('张三', 18, '男')  
print(isinstance(p1, object))  
print(isinstance(100, object))  
print(isinstance('hello', object))  
print(isinstance(True, object))  
print(isinstance(None, object))  
print(isinstance([10, 20, 30], object))  
print(isinstance({'吃饭', '睡觉'}, object))  
​  
# 所有对象都继承了object类所提供的：各种属性和方法，从而保证了每个对象都具备统一的基本能力  
print(object.__dict__)  
for key in object.__dict__:  
    print(key)  
​  
p1 = Person('张三', 18, '男')  
print(p1.__dict__)  # 对象身上自己的东西  
print(dir(p1))  # 对象可以访问到的东西（自己的、继承过来的）**
```
方法

![image-20260616163748071]D:\ObsidianVaults\Obsidian_note\Atlas\Notes\论文\Python基础\Assets\image-20260616163748071.png)

#### 9.17标准多态

学习

代码
```python
# 多态的概念：同一个方法名，在不同的对象上调用时，能呈现出不同的行为  
# Python中支持：标准多态、鸭子多态  
class Animal:  
    def speak(self):  
        print('动物正在发出声音！')  
​  
​  
class Dog(Animal):  
    def speak(self):  
        print('汪汪汪！')  
​  
​  
class Cat(Animal):  
    def speak(self):  
        print('喵喵喵！')  
​  
​  
class Pig:  
    def speak(self):  
        print('哼哼哼！')  
​  
​  
def make_sound(animal: Animal):  
    # 多态的体现  
    animal.speak()  
​  
​  
# 创建实例对象  
a1 = Animal()  
d1 = Dog()  
c1 = Cat()  
p1 = Pig()  
​  
make_sound(a1)  
make_sound(d1)  
make_sound(c1)  
make_sound(p1)  # 此行代码如果在其它语言中会报错，Python不会报错，不推荐这样写
```

方法
![img](file:///C:\Users\行走的~1\AppData\Local\Temp\QQ_1781599332428.png)
#### 9.18鸭子多态

学习

代码

​

方法

#### 9.19抽象类

学习

代码

​

方法

#### 9.20小练习

学习

代码

​

方法

#### 9.21内存分析

学习

代码

​

方法

#### 9.22重新认识函数

学习

代码

​

方法

#### 9.23多返回值-参数的打包与解包

学习

代码

​

方法