---
name: ai-driven-engineering-repo
description: AI-Driven Engineering 仓库的完整设计规格 — 为 AI Agent 构建可自主运行的操作环境，基于 Docusaurus 构建
type: project
---

# AI-Driven Engineering — 仓库设计规格

## 一句话概要

使用 Docusaurus 构建一套为 AI Agent 设计的工程化知识体系，核心理念是让 Agent 拥有完整上下文、全局视野、信息可达、自我测试、自我验证、自我闭环的独立运行能力。所有内容默认为草稿状态，后续逐一确认发布。

---

## 1. 项目定位

| 维度 | 设定 |
|------|------|
| **项目名称** | AI-Driven Engineering |
| **核心理念** | 为 AI Agent 构建可独立运行的工程化体系——完整上下文、全局视野、信息可达、自我测试、自我验证、自我闭环 |
| **双重受众** | （1）AI Agent：首要读者，文档即 Agent 的「操作系统」（2）人类开发者：理解如何为 Agent 搭建运行环境 |
| **语言** | 中文 |
| **内容形式** | 纯文档型（Docusaurus 站点） |
| **部署** | GitHub Pages + GitHub Actions |
| **GitHub** | jasongwq/ai-driven-engineering |
| **主题** | Docusaurus 经典默认主题（@docusaurus/theme-classic） |

### 核心理念详解

AI-Driven Engineering 不是"人类如何更好地使用 AI"，而是**为 AI Agent 构建一套可独立运行的工程体系**。其核心循环：

```
完整上下文 → 全局视野 → 信息可达 → 自我测试 → 自我验证 → 自我闭环
     ↑                                                        |
     └────────────────────────────────────────────────────────┘
```

| 能力 | 含义 | 为什么重要 |
|------|------|------------|
| **完整上下文** | Agent 能获取到它需要的所有信息，没有盲区 | 没有完整上下文，Agent 的决策就是盲猜 |
| **全局视野** | Agent 知道项目的整体架构、依赖关系、变更影响范围 | 局部修改可能导致全局问题，Agent 必须能看到全局 |
| **信息可达** | Agent 知道去哪里找信息、怎么找、找得到 | 信息存在但找不到 = 信息不存在 |
| **自我测试** | Agent 能自行运行测试、检查输出、验证行为 | 没有测试，Agent 就没有反馈信号 |
| **自我验证** | Agent 能判断自己的产出是否正确、是否符合预期 | 不能验证 = 不能信任 |
| **自我闭环** | 从规划到执行到验证，Agent 能独立完成完整循环 | 闭环意味着 Agent 可以自主迭代，不需要人类逐步驱动 |

---

## 2. 内容架构：核心-扩展式

### 架构原则

1. **核心先行**：core/ 建立 Agent 自主运行的理论框架与术语体系，四个扩展篇在此基础上展开
2. **Agent 视角优先**：所有文档从 Agent 的视角组织信息——Agent 需要知道什么、怎么获取、怎么验证
3. **独立成体系**：每个扩展篇内部自洽，可按需深入
4. **交叉引用**：跨主题关联通过 Docusaurus 的 `@` 引用语法实现，避免内容重复
5. **来源可溯**：每个关键洞察标注出处（人名/组织/研究），确保可信度

### 2.1 核心方法论（core/）

建立 AI-Driven Engineering 的统一语言和理论框架，是四个扩展篇的前置基础。

| 文档 | 定位 | 核心内容 |
|------|------|----------|
| **mindset.md** | 建立认知框架 | **范式转变**：从「人类使用 AI 工具」到「为 Agent 构建运行环境」；**历史脉络**：Vibe Coding（Karpathy）→ Intent Coding（Ng）→ AI-Driven Engineering；**Agent 自主性光谱**：从人驱动到 Agent 自驱的层级划分；**核心循环**：完整上下文→全局视野→信息可达→自我测试→自我验证→自我闭环；**适用边界**：哪些场景适合 Agent 自驱、哪些仍需人类主导 |
| **principles.md** | 提炼可操作原则 | **10 条核心原则**：（1）上下文完整性（Agent 必须拥有决策所需的全部信息）（2）信息可达性（信息存在但不可达 = 不存在）（3）全局视野优先（局部优化可能导致全局退化）（4）验证即信任（不能验证 = 不能信任）（5）自我闭环（Agent 必须能独立完成 Plan→Execute→Verify 循环）（6）渐进式信任（从低风险到高风险逐步放权）（7）最小惊讶原则（Agent 的行为应符合预期模式）（8）步步为营（无跳跃式复杂度，每步必接）（9）ACI 优先（Agent-计算机接口设计比提示调优更有效 — Anthropic SWE-bench 经验）（10）自我欺骗警觉（METR 研究：开发者系统性地高估 AI 效率提升） |
| **anti-patterns.md** | 避坑指南 | **12 大反模式**：上下文盲区（Agent 缺少关键信息却不知道）、信息孤岛（信息存在但 Agent 找不到）、验证缺失（没有反馈信号的 Agent 输出）、开放式循环（只有执行没有验证）、大杂烩会话、反复纠正、过度膨胀的配置、信任-验证鸿沟、无限探索、孤立代码、跳跃式复杂度、Demo 陷阱；**元反模式**：自我欺骗（METR 研究）；每条反模式配修正方法 |

### 2.2 扩展一：AI 协作技巧（ai-collaboration/）

| 文档 | 核心内容 |
|------|----------|
| **prompt-engineering.md** | **结构化提示框架**：角色-任务-约束-示例（Anthropic 三原则：给模型思考空间、保持自然格式、无格式开销）；**XML 标签结构化**：`<instructions>`、`<context>`、`<example>` 嵌套标签；**Agent 指令设计**：从「对人说」到「对 Agent 说」的转变——Agent 需要明确的可执行指令而非模糊意图；**Few-shot 策略**：3-5 个示例，相关+多样+结构化；**精确 vs 模糊提示**：对比表；**自检提示**："完成前对照测试标准验证答案"；**长上下文**：长数据放顶部、查询放末尾（质量提升可达 30%） |
| **context-management.md** | **核心约束**：上下文窗口是最重要的资源，性能随填充而下降；**Agent 的上下文权利**：Agent 应该能获取到它需要的一切信息——关键是如何组织信息让 Agent 高效消费；**激进的上下文卫生**：不相关任务间 `/clear`、`/compact` 控制摘要存活内容、子 Agent 隔离上下文；**信息可达性设计**：索引、目录、规范文件——告诉 Agent 去哪里找、怎么找；**上下文恢复**：repomix 打包代码库传回 LLM；**棕地项目**：mise + repomix 生成代码库上下文 |
| **multi-turn-strategy.md** | **Spec→Plan→Execute 循环**（Harper Reed）：Brainstorm→spec.md、Plan→prompt_plan.md、Track→todo.md、逐步执行每步必接；**四阶段工作流**（Claude Code）：Explore→Plan→Implement→Commit；**Agent 自主循环设计**：如何让 Agent 独立完成 Plan→Execute→Verify 循环而不依赖人类逐步驱动；**2 次纠正法则**：纠正 2 次失败后，清空上下文重来；**卡住时**：/clear → /drop → /ask → /model → 人工介入 |

### 2.3 扩展二：工程化实践（engineering/）

| 文档 | 核心内容 |
|------|----------|
| **project-structure.md** | **Agent 友好的项目结构**：模块边界清晰、语义化命名、分层架构——让 Agent 能快速理解项目全局；**你自己搭基座**：开发者控制初始样板和工具选择，防止 Agent 使用不想要的框架；**始终使用新分支**：Agent 生成代码不污染主分支；**目录约定**：大项目的分层策略与职责划分；**项目索引**：为 Agent 提供项目地图，让它知道去哪里找什么 |
| **spec-files.md** | **现代 `.cursor/rules/` 结构**：替代旧式单文件 `.cursorrules`，使用细粒度 `.mdc` 文件；**Frontmatter 配置**：`alwaysApply: true`（始终注入）vs `alwaysApply: false` + `globs`（按文件匹配注入）；**CLAUDE.md 最佳实践**：只放 Agent 猜不到的东西，每条规则问"删掉这条会不会导致 Agent 犯错"；**规范文件即 Agent 的「操作系统」**：通过规范文件告诉 Agent 项目约定、架构边界、测试要求、验证标准——让 Agent 拥有全局视野和自我验证能力；**反模式**：过度膨胀的配置文件导致规则被忽略；**规范分层**：全局/项目/模块三层架构 |
| **workflow-design.md** | **Agent 自主工作流**：从人类驱动到 Agent 自驱的完整流程设计；**绿地项目工作流**：自建仓库→头脑风暴→spec.md→prompt_plan.md→逐步执行→todo.md 追踪→每步测试→自我验证→自我闭环；**棕地/遗留项目**：repomix 生成上下文→增量修改→mise+llm CLI 转换；**Agent 交接点设计**：何时 Agent 自主、何时需要人类确认；**团队 AI 协作**：目前仍是未解决问题 |

### 2.4 扩展三：质量保障（quality/）

| 文档 | 核心内容 |
|------|----------|
| **code-review.md** | **Agent 自审 vs 人类审查**：从人类逐行审查到 Agent 自主审查的演进路径；**Writer/Reviewer 并行模式**：一个 Agent 写代码，另一个 Agent 审查，互相独立；**覆盖率优先于过滤**（Anthropic）：让审查者报告所有发现，不过滤重要性或置信度；**AI 代码质量问题**：Veracode — 安全性未改善；CodeRabbit — 问题多 1.7x，安全漏洞高 2.74x；GitClear — 重复增加 4x；**审查即验证**：让 Agent 的审查能力成为自我闭环的关键环节 |
| **testing-strategy.md** | **自我测试 = Agent 的反馈信号**：没有测试，Agent 就没有反馈，就无法自我验证，就无法闭环；**给 Agent 验证自身工作的方法**：这是最高杠杆实践；**TDD + Agent**：先写测试，提醒 Agent "删除或修改测试是不可接受的"；**验证方法**：测试套件+代码检查、Bash 命令检查输出、UI 截图对比、子 Agent 审查；**不能验证 = 不能发布**；**测试即规范**：测试不仅是质量保障，更是 Agent 理解预期行为的规格说明 |
| **security-review.md** | **Agent 安全自审**：让 Agent 具备安全审查能力，而非完全依赖人类；**安全审查 Agent**：定义 .claude/agents/security-reviewer.md — 检查注入漏洞、认证授权缺陷、代码中的密钥/凭据、不安全数据处理；**AI 代码安全画像**：功能改善但安全未改善（Veracode）；安全漏洞 2.74x（CodeRabbit）；**安全扫描工具集成**：将安全扫描纳入 Agent 的自我验证闭环 |

### 2.5 扩展四：自动化与效率（automation/）

| 文档 | 核心内容 |
|------|----------|
| **ci-cd.md** | **CI/CD 即 Agent 的验证基础设施**：CI/CD 不仅部署，更是 Agent 自我验证的自动化环境；**自动审查流水线**：Agent 产出 → 自动测试 → 自动安全扫描 → 自动部署 → 自动回滚（如果验证失败）；**非交互模式**：`claude -p "将 $file 从 React 迁移到 Vue，返回 OK 或 FAIL"`；**扇出扩展**：生成任务列表→写脚本→2-3 个文件试跑→优化→大规模运行；**GitHub Actions 集成** |
| **agent-orchestration.md** | **Anthropic 四大工作流模式**：提示链、编排者-工作者、评估者-优化者、并行化/投票；**Agent 自主编排**：从人类编排 Agent 到 Agent 自行编排的演进；**子 Agent 编排**：并行运行、隔离上下文、独立工作流；**ACI 原则**：在 Agent-计算机接口上的投入应与 HCI 同等，工具定义优化比提示调优更有效；**闭环编排**：Agent 自行规划→执行→验证→调整，无需人类逐步驱动 |
| **efficiency-tools.md** | **工具全景图**：Claude Code、Cursor、Aider、repomix、mise、llm CLI；**工具即 Agent 的感官**：Agent 通过工具感知项目状态、执行操作、验证结果——工具的可达性直接决定 Agent 的能力边界；**IDE 集成**：Cursor Rules 系统、Agent 模式、MCP 集成；**上下文恢复**：repomix 打包 + llm CLI 转换；**工具组合乘数效应** |

### 2.6 Blog 模块

| 维度 | 设定 |
|------|------|
| **定位** | 非正式的思考碎片、实践心得、外网信息整理 |
| **与 docs 的区别** | docs = 结构化系统性知识；blog = 随时灵感记录 |
| **标签分类** | `思考`、`实践`、`转译`、`工具推荐` 等 |
| **文章命名** | `YYYY-MM-DD-<slug>/index.md` |
| **作者配置** | `blog/authors.yml` |
| **标签配置** | `blog/tags.yml` |

---

## 3. 文档写作原则

所有文档必须遵循以下原则，确保对人类和 AI Agent 都友好：

### 3.1 金字塔原则

- **结论先行**：每篇文档开头用一段话概括核心结论
- **自上而下论证**：先讲「是什么 / 为什么」，再展开「怎么做 / 细节」
- **MECE 分组**：同级要点之间互斥且穷尽，避免重叠和遗漏
- **每节可独立理解**：读者（或 Agent）从任意章节进入都能获得完整信息

### 3.2 渐进式披露

- **三级阅读层次**：
  1. **标题 + 概要段**：10 秒内获取核心信息
  2. **正文要点**：3 分钟内理解关键策略
  3. **折叠细节**：使用 `<Details>` 组件收纳深度分析、代码示例、边界情况
- **信息密度控制**：每个段落只承载一个核心观点
- **前向引用最小化**：尽量避免「后面会讲到」，如需引用则给出具体链接

### 3.3 AI 可读性

- **结构化标记**：善用标题层级、列表、表格等结构化元素
- **术语一致**：核心术语在 core/principles.md 中统一定义，全文引用一致
- **变更友好**：每节聚焦单一主题，Agent 修改时无需理解全局即可局部更新
- **来源标注**：每个关键洞察标注出处（如 [Karpathy 2025]、[Anthropic]、[METR 2025]），便于溯源和更新
- **信息可达性标注**：对于 Agent 需要访问的外部资源，明确标注路径、访问方式、获取命令

---

## 4. 项目目录结构

```
ai-driven-engineering/
├── docs/
│   ├── core/
│   │   ├── mindset.md
│   │   ├── principles.md
│   │   └── anti-patterns.md
│   ├── ai-collaboration/
│   │   ├── prompt-engineering.md
│   │   ├── context-management.md
│   │   └── multi-turn-strategy.md
│   ├── engineering/
│   │   ├── project-structure.md
│   │   ├── spec-files.md
│   │   └── workflow-design.md
│   ├── quality/
│   │   ├── code-review.md
│   │   ├── testing-strategy.md
│   │   └── security-review.md
│   └── automation/
│       ├── ci-cd.md
│       ├── agent-orchestration.md
│       └── efficiency-tools.md
├── blog/
│   ├── authors.yml
│   ├── tags.yml
│   └── 2025-05-22-hello-ai-driven-engineering/
│       └── index.md
├── src/
│   ├── pages/
│   │   └── index.tsx              # 首页自定义
│   ├── components/
│   │   └── Details.tsx            # 渐进式披露折叠组件
│   └── css/
│       └── custom.css
├── static/
│   └── img/
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
└── tsconfig.json
```

---

## 5. Docusaurus 站点配置

| 配置项 | 设定 |
|--------|------|
| **站点名称** | AI-Driven Engineering |
| **Tagline** | 为 AI Agent 构建可自主运行的工程体系 |
| **URL** | `https://jasongwq.github.io/ai-driven-engineering/` |
| **Base URL** | `/ai-driven-engineering/` |
| **Locale** | `zh-CN`（中文搜索支持） |
| **主题** | @docusaurus/theme-classic |
| **Blog 插件** | 启用内置 @docusaurus/plugin-content-blog |
| **搜索** | docusaurus-search-local（支持中文分词） |
| **部署** | GitHub Pages + GitHub Actions（deploy workflow） |

### 侧边栏结构

```
┌─ 核心方法论 ──────────┐
│  心智模型              │
│  核心原则              │
│  常见反模式            │
├─ AI 协作技巧 ─────────┤
│  提示工程              │
│  上下文管理            │
│  多轮对话策略          │
├─ 工程化实践 ───────────┤
│  项目结构设计          │
│  规范文件              │
│  工作流设计            │
├─ 质量保障 ─────────────┤
│  Code Review 实践     │
│  测试策略              │
│  安全审查              │
├─ 自动化与效率 ─────────┤
│  CI/CD 集成           │
│  Agent 编排            │
│  效率工具链            │
└───────────────────────┘
```

### 导航栏

- 站点标题（链接首页）
- 文档入口
- Blog 入口
- GitHub 仓库链接

---

## 6. 草稿策略

所有 Markdown 文档统一在 frontmatter 中标注 `draft: true`：

```yaml
---
title: 文档标题
draft: true
---
```

**行为说明：**
- Blog 文章：Docusaurus 原生支持 `draft: true`，开发模式加 `--draft` 可见，生产构建自动排除
- Docs 文档：通过 `draft: true` frontmatter + 配置项控制，生产构建自动排除
- 后续逐一确认时，移除 `draft: true` 即可正式发布
- 建立索引清单，追踪每篇文档的草稿/发布状态

---

## 7. 技术栈

| 类别 | 技术选型 |
|------|----------|
| **框架** | Docusaurus 3.x |
| **语言** | TypeScript（配置文件）+ Markdown（文档内容） |
| **包管理** | pnpm |
| **部署** | GitHub Pages + GitHub Actions |
| **CI** | GitHub Actions（构建检查 + 自动部署） |

---

## 8. 关键调研来源

| 来源 | 关键贡献 |
|------|----------|
| **Andrej Karpathy (2025.02)** | Vibe Coding 原始定义与哲学 |
| **Simon Willison (2025)** | Vibe Coding vs AI 辅助开发的关键区分 |
| **Andrew Ng (2025.06)** | 对术语的批评，倡导"Intent Coding" |
| **Anthropic** | Claude Code 最佳实践、ACI 原则、代码审查覆盖率优先策略、XML 标签提示框架、四大 Agent 工作流模式 |
| **Harper Reed** | Spec→Plan→Execute 结构化工作流 |
| **METR 研究 (2025.07)** | AI 工具效率自我欺骗的实证研究 |
| **Veracode (2025.10)** | AI 代码安全性未改善的研究 |
| **CodeRabbit (2025.12)** | AI 合著代码质量问题量化分析 |
| **GitClear (2020-2024)** | 代码重构下降、重复增加 4x 的大规模研究 |
| **Aider** | 文件选择策略、卡住时的恢复方法 |
| **Collins Dictionary (2025)** | Vibe Coding 当选年度词汇 |

---

## 9. 非目标（明确排除）

- 不包含可运行的代码示例或完整实践项目
- 不包含视频或交互式教学内容
- 不做国际化（i18n），纯中文
- 不做用户认证或评论系统
