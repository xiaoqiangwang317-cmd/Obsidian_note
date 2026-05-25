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
## Embedded Files
15cb588d19158813839e1d25d9b897e5c3008a9a: [[Pasted Image 20260525164856_483.png]]

6b7517274d6421cfa6f3c610fcf787372ab52866: [[Pasted Image 20260525165125_378.png]]

%%
## Drawing
```compressed-json
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=
```
%%