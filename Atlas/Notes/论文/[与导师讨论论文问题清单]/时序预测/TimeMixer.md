---
up:
related:
date: 2026-07-10
---
### 运行指令理解
```python
python -u run.py \
--task_name long_term_forecast \    
# 任务类型：选择长程时序预测模式（对应 exp/exp_long_term_forecasting.py）
--is_training 1 \                   
# 模式开关：1代表进行训练，0代表直接进行测试/推理
--root_path ./dataset/electricity/ \ 
# 数据根目录：指定存放数据集的文件夹路径
--data_path electricity.csv \       
# 数据文件名：指定具体的 CSV 数据文件
--model_id ECL_48_720 \             
# 实验标识符：用于区分实验结果文件夹名称，方便日志管理
--model TimeMixer \                 
# 模型选择：指定使用 models/TimeMixer.py 中的架构
--data custom \                     
# 数据集加载器类型：指定使用自定义格式的 DataLoader
--features M \                      
# 变量类型：M 代表 Multivariate（多变量）预测
--seq_len 96 \                      
# 输入窗口长度：输入过去 96 个时间步的观测值
--label_len 0 \                     
# 标签长度：Transformer 类架构中常用的参数，这里设为 0 表示不依赖 decoder 的前导序列
--pred_len 720 \                    
# 预测目标长度：预测未来 720 个时间步的值
--e_layers 3 \                      
# 编码层数量：堆叠 3 层 PDM 模块进行多尺度特征提取
--d_layers 1 \                      
# 解码层数量：解码端只保留 1 层，维持模型轻量化
--factor 3 \                        
# 注意力因子：用于控制内部计算的稀疏度或多尺度策略
--enc_in 321 \                      
# 输入特征维度：数据集中的输入变量个数（321个电力节点）
--dec_in 321 \                      
# 解码输入维度：解码阶段参与预测的特征个数
--c_out 321 \                       
# 输出特征维度：最终预测的变量个数，通常与 dec_in 保持一致
--des 'Exp' \                       
# 实验描述：给本次运行加一个标签，方便在 results 文件夹中分类
--itr 1 \                           
# 迭代次数：实验重复跑多少次（用于取平均值保证结果稳健性）
--d_model 16 \                      
# 隐藏层维度：模型内部特征向量的宽度（越小越省显存）
--d_ff 32 \                         
# 前馈网络维度：MLP 内部隐藏层的宽度
--batch_size 32 \                   
# 批处理大小：每次送入显存参与计算的样本数量
--learning_rate 0.01 \              
# 学习率：模型权重更新的步长
--train_epochs 20 \                 
# 训练轮次：总共进行 20 轮全量数据训练
--patience 10 \                     
# 早停机制：如果在 10 轮内验证集 Loss 不再下降，则提前结束训练
--down_sampling_layers 3 \          
# 多尺度层数：将原始序列下采样 3 次，构建 3 个不同粒度的尺度
--down_sampling_method avg \        
# 下采样方法：采用平均池化（Average Pooling）平滑序列
--down_sampling_window 2            
# 下采样窗口：每层下采样时将原始序列长度缩短为原来的 1/2
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
    

