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

## Embedded Files
15cb588d19158813839e1d25d9b897e5c3008a9a: [[Pasted Image 20260525164856_483.png]]

6b7517274d6421cfa6f3c610fcf787372ab52866: [[Pasted Image 20260525165125_378.png]]

%%
## Drawing
```compressed-json
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

ymCiIAA=
```
%%