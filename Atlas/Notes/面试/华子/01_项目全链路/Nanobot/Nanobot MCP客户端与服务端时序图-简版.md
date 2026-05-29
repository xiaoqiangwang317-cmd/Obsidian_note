# Nanobot MCP客户端与服务端时序图（简版）

```mermaid
sequenceDiagram
    participant User as User
    participant CLI as nanobot CLI
    participant Loop as AgentLoop
    participant Runner as AgentRunner
    participant Registry as ToolRegistry
    participant McpClient as MCP Client<br/>nanobot/agent/tools/mcp.py
    participant Stdio as Stdio Transport
    participant McpServer as Playwright MCP Server
    participant Backend as BrowserBackend

    User->>CLI: python -m nanobot.cli.commands gateway -v
    CLI->>Loop: AgentLoop.from_config(...)
    Loop->>McpClient: _connect_mcp()
    McpClient->>Stdio: 启动子进程<br/>cmd /d /c npx -y @playwright/mcp@latest
    McpClient->>McpServer: session.initialize()
    McpServer-->>McpClient: serverInfo + capabilities(tools)
    McpClient->>McpServer: session.list_tools()
    McpServer-->>McpClient: browser_navigate / browser_snapshot / ...
    McpClient->>Registry: register(MCPToolWrapper)
    Registry-->>Loop: mcp_playwright_* 已挂载

    User->>CLI: 请使用 mcp_playwright_ 开头的工具打开 https://example.com
    CLI->>Loop: _dispatch(msg)
    Loop->>Loop: _process_message()
    Loop->>Runner: _run_agent_loop(initial_messages)
    Runner->>Registry: get_definitions()
    Registry-->>Runner: 返回全部工具 schema<br/>包含 mcp_playwright_*
    Runner->>Runner: _request_model(...)
    Runner-->>Runner: response.tool_calls = mcp_playwright_browser_navigate
    Runner->>Runner: _execute_tools(...)
    Runner->>Registry: prepare_call(name, args)
    Registry-->>Runner: MCPToolWrapper
    Runner->>McpClient: MCPToolWrapper.execute(kwargs)
    McpClient->>McpServer: call_tool("browser_navigate", {url})

    alt 首次工具调用，服务端懒初始化浏览器后端
        McpServer->>Backend: initializeServer(...)
        Backend->>Backend: createBrowserWithInfo(...)
        Backend->>Backend: new BrowserBackend(...)
    end

    McpServer->>Backend: backend.callTool("browser_navigate", args)

    alt 成功
        Backend-->>McpServer: toolResult
        McpServer-->>McpClient: CallToolResult
        McpClient-->>Runner: tool result
        Runner->>Runner: 再次请求 LLM 整理结果
        Runner-->>Loop: final_content
        Loop-->>User: 输出页面标题/结果
    else 失败
        Backend-->>McpServer: throw Error
        McpServer-->>McpClient: isError=true + ### Error
        McpClient-->>Runner: tool error text
        Runner->>Runner: 再次请求 LLM 解释错误
        Runner-->>Loop: final_content
        Loop-->>User: 输出错误说明
    end
```

## 关键观察点

- 客户端挂载成功标志：日志出现 `registered tool 'mcp_playwright_*'`
- LLM 真的选中 MCP 标志：`response.tool_calls` 里出现 `mcp_playwright_browser_navigate`
- 真正打到服务端标志：`self._session.call_tool(self._original_name, arguments=kwargs)`
- 服务端真正执行标志：进入 `CallToolRequestSchema` handler -> `backend.callTool(...)`