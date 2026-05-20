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