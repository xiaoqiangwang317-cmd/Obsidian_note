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

拼接 ^3k22ZPqC

代码执行 ^TPrvhlyO

LLM

Ollama+Qwen2.5:3b ^HF0iQrVG

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
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
```
%%