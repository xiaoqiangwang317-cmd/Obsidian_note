---
excalidraw-plugin: parsed
tags:
  - excalidraw
---



# python

def build_prompt(question: str, scratchpad: str) -> str:  
    return f"""  
{SYSTEM_PROMPT}  
  
User question:  
{question}  
  
Current scratchpad:  
{scratchpad}  
""".strip()```


# python 1

```python
def build_prompt(question: str, scratchpad: str) -> str:
  return f"""
{SYSTEM_PROMPT}

User question:
{question}

Current scratchpad:
{scratchpad}
""".strip()
```


# python 2

```pthon
SYSTEM_PROMPT = """
You are a minimal Python agent.
Your job is to decide whether to call a tool or answer directly.

You must reply in JSON only.

If you need a tool, use:
{"type":"tool","tool_name":"get_time","tool_input":"..."}

If you can answer, use:
{"type":"final","answer":"..."}

Available tools:
1. get_time: Get the current local time.
2. read_knowledge: Read the local knowledge file for factual answers.
""".strip()
```


# python 3

```python
def run_agent(question: str) -> str:
    client = OllamaClient()
    scratchpad = "No tool has been used yet."

    for step in range(3):
        prompt = build_prompt(question, scratchpad)
        raw_reply = client.generate(prompt)
        action = extract_json(raw_reply)

        print("模型原始输出:", raw_reply)
        print("解析后的动作:", action)
```


# python 4

```python
def run_agent(question: str) -> str:
    client = OllamaClient()
    scratchpad = "No tool has been used yet."

    for step in range(3):
        prompt = build_prompt(question, scratchpad)
        raw_reply = client.generate(prompt)
        action = extract_json(raw_reply)

        print("模型原始输出:", raw_reply)
        print("解析后的动作:", action)
```


# python 5

```python
class OllamaClient:
    def __init__(
        self,
        model: str = "qwen2.5:3b",
        base_url: str = "http://127.0.0.1:11434/api/generate",
    ) -> None:
        self.model = model
        self.base_url = base_url

    def generate(self, prompt: str, *, temperature: float = 0.2) -> str:
        payload: dict[str, Any] = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": 512,
            },
        }
        body = json.dumps(payload).encode("utf-8")
        http_request = request.Request(
            self.base_url,
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with request.urlopen(http_request, timeout=120) as response:
            data = json.loads(response.read().decode("utf-8"))
        return data["response"].strip()
```


# python 6

```python
def extract_json(text: str) -> dict[str, Any]:
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError(f"Model did not return JSON: {text}")
    return json.loads(match.group())
```


# python 7

```python
if action["type"] == "final":
            return action["answer"]

        if action["type"] != "tool":
            raise ValueError(f"Unknown action: {action}")

        tool_name = action["tool_name"]
        tool_input = action.get("tool_input", "")
        if tool_name not in TOOLS:
            raise ValueError(f"Unknown tool requested: {tool_name}")

        observation = TOOLS[tool_name]["func"](tool_input)
        print("调用工具:", tool_name)
        print("工具返回:", observation)
        
        scratchpad = (
            f"Step {step + 1}\n"
            f"Tool used: {tool_name}\n"
            f"Tool input: {tool_input}\n"
            f"Observation: {observation}\n"
            "Now decide whether you should use another tool or give the final answer."
        )
    return "Agent stopped because it reached the max step limit."
```


# python 8

```python
def get_time(_: str = "") -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def read_knowledge(_: str = "") -> str:
    knowledge_path = Path(__file__).with_name("knowledge.txt")
    return knowledge_path.read_text(encoding="utf-8").strip()


TOOLS = {
    "get_time": {
        "description": "Get the current local time.",
        "func": get_time,
    },
    "read_knowledge": {
        "description": "Read the local knowledge file for factual answers.",
        "func": read_knowledge,
    },
}
```

# Excalidraw Data

## Text Elements
命令行工具应用 ^AkKQcuMi

定时任务/常驻任务 ^mcETd2i6

核心职责：存放 Agent 系统内部集成或供其调用的 CLI（命令行）小工具。 ^kKTZ16O6

技术逻辑：AI Agent（特别是具备 ReAct 模式、Tool Calling 能力的 Agent）经常需要通过执行 Shell 命令来与物理世界交互。这个目录下通常会编写一些原子化的脚本或编译好的二进制工具（比如代码分析器、特定格式转换器），由 Agent 在运行时动态调用。 ^0ITC0GNT

核心职责：存放定时触发或周期性执行的任务脚本。 ^I25Lu2WM

技术逻辑：这表明该 Agent 不仅仅是“被动响应”的对话机器人，它具备主动感知与异步批处理的能力。例如：定时巡检代码库、定期同步知识库（Embeddings 刷新）、定时生成系统健康报告等。 ^BzWMQe4D

核心职责：定义了这个 nanobot 项目的系统架构、模块边界、核心数据流以及技术选型规范。

盘点作用：当你或 AI Agent 修改代码时，必须遵循这个文件里声明的架构设计。它是防止 Agent 在自主编写代码时“跑偏”的顶层设计蓝图。 ^h3BdJk5g

## Embedded Files
15cb588d19158813839e1d25d9b897e5c3008a9a: [[Pasted Image 20260525164856_483.png]]

6b7517274d6421cfa6f3c610fcf787372ab52866: [[Pasted Image 20260525165125_378.png]]

%%
## Drawing
```compressed-json
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=
```
%%