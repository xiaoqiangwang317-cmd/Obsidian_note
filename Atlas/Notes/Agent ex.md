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
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
```
%%