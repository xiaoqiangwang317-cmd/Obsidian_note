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

%%
## Drawing
```compressed-json
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
```
%%