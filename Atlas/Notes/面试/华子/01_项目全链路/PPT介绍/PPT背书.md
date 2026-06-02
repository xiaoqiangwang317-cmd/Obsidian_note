---
up:
related:
date: 2026-06-02
---
**第一页讲稿**

面试官您好，我叫王文慧。本科就读于河南科技大学软件工程专业，研究生就读于哈尔滨工程大学计算机科学与技术学院电子信息专业。

我首先介绍一下我的个人情况，在本科阶段，我的学习成绩保持在年级前列，本科期间大概是千人规模前 20 名，最终以专业 Top 2% 的成绩顺利保研。期间也获得过国家励志奖学金、校一等奖学金、三好学生等荣誉。同时我也担任过班级学生干部，主要负责班级学习和学生事务协调，这段经历让我比较早地接触到组织协作和沟通推进工作。

研究生阶段，我继续围绕软件系统研发和工程实践积累经验。学业方面获得过校一等奖学金；项目实践方面，参与过航天一院相关安全评估项目的研发工作；另外我也在中科院软件所外派实习近一年，对需求分析、系统设计、开发实现、测试验证和交付落地这一整套软件开发周期有了更完整的理解。

我这次选择围绕 Agent Runtime 和 AI Coding Agent 来展开答辩，是因为我理解的 AI 应用开发并不只是调用一个大模型接口。真正能落地的 AI 应用，往往需要把模型能力放进一个可控制、可追踪、可迭代的工程系统里：前面要有任务编排和状态管理，中间要有工具调用、知识检索和上下文记忆，后面还要有验证、日志和反馈闭环。

所以今天我的答辩主线会从 Agent Runtime 切入。首先我会结合 Nanobot 这类开源项目，说明我对 Agent Loop、ReAct 执行、工具路由和上下文压缩记忆的理解；然后再落到我用 Java 技术栈实现的企业知识库智能客服系统，说明我如何把这些思想转化成一个具体的 AI 应用工程实践。

我个人也比较向往华为 AI 应用开发这个方向，因为它不是停留在模型能力本身，而是更关注模型如何进入真实业务、真实系统和真实用户场景。我的优势可能不只是会使用 AI 工具，而是愿意从工程结构、系统闭环和业务落地的角度去理解 AI 应用开发，这也是我今天想重点展示的内容。

**第二页讲稿**

这一页我想先从 Agent Runtime 的执行闭环讲起。这里展示的是我参考 Nanobot / OpenClaw 思想整理出来的一套 Agent Runtime 流程图。它不是单纯的一次模型调用，而是一个可持续执行、可观察、可回填上下文的循环系统。

最上面是用户输入。用户输入进入之后，首先会到 loop.py，也就是状态机入口。它负责整个任务的生命周期调度，包括接收输入、维护上下文、判断当前任务是否需要继续执行，以及控制什么时候进入下一轮循环。所以我理解 Agent Runtime 的第一层能力，就是状态管理和流程控制。

接下来进入 runner.py，也就是 ReAct 执行引擎。ReAct 的核心是让模型不是直接给最终答案，而是在推理过程中判断当前是否需要调用工具，如果需要，应该调用哪个工具，工具返回的 Observation 又如何进入下一轮推理。这个过程更接近“推理、行动、观察、再推理”的闭环。

再往下是 Registry，也就是能力路由网关。它的作用是把不同能力统一注册和调度起来，比如本地 Tool、内置 Skill、远程 MCP。在 Nanobot 的实现里，本地 Tool 会直接注册到 ToolRegistry；Skill 更像是在 BUILD 阶段注入 system prompt 的任务方法论；MCP 则是通过连接外部 MCP Server、list_tools 获取工具 schema 后，再包装成 mcp_<server>_<tool> 注册进 Registry。这样模型不需要关心每个工具底层怎么实现，只需要根据任务选择合适的能力。

最下面是结果回填。工具执行之后，结果不会直接结束，而是会作为 Observation 回填到上下文里，再交给状态机判断是否进入下一轮。也就是说，Agent Runtime 的关键不是“调用一次模型”，而是形成一个可控的执行闭环：输入、状态调度、推理决策、工具调用、结果观察、上下文更新，再到下一轮决策。

这里我还想补充一个我比较关注的点，就是上下文压缩和记忆。像 Nanobot / OpenClaw 这类 Agent Runtime，在长任务场景下不会把所有历史内容都原样塞进上下文，而是会把旧上下文压缩成摘要，同时保留关键记忆和最近上下文。这样既能控制 token 成本，也能避免长任务执行到中间丢失目标。这个思想后面我迁移到了自己的智能客服项目里，用 Redis 保存多轮会话摘要、当前意图和会话状态，支撑用户连续追问。

所以这一页对应到我的项目里，主要是一个设计思想来源：我参考 Agent Runtime 的可控执行闭环，把它落到 Java 企业知识库智能客服系统中。后面我的实现会围绕三个问题展开：第一，如何用状态机管理多 Agent 协同；第二，如何用 RAG 让回答有知识依据；第三，如何用记忆、Prompt 约束和日志反馈，让系统变得可追踪、可迭代。

第三页

上一页我讲的是 Agent Runtime 的执行闭环，也就是状态机、Runner、Registry、Observation 和 Memory 如何组成一个可持续执行的系统。那接下来我想说明的是，我不是只停留在概念理解上，而是选取 Nanobot 这个开源项目作为源码拆解对象，去观察一个轻量级 Agent Runtime 是如何把这套闭环落到代码里的。

Nanobot 给我的启发是，它的代码规模并不大，但主路径很清楚。它不是通过堆很多复杂模块来体现能力，而是用比较小的核心，把消息进入、状态调度、模型决策、工具调用、上下文记忆和结果返回串成一条完整链路。所以我把这一页总结成四个步骤。

第一步是架构观察。我先从 Agent Runtime 的闭环角度去看它，而不是一上来陷入某个函数细节。重点关注的是状态机如何管理生命周期，Runner 如何组织 ReAct 推理，Registry 如何路由工具和能力，以及 Observation 如何回填到上下文。

第二步是源码拆解。我以 HKUDS/nanobot 为对象，拆它的 Agent Runtime 模块边界。比如 Inbound 负责消息进入，AgentLoop 负责状态调度，Runner 负责 LLM 推理和工具调用，Registry 负责 Tool、Skill、MCP 的能力路由，Memory 负责上下文补充，Respond 负责状态保存和结果输出。

第三步是自研验证。源码拆完以后，我没有只停留在“看懂了”的层面，而是用 Java 做了一版本地 Agent Runtime 验证，重点跑通上下文管理、工具路由、隔离工作区和验证任务执行。这个过程让我验证了一个判断：Agent Runtime 的核心不在于代码量，而在于能不能稳定形成“决策、执行、观察、再决策”的闭环。

第四步是工程落地。最后我把这套 Runtime 思想迁移到 AI 应用开发场景里，也就是后面要展开的企业知识库智能客服系统。在这个系统里，状态机对应多 Agent 协同，RAG 对应知识证据获取，Redis 对应上下文记忆，Prompt 约束和日志反馈对应回答质量控制与持续优化。

第四页

所以这一页想表达的是：Nanobot 的价值在于用轻量代码呈现了 Agent Runtime 的核心闭环，而我的实践路径是从架构观察，到源码拆解，再到本地验证，最后落到具体 AI 应用工程里。

**这一页是从 Runtime 思想到我自己项目的映射关系。前面我讲了 Nanobot / OpenClaw 这类 Agent Runtime 的核心闭环，它的重点不是某一个模型调用，而是状态调度、工具调用、上下文回填和结果治理。那我自己的项目，就是把这套思想迁移到企业知识库智能问答场景里。

第一层是状态机调度。在 Runtime 里，AgentLoop 负责生命周期控制；对应到我的系统里，就是用状态机串联意图识别、知识检索和答案生成。这样一次用户问题进入后，不是让模型自由发挥，而是按固定流程完成任务。

第二层是执行引擎。Runtime 里 Runner 负责推理、行动和观察；对应到我的系统里，我把问答流程拆成 Intent Agent、Retrieval Agent 和 Answer Agent。Intent Agent 判断用户意图和追问关系，Retrieval Agent 负责 RAG 检索，Answer Agent 基于证据生成答案。

第三层是能力网关。Nanobot 里通过 ToolRegistry 和 MCP 扩展外部能力；我的系统里对应 KnowledgeRepository 和 VectorStore。这样检索 Agent 不直接依赖 Milvus，而是面向抽象接口，后续可以从本地向量库切到 Milvus，也可以替换不同 Embedding 模型。

第四层是上下文记忆。Runtime 里通过 history、memory、skills 维持任务上下文；我的系统里通过 Redis 管理多轮会话摘要、当前意图和会话状态，用来支持连续追问。

第五层是结果治理。Runtime 里的 Observation 会回填上下文，驱动下一轮决策；我的系统里则通过 MySQL 记录 QA 日志、用户反馈和 Prompt trace，用来分析召回效果、回答质量和后续优化方向。**

第五页

这一页我从一次请求的代码链路来讲。用户问题进入系统后，首先到接口层，也就是 CustomerServiceController。我在这里提供了两个接口：POST /api/customer-service/chat 负责接收用户问题，入参是 ChatRequest，返回 ChatResponse；另一个是 POST /api/customer-service/feedback，用于记录用户反馈。

接口层不会直接调用模型，而是把请求交给业务编排类 KnowledgeCustomerService。在 KnowledgeCustomerService.chat() 里，我做了三件事：第一，通过 ConversationMemoryService.load() 加载当前 session 的上下文；第二，调用 CustomerServiceAgentStateMachine.run() 执行多 Agent 流程；第三，在回答结束后，通过 ConversationMemoryService.recordTurn() 记录本轮对话，并通过 KnowledgeAuditService.recordQaLog() 写入问答日志，最后把 logId 返回给前端，方便后续反馈追踪。

中间最核心的是状态机 CustomerServiceAgentStateMachine。我定义了一个通用接口 Agent，里面只有一个方法 execute(AgentContext context)。然后用 AgentState 枚举管理状态流转，包括 RECEIVED、INTENT_RECOGNIZED、KNOWLEDGE_RETRIEVED、ANSWER_GENERATED、COMPLETED 和 FAILED。状态机内部用 EnumMap<AgentState, Agent> 维护每个状态对应执行哪个 Agent。

具体到三个 Agent：  
IntentRecognitionAgent 负责识别意图，会生成 IntentResult，比如知识问答、售后问题或者连续追问；  
KnowledgeRetrievalAgent 负责检索，它会调用 KnowledgeRepository.search()，根据 resolvedQuestion、intentName 和 topK 获取知识片段；  
AnswerGenerationAgent 负责答案生成，它会计算召回置信度，调用 PromptTemplateBuilder 构建 GroundedPrompt，再通过 PromptConstrainedAnswerGenerator 做证据约束生成。

RAG 这块我也做了接口抽象。KnowledgeRepository 是知识检索接口，具体实现是 RagKnowledgeRepository。底层有一个 RagPipeline，它分成两个流程：离线入库走 ingest()，里面用 DocumentChunker 做文档切分，用 EmbeddingModel 做向量化，再写入 VectorStore；在线召回走 retrieve()，对用户问题向量化后调用 VectorStore.search() 做 TopK 检索。

VectorStore 是向量库接口，我实现了两个版本：LocalVectorStore 用来本地验证召回逻辑，MilvusSdkVectorStore 用来对接外部 Milvus。创建逻辑放在 VectorStoreFactory 里，通过配置决定走本地还是 Milvus。这里的好处是 Retrieval Agent 不依赖具体向量库，后续替换 Milvus 或 Embedding 模型不会影响上层 Agent 流程。

记忆和审计这块，我也做了抽象。ConversationMemoryStore 是会话存储接口，本地可以走 InMemoryConversationMemoryStore，生产可以走 RedisConversationMemoryStore。它会按 sessionId 保存 ConversationSessionState，里面包括会话摘要、当前意图和历史轮次，用来支持连续追问。

MySQL 侧我定义了 KnowledgeAuditRepository 接口，具体实现是 MyBatisPlusKnowledgeAuditRepository，里面通过 KnowledgeDocumentMapper、QaLogMapper、UserFeedbackMapper 分别管理知识文档元数据、问答日志和用户反馈。

第六页

这一页可以更聚焦代码实现，讲“多 Agent 不是概念，是我用状态机和接口拆出来的”。你可以这样说：

这一页我具体讲多 Agent 状态机是怎么实现的。

在代码里，我先定义了一个统一的 `Agent` 接口，核心方法是：

```java
void execute(AgentContext context);
```

也就是说，不管是意图识别、知识检索，还是答案生成，本质上都实现同一个执行接口。这样状态机不需要关心每个 Agent 内部怎么做，只需要按状态取出对应 Agent 并调用 `execute()`。

状态枚举我定义在 `AgentState` 里，包括 `RECEIVED`、`INTENT_RECOGNIZED`、`KNOWLEDGE_RETRIEVED`、`ANSWER_GENERATED`、`COMPLETED` 和 `FAILED`。PPT 上为了简洁写成了 `INTENT_OK`、`RETRIEVED`、`GENERATED`，但代码里对应的就是这几个完整状态。

真正的编排类是 `CustomerServiceAgentStateMachine`。它内部用一个 `EnumMap<AgentState, Agent>` 维护状态和 Agent 的映射关系：

```java
RECEIVED -> IntentRecognitionAgent
INTENT_RECOGNIZED -> KnowledgeRetrievalAgent
KNOWLEDGE_RETRIEVED -> AnswerGenerationAgent
```

执行时，`run()` 方法会创建一个 `AgentContext`，然后进入 while 循环。只要状态不是 `COMPLETED` 或 `FAILED`，就根据当前状态取出对应 Agent，执行 `agent.execute(context)`。每个 Agent 执行完之后，会通过 `context.moveTo()` 推进到下一个状态。

三个 Agent 的职责是这样拆的。

`IntentRecognitionAgent` 负责意图识别。它会读取 `context.resolvedQuestion()`，结合当前会话状态判断是售后问题、知识问答，还是连续追问，然后生成 `IntentResult`，写回 `context.intent()`，最后把状态推进到 `INTENT_RECOGNIZED`。

`KnowledgeRetrievalAgent` 负责知识检索。它内部依赖的是 `KnowledgeRepository` 接口，而不是直接依赖 Milvus。执行时调用：

```java
repository.search(context.resolvedQuestion(), context.intent().name(), 3)
```

然后把 TopK 召回结果放进 `context.retrievedChunks()`，再把状态推进到 `KNOWLEDGE_RETRIEVED`。

`AnswerGenerationAgent` 负责受控生成。它会先根据召回的 `KnowledgeChunk` 计算最大置信度，然后用 `PromptTemplateBuilder` 构建 `GroundedPrompt`，再调用 `PromptConstrainedAnswerGenerator` 生成答案。如果证据不足或者置信度低于阈值，就不会直接回答，而是返回转人工策略。最终它会构造 `ChatResponse`，里面包含 answer、confidence、sourceDocumentIds 和 trace。

这里最关键的是 `AgentContext`。它贯穿整个流程，保存了 `request`、`conversation`、`resolvedQuestion`、`intent`、`retrievedChunks`、`prompt`、`response` 和 `trace`。也就是说，状态机负责流程流转，Agent 负责单步能力，AgentContext 负责在多个 Agent 之间传递状态和中间结果。

所以这一页我想表达的是：我的多 Agent 实现不是简单把几个类命名成 Agent，而是用 `Agent` 接口统一执行协议，用 `AgentState` 管理生命周期，用 `CustomerServiceAgentStateMachine` 做编排，用 `AgentContext` 贯穿上下文。这样每个 Agent 职责清晰，后续如果要替换意图识别模型、检索策略或者答案生成模型，都可以单独替换，不影响整体流程。

第七页

这一页我讲 RAG 检索增强链路的代码实现。整个 RAG 我拆成两部分：离线入库和在线召回，对应代码里主要是 RagPipeline 这个类。

离线入库对应 RagPipeline.ingest() 方法。入参是一组 KnowledgeDocument，也就是企业知识文档对象。每个文档里包含 documentId、title、intentName 和 content。入库时，系统会先调用 DocumentChunker.chunk() 做文档切分，把长文档切成多个 DocumentChunk，每个 Chunk 会保留原始文档编号、标题、意图类型和 chunkId。

切分完成后，RagPipeline 会调用 EmbeddingModel.embed() 对每个 Chunk 做向量化。我这里把 Embedding 抽象成接口 EmbeddingModel，当前本地实现是 HashingEmbeddingModel，主要用于验证向量化和召回流程。后续如果接真实 Embedding 服务，只需要替换这个接口实现，不影响 RAG 主流程。

向量化之后，我会把 DocumentChunk 和对应的 EmbeddingVector 封装成 VectorDocument，然后调用 VectorStore.upsert() 写入向量库。这里 VectorStore 也是接口，我实现了两个版本：LocalVectorStore 和 MilvusSdkVectorStore。本地验证时用 LocalVectorStore，它会在内存里做 cosine 相似度排序；生产环境可以通过 VectorStoreFactory 创建 MilvusSdkVectorStore，真正连接 Milvus，把向量写入 collection。

在线召回对应 RagPipeline.retrieve() 方法。用户问题进入后，系统会先调用 EmbeddingModel.embed(query) 把问题向量化，然后调用：

`vectorStore.search(queryVector, intentName, topK)`

这里会带上 intentName，比如售后问题就优先检索售后相关知识。LocalVectorStore 里做了一个 intentBoost，如果 Chunk 的 intentName 和问题意图一致，会给召回分数加权；MilvusSdkVectorStore 里则是通过 filter 条件按 intent_name 过滤，再做 TopK 向量检索。

召回结果返回的是 VectorSearchHit，里面包含命中的 DocumentChunk 和 score。然后 RagPipeline.retrieve() 会把它转换成业务层使用的 KnowledgeChunk，包含 documentId、title、content 和 score。这些 KnowledgeChunk 后面会进入 AnswerGenerationAgent，作为 Grounded Prompt 的证据块。

所以这一页我想表达的是：RAG 链路不是一句“接了向量库”，而是在代码里拆成了清晰的接口和流程。DocumentChunker 负责切分，EmbeddingModel 负责向量化，VectorStore 负责向量存储和检索，RagPipeline 负责把这些步骤串起来，RagKnowledgeRepository 再把它封装成上层 Agent 可调用的 KnowledgeRepository.search()。

这里还有一个设计取舍：KnowledgeRetrievalAgent 不直接依赖 Milvus，而是依赖 KnowledgeRepository。底层是否使用 LocalVectorStore、MilvusSdkVectorStore，甚至以后换成 Elasticsearch 向量检索或其他向量数据库，都不会影响上层多 Agent 流程。这就是我在这个 RAG 模块里做的工程抽象。