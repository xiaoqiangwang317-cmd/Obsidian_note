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

gD4DkDLy9tsxDj84QPIgFI6YEAA=
```
%%