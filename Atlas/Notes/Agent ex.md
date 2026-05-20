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
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=
```
%%