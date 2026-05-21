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


# python 8

```python
def get_time(_: str = "") -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def read_knowledge(_: str = "") -> str:
    knowledge_path = Path(__file__).with_name("knowledge.txt")
    return knowledge_path.read_text(encoding="utf-8").strip()


TOOLS = {
    "get_time": {
        "description": "Get the current local time.",
        "func": get_time,
    },
    "read_knowledge": {
        "description": "Read the local knowledge file for factual answers.",
        "func": read_knowledge,
    },
}
```

# Excalidraw Data

## Text Elements
这就是 demo 的“用户输入”。
现在是写死在代码里的，真实系统里这一步本来应该来自：

CLI 输入
Web 表单
IDE 面板 ^lXdpuElV

## Embedded Files
e3ecfafda94bf63da0c65ff1b6c5783671138f2f: [[Pasted Image 20260521193403_112.png]]

a1a1c63532911467bf94cc1e8bc0e06bab4d627e: [[Pasted Image 20260521193734_306.png]]

551c35e8d45d0c52410b9e8838672a7a4408eee5: [[Pasted Image 20260521193904_946.png]]

%%
## Drawing
```compressed-json
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=
```
%%