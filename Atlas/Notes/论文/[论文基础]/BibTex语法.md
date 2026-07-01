---
up:
related:
date: 2026-06-26
---
#### 举例：

**预印本语法**
```latex
@misc{heDeepResidualLearning2015,

  title = {Deep {{Residual Learning}} for {{Image Recognition}}},

  author = {He, Kaiming and Zhang, Xiangyu and Ren, Shaoqing and Sun, Jian},

  year = 2015,

  month = dec,

  number = {arXiv:1512.03385},

  eprint = {1512.03385},

  primaryclass = {cs.CV},

  publisher = {arXiv},

  doi = {10.48550/arXiv.1512.03385},

  urldate = {2026-06-25},

  abstract = {Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth. On the ImageNet dataset we evaluate residual nets with a depth of up to 152 layers---8x deeper than VGG nets but still having lower complexity. An ensemble of these residual nets achieves 3.57\% error on the ImageNet test set. This result won the 1st place on the ILSVRC 2015 classification task. We also present analysis on CIFAR-10 with 100 and 1000 layers. The depth of representations is of central importance for many visual recognition tasks. Solely due to our extremely deep representations, we obtain a 28\% relative improvement on the COCO object detection dataset. Deep residual nets are foundations of our submissions to ILSVRC \& COCO 2015 competitions, where we also won the 1st places on the tasks of ImageNet detection, ImageNet localization, COCO detection, and COCO segmentation.},

  archiveprefix = {arXiv},

  keywords = {Computer Science - Computer Vision and Pattern Recognition},

  file = {D\:\\paperWork\\Zotero\\storage\\NLVIF49I\\He 等 - 2015 - Deep Residual Learning for Image Recognition.pdf;D\:\\paperWork\\Zotero\\storage\\YWTJCENB\\1512.html}
  
}
```
**最终稿语法**
```laTex
@inproceedings{DBLP:conf/cvpr/HeZRS16,

  author       = {Kaiming He and

                  Xiangyu Zhang and

                  Shaoqing Ren and

                  Jian Sun},

  title        = {Deep Residual Learning for Image Recognition},

  booktitle    = {2016 {IEEE} Conference on Computer Vision and Pattern Recognition,

                  {CVPR} 2016, Las Vegas, NV, USA, June 27-30, 2016},

  pages        = {770--778},

  publisher    = {{IEEE} Computer Society},

  year         = {2016},

  url          = {https://doi.org/10.1109/CVPR.2016.90},

  doi          = {10.1109/CVPR.2016.90},

  timestamp    = {Fri, 24 Mar 2023 00:02:57 +0100},

  biburl       = {https://dblp.org/rec/conf/cvpr/HeZRS16.bib},

  bibsource    = {dblp computer science bibliography, https://dblp.org}

}
```

# BibTeX 核心字段（Tags）系统解析指南

BibTeX 本质上就是一个 **Key-Value（键值对）** 的数据字典。LaTeX 的编译引擎在生成参考文献时，会根据你选择的排版样式（如 IEEE、APA），去这个字典里“按需提取”特定的标签进行渲染。

以下是学术界最常用的 BibTeX 标签，我用系统建模的视角为你分成了四大类：

## 1. 基础元数据（Core Metadata）—— 几乎所有类型必填

无论是一篇文章、一本书还是一个网页，这三个标签是基石：

- **`author`**: 作者。格式要求极严，多个作者必须用 `and` 连接（例如 `author = {He, Kaiming and Sun, Jian}`）。
    
- **`title`**: 论文或书籍的标题。
    
- **`year`**: 发表年份（通常是四位数字，如 `2016`）。
    

## 2. 载体元数据（Container Fields）—— 决定文献出处

这类标签告诉读者“这篇内容发表在哪里”。不同的文献类型（Entry Type）使用的载体标签完全不同：

- **`journal`**: 期刊名称。**仅用于 `@article`（期刊文章）**，例如 `journal = {Nature}`。
    
- **`booktitle`**: 书名或会议论文集名。**核心用于 `@inproceedings`（会议论文）**，例如 `booktitle = {Proceedings of the CVPR}`。
    
- **`volume`**: 卷号（期刊专用）。
    
- **`number`**: 期号（期刊专用，通常跟在 volume 后面，如 18(4) 代表第 18 卷第 4 期）。
    
- **`pages`**: 起止页码。非常关键的物理定位符，格式通常为双横杠，如 `pages = {770--778}`。
    
- **`publisher`**: 出版社名称。书籍（`@book`）或正式会议往往需要此标签，如 `publisher = {IEEE}`。
    

## 3. 特殊学术实体标签（Specialized Entities）

当你引用的不是常规论文时，需要用到这些特定标签：

- **`institution`**: 发布机构。主要用于 `@techreport`（技术报告），比如某家科技公司的内部白皮书。
    
- **`school`**: 学校名称。专门用于 `@phdthesis`（博士学位论文）或 `@mastersthesis`（硕士论文）。
    
- **`chapter`**: 章节号。当你要引用某本厚书里的特定一章时使用。
    

## 4. 现代数字与网络标签（Modern Digital Tags）

在互联网时代，纸质页码不再是唯一的寻址方式：

- **`doi`**: 数字对象唯一标识符。现代学术最重要的指针（如前文所述），比传统 URL 稳定得多。
    
- **`url`**: 统一资源定位符（网址）。通常用于没有 DOI 的网页内容、软件 GitHub 仓库或预印本。
    
- **`eprint` / `archivePrefix` / `primaryClass`**: 这三个是 arXiv 预印本系统的专属套件，用于指明文章在 arXiv 上的编号和分类。
    

## 5. 本地管理与冗余标签（Local Management）

这些标签通常是 Zotero 等管理软件为了“自己好记”而强行生成的，**在最终生成 PDF 时，标准的 LaTeX 模板通常会直接忽略它们**：

- **`abstract`**: 论文的摘要全文。（写在参考文献里太长了，会被编译器丢弃）。
    
- **`file`**: 本地 PDF 文件的绝对路径（例如 `C:\Users\...`）。绝对不要把这个提交给最终的代码库。
    
- **`urldate` / `timestamp`**: 记录你访问该网页或添加该文献的时间点。
    
- **`keywords`**: 你打的标签或论文自带的关键词。
    

**💡 总结规律：** 你不需要死记硬背这些标签。在实际的 LaTeX 编译中（比如使用 `IEEEtran` 样式），编译器有一套严格的**校验逻辑**： 如果条目是 `@article`，它就去找 `journal`, `volume`, `number`；如果条目是 `@inproceedings`，它就去找 `booktitle`, `pages`。如果你给一个会议论文塞了 `journal` 标签，编译器往往会直接忽略它，甚至报出警告。
