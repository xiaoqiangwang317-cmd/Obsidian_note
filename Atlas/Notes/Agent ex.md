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

原始客户端生成 ^oA0Sovs8

拼接 ^3k22ZPqC

代码执行 ^TPrvhlyO

LLM ^HF0iQrVG

  
  Tools
    

              get_time()
              read_knowledge()









 ^kXFBwnHV

模型原始输出 ^aeVCrdcI

解析后的动作 ^UI2YNy80

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
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=
```
%%