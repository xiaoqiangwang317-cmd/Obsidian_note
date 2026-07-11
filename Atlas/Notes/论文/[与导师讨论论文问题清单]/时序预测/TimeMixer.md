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
    
run.py
```python
PS D:\paperWork\Experiment\TimeMixer-main> C:\Users\25021\.conda\envs\timemixer-main\python.exe run.py --task_name long_term_forecast --is_training 1 --root_path ./dataset/electricity/ --data_path electricity.csv --model_id ECL_96_96 --model TimeMixer --data custom --features M --seq_len 96 --label_len 0 --pred_len 96 --e_layers 3 --d_layers 1 --factor 3 --enc_in 321 --dec_in 321 --c_out 321 --des 'Exp' --itr 1 --d_model 16 --d_ff 32 --batch_size 32 --learning_rate 0.01 --train_epochs 20 --patience 10 --down_sampling_layers 3 --down_sampling_method avg --down_sampling_window 2 --num_workers 0
Args in experiment:
Namespace(task_name='long_term_forecast', is_training=1, model_id='ECL_96_96', model='TimeMixer', data='custom', root_path='./dataset/electricity/', data_path='electricity.csv', features='M', target='OT', freq='h', checkpoints='./checkpoints/', seq_len=96, label_len=0, pred_len=96, seasonal_patterns='Monthly', inverse=False, top_k=5, num_kernels=6, enc_in=321, dec_in=321, c_out=321, d_model=16, n_heads=8, e_layers=3, d_layers=1, d_ff=32, moving_avg=25, factor=3, distil=True, dropout=0.1, embed='timeF', activation='gelu', output_attention=False, channel_independence=1, decomp_method='moving_avg', use_norm=1, down_sampling_layers=3, down_sampling_window=2, down_sampling_method='avg', use_future_temporal_feature=0, mask_rate=0.125, anomaly_ratio=0.25, num_workers=0, itr=1, train_epochs=20, batch_size=32, patience=10, learning_rate=0.01, des='Exp', loss='MSE', drop_last=True, lradj='TST', pct_start=0.2, use_amp=False, comment='none', use_gpu=False, gpu=0, use_multi_gpu=False, devices='0,1', p_hidden_dims=[128, 128], p_hidden_layers=2)
Use CPU
>>>>>>>start training : long_term_forecast_ECL_96_96_none_TimeMixer_custom_sl96_pl96_dm16_nh8_el3_dl1_df32_fc3_ebtimeF_dtTrue_Exp_0>>>>>>>>>>>>>>>>>>>>>>>>>>
train 18221
val 2537
test 5165
        iters: 100, epoch: 1 | loss: 0.3074494
        speed: 5.8367s/iter; left time: 65844.1122s
        iters: 200, epoch: 1 | loss: 0.2522382
        speed: 5.2229s/iter; left time: 58397.0105s
        iters: 300, epoch: 1 | loss: 0.2157444
        speed: 5.1367s/iter; left time: 56919.2525s
        iters: 400, epoch: 1 | loss: 0.2201601
        speed: 5.1342s/iter; left time: 56378.5545s
        iters: 500, epoch: 1 | loss: 0.1785438
        speed: 5.1681s/iter; left time: 56233.9123s
Epoch: 1 cost time: 3008.950206756592
Epoch: 1, Steps: 569 | Train Loss: 0.3017685 Vali Loss: 0.1700700 Test Loss: 0.1914445
Validation loss decreased (inf --> 0.170070).  Saving model ...
Updating learning rate to 0.001807059401889112
        iters: 100, epoch: 2 | loss: 0.1803924
        speed: 12.8195s/iter; left time: 137322.5319s
        iters: 200, epoch: 2 | loss: 0.1850068
        speed: 5.1604s/iter; left time: 54761.8309s
        iters: 300, epoch: 2 | loss: 0.1762314
        speed: 5.4403s/iter; left time: 57188.2981s
        iters: 400, epoch: 2 | loss: 0.1774382
        speed: 5.2088s/iter; left time: 54234.3295s
        iters: 500, epoch: 2 | loss: 0.1980633
        speed: 5.1276s/iter; left time: 52876.0708s
Epoch: 2 cost time: 2964.6563086509705
Epoch: 2, Steps: 569 | Train Loss: 0.1827196 Vali Loss: 0.1529015 Test Loss: 0.1727077
Validation loss decreased (0.170070 --> 0.152902).  Saving model ...
Updating learning rate to 0.005203314207371222
        iters: 100, epoch: 3 | loss: 0.1600868
        speed: 12.8455s/iter; left time: 130292.2075s
        iters: 200, epoch: 3 | loss: 0.1926026
        speed: 5.1640s/iter; left time: 51862.3628s
        iters: 300, epoch: 3 | loss: 0.1725814
        speed: 5.1570s/iter; left time: 51275.7003s
        iters: 400, epoch: 3 | loss: 0.1749850
        speed: 5.1330s/iter; left time: 50524.2604s
        iters: 500, epoch: 3 | loss: 0.1653910
        speed: 5.1399s/iter; left time: 50077.7610s
Epoch: 3 cost time: 2926.8392102718353
Epoch: 3, Steps: 569 | Train Loss: 0.1709202 Vali Loss: 0.1491925 Test Loss: 0.1684793
Validation loss decreased (0.152902 --> 0.149193).  Saving model ...
Updating learning rate to 0.008597625976752713
        iters: 100, epoch: 4 | loss: 0.1460211
        speed: 12.8241s/iter; left time: 122777.4998s
        iters: 200, epoch: 4 | loss: 0.1768584
        speed: 5.1249s/iter; left time: 48553.7422s
        iters: 300, epoch: 4 | loss: 0.1755533
        speed: 5.1703s/iter; left time: 48466.0863s
        iters: 400, epoch: 4 | loss: 0.1494695
        speed: 5.1556s/iter; left time: 47813.0411s
        iters: 500, epoch: 4 | loss: 0.1424108
        speed: 5.1326s/iter; left time: 47086.7934s
Epoch: 4 cost time: 2927.2790908813477
Epoch: 4, Steps: 569 | Train Loss: 0.1652472 Vali Loss: 0.1441068 Test Loss: 0.1639635
Validation loss decreased (0.149193 --> 0.144107).  Saving model ...
Updating learning rate to 0.009999999702303647
        iters: 100, epoch: 5 | loss: 0.1699137
        speed: 12.8163s/iter; left time: 115410.5528s
        iters: 200, epoch: 5 | loss: 0.1487865
        speed: 5.1346s/iter; left time: 45723.9496s
        iters: 300, epoch: 5 | loss: 0.1444238
        speed: 5.1314s/iter; left time: 45181.5845s
        iters: 400, epoch: 5 | loss: 0.1498815
        speed: 5.1616s/iter; left time: 44932.1132s
        iters: 500, epoch: 5 | loss: 0.1757456
        speed: 5.1221s/iter; left time: 44075.2486s
Epoch: 5 cost time: 2921.448657989502
Epoch: 5, Steps: 569 | Train Loss: 0.1619713 Vali Loss: 0.1404193 Test Loss: 0.1607788
Validation loss decreased (0.144107 --> 0.140419).  Saving model ...
Updating learning rate to 0.009903589888524428
        iters: 100, epoch: 6 | loss: 0.1862848
        speed: 12.8125s/iter; left time: 108086.4720s
        iters: 200, epoch: 6 | loss: 0.2128041
        speed: 5.1104s/iter; left time: 42599.9440s
        iters: 300, epoch: 6 | loss: 0.1503186
        speed: 5.0997s/iter; left time: 42001.2183s
        iters: 400, epoch: 6 | loss: 0.1639346
        speed: 5.1315s/iter; left time: 41750.0211s
        iters: 500, epoch: 6 | loss: 0.1568830
        speed: 5.1402s/iter; left time: 41306.7499s
Epoch: 6 cost time: 2915.328821659088
Epoch: 6, Steps: 569 | Train Loss: 0.1594240 Vali Loss: 0.1390834 Test Loss: 0.1609802
Validation loss decreased (0.140419 --> 0.139083).  Saving model ...
Updating learning rate to 0.009618738633882892
        iters: 100, epoch: 7 | loss: 0.1739685
        speed: 12.7877s/iter; left time: 100600.5008s
        iters: 200, epoch: 7 | loss: 0.1729174
        speed: 5.1131s/iter; left time: 39713.7175s
        iters: 300, epoch: 7 | loss: 0.1615029
        speed: 5.1118s/iter; left time: 39192.2130s
        iters: 400, epoch: 7 | loss: 0.1652528
        speed: 5.1183s/iter; left time: 38729.9524s
        iters: 500, epoch: 7 | loss: 0.1516450
        speed: 5.1377s/iter; left time: 38363.4495s
Epoch: 7 cost time: 2915.261335849762
Epoch: 7, Steps: 569 | Train Loss: 0.1580891 Vali Loss: 0.1398337 Test Loss: 0.1605705
EarlyStopping counter: 1 out of 10
Updating learning rate to 0.009156392612348487
        iters: 100, epoch: 8 | loss: 0.1607154
        speed: 12.7895s/iter; left time: 93337.8978s
        iters: 200, epoch: 8 | loss: 0.1485333
        speed: 5.1520s/iter; left time: 37083.9115s
        iters: 300, epoch: 8 | loss: 0.1617977
        speed: 5.1357s/iter; left time: 36453.0398s
        iters: 400, epoch: 8 | loss: 0.1740625
        speed: 5.1317s/iter; left time: 35911.4126s
        iters: 500, epoch: 8 | loss: 0.1527710
        speed: 5.1561s/iter; left time: 35566.8314s
Epoch: 8 cost time: 2925.321046590805
Epoch: 8, Steps: 569 | Train Loss: 0.1566934 Vali Loss: 0.1373845 Test Loss: 0.1597222
Validation loss decreased (0.139083 --> 0.137385).  Saving model ...
Updating learning rate to 0.008534319522242146
        iters: 100, epoch: 9 | loss: 0.1652713
        speed: 12.8355s/iter; left time: 86369.7783s
        iters: 200, epoch: 9 | loss: 0.1621364
        speed: 5.1455s/iter; left time: 34109.7011s
        iters: 300, epoch: 9 | loss: 0.1643068
        speed: 5.1303s/iter; left time: 33496.0499s
        iters: 400, epoch: 9 | loss: 0.1597919
        speed: 5.1359s/iter; left time: 33018.8201s
        iters: 500, epoch: 9 | loss: 0.1399977
        speed: 5.1564s/iter; left time: 32635.0745s
Epoch: 9 cost time: 2928.5360889434814
Epoch: 9, Steps: 569 | Train Loss: 0.1554113 Vali Loss: 0.1356223 Test Loss: 0.1579806
Validation loss decreased (0.137385 --> 0.135622).  Saving model ...
Updating learning rate to 0.007776425283554044
        iters: 100, epoch: 10 | loss: 0.1671048
        speed: 12.8444s/iter; left time: 79121.3785s
        iters: 200, epoch: 10 | loss: 0.1631030
        speed: 5.1648s/iter; left time: 31298.4475s
        iters: 300, epoch: 10 | loss: 0.1588062
        speed: 5.1813s/iter; left time: 30880.4541s
        iters: 400, epoch: 10 | loss: 0.1353073
        speed: 5.1337s/iter; left time: 30083.6201s
        iters: 500, epoch: 10 | loss: 0.1544616
        speed: 5.1329s/iter; left time: 29565.6875s
Epoch: 10 cost time: 2932.988625526428
Epoch: 10, Steps: 569 | Train Loss: 0.1545012 Vali Loss: 0.1355197 Test Loss: 0.1582889
Validation loss decreased (0.135622 --> 0.135520).  Saving model ...
Updating learning rate to 0.0069118353468449805
        iters: 100, epoch: 11 | loss: 0.1679231
        speed: 12.8716s/iter; left time: 71965.2249s
        iters: 200, epoch: 11 | loss: 0.1564277
        speed: 5.1322s/iter; left time: 28181.1619s
        iters: 300, epoch: 11 | loss: 0.1384551
        speed: 5.1768s/iter; left time: 27907.9469s
        iters: 400, epoch: 11 | loss: 0.1903353
        speed: 5.1334s/iter; left time: 27160.6540s
        iters: 500, epoch: 11 | loss: 0.1369565
        speed: 5.1407s/iter; left time: 26685.5674s
Epoch: 11 cost time: 2927.973526239395
Epoch: 11, Steps: 569 | Train Loss: 0.1532342 Vali Loss: 0.1342994 Test Loss: 0.1569626
Validation loss decreased (0.135520 --> 0.134299).  Saving model ...
Updating learning rate to 0.005973775418515064
        iters: 100, epoch: 12 | loss: 0.1715028
        speed: 12.8970s/iter; left time: 64768.8460s
        iters: 200, epoch: 12 | loss: 0.1485089
        speed: 5.1375s/iter; left time: 25286.8485s
        iters: 300, epoch: 12 | loss: 0.1633036
        speed: 5.1631s/iter; left time: 24896.4733s
        iters: 400, epoch: 12 | loss: 0.1642712
        speed: 5.2016s/iter; left time: 24561.7390s
        iters: 500, epoch: 12 | loss: 0.1408267
        speed: 5.6498s/iter; left time: 26113.5549s
Epoch: 12 cost time: 3242.817573070526
Epoch: 12, Steps: 569 | Train Loss: 0.1521039 Vali Loss: 0.1334765 Test Loss: 0.1554474
Validation loss decreased (0.134299 --> 0.133476).  Saving model ...
Updating learning rate to 0.004998294615539945
        iters: 100, epoch: 13 | loss: 0.1810215
        speed: 21.6514s/iter; left time: 96413.7453s
        iters: 200, epoch: 13 | loss: 0.1365071
        speed: 8.7977s/iter; left time: 38296.4475s
        iters: 300, epoch: 13 | loss: 0.1501825
        speed: 8.4662s/iter; left time: 36006.5463s
        iters: 400, epoch: 13 | loss: 0.1401151
        speed: 7.4791s/iter; left time: 31060.8579s
        iters: 500, epoch: 13 | loss: 0.1336595
        speed: 7.2531s/iter; left time: 29396.8200s
Epoch: 13 cost time: 4570.225399017334
Epoch: 13, Steps: 569 | Train Loss: 0.1509372 Vali Loss: 0.1332987 Test Loss: 0.1558944
Validation loss decreased (0.133476 --> 0.133299).  Saving model ...
Updating learning rate to 0.004022880118122018
        iters: 100, epoch: 14 | loss: 0.1439826
        speed: 19.1547s/iter; left time: 74396.8310s
        iters: 200, epoch: 14 | loss: 0.1478943
        speed: 8.5481s/iter; left time: 32346.1754s
        iters: 300, epoch: 14 | loss: 0.1496619
        speed: 8.1121s/iter; left time: 29884.8347s
        iters: 400, epoch: 14 | loss: 0.1521250
        speed: 7.7402s/iter; left time: 27740.7949s
        iters: 500, epoch: 14 | loss: 0.1404849
        speed: 7.7055s/iter; left time: 26846.0669s
Epoch: 14 cost time: 4567.227932929993
Epoch: 14, Steps: 569 | Train Loss: 0.1497425 Vali Loss: 0.1315518 Test Loss: 0.1540588
Validation loss decreased (0.133299 --> 0.131552).  Saving model ...
Updating learning rate to 0.003085016558378303
        iters: 100, epoch: 15 | loss: 0.1538192
        speed: 21.1813s/iter; left time: 70215.9704s
        iters: 200, epoch: 15 | loss: 0.1534941
        speed: 8.4896s/iter; left time: 27294.1431s
        iters: 300, epoch: 15 | loss: 0.1471018
        speed: 8.7155s/iter; left time: 27148.8085s
        iters: 400, epoch: 15 | loss: 0.1576238
        speed: 8.6912s/iter; left time: 26203.8518s
        iters: 500, epoch: 15 | loss: 0.1819350
        speed: 8.4510s/iter; left time: 24634.7336s
Epoch: 15 cost time: 4932.46764922142
Epoch: 15, Steps: 569 | Train Loss: 0.1487162 Vali Loss: 0.1310105 Test Loss: 0.1540257
Validation loss decreased (0.131552 --> 0.131010).  Saving model ...
Updating learning rate to 0.002220745506949808
        iters: 100, epoch: 16 | loss: 0.1846118
        speed: 20.6031s/iter; left time: 56575.9909s
        iters: 200, epoch: 16 | loss: 0.1616468
        speed: 8.6039s/iter; left time: 22765.8285s
        iters: 300, epoch: 16 | loss: 0.1327626
        speed: 6.2404s/iter; left time: 15888.0060s
        iters: 400, epoch: 16 | loss: 0.1551158
        speed: 6.1701s/iter; left time: 15092.1645s
        iters: 500, epoch: 16 | loss: 0.1398353
        speed: 6.2107s/iter; left time: 14570.2398s
Epoch: 16 cost time: 3973.0328917503357
Epoch: 16, Steps: 569 | Train Loss: 0.1477272 Vali Loss: 0.1316696 Test Loss: 0.1536659
EarlyStopping counter: 1 out of 10
Updating learning rate to 0.0014632804156541378
        iters: 100, epoch: 17 | loss: 0.1230700
        speed: 15.4625s/iter; left time: 33661.9529s
        iters: 200, epoch: 17 | loss: 0.1573384
        speed: 6.1926s/iter; left time: 12861.9405s
        iters: 300, epoch: 17 | loss: 0.1293378
        speed: 6.1696s/iter; left time: 12197.2655s
        iters: 400, epoch: 17 | loss: 0.1479781
        speed: 6.1758s/iter; left time: 11591.9102s
        iters: 500, epoch: 17 | loss: 0.1448028
        speed: 6.2118s/iter; left time: 11038.2934s
Epoch: 17 cost time: 3521.803737640381
Epoch: 17, Steps: 569 | Train Loss: 0.1469097 Vali Loss: 0.1306747 Test Loss: 0.1541450
Validation loss decreased (0.131010 --> 0.130675).  Saving model ...
Updating learning rate to 0.0008417302431584706
        iters: 100, epoch: 18 | loss: 0.1620512
        speed: 15.5350s/iter; left time: 24980.2699s
        iters: 200, epoch: 18 | loss: 0.1499053
        speed: 6.1625s/iter; left time: 9293.1250s
        iters: 300, epoch: 18 | loss: 0.1662505
        speed: 6.3249s/iter; left time: 8905.4008s
        iters: 400, epoch: 18 | loss: 0.1391735
        speed: 6.1726s/iter; left time: 8073.7484s
        iters: 500, epoch: 18 | loss: 0.1476600
        speed: 6.1629s/iter; left time: 7444.8401s
Epoch: 18 cost time: 3534.5624589920044
Epoch: 18, Steps: 569 | Train Loss: 0.1461595 Vali Loss: 0.1299997 Test Loss: 0.1526653
Validation loss decreased (0.130675 --> 0.130000).  Saving model ...
Updating learning rate to 0.000379980814022461
        iters: 100, epoch: 19 | loss: 0.1478482
        speed: 15.4754s/iter; left time: 16078.9058s
        iters: 200, epoch: 19 | loss: 0.1375282
        speed: 6.1718s/iter; left time: 5795.3447s
        iters: 300, epoch: 19 | loss: 0.1347301
        speed: 6.1723s/iter; left time: 5178.5657s
        iters: 400, epoch: 19 | loss: 0.1395999
        speed: 6.1711s/iter; left time: 4560.4306s
        iters: 500, epoch: 19 | loss: 0.1457563
        speed: 6.1658s/iter; left time: 3939.9382s
Epoch: 19 cost time: 3523.4791634082794
Epoch: 19, Steps: 569 | Train Loss: 0.1455928 Vali Loss: 0.1294968 Test Loss: 0.1526850
Validation loss decreased (0.130000 --> 0.129497).  Saving model ...
Updating learning rate to 9.57768998557435e-05
        iters: 100, epoch: 20 | loss: 0.1373926
        speed: 18.1722s/iter; left time: 8540.9147s
        iters: 200, epoch: 20 | loss: 0.1376037
        speed: 9.0205s/iter; left time: 3337.5734s
        iters: 300, epoch: 20 | loss: 0.1424138
        speed: 7.4997s/iter; left time: 2024.9093s
        iters: 400, epoch: 20 | loss: 0.1382999
        speed: 7.3815s/iter; left time: 1254.8527s
        iters: 500, epoch: 20 | loss: 0.1563088
        speed: 7.4559s/iter; left time: 521.9111s
Epoch: 20 cost time: 4459.442385435104
Epoch: 20, Steps: 569 | Train Loss: 0.1453670 Vali Loss: 0.1296206 Test Loss: 0.1527611
EarlyStopping counter: 1 out of 10
Updating learning rate to 4.0297696353048286e-08
>>>>>>>testing : long_term_forecast_ECL_96_96_none_TimeMixer_custom_sl96_pl96_dm16_nh8_el3_dl1_df32_fc3_ebtimeF_dtTrue_Exp_0<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
test 5165
mse:0.15268494188785553, mae:0.24510186910629272
```
