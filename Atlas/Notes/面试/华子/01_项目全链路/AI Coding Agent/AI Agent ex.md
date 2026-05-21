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

1. CodingAgentSystem 总入口 ^tzmX3rTK

2. WorktreeManager 负责隔离目录 ^Zks3iotp

3. SimplePlanner 生成执行步骤 ^OhnNxdsO

## Embedded Files
e3ecfafda94bf63da0c65ff1b6c5783671138f2f: [[Pasted Image 20260521193403_112.png]]

a1a1c63532911467bf94cc1e8bc0e06bab4d627e: [[Pasted Image 20260521193734_306.png]]

551c35e8d45d0c52410b9e8838672a7a4408eee5: [[Pasted Image 20260521193904_946.png]]

e08c89840bf1a2821181b3e8f59d1752a83a9c35: [[Pasted Image 20260521194126_165.png]]

cf5f6892afaf6ba999b52cb91d27480b6a948422: [[Pasted Image 20260521195113_357.png]]

3b1085ae9bb189e74da73599bd32debd483b155f: [[Pasted Image 20260521195554_673.png]]

8d59be17060b1bec73456122d3f8b70d30e4bacf: [[Pasted Image 20260521195807_804.png]]

a4f4aae560ee9515c6984c48a52ade9a5c7e7cbe: [[Pasted Image 20260521195834_394.png]]

%%
## Drawing
```compressed-json
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
```
%%