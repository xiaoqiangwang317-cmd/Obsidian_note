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
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
```
%%