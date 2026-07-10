---
up:
related:
date: 2026-07-10
---
### 源码理解
```python
python -u run.py --task_name long_term_forecast --is_training 1 
--root_path ./dataset/electricity/ 
--data_path electricity.csv 
--model_id ECL_48_720 --model TimeMixer --data custom 
--features M 
--seq_len 48 --label_len 0 --pred_len 720 
--e_layers 3 --d_layers 1 --factor 3 
--enc_in 321 --dec_in 321 --c_out 321 
--des 'Exp' --itr 1 --d_model 16 --d_ff 32 --batch_size 32 
--learning_rate 0.01 
--train_epochs 20 --patience 10 
--down_sampling_layers 3 --down_sampling_method avg 
--down_sampling_window 2

```
### 源码工程架构

