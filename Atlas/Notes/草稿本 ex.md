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

# Excalidraw Data

## Text Elements
用户问题(User Query)
eg:现在几点了？ ^cfe3bCYE

  Agent接收任务
























 ^3MiM0YWE

提示词组装 build_prompt() ^PfLCm4vY

模型动作决策run_agent() ^LYF9jENw

执行 ^ToJFayrU

整理结果 ^Pe9B0JF9

## Element Links
NsMHstCz: [[Atlas/Notes/草稿本 ex.md#python 1]]

wf1DvRbS: [[Atlas/Notes/草稿本 ex.md#python 2]]

WEEhk66L: [[Atlas/Notes/草稿本 ex.md#python 3]]

lGFgd0fM: [[Atlas/Notes/草稿本 ex.md#python 5]]

%%
## Drawing
```compressed-json
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebQBGAE5tAAYaOiCEfQQOKGZuAG1wMFAwMogSbggAMWqeAC0AUU0AOQAOdLLIWEQqwOwojmVgzvLMbmcAVh4ANlSeAHYl5ZW2

/nKYCYBmLeTEhcT4meOT44WAFnXIChJ1bi2Utu0dl9fXhaupBEJlaW4jubnIHAkHAmafazDcSoFKfZhQUhsADWCAAwmx8GxSFUAMRJBbxbA8UaQTS4bBI5SIoQcYjozHYiQ43CTYhtABm7JJEHZhHw+AAyrARhJBB5ufDESiAOq3STcFLaSZwhHIhBCmAi9Biyqfam/DjhfJoPjFSBsODktSbNDxFKws0QKnCOAASWIxtQBQAup92eRsu7uBwhPz

PoRaVgqrg0nrhLTDcxPaUutB4NCtmaAL5whAIYj/LYzFILB5bNofR2MFjsLhoc4pU2p6usTgtThif4Le2Jc4zSaTSupwjMAAimSg+e47IIYU+mnjxEawWyuU9RS6JTN5R60OgWCgJPKlQk2HZCC2mlRAE1GhBtzntynhwWJABZLYARQoSKR53qR7dOm0akIiVAPmavqOkIcDELgk6vqg8RLIkPB9m0KSTOhnxEBwSLBqG+A4WwFJTmgM74GExSPm

Uz4VIhEBnheV63tyu5VJOmCHp84xoM45wXNofZ2pMMzIb23bKo6NqoM4PBtPE2gLKJvagkCUmpjcxB3CamEJIkiRtIkKTxEWBIVhp5SSN8vyHmgkwOqmkJao55SSmq9JYri8QID5PncmSFLOjSdIYl5EgItYzCWoEuTcry/IalqEA6gWKpSggsrafKaCKpZAiqiiSV7ql3L6pIiaevEnwWlasD/PanzBW6HqFFBqb+rggaISGYaOhGxBRhIuDxGV

i6VQRfWpmEZFITMbR9ucsyTFsnwtrW9wPGtTCthw7YcJ2to8FsdryQcQ7HmOE6zRRc6OguIXLlkOR5JNRHQbB8GzchBxoVhKQzAsFbEaRiG3QgnycXZ6CABSugDsRoAd6mABkZAAUACqYSkKgn5CEwMAAJQADqGsoyCAA3OgAU6oAB4qAJ0OgBhcoA+P9lZQAAqB5VPDyPo5j2O46QBPEwgpOU7TjPxZwUACoQRjQjwrmQOyEvVF1fIyfl+5cQAg

kQyh1ugYi5Ew3LVlA5gENrPx6xA+gkMQIyfHouS4BGTBBhItQNM07TcliPwRgQbNcRziOoxjTC83jRMk+T1P00zEJCFAbAAErhNL0IIrjOEuwAEjZfy2toPDq5IoSB1AAAyEb4eRs4INR6x0Se6BIgsb4APIHdeLNscBEj9IMULcrxsmndoqH7OWoly4cRafDJzjFoqSz2kcOyGTMiSfFpOmoOcbSTNobRtMd0y9vEyEzJcjrWT8BeoPNimXwJmH

H6fTblM50LyylhVomFjJ0B4n2ISYk85ySUmpLSTygCIDMlZByLkfo+SCmFCVDEupHTuRlHKBUSp0pqmKlUUqcY/AVSNNwD+5pLTYGtA1H+zV3TrnauUTq3U3rhkjCPCAuAthjRChNNAz4gK9DQJmLoNE3J5kQvEJa51JhtE3ttGsnBuCAyoQwHatZ9qHV4PaTeCwxJGXDFdYICFpx13nIuJ6q5XpoA3F0YRIi9xQ0AvRKoWw3yEDfCka80o7wPiu

FuTckBm4QA/N+X8/43HsWGqBNg4FNxZkgp8GCcFzG2hQmhR+PBZEXUgLhGuqBervVTJiUGFjKL1zKJIpuDFPHeN8f43uoj0CuJ4hMfY48eCTwPjMGeplwTSQmAow+8QFJAztOcQckxZHb1wbaaY49diJFEscByuwAafFvrZNRDkIRDBcgQlEMDvK+XOQFCBwVoEANxCyNknJ4ooKIaKDBaUsF/yyrvPKxz1RoOIW8/hBoKEmhqjQuhtpGqOkYa1e

xLCFYBgQG7YphFOGDW4bgc4/CEwgpRVNKR31dgPCMoZaqVYtGqLEYkVa5KVF7Q7NCJIKRVltCLCkGlw5TEIAyagcGVjHorhep6EpqTPo8p+qhdCmE+z5IgOUlEYNLGOlcRIVAqBNbKBeoAUuNABspoAb7lACFSsTY1HATVmtNRa81VrLU2utczCg5cqhqo1dq/VRrbUeutV6z1Pribi1yFLGWlCf6K1yMrG2+A1aQwPBbXWVRgjsm4rS027hY1Wx

tsQO2SAHYS2doaUgyKICtw7l3HuNVSB+w4AHdmqr1WatyLqw13rm2+tbXahOSdU6sCDWgTOENHS4QQHnO+0NFLF22WXA8Vc8KVKojUxu/UGIRJ/H+ACkM+7oFwPEqgHS+JywWEJNSakhmpgXj0p4GEUhyMSP09ZvZ5nZW4L2IuV9JJvy2CtEs2z87QweAkR4fZmULB4MXDCCiDlD1yr805TJ8SgMuUFKBoUGR3IQY85BiV/mvPFL8r5OUYT4I+Rl

F52pAWkOBUmShYK6oyTtAw6kLVmF+kRcikV/UuHRkmNi4ggjUDCLTK0ng2ZcyzT7KhTeV6OXlHWpSveWFlG7R0Yy0sp94iDjJZy8cZibpKtTA9WkNihUcI+uk76WSBKmXOPEY62cZ1oDY2UkiCrZ39tTHANgEY7Fem3A4ro8sygpG3PCsAvmyjPtmC/BRJ8P0PHyWUZwf67QLWLPsEDCjX5BZSR8rdUAABCA0IzKG4PxzItjC0eyaK0DoQTrZsEG

lULEmg1BHh5IQTA+YAAKHm4r2O3GAPKuwosrV+t2RY18QkDZZQfLYI3GwXEyxIz4ORiD5dpIV4r24MCCtyIW4tndsDdxa/oOre5GvNZq7ydrxAuuecKH1xUWxcnIXZfvRsrK1njc3A9p73Ytivfkh+wGMwFvzuy6QKAmtt3WVwD1VFjpluQ7AtDhiW6wLciCAuCgOmqmfGO4wLx13ut5FlOoQzPXeV1wbsUOpVRJgAHEkRQHOHTtG7cWl7iCEQOQ

2bHQjymHEP7an2WzHOrsE9GwJjnEOM8BRxc167EUVvR0O98O7DiOfZ+b7WXfpHU+g9r7X7RbPrsCDRyiMeVubB85/lwGIcXDBtp5AODRS3S9J5mHNToJw+bnBj7cqEemn/EjKUyOOnKrxjRtVaH1UhfRl0TC2rMa6ki2H+LQkceGjMbjvH+OxN4MJrB0juACQbOstTCmNq2kexXtsDLg1YSBkDTCJitPcux3dPT1jttedC04gTLj2ZBNCQxDr7IK

6on0Oceg157xJKCX3sJQ6OB+Lp/QAAUjEjdPDt2z4kVl1MaSvoyPM5JSYxlZWFOM45iptcqlU9oouqoo/x+T+n+zjig/efBqLqyoEKnDIDgzA7DzyS4DipAKLParIlhWZK6aQLK8ACRHwrJXpAyzLTwlw/qULqxfwKjQaW5AJ+QXK26QL274FwL3KILu6oKe4Are6B4ZR4Z4LqzYJ/I0HYaYKpjh64qR7gox5IRQqpgwpMaOhsIp5X7HgZ6bozAA

Bq2euKDmBKiEQIGEQIjYsB0mFKescytKimdeuk/SDeyELe10iqOO90Xez0a44hkAh+4q5mgMWEB8awA6Tm7ermO4Na6AgAC8aABcnoALPRgAI36ACjEagJoEIHyMQAAPpwCIj6BwBQAoz4z2qOoSC+GBEhFhERHRGxHxGJH+qSzpzBp+hKwqyRrcDqxQxppVAGyTjYjKIprmw6zpq2z2yOiOxRAuwFoMT06M7M6s4+wVr+DVpBypH+HBGhHhH4BR

ExEGC5FJEdopxpw9qoB9q2ZDqYGFzjo3yTpcTTpFLgz37BLHgMSYDMDOCfhtaSDOApAswLSSCTDSy5YtBIjxBrrKpb6c6EDc7DwjJ5SGKi59K5LsrqwLwzbJD2grRTIzJHCzAPq7xq7jxWaa6G5SaQA7L3xdIG5RbvzUrqGQA4FQY+7/woZW6EEIYkEhQO7kFoZIIiHPJYakZ0FuSfLwE/JEnB4kJh7CAUaeg8E0b0JNQMYJ5wpJ7sL2Zw7DiSE8

ILByGUZCKbZ55CaLaF6zRYQCSAz7A15aEKRalKblEOTFyAwmTGHaamEd7lD6ZLjd7rhPh9b94f5BxD7uISAVzXjVCJAABWjQLQiSypm4C+DEKQOchAkgWwo4msWKTpee2+aOEEXQ8KEAthZmv06ERwjYP8l+4paecqrhZp1SYAtSj+Lpbpnp3pO67xrSGsSaqYI88kSojwamIGN6OSRhwyfEf2cQkkTZSwci1mqJEAKulCf248SQxkxwMJdo96N8

GxvA2Bhy38eBJJBB1uPOemVySGVJ8CDytJHU9JbBjJHBzJDBrJAeR5hCDJIeTJkAXBcpvA1G0etGAh5QQhieIhLGqepSEh6K0Y1WXJAi8hEpihwapkpYBwrZzYmhlCGmGhdKepaAC0wuii0FoSXKPKfK5hAqlhXmChNhYqyZkqGpBI1eLhN+FOZhqYKq6AgAhFaADR6oABVKgAOvKADNioAGrepANIkR0QL0eReorMnhEAtFjFrF7FHAnF9aCR8x

IhEsgassIaJREaUayqMaTR1RL0Rs9RZs+AVREgGaWa3I7RearsJxZxFxmAVxNxdxDxRgTxLxbxqYvsQx+AKR1F9FzFbFHFXFuQPFjouAicix3aGc7F7hBSucM5Y6JcOxlc1cLmhxNOEgdOuATxAoAo2AQo0o+Ao4zg8QygAAjpgFsDAI0GjO/hIJ8d8burJPvEfNZsykLo9hqXiRAGeoOEfPJKyhvKhDqcrvAQiRroYpFsfP2eidDJiQNUbj0ibj

5fObgUSZuYQTbvdOuaQUudSduVQRyaHvQWqIwf7swUHheZyZwdyeQreXyQ+QKdCkKbCl6AmaIaxoBent+cNIkLKcmAqRukqaDtNEXmgERYsNkrKjJnrLkhokDXBUhDeiWH9hWLKiOK3mhbphaRYbYjaf6XadGe0naWEizGwGvsrDAKQMVXGWUAmUmcfimf0iLkAbZkUjhTmaRehamKXMwOXHsTFV9UccPlUDjXjbgATcVeupWZjTWf8IsEpI9gpL

IhWKZJPCAXurkkqGdGfuMsWB+oZHCfhg2DrrsiaHOZBjCIueFMuWScQdcshkbatZQRhtQclIdWeb7t8qeQVMRgdZteUDebyfeRCvwXHjBMKTdaKWIVmZ+Y9UNJuprK9dYSlD9agEZMhGhOvFqWoshZorBXoagH9vNDetrv1KhW4fygZtaa+QfnheTQRSDYOBmbmS5tGiMegIAOZGgAMhHJH8VN35EyVFFSVhqlGKUUXKWWyqWGx1HJqaXaXoC6Wt

GpgGWdGFoJVJUpVpUZVZW5X5WFUC2OgOX+xOWt3N0LFdqFG9pBVrHDo61IRFwRUs1TrRW35zoFkLovhVCemGKSDKD0AAAa0ho4a+MAZxHWOV7K0oro+gJV6AZVYQPxfEfYQkytGyIu+wIJEwMtqQmEJ0V60JQBsqg5VK6uSJ/VWuQ1M5o1WuOJk1Tk01hJW1JyZBeIK55JZtm5FB6GdJHuttbtzt21J5e1Lt+5l5h515x1EeXtfBdGgp8e11Pogd

912ZA0YdPCuWkd8pm49pJoBe31qpx0RYsyUuSdutoNmh4NUtJk+8sWJpbeeZBdVpWFqNji6NW+wtSjYSHWCAiQuWKQeNL1xNYApNpdXYFNIGcd6smZeKId9NzmN9wVUgkVbN4TsVRZ6ATjLjbj7pIDVZEDSEdoqQB8ykswQBYkjYGiC8Y8XZPSPZiwlmGt3AGE2t98WxZD+tP8LBc1tDptG51DjDO5rCe5rDV5v8x5fuBGXD55PDdt/DZCgjG9vB

j5vtjGxdrC75UdMjGKqICjwTImiEj2Dkhw+IOj/Bn2kAYN6dsixwRkgupjCN5FSNmFKNszuFpmZd2SuSfYgMIMYTZF5p3Q/FgALqaABgLoAMt+gAOeYt110QA/MAvt0H16LFHd0KXlG10Q4qWnhqXD0QXg6j0Ivj0tGrnlDT35qFpP0zAv3v2f3f2/3/1bCAPAPlqVrDHQwgt/OAt71LGBVZwDqhW66bEX2s3X1vP5mFkP0SAtDMBvg5zwiohGAp

NZCaD5hwSaCT1jDJ0C5XxgkAY3oEhy2yQbxKh/bAYga6tpYVP2TzRFwfo9K4OvrVO/poRKSG44lWYaIEkG2zXUPzVYukhLWUlkGRTO4xRu7W0bU9MsE7VIS/L+t8MQAe3/BCNTOkI4q3m54briIc0CAx3Q3TA7MzaA36Pp0NjHTLS1PlBk2+OSoEhn4kpnP52XViPCGd5XNGa9Zo0hLOmgM5zL7Sir4b5Rlb6o4JK75Juc3HFVCfiSCfiTBv1YR3

iduVndu+k1L77lBBMQAFAFCaxQD4ChAKDtiTgRCACSwYAPxegANOaoBYDaD6DEA4hwAwDqCcBITejejcjyoVsdTzPB0TqX27HcuM1uTuDQihbIVgDxBzuQDYBCDwgGCjjwS4AbZKOnsdaIhyBQdKMgcIDtz2AkBODjgzihheaftrl24hRvjwTYCSCojWD0ChA112mBQUm0gEdQBEdk7QyrGUfus3IrU4icgdO4fUfEDtyTNqL+akhYiDSkC0f0fd

7cBMeNsLikDCebkcduLSfCe8f8kUNKMJQ5DJ7SEjiECyvQgHFJKqNfmyO4DVC758sDulUtsr7r4pPTtpMTVHyljMrFgCQHAOTi6QALzGMvpGPjIvySYGsZ0ljjyHAA7soEjAYp3DX3BiT/qYQDglibxTKm4LlOtsdwZEh0OtNsftPrWu0Bssn9NsmUOsHdNhsRugoTMqc+2iN+3iO3XPurPsZPWbp04rPxuCaGfJvfRqZSqlj9lA2Fg/wHMHSywX

wNgwnnD9lw0mEUc1uF1WNR2FuZIplEV2v9lBN00PvmOOjuaebWNlChb9ZD6BabjBZHexYhfWasrhfx1/tgAJaxd0YDgOSGKHBXog5eMqg5araOBDAIflClYvSFo9FM4s5s41bHb1YSBnbVm7lXY3bk5HfLziZXxGn9iKLS0nf1kmSfeSKQDLa/fraKOphA87YMSCvCuiviuQ8nYNakBNZw+dMI9E53YTYJCoPTDTyS2GLGL3Yc8iSGnyQXxvcAdn

dde/w5aI4JLI5R0I5Q4hAo475Lb4CY6PvlB44IAE6I/E5qCSAMfs133U5xMQBDsjtjvnATsVl7h2cVUYRzDHRIU3orQCQGTqvOBvzjzFhYTIQKI6uYPwGgaImljzRLSC+yrRdiJWbgGzAnSDhGQCT9kOsNN/xzUgKZctPLUW1esu6xRM+tYsNe5huBucMhv5flcCPcFRsXWCFXXVtzPJ5SMhOLPRiujtfvWdd+lAVV7HxPOyIp2Df1iZtp2jdqJW

bHDTLU253w3q+Ce1tWEvsmZH5FtoSn7n401R3bdzflB7cL/eabjI8ndBZBJHdB8SRFgLRAnTBxYPeC4x9AFqZAzn+fcJnwg/cFb/ck+A/d6FqU8itQBisjsdPCQBGAcCusFYbWTrKz3rZfZngSJRRAOHjqzJi4N6bHidCMhAxpkU3FASyjx5LZaQRPT/k10DxS8FeMOOXrSGl4UBZecSNHCrzV47dUwmvbXkTmYAk59e4nGJhzTiroAKA7IeIKOH

oDJxNAAoCVvoClaZpcAunNJnaAOBFxlImECTFeim57MmqiDfpFsGQanRlIx8eaBoiwZ7wFoRcQXg/3j5TkmaM5BRMkET6h8r+swe1uQ0dYldNy9oVwbGEWp4dWO2fJ3Ln19bMMbae4UuERxECutemHDfpinRYKht3kR1MZrihTpR5vaIjP8rG2FQPVo6s0FARfB2aP9dShzKwYDClzqxluSEewsWFMjAFp+s3cJrVxmYikMKC3a5vULKTctF2y7V

duu03bhAFAe7Q9se1PbntL2kga9jwFvb3tq6NQt8o3w/KvsuWdmHlnCG/Zs8ugf7MXiTQdggck4+gcDlEAB6QAYOcHN6o2yQ4ocHA6HBAJh3wDYdEaXHM2qJ2I6kdyOkwqTix2ID3CDeh9Fli8M8Hm1YE7HJht8O47KdzqaAYsE6UU5MB3hnAlYkfUo5CcmAcnAEUowhGkBgR3tATgXw07ZAtOrAaQVwL3xd9Q6GKDfLE35boAgyIZMMhGVs7K8v

8UfRSOWBXiDhlI6pAptsGHL9gCQV6aVIDnVgGDFgh8AkEtCyayJ5I4Gacuy1QAGQQuBkWUXKMMiNVk+htP4RlzAQeDuOVJHPj6zih+ty+MQ+2plFL7sk9RQKE6p7Sq4giaulbOrvXwRTTCFmUpXAAAGl2+SjRUhLxmgyJpgJ0fYMBnViD8H4ejEfroiSBn5ZgjwWZOW0YGXNGhdbYgQWx8YrcCKhwCZCnU27pCt+zwnfqwOWGHd7sR/M7ifz6wCi

lIookUcKPFEhJnA0o+UbWIVEv9vu4OQgUVi/4E8f+xlc4pcWuK3Fzg9xR4s8VeJADoe6AUASQHAGtYWet2GAX5hC7KRZEWAxslLnkjY8Fx80GbG/GUhi48B8OAgR/xbHxiCopApHIrwoHEAqBNAzdLSNJ6q8Eks/WrPjhIA682BevD4Ty1JEWd0A/iRoJICRDHAK4YgiQTKzlaQAR4A4TQQfAcjvZGwGpZwqegmApYlQFwZkQ2FZQHxAuFwOIEuO

pTdgTIFYYGBKNPoPBD4N6Zsv2FC52gk+jglPhlBcFuD3Btw7Lt4Kijaj8+CUAIVUCCEaBAgEoQrrvEiH7VhmbDcNpX1vIJC+OseGNjxgArZlPRlTeSLCR0KV4kI5YPIaPzETHQhR2hEuncxX4vw46x8KMdv0gAvlmhMYyxk0P342NG2YSHgGvmZS4ALhQgTfFOx3yeMEyC7JdiuzXYRAuhO7A9ke0wAnsz2F7K9hwAzpjCXmd4u6jMO2Jvsoq8wn

DilCWHTj/2QSNYV9zaKbCwOEHPYdbGuyHC9hNhMIKcLQ7WAMOvlK4Z6Bw4WlXh9wkjhwDI5VSbhNUn4VCKwoSdYRgI+htQ3k7gjXhaIvgmCLhEydIRhHDge1M+HBUkaI00gIiM47TSlO4kpwWpz5BYiEAOInTlqH04Eik2FQR0f+PfFc0JAN4OnPgCdFGBk47cZOODjyoek6crofABQE1g5w36KTQdGkyQmpAP00weSNSnGTmCJckDGbEJHt43pr

ML3LZN1X6a5JNBMtcsDLXKFGQPOXwSUYpDEziZeeaEBaKJBS4zVnBzrdPmqIYlZ9YEWo13DqP8HRCeJfTR2oMyKgmjyMZoqjBaKSFPljJdfG5jyEa500W+w0FoK6IoofUPRMdQZPYJ6SrIdmFwVSbonLDlgT4wJQyVmLn6xi9+dNEoRKlX7spkI+8Dfov2vyvNEpu/HvD5nzH3Zj+JskJDDI57UoFIYuXCagL6xZUhIm8DGXoP3iT8GxYOPLHuNP

HNio6b/cHOeJPF6zAelAsgTFLcwYgYAygWTNtPM5HT0AKVUcCzESAwA0YzgVEGdI6xhBZAzAAUInD4SC09w70iqvNAd7lhpkuSIAsXGIpwS+I58bQOsmZFAEBIK0WCeUAME1UtWKyKXDeiLDUoLWeMz+FROVHeRCZWXEmRxB8EsS8ugkgrjTPwzFcDRVMxmeM3spLTkhtfKtpzOikOiWuPCT8ALJ3BCzCRGQxCPuiRKrI1Wik2TNMmlnQgVIJ0J7

OrBm6mkjJEAS0gxzSHZl1ZJ+AGCBn7C6yDxoTO8UbIO4hZTZE2c2Qfz6xdyVoPcgyLkwHlmzxe8ZRsd7LWxEC6ahPH2SHMPGBzw5p4oOeQLwUQB3MkaGOXrDjn30PxEAWyfZMck0i6BdI2OhWEbl+ckgVmCWjrLbKyRACSoP/EqxWiAwtJHc+AlhEwlqEeyrKcchHxnLHAEgMqNBgSGQgnw9aZufGel3HmZ8PWK1MmXn1nlld9R7DB2ovKdphD6Z

c8ivnENOrV8JJ1ouoQHSmFilgFvMzdMnCPnOJKEws9RoZFfjZCb5esIaSi10JqTdmP0jNtNzzrRjlZ5kuMWrMTGlDVusgrGUAq24TCFhu3HMSlMP4oK0FFszcBIqEhSKLgMisSDf0XhzAjm3YaZCoqBjFxPZJApsbgr4ybYyeUAQtF+J/F/ihxe4UcfVguyQDCcU4yyTOKBCrJkIKtR7L2EOAecAsCQfrvHQ0bHxRIsyBYNuNJ67jMF+4umgHIhy

ELSF8vY8SQsvHMLrxDA9+cwMfGsD2Br46hcbzJFyo6c1QZQMQBSDsg3wAE6VlIOAkQAR4pkE+EpClxqLFESE2uYDNHgAxNBTnIELm2mAAw+R8BY+Aen+nj8Lgbs9uWiRnIKQngWETeLHz+zCRMVPCEeWlwto4g6J9ElqRqM9bTzyZrErpoEPJBcTQhJfCIWXysXGLhJNiqqHYqtGxDUh/skWQ8Cn4hKlJ64++f8H7Au9+wAkUVDpKTGr8hcD/RWZ

kq3k2jOZn8ouqZJCrzC2hXkzoWwC3Y9D/J/Q4KUMOvaTAIpJFA2TcK5n2jSFzNOYfsTtXMBkpoy1KduHSkJlgOoHbYTlNbF5TYOFoI4Yh2KmodHAZUi4RVOuEXNiZ+HMafVMalGTqVdwsaa+Mk7IjXhc0hTv1KWnBLkR8IkTumuhGZrO8M0nNeCKLUDSZIGI9TlWmxHac8Rb4gzqfLcU8JRB1EcAO1B4RwA4AQoL6Ah2gDWRsgVQOCKQHwjrAGAh

ABABQFyzZrqGlK0YIxBEB59XQk4fQEKBonOtmmxQFdaBGB4br51PwzUXSoMVTrgOB6nbBuuqCMraCh5fdWuo3VbrwhtMi9ausPVZAX1lioxcusvVPqsgycESeaOxYfrr1WQGtTXyA5gaOlN6+SqrFhZ7r/1n6/QNUGkoQs5Y76q9bBqyDlwx6cqC4XD0fUoaB1BC45RHOg3Yb11WQRoGHPI0gQzllGgDfoCoEswt8SGP9TBuo2obEUQGrUAoSSmI

h+Qr036skBUz2hFEJTEGu3ME0Yh8AM+W0EZHVzGQdgDZHpJTSnVGA2ABgAHgwAIC4w8Er2EVYcWI3gb9AQG/8reW5W0hl1VIEgB3V0hTq7NxAIUAgDgCIbnyFaN4Sdlo0/L1eToLzQ7joi5YMQDEUgMoDJAowVJGdNYDFuoADNJKqYVOMoFDBbo+gEW3ACjFhK8BwQOW+LXlCSImbkNAaP+Lx1NicBv5n5e1dkFTiRgK0RAuiBp106IQy1jELnB1

K+HlAG1zLCJsIFXYuwOtETfQFuhRCkAWgyeQbbjhG1MBfNzWwbSZrsAekEAAwPOVWjgBvgfNVaObVmJ4QDBCAjAHGhiF03RkwgwQPbaog2F+q2NrSdJQzTtX+gDAAoTIOdqoV2rvJEOPbQdu034A3oJmxwMwD83ohDYXEN8DkCclcCaImI5MMkizBAA=
```
%%