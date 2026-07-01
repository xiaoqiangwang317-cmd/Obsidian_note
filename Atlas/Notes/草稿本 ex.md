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
用户问题(User Query)
eg:现在几点了？ ^cfe3bCYE

  Agent接收任务
























 ^3MiM0YWE

提示词组装 build_prompt() ^PfLCm4vY

模型动作决策run_agent() ^LYF9jENw

执行 ^ToJFayrU

整理结果 ^Pe9B0JF9

## Element Links
NsMHstCz: [[Atlas/Notes/草稿本 ex.md#python 1]]

wf1DvRbS: [[Atlas/Notes/草稿本 ex.md#python 2]]

WEEhk66L: [[Atlas/Notes/草稿本 ex.md#python 3]]

lGFgd0fM: [[Atlas/Notes/草稿本 ex.md#python 5]]

%%
## Drawing
```compressed-json
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

qUSTsYHBBkwBSLMEAA==
```
%%