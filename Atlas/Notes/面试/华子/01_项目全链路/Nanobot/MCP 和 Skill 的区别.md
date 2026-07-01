---
up:
related:
date: 2026-05-29
---
Skill 是：

text

SKILL.md -> system prompt -> 影响模型怎么想、怎么做

MCP 是：

text

外部 server -> list_tools -> ToolRegistry -> 模型可调用工具 -> call_tool

更直观：

text

Skill = 给模型一份操作说明 MCP = 给模型挂一组可执行外部能力

## 正常 MCP 全流程总结

用一条完整链路串起来：

text

config.json 配置 playwright -> gateway 启动 -> AgentLoop._connect_mcp -> connect_mcp_servers -> 启动 npx @playwright/mcp 子进程 -> ClientSession.initialize() -> ClientSession.list_tools() -> MCPToolWrapper 包装 browser_* 工具 -> ToolRegistry 注册 mcp_playwright_* -> 用户输入“打开 example.com” -> AgentLoop BUILD 组上下文 -> AgentRunner RUN 请求模型 -> 模型返回 mcp_playwright_browser_navigate -> Runner 执行工具 -> MCPToolWrapper.call_tool("browser_navigate", {"url": ...}) -> Playwright MCP server 执行 -> 工具结果回到 Runner -> Runner 再请求模型总结 -> AgentLoop 保存并响应

## 你调试时应该看哪些点

如果面试或源码调试，只看这几个就够：

### 挂载阶段

- mcp.py
    - session.initialize()
    - session.list_tools()
    - registry.register(wrapper)

看：

python

`cfg transport_type tools.tools wrapped_name registry.tool_names`

### LLM 选择工具阶段

- runner.py

看：

python

`response.tool_calls`

期望：

text

`mcp_playwright_browser_navigate`

### MCP 真执行阶段

- mcp.py

看：

python

`self.name self._original_name kwargs`

期望：

text

`self.name = mcp_playwright_browser_navigate self._original_name = browser_navigate kwargs = {"url": "https://example.com"}`

然后服务端收到：

text

`call_tool("browser_navigate", {"url": "https://example.com"})`

## 面试版一句话

如果面试官问这个项目 MCP 怎么实现，我会这样答：

> 这个项目把 MCP server 当成外部工具源。启动时根据 config.tools.mcp_servers 建立 MCP ClientSession，先 initialize，再 list_tools，把服务端返回的工具 schema 包装成 MCPToolWrapper 并注册到本地 ToolRegistry。之后在 AgentRunner 的 LLM 循环中，模型看到这些 mcp_<server>_<tool> 工具 schema，返回 tool call 后，Runner 调用 wrapper，wrapper 再把本地工具名映射回 MCP 服务端原始工具名，通过 session.call_tool(...) 执行。工具结果再回填给模型完成最终回答。

这段可以直接作为你面试时的主回答。