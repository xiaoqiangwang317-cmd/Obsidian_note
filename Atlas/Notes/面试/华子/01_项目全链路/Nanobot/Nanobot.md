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

## Embedded Files
15cb588d19158813839e1d25d9b897e5c3008a9a: [[Pasted Image 20260525164856_483.png]]

6b7517274d6421cfa6f3c610fcf787372ab52866: [[Pasted Image 20260525165125_378.png]]

%%
## Drawing
```compressed-json
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
```
%%