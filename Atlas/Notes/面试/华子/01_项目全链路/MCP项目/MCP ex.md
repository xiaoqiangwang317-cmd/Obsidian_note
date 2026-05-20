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

# Excalidraw Data

## Text Elements
%%
## Drawing
```compressed-json
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=
```
%%