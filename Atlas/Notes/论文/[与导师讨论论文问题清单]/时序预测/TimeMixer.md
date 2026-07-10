---
up:
related:
date: 2026-07-10
---
### 运行指令理解
```python
python -u run.py 
--task_name long_term_forecast 
--is_training 1 
--root_path ./dataset/electricity/ 
--data_path electricity.csv 
--model_id ECL_48_720 
--model TimeMixer 
--data custom 
--features M 
--seq_len 48 
--label_len 0 
--pred_len 720 
--e_layers 3 
--d_layers 1 
--factor 3 
--enc_in 321 
--dec_in 321 
--c_out 321 
--des 'Exp'
--itr 1 
--d_model 16 
--d_ff 32 
--batch_size 32 
--learning_rate 0.01 
--train_epochs 20 
--patience 10 
--down_sampling_layers 3 
--down_sampling_method avg 
--down_sampling_window 2

```
### 源码工程架构
这一套目录结构是非常典型的深度学习实验工程范式。为了让你快速上手，我将它们拆解为“数据处理、模型训练、成果产出”三个核心闭环：

### 1. 数据与基础环境层 (The Foundation)

- **`dataset/`**: 这里存放你所有的原始数据（如 CSV 格式的 `electricity.csv`、`ETT` 数据等）。你在 `run.py` 中指定的 `--root_path` 指向的就是这里。
    
- **`data_provider/`**: **数据加载的“工厂”**。存放了数据的读取脚本（`data_loader.py`），它负责把 `dataset/` 里的原始文件变成 PyTorch 能理解的 Tensor。
    
- **`layers/`**: 模型组件库。存放了构成网络的核心积木（如 `Embed.py`、`RevIN.py` 等）。这是复用性最高的地方。
    

### 2. 模型训练与实验层 (The Engine)

- **`models/`**: 存放你的核心模型架构（即 `TimeMixer.py` 及其魔改版本）。
    
- **`exp/`**: **实验控制器**。`exp_long_term_forecasting.py` 等脚本在这里，它们负责协调数据、模型和优化器，是整个训练流程的“大管家”。
    
- **`utils/`**: 辅助工具。比如早停（EarlyStopping）、日志记录（Logger）等工具代码，确保实验可重复。
    

### 3. 执行与实验结果层 (The Output)

- **`scripts/`**: 存放 Shell 执行脚本（`.sh` 文件）。这是科研中最常用的方式，一键运行几十个不同的参数组合进行对比实验，不用手动敲命令行。
    
- **`results/`**: 存放训练后的输出结果，通常包括预测可视化图表和各个步长的评价指标数据。
    
- **`checkpoints/`**: **权重仓库**。训练过程中表现最好的模型权重文件（`.pth`）会存放在这里，方便你后续直接调用模型进行推理预测。
    
- **`test_results/`**: 存放批量评估后的输出报告，师姐可能把不同模型的测试结果都归档在这里了，方便论文绘图。
    
- **`figures/`**: 用来存放生成的论文插图。
    

### 4. 根目录的“操作入口”

- **`run.py`**: **全工程的统一启动入口**。你之前跑的那个长长的指令，本质上就是把所有参数传入 `run.py`，由它去调用相应的 `exp`（控制器）来实例化 `models` 中的模型，并读取 `data_provider` 中的数据。
    

### 给你的建议：

为了保持工程的整洁，当你开始魔改 `TimeMixer_final.py` 时，**不要动原始目录里的内容**。

- **如果想改模型**：在 `models/` 下新建 `TimeMixer_RIPE.py`，把师姐的类复制过去改，不要覆盖掉原有的代码。
    
- **如果想加新的数据加载**：在 `data_provider/` 下新建 `ripe_loader.py`，专门读取处理好的 JSON/CSV。
    

