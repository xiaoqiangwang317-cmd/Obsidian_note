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
NsMHstCz: [[草稿本 ex#python 1]]

wf1DvRbS: [[草稿本 ex#python 2]]

WEEhk66L: [[草稿本 ex#python 3]]

lGFgd0fM: [[草稿本 ex#python 5]]

%%
## Drawing
```compressed-json
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
```
%%