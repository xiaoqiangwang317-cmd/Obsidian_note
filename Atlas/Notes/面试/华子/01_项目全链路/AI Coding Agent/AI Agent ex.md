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
这就是 demo 的“用户输入”。 ^UPEiBQrJ

现在是写死在代码里的，真实系统里这一步本来应该来自： ^jUDGKJhq

CLI 输入 ^vTrtRKxL

Web 表单 ^40PEMuA7

IDE 面板 ^lIlV8l3A

## Embedded Files
e3ecfafda94bf63da0c65ff1b6c5783671138f2f: [[Pasted Image 20260521193403_112.png]]

%%
## Drawing
```compressed-json
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
```
%%