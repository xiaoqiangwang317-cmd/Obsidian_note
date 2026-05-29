---
up:
related:
date: 2026-05-29
---
## 好 Skill 的核心标准

一个好的 Skill 应该满足 5 点。

**1. 触发场景明确**

它要清楚告诉模型：

`什么时候应该使用这个 Skill 什么时候不应该使用这个 Skill`

比如日志分析 Skill：

`Use this skill when the task involves application logs, server logs, stack traces, deployment logs, or runtime error output. Do not use this skill for general code review unless logs or errors are involved.`

这能避免模型什么任务都乱套用。

**2. 操作流程可执行**

好的 Skill 不是空泛地说“请认真分析日志”，而是给出明确步骤：

`1. Identify timestamps, service names, request ids, and error levels. 2. Extract high-signal lines: ERROR, FATAL, Traceback, Exception, timeout, refused. 3. Group repeated errors. 4. Infer the likely cause from evidence. 5. Give next steps with concrete checks.`

它应该像一个 SOP，而不是口号。

**3. 工具使用有边界**

如果项目里有工具，比如 grep、read_file、exec、MCP，Skill 要告诉模型怎么用：

`Prefer grep before reading full large files. Use read_file only for focused slices. Use exec only as a last resort. Do not scan binary or generated files.`

这类规则会显著减少乱用工具、乱读大文件、乱跑命令。

**4. 输出格式稳定**

好的 Skill 会约束最终输出结构，让结果可读、可比较、可用于后续自动化：

`Always end with: - Observed: what the logs actually show - Likely Cause: root cause inference - Next Step: concrete fix or verification`

这比“随便总结一下”可靠很多。

**5. 短而密，不堆废话**

Skill 是要进 system prompt 的，会占 token。  
所以好的 Skill 应该：

- 短
- 明确
- 可执行
- 避免重复
- 不写背景故事
- 不塞大量例子，除非例子很关键

一句话：**越像资深工程师写给同事的工作清单，越好。**

## 一个好的 Skill 应该包含哪些部分

通常我会按这个模板写：

`--- name: log-parser description: Analyze logs, stack traces, and runtime errors. always: false --- # Log Parser ## When To Use Use this skill when the user provides logs, stack traces, runtime errors, deployment failures, or asks for root-cause analysis. ## Workflow 1. Identify source, timestamp, severity, request id, and service/component. 2. Extract high-signal errors before reading surrounding context. 3. Group repeated errors and preserve first occurrence. 4. Infer root cause only from evidence. 5. Separate facts from hypotheses. ## Tooling - Use grep for broad search. - Use read_file for targeted context. - Use exec only when file tools cannot answer the question. - Avoid reading huge logs fully unless asked. ## Output Return: - Observed: concrete log evidence - Likely Cause: root cause with confidence - Next Step: specific verification or fix`

## 面试怎么说更有深度

可以这样回答：

> 我认为好的 Skill 不是简单 prompt，而是一个任务级别的操作协议。它需要定义触发条件、执行步骤、工具选择策略、失败处理方式和输出结构。这样模型不是靠“泛泛聪明”完成任务，而是被约束在一套稳定、可复用、可观测的工作流里。

再补一句工程化视角：

> 在 Agent 系统里，Skill 的价值是把隐性经验显式化，把一次性的 prompt 变成可维护资产。它应该尽量小而专，能被上下文按需加载，并且不会污染其他任务。

## 好 Skill 和差 Skill 的区别

差 Skill：

`你是一个日志分析专家，请认真分析日志，给出原因和建议。`

问题是：

- 太泛
- 没流程
- 没工具边界
- 没输出标准
- 不可复用

好 Skill：

`Use when logs or stack traces are present. First extract timestamp/severity/request id. Search ERROR/FATAL/Exception before reading large files. Group duplicates. Report Observed / Likely Cause / Next Step. Do not invent root causes without evidence.`

它像一个小型工作流，模型可以照着做。

## 在 nanobot 这个项目里怎么落地

结合这个项目，一个好的 Skill 要考虑它会被塞进：

`# Active Skills`

或者：

`# Skills`

所以要注意：

- description 要写清楚，因为 summary 阶段会展示给模型
- always: true 要慎用，只有非常通用的 Skill 才常驻
- 专项 Skill 建议 always: false，让模型按 summary 再用 read_file 加载
- 如果 Skill 依赖工具，要明确工具名和使用顺序
- 如果 Skill 依赖环境，要写 requires

## 如果面试官让你现场写

你可以先说：

> 我会先明确这个 Skill 的使用边界，再写 workflow、tooling、output 三段，保证它能被模型稳定执行。

然后给出骨架：

`--- name: incident-log-analysis description: Analyze incident logs and produce evidence-based root-cause summaries. always: false --- # Incident Log Analysis ## When To Use Use when the task includes logs, stack traces, error screenshots, deployment output, or incident timelines. ## Workflow 1. Identify timestamp range, service/component, severity, request id, and environment. 2. Extract high-signal lines first: ERROR, FATAL, Traceback, Exception, timeout, refused, denied. 3. Group repeated errors and keep the earliest occurrence. 4. Read surrounding context only around high-signal lines. 5. Distinguish observed facts from inferred causes. 6. If evidence is insufficient, say what data is missing. ## Tooling - Use grep before read_file for large logs. - Use read_file with offset/head_limit for focused context. - Avoid exec unless built-in tools cannot inspect the data. - Do not modify files during diagnosis. ## Output Return: - Observed: - Timeline: - Likely Cause: - Confidence: - Next Step:`

这就是一个面试里很稳的答案。  
它体现了你不是“会写 prompt”，而是理解 **Agent 行为约束怎么工程化**。