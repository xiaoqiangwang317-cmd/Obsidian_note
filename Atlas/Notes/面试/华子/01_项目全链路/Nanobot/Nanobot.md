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

核心职责：记录项目开发过程中遇到的隐藏 Bug、特例逻辑、历史包袱或环境依赖限制（Gotchas 意为“抓住你了/意想不到 compounding 陷阱”）。 ^XIQEXPS2

盘点作用：这是极其硬核的上下文。AI Agent 往往会因为缺乏经验而重复犯错（例如：某个 API 并发高了会限流、某个路径在 Windows 下斜杠会报错）。写在这里可以作为 Agent 的强约束，避免其生成的代码重蹈覆辙。 ^aM1Iny6w

核心职责：定义数据安全、API 密钥管理、权限控制（如 RBAC）、代码注入防御以及敏感数据脱敏等安全合规要求。 ^qNpEQm7r

盘点作用：由于 Agent 具备文件操作和代码执行能力，这个文件用于规范 Agent 的行为边界，防止其执行高危命令（如 rm -rf）或无意间泄露 ENV 凭证。 ^MZFXhQ1V

一、系统核心元数据、设计规约、以及本地运行时配置 ^6xGi9w99

二、GitHub ^DTXlR4Mp

## Embedded Files
15cb588d19158813839e1d25d9b897e5c3008a9a: [[Pasted Image 20260525164856_483.png]]

6b7517274d6421cfa6f3c610fcf787372ab52866: [[Pasted Image 20260525165125_378.png]]

ec5600d70b281a1aefc6434ebf75968fc71bca73: [[Pasted Image 20260525172141_826.png]]

2ae1783e605cf8a3fc9c3c21377f8c37347fd2ef: [[Pasted Image 20260525172858_704.png]]

bcce7e2d07b0361a9406eaf3be9d0b6e18308091: [[Pasted Image 20260525185329_100.png]]

%%
## Drawing
```compressed-json
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

EbhLjA5AQgLDqao5JuEC7QlMBRBAAA==
```
%%