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

二、GitHub平台的官方特化配置目录 ^DTXlR4Mp

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
```
%%