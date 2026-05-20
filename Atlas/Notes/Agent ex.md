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