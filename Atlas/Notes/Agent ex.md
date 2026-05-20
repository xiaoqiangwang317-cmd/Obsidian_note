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