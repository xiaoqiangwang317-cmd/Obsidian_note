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

4.统一调工具 ^MKB9jPfT

5.真正推动步骤执行 ^p2869qjb

一、任务输入 ^NCxA4TDu

二、初始化目录 ^ZX1fFVh1

三、创建系统对象 ^ExDJPxf3


创建优先级

优先级一、二、三...
优先级1.2.3...
 ^kEMTWMWJ

## Embedded Files
e3ecfafda94bf63da0c65ff1b6c5783671138f2f: [[Pasted Image 20260521193403_112.png]]

a1a1c63532911467bf94cc1e8bc0e06bab4d627e: [[Pasted Image 20260521193734_306.png]]

551c35e8d45d0c52410b9e8838672a7a4408eee5: [[Pasted Image 20260521193904_946.png]]

e08c89840bf1a2821181b3e8f59d1752a83a9c35: [[Pasted Image 20260521194126_165.png]]

cf5f6892afaf6ba999b52cb91d27480b6a948422: [[Pasted Image 20260521195113_357.png]]

3b1085ae9bb189e74da73599bd32debd483b155f: [[Pasted Image 20260521195554_673.png]]

8d59be17060b1bec73456122d3f8b70d30e4bacf: [[Pasted Image 20260521195807_804.png]]

a4f4aae560ee9515c6984c48a52ade9a5c7e7cbe: [[Pasted Image 20260521195834_394.png]]

cfbc9f6de95ade2c9d3039671a02adc8fa28aad7: [[Pasted Image 20260521200735_629.png]]

736ced2f7015287cda314a649a8d54de4b025240: [[Pasted Image 20260521201110_494.png]]

2a43ac5c51ebc9d62fe65b3673413052bde5e011: [[Pasted Image 20260521201407_083.png]]

%%
## Drawing
```compressed-json
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=
```
%%