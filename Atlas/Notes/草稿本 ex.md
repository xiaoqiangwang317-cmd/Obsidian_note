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
```
%%