正常 Skill 往下推，可以按“两段”理解：

1. **Skill 被加载进上下文**
2. **带着 Skill 的上下文被模型使用**

## 全局流程

完整一轮是：

```
用户输入 -> InboundMessage -> MessageBus -> AgentLoop._dispatch -> AgentLoop._process_message -> RESTORE -> COMPACT -> COMMAND -> BUILD -> RUN -> SAVE -> RESPOND -> OutboundMessage -> 用户看到回复
```

Skill 发生在这里：

```
BUILD 阶段
```

也就是说，Skill 不在 Runner 里“动态执行”，而是在请求模型前就被写进 system prompt。

## Skill 加载流程

在 BUILD 阶段，代码会走：

```
AgentLoop._state_build -> ctx.history = ctx.session.get_history(...) -> ctx.initial_messages = self._build_initial_messages(...) -> ContextBuilder.build_messages(...) -> ContextBuilder.build_system_prompt(...)
```

进入 build_system_prompt() 后，会按顺序拼 parts：

```
identity / runtime / workspace AGENTS.md / SOUL.md / USER.md tool_contract.md # Memory # Active Skills # Skills # Recent History [Archived Context Summary]
```

Skill 重点是这几行：

```
always_skills = self.skills.get_always_skills() always_content = self.skills.load_skills_for_context(always_skills) parts.append(f"# Active Skills\n\n{always_content}")
```

它做的事是：

```
扫描 .nanobot-workspace/skills 扫描 nanobot/skills 读取每个 SKILL.md 的 frontmatter 找 always: true 的 skill 读取 SKILL.md 正文 去掉 frontmatter 拼成 ### Skill: xxx 塞进 # Active Skills
```

所以你的 log-parser 会变成：

```
# Active Skills ### Skill: log-parser ...你的日志解析规则...
```

然后进入：

```
ctx.initial_messages[0]["content"]
```

这一条就是最终 system prompt。

## 往模型推送流程

接着状态机从 BUILD 进入 RUN：

```
AgentLoop._state_run -> self._run_agent_loop(ctx.initial_messages, ...) -> AgentRunner.run(...)
```

Runner 接到的是：

```
initial_messages
```

里面已经有 Skill 了。

Runner 内部会创建：

```
messages = list(initial_messages)
```

然后在请求模型前生成：

```
messages_for_model
```

messages_for_model 会做一些清洗，比如：

- 删除孤儿 tool result
- 补齐缺失 tool result
- 压缩过大的工具输出
- 修复 provider 不接受的消息结构

最后：

```
response = await self._request_model(spec, messages_for_model, hook, context)
```

这一步才是真正把带 Skill 的上下文发给模型。

## 模型如何使用 Skill

模型并不知道“这是一个 Python Skill 系统”。
它看到的是 system prompt 里的文本：

```
# Active Skills ### Skill: log-parser ...
```

然后它会按里面的指令行动，比如：

- 遇到日志分析任务时使用 log-parser 的步骤
- 先找 ERROR/FATAL/Traceback
- 按 Observed / Likely Cause / Next Step 输出
- 必要时使用 grep/read_file 查日志

所以 Skill 的本质是：

```
结构化 prompt 注入
```

不是插件执行，不是 Python 回调。

## 如果模型继续调用工具

如果 Skill 里建议使用工具，比如：

```
Use grep for fast search Use read_file for targeted inspection
```

那模型可能在 RUN 阶段返回 tool call：

```
grep(...) read_file(...)
```

Runner 会执行工具，再把结果加回 messages，然后再请求模型。

所以后半段可能是：

```
LLM sees Skill -> returns tool_calls -> AgentRunner executes tools -> tool results appended -> LLM summarizes with Skill format -> final answer
```

## 最终保存和返回

模型返回最终回答后：

```
AgentRunner 返回 final_content -> AgentLoop._state_save 保存 session -> AgentLoop._state_respond 生成 OutboundMessage -> CLI / WebUI 显示
```

## 一句话总结

Skill 的全流程就是：

```
SKILL.md -> SkillsLoader 发现并读取 -> ContextBuilder 拼进 system prompt -> ctx.initial_messages[0] -> Runner 生成 messages_for_model -> Provider 请求模型 -> 模型按 Skill 指令决定回答/工具调用 -> Runner 执行工具循环 -> AgentLoop 保存并返回
```

你可以把它理解成：

**Skill 是在 BUILD 阶段变成 prompt 的；到了 RUN 阶段，它已经只是 system message 的一部分，被模型自然遵守。**