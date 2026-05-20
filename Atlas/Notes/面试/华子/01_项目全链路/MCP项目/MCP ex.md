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

# Excalidraw Data

## Text Elements
User ^uqs5u78h

Frontend ^FzTO3jkZ

%%
## Drawing
```compressed-json
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebQBGAE5tAAYaOiCEfQQOKGZuAG1wMFAwMogSbggUmESAOQA2ADEAJS5+cthEKsDsKI5lYPSyyExuZ3iAdm0eAFYAFniAZhT4

niWGhpTNjsgYcfiF5Nn4+cntlZ4ADi2r3YgKEnVuObiGpMnZ7cn4hvmN+6SBCEZTSF4pOIrBb/eZXJaJS53YqQayDcSoFL3ZhQUhsADWCAAwmx8GxSFUcdZmHBcIFcsNyppcNg8cpcUIOMRiaTyRJKRxqbSclAGZAAGaEfD4ADKsCGEkEHlFEGxuIJAHUnpJuCltLMsTj8QhZTB5ehFZV7uzQRxwvk0HxkRA2DTsGp9mh4ilMU62cI4ABJYj21AF

AC69zF5GyQe4HCEUvuhE5WCquAAKsr2ZzbcwQ6URtB4OilsiAL5YhAIYjcSZLK5TRLzHjxe6MFjsLiexJtpisTh1ThibjxQ6JBqJX4NSZJ5gAEUyUGr3DFBDC900wk5AFFgtlciH44mnUI4MRcEua57JpNEjxJps60d7kQOHi4wn8C+2Czl2hV/gYTFBWxQFpAlQKgAjuqACapAAPIALJpPcXTohAvT9GiypjGgExXNolxLPMsKzNOSy3j2Toeqg

EzTrqKSzE23pbNOswzk6jzEM8DpXNMLYpHCDQ3EsSQNPqTpAiCYKemc2i3lc951g08IpJ8HGFqiZo+oWqpGtyZJVAAxDwYqJAgJHKkyLJ+hyXIkoZEhGfMKTYIxkzKhKUommaKokpaTp6RqWo6nqBpqsacroRaNZWsINp2i89wusy7ojt69y2YGwaFBGTpRrgMZXqgR5fk6ybEKmEi4AAqlmW7ELm+bIpAaHcKWIwgbpVbFf8fzzAiom9h2nAjkk

w39hwg4cMOskrIkkxnD8s4LsEl4rmuCAbg1u5ZMKIZFCMJQta1xYUlgIq7OUEHoEIkHMLMQiTFc2otWWyJ5YWp7nut163ve07PfW8wvsm75oKV36/sVAFAWUXXHYWN0QHdD1PS9yptXyF04dwVyzIRamCZsGz1hR9w0XR8QEZsELvHesIpEsSz3FxPGoLe2iJJOC31g+iSzKJjqFlJoIimg8wSZpAzaeF+kOby6BGfECAqyrVnMqy2b2TyxkuW57

GeZKMpRVUMXKkFCCatx2poLqUvlJbPnRf5sVOtakhNUlTopW6sDpTp5RZUGB2feUBVFR+x5IymuHoLVABq9V2V7EOfpWf6oI+PDvJMcwTZ2I7C+U7aTdNs2oIkDaCWs04rYumew1tTqbnZu37nkUdlV9Z4XpnUz/Q+z2KfMDRQwSMObahOMSDVYTklalDpjP6Bz0wnmcFA0qEEYJZj/lm9NIVko0Q7rUXQAgkQyhdugYi5Ovw1QOYBBXyCt8QPoJ

DEEM9x6LkuBkxMFjFBWCCFkLKjJCCZMBBl6YHFqveeypcBCCgGwFo4Qd7ohxEIZuhZXwIAABLAjFiOGYZ8pChDgVAAAMmDDagEEDAQ6GBCoxUIDEBoQAaQAIoIAAFIBgAFYACF0wNBqpISCkhpSYBoc4QkABxTGZ0JCYS0kge4ccoR6nHN6B8fxfhMRBtRA45F5LXEOC2POsxrisxCrxfiXohIiTEhQ0WMlUCnGmApJSpNEhqXYvcDROo5YEgMor

CAJkzIWXmBrGy2sIl61cu5I23lTYKldhbQ0wUbahQoU7DJ5oslxT8J7RKDpkqujSp6DKvp2TZVDpGaMCAQElXTuVWOaYk6lJzBU1AYFTrdDQB1eGGdipejmO8Jm6wC6jU9MROZU0hzoi9OOCiNxRz1zWo3KeLcdp7n2oUFqgyhnoSXPA0U112FNCMOmeCSwhF4gAFoQDeh9e430+4TJvHeIeTYBatidK+cG7To7lFJNDBh65JJUIunQt80KmFjNA

uVG5dyHlPNeahVR6ALmXSdNoic2hDGSwCQsRa+MNLlEpr8HgkIeABOWANdyzZ7F5M9ExBISQEQuUUkzNY7iSGeMlsEmW6JA4CByUSBWxk1aq00S3TWtlORJKcvrVJkZjbOzNiUwK0rrbs3tmEyKpoXZKlKQlPM3tCy+xqV4uphZg45TQOGZphVWnFUhp0yqccIC4ATso3pjV+neu6pnJlvN8YsydKXQuCylnl1WYxL4hj87lXnA3SejDtpt0OQeL

unze6/S8b8gGVwUiLE+OPXZOanT4qqE0XED9ORZiXivCATbN45DdoWMUm9t673avvPth9j74FPtPeBb8b5VHvkuBesamDP3cDOj+X9iA/0VYWf+UQgGkDaRw7hfDBGiPEZI6Rsj5FKMgaQaBHBYEdq7S23t5QUFoIwawIdaAcF4IhUA4h0kEHxHIYCOF8CEWgqbsw1FSN2GkCuFcaU8E1YNEIVwxRhIAAK2AYKKPTNgGAhIVHDPQOo8VuM0DvAaF

zQ4QN6wNkWEiQstLNgEVhOcZ6XwfiLGLpANmtteB8RmM4jYrjxxCqAyOOSvibz+MCdSlEFG7YmrVUrUy5lLIbmVYk2V6qUmGy1eks1uqLX6oioawTxrzNGh1ZkszhYPap14FU1K/tamSogM6pp+UWltLDddLp1V1TJz6datAgyiykdGWABGAgerDp4KsAFSyxrMZLn2TsSai6LUnIxQ42yEAlqbrmnc+bO6urDpAL5JaB5/Poi2X4oNEVp3BZASF

E8kVgeYNQyDSKYNlFYcjdYu5CFCPwM8+IdR2IcH0AGbcLQ5z4ESBfEj6FyPYS0dwBEcRmxXCY5WkiOdFMQFY58bQI9ZgNhUjcOE7L2bXCcYJMTKk3GAmFcBmTVc/EqQCepMV2EVM2fCXp9TMStNKoSQ1NTUSNWGfytqopfkHOOwNQ4jEYVgemt8ubS15TwsuZ9tU9zDrPPedyu6yOrXu6Bd9WmAAGqFkNBPItY1QDFuLKoEtoBuAiG84kgWFjjfM

rxKxE0rLSw2PON5CvFb2YWVuZW9oFsq0Wn6/cy1D0O014F9Dqc1uzTCkW4HaF69QNBlFg20VVCEHUKAQiiGWHVE0eYYo8TwSgBwGAxB5iEMIWtnoCA+ghK256OYSwEiKVrhsLYVcR00rMedy7136zCXTYWATLxhMCRca9iT72pOyR8d9uTv2FMA9lljmH0TNNxO01Duy1e4ceSMybEz9mAq6TRxyjHBTpV2eKSjyATn+l8edMTmiXoycNJDhT3zH

r/MdJjnT6qMEmfOdZ7ijn4yRxLHYjt+lguMsjVvmsI/kBhfLJmqs6jpxJyy9rUbxkBzlcVdDFVlGxaNeD3ohOVYzXQUAt2sfxOt/x5dyhJATc+swDGEBtEZrkqghF9A4B1QEBFEhF4hMAL5NAIQYAUghAAxJB4J5gg161cUMIg8sJf5CURx2IQMSJqY+JmxJY4QTszs4h+UyVGV6wq4TtM9HERNnthI89xIC9SEi95IS9lJVJ/snQQkgcu8Ipq8N

NYl4ktZodQdYcDMW8EdjMcc9VFCjRLN8kTUB9kdO9ygR8Ccx87UScp9MoZ8XV39KdPVC0fUqp45sV3YGoN8WoosSxywd8ecIR2I1Jlol0T9pN48L9MsBwJdPRhIBYKU1IH9Dc/1IBFdiB24jlVcTwv8fkf86wWwBoAC3D8EQDH90jKEet4UzcLdYsWFrcJAWgREap0w6whAjAsM99AhIJnBJBCAWh+EeEAB9APNRSgkPGgz0RDGjYiEiL4C4OYRD

CmRPEDPff4eEeEBYWYMie7QTR7QQ3PUSfPSSD7aTYvRSUvGQoJOQ5TDEVTTQmvVQ+vdQxvJ45vNJNvfQofFUbvI1THQwgkMw3HbwspZzGwifAOBw/0WfXIvtPzL1JfWnDw/1XAdffpTfaLQIwKbnLOccelPiE7S/EcRacXa/dqY7StZ7VIrrfZPNV/HzHudXAo+rJ8eEKifBM3IAiADrSo7rXrOozaOAobdhGqHweCXANgJYIwcYvFHGUPVAI7VI

VYZsScM4WxMfVjelQiRlVYYiclRaMffgrxeYQibmbmHgv4fbCiSTcQpUiheQh4qvJ4+VdWV4lVHWRyJWT41vEEgw1HCzdHazIE7Hc1Cw4feKfHEMSEtzSfR1IORwpk8OREsolEv1ANHpMEsLQ8ZE+LDXQSCEDk4k2I2+GNIXUs7LBIr0SWMiZYWkn9UgXBUrLI8rXMtrT/Fk0kwopsJidLYAqFGAp/c+S5CQNtCgahKoDeXIQdPeSMMdL+CdbgCh

fFNdOdYUR+CIldV+a+ddb+agndTeQBW0A9dhThXhARYRMRCRKRGRORBRUg21O9fwR9Uc9AZBVBdBTBb9VAX9ZrIhc4z0UDWFGoiDIU2A+GcAT6f1OAOAWUPubgAsaAIEbIKoc8Ugd8DoBgQgBACgERHTDQ3WJyb0EilCYoCAbAEQOkKAAMJcfQWUJQ10hVd08iyi0gai2irIfChvVVD47QhkCiqi4UTi/QJoRHdvQfCwwS9i4Suihiow4MwEyANi

jiuS/vJHUE8oFS2SrIFoKMiErC7S3IES+CKEjzQyoS4yuipoBck+ZciymSqyrIGymcrBYdBy1SrIahNciQYIMUAlLSyymitS2kKAC+ditgCgIEXAJE8FaSzy/QbcTkcK3EKKkIdhWkVKgSoy4KrIFKyK9Mcg7WbKoKkSptD1PSs0ALFUbAXEKURnPCRlGjGuHgM4MmZlB2Gquq/ANfB0H4AiKYGs1iZ6Vq+PCAIwNgAwRC2NAgXBUKc4FyJmOA+K

nS/QPSlOfpDCBqAStkEgWc8ELC3a4gWUBAOAey8io6xCNgSqJK3ATQYINIw6u9L0xWVhEREkeDZQJkAACnrGoHZzuABv+vtgAEplQMFlAExaQegvrcBvqc5/qEbeAx5e8wblqcr5KCRTLn5OB2yacIAI4EAMEUw70BhprCwcg7qHruA/ynRsAiAzrGzmynQH1UKmaqjhAoACEaamyqj9BaQCRSA6gPUebmbCx+aMKmBbr7rM5f1lq7AHc+hmBpQH

04ArqbqH0ZbHryLmRn5GB0xJr8BybOhyDIDW0/4hBsQDBCrSMeS+TtaESDBpRMg+h41zdwD2tQgwrXb9bDau5lrHBmAqaZUH54FEIcghB+sGi6AvJwhEL3oywgA=
```
%%