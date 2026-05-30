---
up:
related:
date: 2026-05-30
---
我们用这个用户输入做例子：

text

读取 nanobot/agent/runner.py 前20行

这里最可能会触发的是文件读取类工具，比如：

text

`read_file
## 全局流程

整体还是这条 Agent 主线：

text

用户输入 -> InboundMessage -> MessageBus -> AgentLoop._dispatch -> AgentLoop._process_message -> RESTORE -> COMPACT -> COMMAND -> BUILD -> RUN -> SAVE -> RESPOND -> OutboundMessage -> 用户看到结果

Tool 主要发生在：

`RUN 阶段`

也就是 AgentRunner 里。

完整展开是：


用户输入“读取 nanobot/agent/runner.py 前20行” -> AgentLoop BUILD 组装上下文 -> AgentLoop RUN 调用 AgentRunner -> AgentRunner 请求模型 -> 模型看到 tool schema -> 模型选择 read_file 工具 -> AgentRunner 解析 tool_call -> ToolRegistry 找到 read_file 工具 -> 执行 ReadFileTool.execute(...) -> 读取 runner.py 前20行 -> 工具结果作为 tool message 回填 -> AgentRunner 再请求模型 -> 模型总结/原样返回文件内容 -> AgentLoop SAVE -> AgentLoop RESPOND -> 用户看到前20行

## Tool 注册流程

工具在 AgentLoop 初始化时注册。

核心位置：

- loop.py
- loader.py
- registry.py

启动时：

text

`AgentLoop.__init__ -> self.tools = ToolRegistry() -> self._register_default_tools() -> ToolLoader().load(ctx, self.tools) -> registry.register(tool)`

所以 read_file 这种工具一开始就被注册进：

python

`ToolRegistry._tools`

模型后面看到的所有工具，都是从这里出来的。

## Tool Schema 流程

工具不是直接把 Python 函数暴露给模型，而是通过 schema。

比如 read_file 会暴露类似：

json

`{ "type": "function", "function": { "name": "read_file", "description": "...", "parameters": { "type": "object", "properties": { "path": {"type": "string"}, "offset": {"type": "integer"}, "limit": {"type": "integer"} }, "required": ["path"] } } }`

这一步发生在：

text

`ToolRegistry.get_definitions()`

Runner 请求模型前，会把这些 tool definitions 一起传给 provider。

所以模型之所以知道有 read_file，靠的是：

text

`Tool.name Tool.description Tool.parameters/schema`

不是靠 Python 函数名。

## 用户输入后的 Tool 调用流程

当用户输入：

text

`读取 nanobot/agent/runner.py 前20行`

进入 RUN 后：

text

`AgentRunner.run(...) -> response = await self._request_model(...)`

模型可能返回：

python

`ToolCallRequest( name="read_file", arguments={ "path": "nanobot/agent/runner.py", "offset": 0, "limit": 20 } )`

然后进入：

text

`AgentRunner._execute_tools(...)`

里面会逐个执行 tool call。

大致流程是：

text

`tool_call.name = read_file -> ToolRegistry.prepare_call(...) -> 找到 read_file 工具对象 -> 校验/整理参数 -> tool.execute(**params) -> 得到结果 -> 包成 tool result message`

## Read File 专属流程

对于这个例子，专属工具是文件读取工具。

大概链路是：

text

`ToolRegistry -> ReadFileTool -> path 解析 -> workspace 安全检查 -> 读取文件 -> 按 offset/limit 截取 -> 格式化输出 -> 返回给 Runner`

你可以理解为：

text

`read_file("nanobot/agent/runner.py", limit=20)`

实际会做这些事：

1. 把相对路径解析到 workspace：

text

`D:\workplace\nanobot\nanobot\agent\runner.py`

2. 检查路径是否在允许范围内：

text

`workspace boundary check`

3. 读取文件内容。
    
4. 按行截取前 20 行。
    
5. 返回文本结果，比如：
    

text

`1 | """Agent runner...""" 2 | from __future__ import annotations ... 20 | ...`

## 工具结果怎么回到模型

工具执行完成后，Runner 不会直接把结果展示给用户作为最终答案。  
它会先把结果加回 messages：

text

`assistant message with tool_calls tool message with read_file result`

然后再请求模型：

text

`AgentRunner -> _request_model(...)`

模型看到工具结果后，再生成最终回答：

text

`以下是 nanobot/agent/runner.py 前 20 行： ...`

所以 Tool 调用通常是两次模型交互：

text

`第一次：模型决定用什么工具 工具执行：read_file 第二次：模型基于工具结果回答用户`