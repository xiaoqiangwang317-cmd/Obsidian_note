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

  Agent Controller
























 ^3MiM0YWE

提示词组装 build_prompt() ^PfLCm4vY

模型动作决策run_agent() ^LYF9jENw

执行extract_json() ^ToJFayrU

整理结果 ^Pe9B0JF9

模型原始输出 ^7Ji2V6wK

解析后的动作 ^EgQ10Sot

原始客户端生成 ^oA0Sovs8

拼接 ^3k22ZPqC

代码执行 ^TPrvhlyO

LLM ^HF0iQrVG

  
  Tools
    

              get_time()
              read_knowledge()









 ^kXFBwnHV

## Element Links
NsMHstCz: [[草稿本 ex#python 1]]

wf1DvRbS: [[草稿本 ex#python 2]]

WEEhk66L: [[草稿本 ex#python 3]]

lGFgd0fM: [[草稿本 ex#python 5]]

dP2amDRf: [[Atlas/Notes/Agent ex.md#python 6]]

xhEixteQ: [[Atlas/Notes/Agent ex.md#python 7]]

## Embedded Files
5961a57d4dcb4111029293b6135e6e679284bf11: [[Pasted Image 20260520113152_963.png]]

%%
## Drawing
```compressed-json
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=
```
%%