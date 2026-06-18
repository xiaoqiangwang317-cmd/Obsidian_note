---
up:
related:
date: 2026-05-30
---
普通 Tool：

text

`本地 Python 类 -> ToolRegistry -> execute()`

MCP Tool：

text

`外部 MCP server -> MCPToolWrapper -> session.call_tool()`

但是对 Runner 来说，它们很像：

text

`tool_call.name -> registry 找工具 -> tool.execute(...) -> 返回结果`

也就是说，Runner 不太关心这个工具是本地工具还是 MCP 工具。

## 正常 Tool 全流程总结

用一条完整链路串起来：

text

`AgentLoop 启动 -> ToolLoader 自动发现工具 -> ToolRegistry 注册 read_file -> ToolRegistry.get_definitions() 生成工具 schema -> 用户输入“读取 runner.py 前20行” -> AgentLoop BUILD 组上下文 -> AgentRunner RUN 请求模型 -> 模型返回 tool_call: read_file -> AgentRunner._execute_tools -> ToolRegistry.prepare_call -> ReadFileTool.execute -> 路径解析 + workspace 检查 + 文件读取 + 截取前20行 -> 工具结果回填 messages -> AgentRunner 再请求模型 -> 模型生成最终回答 -> AgentLoop SAVE/RESPOND -> 用户看到结果`

## 调试时看哪些点

如果你要打断点，只看这几个：

### 工具注册

- loop.py
    
    - _register_default_tools
- loader.py
    
    - load(...)
- registry.py
    
    - register(...)

看：

python

`tool.name registry.tool_names`

### 模型选择工具

- runner.py

看：

python

`response.tool_calls`

期望看到：

text

`read_file`

### 工具执行

- runner.py

看：

python

`tool_call.name tool_call.arguments`

- registry.py

看：

python

`tool params`

- 文件读取工具实现文件：

text

`nanobot/agent/tools/filesystem.py`

看：

python

`ReadFileTool.execute(...)`

## 面试版回答

如果面试官问这个项目 Tool 怎么实现，可以这样说：

> 这个项目的 Tool 是通过本地 Tool 类 + ToolRegistry 实现的。AgentLoop 初始化时由 ToolLoader 自动发现并注册工具，每个工具暴露 name、description 和参数 schema。AgentRunner 请求模型时把 ToolRegistry 里的 schema 一起传给 LLM，模型返回 tool_call 后，Runner 通过 ToolRegistry 找到对应工具并执行 execute(**params)。执行结果会作为 tool message 回填到对话，再请求模型生成最终回答。MCP 工具也是同一套执行入口，只是它的 execute 内部转发到外部 MCP server 的 call_tool。