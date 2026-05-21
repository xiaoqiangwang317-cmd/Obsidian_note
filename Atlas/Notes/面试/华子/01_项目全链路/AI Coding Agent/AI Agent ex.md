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

1 ^cAyzicDN

1. CodingAgentSystem 总入口 ^tzmX3rTK

2. WorktreeManager 负责隔离目录 ^Zks3iotp

3. SimplePlanner 生成执行步骤 ^OhnNxdsO

## Embedded Files
e3ecfafda94bf63da0c65ff1b6c5783671138f2f: [[Pasted Image 20260521193403_112.png]]

a1a1c63532911467bf94cc1e8bc0e06bab4d627e: [[Pasted Image 20260521193734_306.png]]

551c35e8d45d0c52410b9e8838672a7a4408eee5: [[Pasted Image 20260521193904_946.png]]

e08c89840bf1a2821181b3e8f59d1752a83a9c35: [[Pasted Image 20260521194126_165.png]]

cf5f6892afaf6ba999b52cb91d27480b6a948422: [[Pasted Image 20260521195113_357.png]]

%%
## Drawing
```compressed-json
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=
```
%%