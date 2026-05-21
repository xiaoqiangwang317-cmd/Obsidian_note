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
e3ecfafda94bf63da0c65ff1b6c5783671138f2f: [[Pasted Image 20260521193403_112.png]]

%%
## Drawing
```compressed-json
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
```
%%