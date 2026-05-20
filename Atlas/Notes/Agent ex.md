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

## Embedded Files
5961a57d4dcb4111029293b6135e6e679284bf11: [[Pasted Image 20260520113152_963.png]]

%%
## Drawing
```compressed-json
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
```
%%