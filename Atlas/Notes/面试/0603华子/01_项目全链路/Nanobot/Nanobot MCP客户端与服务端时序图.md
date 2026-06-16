# Nanobot MCP客户端与服务端时序图

## 概览

这次我们走通的是 `nanobot` 作为 **MCP 客户端**，通过 `stdio` 启动并连接 `@playwright/mcp` 作为 **MCP 服务端** 的完整链路。

- 客户端：`nanobot`
- 服务端：`npx -y @playwright/mcp@latest`
- 传输方式：`stdio`
- 典型工具：`mcp_playwright_browser_navigate`

## 时序图

```mermaid
sequenceDiagram
    autonumber
    participant User as User / CLI
    participant Loop as AgentLoop
    participant Ctx as ContextBuilder
    participant Runner as AgentRunner
    participant Registry as ToolRegistry
    participant McpClient as nanobot MCP Client<br/>mcp.py
    participant Transport as Stdio Transport
    participant McpServer as Playwright MCP Server
    participant Backend as BrowserBackend

    User->>Loop: 输入请求<br/>"请使用 mcp_playwright_ 开头的工具打开 https://example.com"

    Note over Loop,McpClient: 启动阶段或首轮消息前，先确保 MCP 挂载
    Loop->>McpClient: _connect_mcp()
    McpClient->>Transport: 启动子进程<br/>cmd /d /c npx -y @playwright/mcp@latest
    McpClient->>McpServer: initialize
    McpServer-->>McpClient: serverInfo + capabilities(tools)
    McpClient->>McpServer: list_tools
    McpServer-->>McpClient: browser_navigate / browser_snapshot / ...
    McpClient->>Registry: register(MCPToolWrapper)
    Registry-->>Loop: 本地可见工具名<br/>mcp_playwright_browser_navigate 等

    Loop->>Ctx: build_messages()
    Ctx-->>Loop: initial_messages(system + history + runtime)
    Loop->>Runner: _run_agent_loop(initial_messages)

    Runner->>Registry: get_definitions()
    Registry-->>Runner: 所有工具 schema<br/>包含 mcp_playwright_*
    Runner->>User: (内部) 把 messages + tool schemas 发给 LLM
    User-->>Runner: LLMResponse(tool_calls=[mcp_playwright_browser_navigate])

    Runner->>Registry: prepare_call(name, arguments)
    Registry-->>Runner: MCPToolWrapper + 校验后的参数
    Runner->>McpClient: MCPToolWrapper.execute(kwargs)
    McpClient->>McpServer: call_tool("browser_navigate", {url: "https://example.com"})

    alt 首次工具调用需要懒初始化浏览器后端
        McpServer->>Backend: initializeServer(...)
        Backend->>Backend: createBrowserWithInfo / newContext
    end

    McpServer->>Backend: backend.callTool("browser_navigate", args)

    alt 执行成功
        Backend-->>McpServer: toolResult(content)
        McpServer-->>McpClient: MCP CallToolResult
        McpClient-->>Runner: tool result
        Runner->>User: (内部) 再次请求 LLM 总结结果
        User-->>Runner: 最终回答
        Runner-->>Loop: final_content
        Loop-->>User: 输出最终答复
    else 执行失败(如浏览器未安装)
        Backend-->>McpServer: throw Error
        McpServer-->>McpClient: isError=true + "### Error ..."
        McpClient-->>Runner: tool error text
        Runner->>User: (内部) 再次请求 LLM 解释错误
        User-->>Runner: 自然语言错误说明
        Runner-->>Loop: final_content
        Loop-->>User: 输出错误说明/修复建议
    end
```

## 关键代码对应

### 客户端（nanobot）

- MCP 连接与挂载：`nanobot/agent/tools/mcp.py`
- Agent 外层状态机：`nanobot/agent/loop.py`
- LLM + 工具循环：`nanobot/agent/runner.py`
- 工具注册中心：`nanobot/agent/tools/registry.py`

### 服务端（Playwright MCP）

- CLI 入口：`@playwright/mcp/cli.js`
- MCP 命令装饰：`decorateMCPCommand(...)`
- 传输选择：`start2(factory, config.server)`
- 协议处理：
  - `new Server(...)`
  - `server.connect(transport)`
  - `server.setRequestHandler(ListToolsRequestSchema, ...)`
  - `server.setRequestHandler(CallToolRequestSchema, ...)`

## 你这次实际验证到的结论

1. `nanobot` 能成功作为 MCP 客户端连接服务端。
2. `initialize` 和 `list_tools` 已经走通。
3. 服务端返回的 `browser_*` 工具会被包装为本地的 `mcp_playwright_*` 工具名。
4. LLM 已经能选中 `mcp_playwright_browser_navigate`。
5. 真正的服务端执行发生在 `call_tool("browser_navigate", args)`。
6. 后续失败如果出现，多半是服务端运行环境问题，而不是 MCP 挂载链路问题。