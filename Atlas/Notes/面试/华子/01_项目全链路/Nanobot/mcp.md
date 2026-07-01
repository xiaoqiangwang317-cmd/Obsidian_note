1. **全局流程：用户输入到输出**
2. **MCP 专属流程：MCP server 怎么挂载、工具怎么被模型调用**

这里用你刚才那个例子：

```
请使用 mcp_playwright_ 开头的工具打开 https://example.com 并告诉我页面标题，不要使用 exec。
```

## 全局流程

用户输入进入系统后，整体还是走 AgentLoop 状态机：

```
用户输入 -> InboundMessage -> MessageBus -> AgentLoop._dispatch -> AgentLoop._process_message -> RESTORE -> COMPACT -> COMMAND -> BUILD -> RUN -> SAVE -> RESPOND -> OutboundMessage -> 用户看到回复
```

MCP 主要参与两个阶段：

```
启动阶段 / 请求前：MCP server 挂载，注册工具 RUN 阶段：模型选择 MCP 工具，Runner 执行工具
```

全局拆开是：

```
gateway 启动 -> 读取 config.tools.mcp_servers -> 连接 playwright MCP server -> initialize -> list_tools -> 注册 mcp_playwright_* 工具 用户输入 -> AgentLoop BUILD 组 prompt -> prompt 里包含可用工具说明/工具 schema -> AgentLoop RUN 调 AgentRunner -> AgentRunner 请求模型 -> 模型返回 tool_call: mcp_playwright_browser_navigate -> Runner 执行工具 -> MCPToolWrapper 转成服务端原始工具名 browser_navigate -> call_tool(browser_navigate, {"url": "https://example.com"}) -> Playwright MCP server 执行 -> 工具结果回到 Runner -> Runner 再请求模型总结 -> AgentLoop SAVE/RESPOND -> 用户看到标题或错误
```

## MCP 挂载流程

这个发生在 gateway 启动或首次需要连接 MCP 时。

配置来源是：

config.json

里面类似：

json
```
"tools": {  "mcpServers": {    "playwright": {      "type": "stdio",      "command": "npx",      "args": ["-y", "@playwright/mcp@latest"],      "enabledTools": ["*"],      "toolTimeout": 60    }  } }
```

然后项目里走：

text
```
AgentLoop._connect_mcp -> agent_context.connect_mcp -> mcp_tools.connect_missing_servers -> connect_mcp_servers
```

核心文件是：

- mcp.py
- context.py

对于 stdio 类型，nanobot 会启动子进程：

text
```
cmd /d /c npx -y @playwright/mcp@latest
```

然后建立 MCP ClientSession：

text
```
ClientSession(read, write) -> session.initialize() -> session.list_tools()
```

你之前看到的就是这里。

list_tools() 返回服务端原始工具：

text
```
browser_navigate browser_snapshot browser_click browser_type browser_close ...
```

nanobot 会包装成本地工具名：

text
```
mcp_playwright_browser_navigate mcp_playwright_browser_snapshot mcp_playwright_browser_click ...
```

然后注册到：

text
```
ToolRegistry
```

所以日志里出现：

text
```
MCP: registered tool 'mcp_playwright_browser_navigate' from server 'playwright' MCP server 'playwright': connected, 23 capabilities registered
```

这就是挂载成功。

## MCP 工具 schema 流程

MCP server 返回的不只是工具名，还会返回：

text
```
name description inputSchema
```

nanobot 会用：

text
```
MCPToolWrapper
```

把它变成本项目通用 Tool。

大致是：

text
```
MCP tool: browser_navigate -> MCPToolWrapper -> name: mcp_playwright_browser_navigate -> original_name: browser_navigate -> parameters: inputSchema -> registry.register(wrapper)
```

这里有一个关键点：

text
```
模型看到的是 mcp_playwright_browser_navigate 服务端真正执行的是 browser_navigate
```

也就是说，wrapper 做了“本地名字”和“服务端名字”的映射。

## 用户输入后的调用流程

当你输入：

text
```
请使用 mcp_playwright_ 开头的工具打开 https://example.com 并告诉我页面标题，不要使用 exec。
```

进入 BUILD 阶段后，系统会组装：

text
```
system prompt history current user message runtime context tool definitions
```

然后到 RUN 阶段：

text
```
AgentRunner.run -> response = await self._request_model(...)
```

模型收到工具 schema 后，选择调用：

python
```
ToolCallRequest(    name="mcp_playwright_browser_navigate",    arguments={"url": "https://example.com"} )
```

这一步说明：

text
```
LLM 已经看到了 MCP 工具，并且选择了它
```

然后 Runner 进入工具执行：

text
```
AgentRunner._execute_tools -> AgentRunner._run_tool -> ToolRegistry.prepare_call -> MCPToolWrapper.execute(...)
```

在 MCPToolWrapper.execute() 里发生真正的 MCP 调用：

python
```
self._session.call_tool(    self._original_name,    arguments=kwargs )
```

对你的例子来说就是：

python
```
call_tool("browser_navigate", {"url": "https://example.com"})
```

## MCP 服务端流程

服务端是外部包：

text
```
@playwright/mcp
```

启动入口是：

text
```
npx -y @playwright/mcp@latest
```

它的服务端流程是：

text
```
cli.js -> tools.decorateMCPCommand(...) -> start2(factory, config.server) -> new StdioServerTransport() -> connect(factory, transport, false) -> createServer(...) -> new Server(...) -> server.connect(transport)
```

关键注册点是：

js
```
server.setRequestHandler(ListToolsRequestSchema, ...) server.setRequestHandler(CallToolRequestSchema, ...)
```

所以服务端侧是：

text
```
initialize -> MCP SDK 自动处理 list_tools -> 返回 factory.toolSchemas call_tool -> backend.callTool(name, arguments)
```

对你这个例子：

text
```
call_tool("browser_navigate", {"url": "https://example.com"}) -> Playwright backend -> 打开浏览器 -> 导航到 example.com -> 返回页面状态/快照/错误
```

你之前遇到的错误：

text
```
Chromium distribution 'chrome' is not found
```

就发生在服务端第一次真正执行 call_tool 时。
也就是：

text
```
list_tools 成功 工具注册成功 LLM 也选中工具 但 Playwright server 初始化浏览器 backend 失败
```

所以那不是 nanobot MCP 挂载失败，而是服务端环境依赖问题。