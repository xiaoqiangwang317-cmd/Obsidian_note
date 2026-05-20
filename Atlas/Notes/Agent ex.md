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