# AI-Driven Engineering 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 Docusaurus 构建 AI-Driven Engineering 文档站点，包含核心方法论 + 四大扩展主题 + Blog，所有内容默认草稿状态。

**Architecture:** Docusaurus 3.x 经典主题，TypeScript 配置，pnpm 包管理，GitHub Pages 部署。文档按 core/ai-collaboration/engineering/quality/automation 五大分区组织，blog 独立模块。所有 Markdown 文档标记 `draft: true`。

**Tech Stack:** Docusaurus 3.x, TypeScript, pnpm, docusaurus-search-local, GitHub Pages + Actions

---

## File Structure

| 文件 | 职责 |
|------|------|
| `ai-driven-engineering/package.json` | 项目依赖与脚本 |
| `ai-driven-engineering/tsconfig.json` | TypeScript 配置 |
| `ai-driven-engineering/docusaurus.config.ts` | Docusaurus 核心配置（站点信息、插件、主题） |
| `ai-driven-engineering/sidebars.ts` | 侧边栏导航配置 |
| `ai-driven-engineering/src/pages/index.tsx` | 首页 |
| `ai-driven-engineering/src/css/custom.css` | 自定义样式 |
| `ai-driven-engineering/src/components/Details.tsx` | 渐进式披露折叠组件 |
| `ai-driven-engineering/static/img/logo.svg` | 站点 Logo |
| `ai-driven-engineering/docs/core/mindset.md` | 核心方法论：心智模型 |
| `ai-driven-engineering/docs/core/principles.md` | 核心方法论：核心原则 |
| `ai-driven-engineering/docs/core/anti-patterns.md` | 核心方法论：常见反模式 |
| `ai-driven-engineering/docs/ai-collaboration/prompt-engineering.md` | AI 协作：提示工程 |
| `ai-driven-engineering/docs/ai-collaboration/context-management.md` | AI 协作：上下文管理 |
| `ai-driven-engineering/docs/ai-collaboration/multi-turn-strategy.md` | AI 协作：多轮对话策略 |
| `ai-driven-engineering/docs/engineering/project-structure.md` | 工程化：项目结构设计 |
| `ai-driven-engineering/docs/engineering/spec-files.md` | 工程化：规范文件 |
| `ai-driven-engineering/docs/engineering/workflow-design.md` | 工程化：工作流设计 |
| `ai-driven-engineering/docs/quality/code-review.md` | 质量保障：Code Review |
| `ai-driven-engineering/docs/quality/testing-strategy.md` | 质量保障：测试策略 |
| `ai-driven-engineering/docs/quality/security-review.md` | 质量保障：安全审查 |
| `ai-driven-engineering/docs/automation/ci-cd.md` | 自动化：CI/CD |
| `ai-driven-engineering/docs/automation/agent-orchestration.md` | 自动化：Agent 编排 |
| `ai-driven-engineering/docs/automation/efficiency-tools.md` | 自动化：效率工具链 |
| `ai-driven-engineering/blog/authors.yml` | 博客作者配置 |
| `ai-driven-engineering/blog/tags.yml` | 博客标签配置 |
| `ai-driven-engineering/blog/2025-05-22-hello-ai-driven-engineering/index.md` | 首篇博客 |
| `.github/workflows/deploy.yml` | GitHub Actions 部署工作流 |

---

### Task 1: 初始化 Docusaurus 项目并配置 pnpm

**Files:**
- Create: `ai-driven-engineering/` (整个项目由脚手架生成)

- [ ] **Step 1: 启用 pnpm**

Run: `corepack enable && corepack prepare pnpm@latest --activate`
Expected: pnpm 可用

- [ ] **Step 2: 使用 Docusaurus 脚手架创建项目**

Run: `cd /root/code && npx create-docusaurus@latest ai-driven-engineering classic --typescript --skip-install`
Expected: 项目目录创建成功，使用 TypeScript 模板

- [ ] **Step 3: 使用 pnpm 安装依赖**

Run: `cd /root/code/ai-driven-engineering && pnpm install`
Expected: 依赖安装成功

- [ ] **Step 4: 验证开发服务器可启动**

Run: `cd /root/code/ai-driven-engineering && pnpm start --host 0.0.0.0 &`
等待 5 秒后检查：`curl -s http://localhost:3000 | head -20`
Expected: HTML 输出包含 Docusaurus 内容

- [ ] **Step 5: 停止开发服务器并提交**

Run: `kill %1 2>/dev/null; cd /root/code/ai-driven-engineering && git init && git add -A && git commit -m "feat: initialize Docusaurus project with pnpm"`

---

### Task 2: 配置 Docusaurus 站点（docusaurus.config.ts）

**Files:**
- Modify: `ai-driven-engineering/docusaurus.config.ts`

- [ ] **Step 1: 编写完整的 docusaurus.config.ts**

将 `docusaurus.config.ts` 替换为以下内容：

```typescript
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AI-Driven Engineering',
  tagline: '为 AI Agent 构建可自主运行的工程体系',
  favicon: 'img/favicon.ico',

  // GitHub Pages 部署配置
  url: 'https://jasongwq.github.io',
  baseUrl: '/ai-driven-engineering/',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/jasongwq/ai-driven-engineering/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/jasongwq/ai-driven-engineering/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'AI-Driven Engineering',
      logo: {
        alt: 'AI-Driven Engineering Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/jasongwq/ai-driven-engineering',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '核心方法论',
              to: '/docs/core/mindset',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jasongwq/ai-driven-engineering',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI-Driven Engineering. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

- [ ] **Step 2: 验证配置无误**

Run: `cd /root/code/ai-driven-engineering && pnpm build 2>&1 | tail -5`
Expected: 构建成功（可能有 lint 警告但无错误）

- [ ] **Step 3: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: configure Docusaurus site settings"`

---

### Task 3: 配置侧边栏（sidebars.ts）

**Files:**
- Modify: `ai-driven-engineering/sidebars.ts`

- [ ] **Step 1: 编写侧边栏配置**

将 `sidebars.ts` 替换为以下内容：

```typescript
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '核心方法论',
      items: [
        'core/mindset',
        'core/principles',
        'core/anti-patterns',
      ],
    },
    {
      type: 'category',
      label: 'AI 协作技巧',
      items: [
        'ai-collaboration/prompt-engineering',
        'ai-collaboration/context-management',
        'ai-collaboration/multi-turn-strategy',
      ],
    },
    {
      type: 'category',
      label: '工程化实践',
      items: [
        'engineering/project-structure',
        'engineering/spec-files',
        'engineering/workflow-design',
      ],
    },
    {
      type: 'category',
      label: '质量保障',
      items: [
        'quality/code-review',
        'quality/testing-strategy',
        'quality/security-review',
      ],
    },
    {
      type: 'category',
      label: '自动化与效率',
      items: [
        'automation/ci-cd',
        'automation/agent-orchestration',
        'automation/efficiency-tools',
      ],
    },
  ],
};

export default sidebars;
```

- [ ] **Step 2: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: configure sidebar with core-expansion structure"`

---

### Task 4: 安装 docusaurus-search-local 插件

**Files:**
- Modify: `ai-driven-engineering/package.json` (通过 pnpm add 自动修改)
- Modify: `ai-driven-engineering/docusaurus.config.ts`

- [ ] **Step 1: 安装插件**

Run: `cd /root/code/ai-driven-engineering && pnpm add @easyops-cn/docusaurus-search-local`

- [ ] **Step 2: 在 docusaurus.config.ts 中注册插件**

在 `config` 对象中，`presets` 数组之后，添加 `plugins` 字段：

```typescript
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['zh'],
        indexBlog: true,
        indexDocs: true,
      },
    ],
  ],
```

- [ ] **Step 3: 验证构建**

Run: `cd /root/code/ai-driven-engineering && pnpm build 2>&1 | tail -10`
Expected: 构建成功，搜索索引生成

- [ ] **Step 4: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add docusaurus-search-local plugin for Chinese search"`

---

### Task 5: 创建 Details 折叠组件

**Files:**
- Create: `ai-driven-engineering/src/components/Details.tsx`

- [ ] **Step 1: 编写 Details 组件**

创建文件 `src/components/Details.tsx`：

```tsx
import React, {type ReactNode} from 'react';
import Details from '@theme/Details';

interface DetailsProps {
  summary: string;
  children: ReactNode;
}

export default function CustomDetails({summary, children}: DetailsProps) {
  return (
    <Details summary={summary}>
      <div>{children}</div>
    </Details>
  );
}
```

- [ ] **Step 2: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add Details collapsible component for progressive disclosure"`

---

### Task 6: 创建核心方法论文档（core/）

**Files:**
- Create: `ai-driven-engineering/docs/core/mindset.md`
- Create: `ai-driven-engineering/docs/core/principles.md`
- Create: `ai-driven-engineering/docs/core/anti-patterns.md`

- [ ] **Step 1: 创建 core 目录并编写 mindset.md**

创建目录：`mkdir -p docs/core`

编写 `docs/core/mindset.md`：

```markdown
---
title: 心智模型
slug: /core/mindset
draft: true
---

# 心智模型

AI-Driven Engineering 的核心不是"人类如何更好地使用 AI"，而是**为 AI Agent 构建一套可独立运行的工程体系**。这套体系让 Agent 拥有完整上下文、全局视野、信息可达、自我测试、自我验证、自我闭环的能力。

## 范式转变

从「人类使用 AI 工具」到「为 Agent 构建运行环境」，这是一个根本性的范式转变：

| 旧范式 | 新范式 |
|--------|--------|
| 人类写代码，AI 辅助 | Agent 自主运行，人类监督 |
| 人类逐步驱动 Agent | Agent 自我闭环迭代 |
| 人类审查每一行代码 | Agent 自我测试与验证 |
| 信息散落，人类中转 | 信息结构化，Agent 直接可达 |

## 历史脉络

AI-Driven Engineering 不是凭空出现的，它站在三个关键概念的肩膀上：

1. **Vibe Coding**（Karpathy, 2025.02）：原始定义——完全交给 vibes，拥抱指数级增长，忘记代码的存在。Karpathy 承认这只适合一次性的周末项目。[Karpathy 2025]

2. **Intent Coding**（Andrew Ng, 2025.06）：Ng 批评"Vibe Coding"这个术语具有误导性，主张区分鲁莽的"vibe coding"与负责任的 AI 辅助开发，倡导"Intent Coding"——开发者保持理解和控制。[Ng 2025]

3. **AI-Driven Engineering**：在 Vibe Coding 的实践经验和 Intent Coding 的理性框架之上，进一步提出——与其教人类如何与 AI 协作，不如**为 Agent 构建一套可独立运行的工程体系**。

Simon Willison 的关键区分仍是我们坚持的底线："如果你审查、测试并理解了每一行代码，那不是 Vibe Coding——那是在用 LLM 当打字助手。"[Willison 2025] 在 AI-Driven Engineering 中，审查、测试、验证由 Agent 自主完成，但人类仍保有监督权。

## Agent 自主性光谱

Agent 的自主性不是非此即彼的，而是一个光谱：

```
人驱动 ←————————————————→ Agent 自驱

├── 1. 人类写代码，AI 补全
├── 2. 人类描述意图，AI 生成代码，人类审查
├── 3. 人类规划，AI 执行，AI 自测，人类验证
├── 4. AI 自主规划+执行+验证，人类审批关键节点
└── 5. AI 全自主闭环，人类仅处理异常
```

AI-Driven Engineering 主要关注光谱右端（3-5），但承认不同场景需要不同层级的自主性。

## 核心循环

AI-Driven Engineering 的核心是一个自我闭环的循环：

```
完整上下文 → 全局视野 → 信息可达 → 自我测试 → 自我验证 → 自我闭环
     ↑                                                        |
     └────────────────────────────────────────────────────────┘
```

每个环节都是下一个环节的前提：

- **完整上下文**：Agent 能获取到它需要的所有信息，没有盲区。没有完整上下文，Agent 的决策就是盲猜。
- **全局视野**：Agent 知道项目的整体架构、依赖关系、变更影响范围。局部优化可能导致全局问题。
- **信息可达**：Agent 知道去哪里找信息、怎么找、找得到。信息存在但找不到 = 信息不存在。
- **自我测试**：Agent 能自行运行测试、检查输出、验证行为。没有测试，Agent 就没有反馈信号。
- **自我验证**：Agent 能判断自己的产出是否正确、是否符合预期。不能验证 = 不能信任。
- **自我闭环**：从规划到执行到验证，Agent 能独立完成完整循环。闭环意味着 Agent 可以自主迭代。

## 适用边界

| 适合 Agent 自驱 | 仍需人类主导 |
|-----------------|-------------|
| 明确需求的代码实现 | 需求模糊的探索性工作 |
| 有测试覆盖的变更 | 涉及产品决策的权衡 |
| 重复性的批量操作 | 跨系统的架构决策 |
| 文档更新与格式化 | 安全关键路径的变更 |
| 有 CI/CD 保障的部署 | 多方协作的接口设计 |
```

- [ ] **Step 2: 编写 principles.md**

编写 `docs/core/principles.md`：

```markdown
---
title: 核心原则
slug: /core/principles
draft: true
---

# 核心原则

AI-Driven Engineering 的 10 条核心原则，每一条都直接服务于 Agent 的自主运行能力。

## 1. 上下文完整性

Agent 必须拥有决策所需的全部信息。

缺少关键信息的 Agent 不会告诉你"我不知道"——它会基于不完整信息做出看似合理的决策。因此，为 Agent 提供完整上下文不是可选的，而是必须的。

**如何应用**：在规范文件中明确列出 Agent 需要了解的架构约束、依赖关系、技术栈选择。使用项目索引让 Agent 快速定位信息。

## 2. 信息可达性

信息存在但 Agent 找不到 = 信息不存在。

这是上下文完整性的补充：不仅要拥有信息，还要让 Agent 能高效地找到和消费信息。目录结构、规范文件、索引——这些不是给人看的装饰，而是 Agent 的导航系统。

**如何应用**：为 Agent 提供项目地图（CLAUDE.md / .cursor/rules/），明确标注信息的位置和访问方式。

## 3. 全局视野优先

局部优化可能导致全局退化。Agent 必须能看到全局才能做出正确的局部决策。

一个 Agent 修改了模块 A 的接口，但不知道模块 B 依赖这个接口——这就是缺乏全局视野的后果。

**如何应用**：在规范文件中声明模块间依赖关系，使用 repomix 生成全局上下文，确保 Agent 在执行前能理解变更的影响范围。

## 4. 验证即信任

不能验证 = 不能信任。Agent 的每一个产出都必须有验证手段。

没有验证的代码是不可信的代码。AI 生成代码看起来合理但可能隐藏边界问题——这不是 AI 的缺陷，而是当前能力的现实。[Veracode 2025] [CodeRabbit 2025]

**如何应用**：为每个变更提供验证方法——测试用例、lint 规则、CI 检查、安全扫描。没有验证手段的变更不应被接受。

## 5. 自我闭环

Agent 必须能独立完成 Plan→Execute→Verify 循环。

自我闭环是 AI-Driven Engineering 的终极目标。如果 Agent 每一步都需要人类确认，那它只是一个人驱动的工具。闭环意味着 Agent 可以自主迭代，人类只需在关键节点介入。

**如何应用**：设计工作流时，确保每个步骤都有明确的验证条件和自动化的反馈机制。

## 6. 渐进式信任

从低风险到高风险逐步放权。

不要一开始就给 Agent 最高权限。从低风险操作（文档更新、格式化）开始，逐步扩展到中风险（代码实现、测试），最后才到高风险（部署、安全相关变更）。

**如何应用**：设置权限分级，使用 Git 分支隔离 Agent 的变更，通过 CI/CD 自动审查。

## 7. 最小惊讶原则

Agent 的行为应符合预期模式，不做意料之外的变更。

如果项目的约定是使用 TypeScript，Agent 不应该突然生成 JavaScript。如果项目使用特定框架，Agent 不应该引入新框架。

**如何应用**：在规范文件中明确声明技术栈、编码约定、架构边界。对偏离预期的变更要求 Agent 给出理由。

## 8. 步步为营

无跳跃式复杂度，每步必接。

每个步骤的复杂度应该是可控的——小到可以安全实现，大到可以推进进展。每一步都必须以代码集成为终点，不留孤立代码。[Harper Reed 2025]

**如何应用**：将大任务分解为小步骤，每步完成后运行测试验证，确保代码已集成而非孤立。

## 9. ACI 优先

Agent-计算机接口（ACI）设计比提示调优更有效。

Anthropic 在 SWE-bench 上的经验表明，优化工具定义比优化提示词带来更大的改进。例如，将工具参数从相对路径改为绝对路径，就消除了模型持续犯错的问题。[Anthropic 2025]

**如何应用**：当 Agent 反复犯错时，先检查工具接口设计是否合理，而非调整提示词。考虑：Agent 能否清楚地知道该调用哪个工具？参数是否明确？

## 10. 自我欺骗警觉

开发者系统性地高估 AI 工具的效率提升。

METR 研究发现，经验丰富的开发者使用 AI 工具后实际上慢了 19%，但他们认为自己快了 20%。这种自我欺骗是 AI 辅助开发最危险的元反模式。[METR 2025]

**如何应用**：用客观数据（时间追踪、代码质量指标）而非主观感受来评估 AI 工具的效果。定期审查 Agent 的产出质量。
```

- [ ] **Step 3: 编写 anti-patterns.md**

编写 `docs/core/anti-patterns.md`：

```markdown
---
title: 常见反模式
slug: /core/anti-patterns
draft: true
---

# 常见反模式

12 大反模式 + 1 个元反模式。每个反模式都违背了 AI-Driven Engineering 的核心原则，并附有修正方法。

## 1. 上下文盲区

**Agent 缺少关键信息却不知道自己不知道。**

缺少信息的 Agent 不会报错——它会基于不完整信息做出看似合理的决策。这是最危险的反模式，因为 Agent 自己无法察觉。

- **违背原则**：上下文完整性
- **症状**：Agent 的决策看似合理但在特定条件下失效
- **修正**：在规范文件中穷举架构约束和依赖关系，使用项目索引让 Agent 全面了解项目

## 2. 信息孤岛

**信息存在但 Agent 找不到。**

项目中有完整的设计文档，但 Agent 不知道它的存在；代码中有重要的架构决策注释，但 Agent 不会去读相关文件。

- **违背原则**：信息可达性
- **症状**：Agent 反复询问已知信息，或做出与已有决策矛盾的变更
- **修正**：建立清晰的项目地图，在规范文件中标注信息位置，使用 .cursor/rules/ 自动注入关键信息

## 3. 验证缺失

**Agent 产出代码但没有反馈信号验证其正确性。**

没有测试、没有 lint、没有 CI 检查——Agent 无法判断自己的产出是否正确。

- **违背原则**：验证即信任
- **症状**：Agent 产出的代码在人工审查时发现大量问题
- **修正**：为每个变更提供验证手段，要求 Agent 在提交前运行测试

## 4. 开放式循环

**只有执行没有验证，Agent 做完了但不验证。**

Agent 实现了功能，但不去运行测试、不检查输出、不验证结果。这是一个不完整的循环。

- **违背原则**：自我闭环
- **症状**：功能"实现"了但实际运行出错
- **修正**：在 Agent 的指令中明确要求验证步骤，使用 "完成前对照测试标准验证答案"

## 5. 大杂烩会话

**一个会话处理多个不相关任务，上下文被噪音填充。**

开始处理登录功能，中间插入一个样式调整请求，又回到登录功能——此时上下文窗口充满了无关信息，性能下降。

- **违背原则**：上下文完整性
- **症状**：Agent 的响应质量随会话延长而下降
- **修正**：不相关任务间使用 `/clear` 清空上下文，每个任务用独立会话

## 6. 反复纠正

**同一问题纠正 2 次以上仍失败。**

上下文中充满了失败的尝试，Agent 被困在错误的方向上无法自拔。

- **违背原则**：自我闭环
- **症状**：越纠正越糟糕，Agent 在同一问题上反复打转
- **修正**：2 次纠正失败后，清空上下文（`/clear`），用更精确的提示重新开始

## 7. 过度膨胀的配置

**规范文件太长，重要规则被噪音淹没。**

Agent 开始忽略配置中的规则——不是因为它不服从，而是因为信息太多，关键规则被淹没了。

- **违背原则**：信息可达性
- **症状**：配置中写了规则但 Agent 仍然违反
- **修正**：精简规范文件，每条规则问"删掉这条会不会导致 Agent 犯错"，不能则删。必须始终执行的用 hooks（确定性脚本）替代

## 8. 信任-验证鸿沟

**信任 Agent 产出但没有验证手段。**

看起来合理的代码被直接接受，但隐藏了边界问题。AI 代码的安全漏洞是人工代码的 2.74 倍。[CodeRabbit 2025]

- **违背原则**：验证即信任
- **症状**：代码通过审查但上线后出问题
- **修正**：建立自动化验证流水线，每一个产出必须经过测试+lint+安全扫描

## 9. 无限探索

**Agent 无目的地读取大量文件，消耗上下文但不产出。**

没有范围的调查比没有调查更危险——Agent 读了几百个文件但并没有更接近解决方案。

- **违背原则**：步步为营
- **症状**：Agent 长时间"探索"但无实质性进展
- **修正**：为探索设定明确范围和目标，使用子 Agent 隔离探索上下文

## 10. 孤立代码

**代码写了但没有集成到系统中。**

Agent 写了一个新函数但从未被调用，或者创建了一个新模块但从未被引用。

- **违背原则**：步步为营
- **症状**：代码存在但不起作用
- **修正**：每一步都以代码集成为终点——新函数必须有调用者，新模块必须有引用

## 11. 跳跃式复杂度

**试图一次实现过多功能，跳过了中间的验证步骤。**

一次性重写整个模块，跳过了逐步验证的过程——结果可能是多处错误交织在一起，难以定位。

- **违背原则**：步步为营
- **症状**：大量功能同时失败，难以定位根本原因
- **修正**：将大任务分解为小步骤，每步完成后验证再继续

## 12. Demo 陷阱

**把令人印象深刻的演示误认为可发布的代码。**

Demo 模式下的 Agent 表现出色，但 Demo 和生产代码之间的差距是巨大的——缺乏错误处理、边界检查、安全防护。

- **违背原则**：验证即信任
- **症状**：Demo 完美运行但真实场景下频繁出错
- **修正**：用生产标准而非 Demo 标准验证，强制运行完整测试套件和 CI 检查

---

## 元反模式：自我欺骗

**开发者系统性地高估 AI 工具的效率提升。**

METR 研究发现，经验丰富的开发者使用 AI 工具后实际慢了 19%，但他们认为自己快了 20%。更危险的是——他们在事后仍然坚信自己更快了。[METR 2025]

这是所有反模式的元模式——如果你相信自己比实际更高效，你就不会去识别和修正上述反模式。

- **违背原则**：自我欺骗警觉
- **症状**：主观感受与客观数据不一致
- **修正**：用客观数据评估效果，定期审查 Agent 产出的代码质量，追踪实际问题率
```

- [ ] **Step 4: 删除脚手架默认文档**

Run: `rm -f docs/tutorial-basics/* docs/tutorial-extras/*`
然后清空或删除这些默认目录中的文件，避免与我们的文档冲突。

- [ ] **Step 5: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add core methodology docs (mindset, principles, anti-patterns) as drafts"`

---

### Task 7: 创建 AI 协作技巧文档（ai-collaboration/）

**Files:**
- Create: `ai-driven-engineering/docs/ai-collaboration/prompt-engineering.md`
- Create: `ai-driven-engineering/docs/ai-collaboration/context-management.md`
- Create: `ai-driven-engineering/docs/ai-collaboration/multi-turn-strategy.md`

- [ ] **Step 1: 创建目录并编写 prompt-engineering.md**

创建目录：`mkdir -p docs/ai-collaboration`

编写 `docs/ai-collaboration/prompt-engineering.md`：

```markdown
---
title: 提示工程
slug: /ai-collaboration/prompt-engineering
draft: true
---

# 提示工程

提示工程在 AI-Driven Engineering 中的核心转变：从「对人说」到「对 Agent 说」。Agent 需要的是明确的可执行指令，而非模糊意图。

## Anthropic 三原则

所有提示设计都应遵循 Anthropic 提出的三个核心原则：[Anthropic 2025]

1. **给模型足够的思考空间**：让 Agent 在写代码前先理解问题，避免写到死胡同
2. **保持自然格式**：使用 Markdown 代码块等 Agent 在训练数据中常见的格式
3. **无格式开销**：避免 diff 格式（需要预计算行号）和 JSON 包装代码（需要转义）

## 结构化提示框架

### 角色-任务-约束-示例

```
<role>你是一个专注于 Python 后端开发的高级工程师</role>

<task>实现一个邮箱验证函数，支持 RFC 5322 标准格式</task>

<constraints>
- 使用纯 Python，不引入第三方库
- 函数名为 validate_email，返回 bool
- 不使用正则表达式
</constraints>

<example>
输入: user@example.com → True
输入: invalid → False
输入: user@.com → False
</example>
```

## Agent 指令设计

从「对人说」到「对 Agent 说」的关键转变：

| 对人说 | 对 Agent 说 |
|--------|------------|
| "帮我加个测试" | "为 src/auth/validator.ts 中的 validateEmail 函数编写单元测试，覆盖正常邮箱、缺失@、空字符串三个边界条件，使用 vitest 框架，测试后运行 `pnpm test` 验证通过" |
| "这里有个 bug" | "src/api/handler.ts:47 的 parseResponse 函数在输入为 null 时抛出 TypeError。修复此问题并确保 `pnpm test` 通过" |
| "改好看点" | "参照 HotDogWidget.tsx 的实现模式，为 CalendarWidget 添加响应式布局，保持与现有 widget 一致的样式规范" |

核心差异：Agent 需要明确的**路径、框架、验证命令**，而非模糊的意图。

## 精确 vs 模糊提示

| 策略 | 模糊提示 | 精确提示 |
|------|----------|----------|
| 定范围 | "加测试" | "为用户登出边界写测试，不用 mock" |
| 指来源 | "为什么 API 很奇怪" | "查看 ExecutionFactory 的 git 历史，总结其 API 演变过程" |
| 引模式 | "加个日历组件" | "参照现有 widget 实现模式，HotDogWidget.tsx 是好的参考" |
| 描述症状 | "修登录 bug" | "用户报告登录在 session 超时后失败，检查 src/auth/ 尤其是 token refresh，写一个能复现问题的失败测试，然后修复" |

## 自检提示

在指令末尾追加验证要求，让 Agent 在完成前自检：

```
完成前：
1. 运行 pnpm test 确认所有测试通过
2. 运行 pnpm lint 确认无代码规范问题
3. 确认新代码没有引入未使用的 import
```

## 避免过度工程

在提示中明确约束 Agent 的变更范围：

```
只做直接请求的变更。不要加功能、不要重构、不要做"改进"。
不要为不可能发生的场景添加错误处理。
不要为一次性操作创建抽象。
```

## 长上下文优化

将长数据放在提示顶部，查询放在末尾——这种布局可将质量提升最多 30%。先让 Agent 阅读上下文，再提出具体问题。[Anthropic 2025]
```

- [ ] **Step 2: 编写 context-management.md**

编写 `docs/ai-collaboration/context-management.md`：

```markdown
---
title: 上下文管理
slug: /ai-collaboration/context-management
draft: true
---

# 上下文管理

上下文窗口是 Agent 最重要的资源。性能随填充而下降——这不是建议，是物理约束。管理上下文不是优化，是生存。

## 核心约束

上下文窗口是有限资源。每一条消息、每一个文件读取、每一条命令输出都在消耗它。当窗口接近满时，Agent 的推理质量显著下降。

**经济模型**：上下文窗口 = 信息密度 × 信噪比。高密度低噪音 = 高效；低密度高噪音 = 低效。

## Agent 的上下文权利

Agent 应该能获取到它需要的一切信息。关键不是限制信息量，而是组织信息让 Agent 高效消费。

| 权利 | 含义 | 实现方式 |
|------|------|----------|
| 知道有什么 | Agent 知道项目中存在哪些文件和模块 | 项目索引、目录结构概览 |
| 知道在哪里 | Agent 知道去哪里找特定信息 | CLAUDE.md、.cursor/rules/ |
| 知道怎么找 | Agent 知道如何访问信息 | 明确的文件路径、搜索命令 |
| 知道为什么 | Agent 理解架构决策的原因 | ADR（架构决策记录）、代码注释 |

## 激进的上下文卫生

### /clear 之间不相关任务

```
# 任务 A：实现登录功能
/clear  # ← 清空，准备任务 B
# 任务 B：修复样式问题
```

一个会话只处理一个主题。混用 = 噪音 = 性能下降。

### /compact 控制摘要存活

```
/compact 保留登录功能的核心设计决策，丢弃调试过程中的错误尝试
```

`/compact` 让你控制什么在摘要中存活——主动选择比被动遗忘好。

### 子 Agent 隔离上下文

子 Agent 在独立的上下文窗口中运行，报告摘要而不污染主会话。

```
主会话：干净，只保留关键决策
├── 子 Agent 1：探索认证模块（独立上下文）
├── 子 Agent 2：搜索安全漏洞（独立上下文）
└── 子 Agent 3：编写测试（独立上下文）
```

## 信息可达性设计

信息存在但 Agent 找不到 = 信息不存在。以下是确保信息可达的关键手段：

| 手段 | 用途 | 何时使用 |
|------|------|----------|
| CLAUDE.md | 项目全局约定 | 始终 |
| .cursor/rules/ | 按文件类型的特定规则 | 编辑特定类型文件时 |
| 项目索引 | 文件-职责映射 | Agent 需要了解项目结构时 |
| ADR | 架构决策记录 | Agent 需要理解"为什么这样设计"时 |
| README.md | 入口文档 | 新 Agent 首次接触项目时 |

## 会话命名

像 Git 分支一样命名会话：

```
oauth-migration    # 清晰：正在做 OAuth 迁移
bugfix-login-332   # 清晰：修复 #332 登录问题
```

命名不是为了美观，是为了让 Agent 和人类都能快速理解当前会话的上下文。

## 上下文恢复

当 Agent 在执行中迷失方向时，使用 repomix 打包整个代码库传回 LLM：

```bash
npx repomix --output output.txt
```

对于棕地/遗留项目：使用 mise + repomix 生成代码库上下文，如果太大则编辑生成命令忽略无关部分。

## 2 次纠正法则

同一问题纠正 2 次失败后，上下文已被失败尝试污染。此时：

1. `/clear` — 清空上下文
2. 用更精确的提示重新开始
3. 如果仍失败，切换模型（`/model`）尝试
4. 最后手段：人工介入
```

- [ ] **Step 3: 编写 multi-turn-strategy.md**

编写 `docs/ai-collaboration/multi-turn-strategy.md`：

```markdown
---
title: 多轮对话策略
slug: /ai-collaboration/multi-turn-strategy
draft: true
---

# 多轮对话策略

多轮对话不是漫无目的的聊天，而是有结构的工作流。关键在于选择正确的工作流，并在正确的时机推进或回退。

## Spec→Plan→Execute 循环

Harper Reed 验证的最有效结构化工作流：[Harper Reed 2025]

```
Brainstorm → spec.md       # 深度探索，生成开发者级规格
Plan       → prompt_plan.md # 逐步提示计划
Track      → todo.md        # 状态追踪
Execute    → 逐步执行，每步必接
```

**关键规则**：
- 每步**大小合适**：小到可安全实现，大到有进展
- 每步**以集成为终点**：新代码必须接入系统
- **不跳步**：不做跳跃式复杂度增长

## 四阶段工作流

Claude Code 最佳实践的四阶段工作流：[Anthropic 2025]

| 阶段 | 模式 | 目的 |
|------|------|------|
| **Explore** | Plan 模式 | 读取文件，理解架构——不做变更 |
| **Plan** | Plan 模式 | 创建详细实施计划 |
| **Implement** | Default 模式 | 按计划编码，逐步验证 |
| **Commit** | Default 模式 | 描述性提交信息 + PR |

**何时跳过规划**：如果你能用一句话描述 diff（修复拼写错误、改日志行、重命名变量），跳过规划。

## Agent 自主循环设计

如何让 Agent 独立完成 Plan→Execute→Verify 循环而不依赖人类逐步驱动：

```
┌─────────────────────────────────────────────┐
│              Agent 自主循环                    │
│                                               │
│  Plan ──→ Execute ──→ Verify ──→ 决策         │
│    ↑                              │    │      │
│    │          通过 ←──────────────┘    │      │
│    │                                    │      │
│    └──────── 未通过 ──→ 调整计划 ───────┘      │
│                                              │
│  关键节点 ──→ 人类审批 ──→ 继续/回退           │
└─────────────────────────────────────────────┘
```

**自主循环的前提**：
1. Agent 有清晰的验证标准（测试、lint、CI）
2. Agent 能自主运行验证命令
3. Agent 有权限在失败时回退变更
4. 人类只在关键节点审批，不在每步介入

## 对话节奏控制

### 何时推进

- Agent 产出了可验证的结果
- 测试通过，lint 无错误
- 代码已集成到系统

### 何时回退

- 测试失败 2 次以上
- Agent 反复在同一问题上打转
- 变更影响范围超出预期

### 2 次纠正法则

纠正 2 次失败后，上下文已被污染。清空重来比继续纠正更高效。

## 卡住时的恢复策略

按优先级排列：

1. **`/clear`**：清空上下文，用更好的提示重来
2. **`/drop`**：移除不相关的文件，减少噪音
3. **`/ask`**：先讨论计划再写代码
4. **`/model`**：切换到不同模型尝试
5. **人工介入**：自己写下一部分，然后交给 Agent 继续

## 交接点设计

| 场景 | Agent 自主 | 需要人类确认 |
|------|-----------|-------------|
| 代码实现 | ✅ 明确需求时 | ❌ 需求模糊时 |
| 测试执行 | ✅ 自动化测试 | ❌ 需要人工验收的 UI |
| 代码审查 | ✅ 自动化检查 | ❌ 架构层面的权衡 |
| 部署 | ✅ CI/CD 自动化 | ❌ 首次部署到新环境 |
| 安全变更 | ❌ 始终需确认 | ✅ — |
```

- [ ] **Step 4: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add AI collaboration docs (prompt-engineering, context-management, multi-turn-strategy) as drafts"`

---

### Task 8: 创建工程化实践文档（engineering/）

**Files:**
- Create: `ai-driven-engineering/docs/engineering/project-structure.md`
- Create: `ai-driven-engineering/docs/engineering/spec-files.md`
- Create: `ai-driven-engineering/docs/engineering/workflow-design.md`

- [ ] **Step 1: 创建目录并编写三篇文档**

创建目录：`mkdir -p docs/engineering`

编写 `docs/engineering/project-structure.md`：

```markdown
---
title: 项目结构设计
slug: /engineering/project-structure
draft: true
---

# 项目结构设计

Agent 友好的项目结构是 AI-Driven Engineering 的物理基础。模块边界清晰、语义化命名、分层架构——让 Agent 能快速理解项目全局，拥有全局视野。

## 设计原则

### 模块边界清晰

每个模块有明确的职责和接口。Agent 在修改模块 A 时不需要理解模块 B 的内部实现——只需要知道接口。

### 语义化命名

文件名和目录名应该自解释。`src/auth/` 比 `src/a/` 好——Agent 能从名字推断内容。

### 分层架构

```
src/
├── core/        # 核心业务逻辑
├── api/         # API 层
├── infra/       # 基础设施层
└── shared/      # 共享工具
```

分层让 Agent 理解变更的影响范围——修改 core 层影响比修改 api 层更广。

## 你自己搭基座

开发者控制初始样板和工具选择，防止 Agent 使用不想要的框架。

Agent 倾向于使用它训练数据中最常见的方案——如果你不明确指定，它会用默认选择，而这些选择可能不是你想要的。

**实践**：在创建项目时，你自己决定技术栈、目录结构、配置文件。然后在规范文件中明确声明这些选择。

## 始终使用新分支

Agent 生成的代码不应直接进入主分支。使用独立分支：

```
main
├── agent/feat-oauth     # Agent 的 OAuth 功能分支
├── agent/fix-login-332   # Agent 的 bug 修复分支
└── agent/refactor-api    # Agent 的重构分支
```

好处：
- Agent 的变更可独立审查
- 出问题时可整体丢弃
- 便于追踪 Agent 的变更范围

## 项目索引

为 Agent 提供项目地图，让它知道去哪里找什么：

```markdown
# 项目索引

## 目录结构
- `src/core/` - 核心业务逻辑（用户、订单、支付）
- `src/api/` - REST API 端点
- `src/infra/` - 数据库、缓存、消息队列

## 关键文件
- `src/core/user/service.ts` - 用户服务
- `src/core/order/service.ts` - 订单服务
- `src/api/routes/` - API 路由定义

## 架构决策
- 使用 Repository 模式隔离数据访问
- 所有 API 响应统一使用 Result<T> 类型
- 测试放在 `tests/` 目录，镜像 src/ 结构
```
```

编写 `docs/engineering/spec-files.md`：

```markdown
---
title: 规范文件
slug: /engineering/spec-files
draft: true
---

# 规范文件

规范文件是 Agent 的「操作系统」——通过规范文件告诉 Agent 项目约定、架构边界、测试要求、验证标准，让 Agent 拥有全局视野和自我验证能力。

## 现代 .cursor/rules/ 结构

替代旧式单文件 `.cursorrules`，使用细粒度 `.mdc` 文件：

```
.cursor/
 └ rules/
    ├ general.mdc         # 始终应用
    ├ react-components.mdc # 应用于 *.tsx 文件
    └ python-api.mdc      # 应用于 api/*.py 文件
```

### Frontmatter 配置

```markdown
---
description: React 组件结构规范
globs: src/components/**/*.tsx
alwaysApply: false
---

# React 组件规范
- 使用函数式组件和箭头函数
- 样式与组件同目录放置
```

- **`alwaysApply: true`**：始终注入上下文（类似旧式 `.cursorrules`）
- **`alwaysApply: false` + `globs`**：仅在操作匹配文件时注入，节省上下文窗口

## CLAUDE.md 最佳实践

| 应该放 | 不应该放 |
|--------|----------|
| Agent 猜不到的 Bash 命令 | Agent 能通过读代码推断的信息 |
| 与默认不同的代码风格规则 | 标准语言约定 |
| 测试指令和测试运行器 | 详细 API 文档（放链接） |
| 仓库约定（分支命名、PR 规范） | 频繁变更的信息 |
| 项目特有的架构决策 | 逐文件的代码库描述 |
| 开发环境的怪癖 | 显而易见的实践如"写干净代码" |

**关键规则**：对每一行问"删掉这条会不会导致 Agent 犯错？"。如果不会，删掉它。膨胀的配置文件导致规则被忽略。

## 规范文件即 Agent 的操作系统

规范文件不仅是指令列表，它是 Agent 的运行环境配置：

| 操作系统功能 | 规范文件对应 |
|-------------|-------------|
| 文件系统 | 项目索引、目录结构说明 |
| 环境变量 | 技术栈声明、编码约定 |
| 权限控制 | 变更边界、审查要求 |
| 进程调度 | 工作流步骤、验证顺序 |
| 错误处理 | 反模式警告、异常处理约定 |

通过规范文件，Agent 获得：
- **全局视野**：知道项目全貌、模块间关系
- **验证标准**：知道如何判断自己的产出是否正确
- **行为边界**：知道什么可以做、什么不能做

## 规范分层

三层架构，从全局到局部：

```
全局层（CLAUDE.md / general.mdc）
├── 技术栈声明
├── 编码规范
└── 仓库约定

项目层（.cursor/rules/ 按功能域）
├── react-components.mdc
├── api-routes.mdc
└── database.mdc

模块层（目录内 README 或 .cursor/rules/ 按路径）
├── src/auth/README.md
└── src/payments/.cursorrules
```

## 反模式：过度膨胀的配置

如果 Agent 持续违反某条规则，原因可能是配置文件太长，规则被噪音淹没。

**修正策略**：
1. 精简配置——只保留 Agent 会犯错的规则
2. 将必须始终执行的规则转换为 hooks（确定性脚本）
3. hooks 不受上下文窗口限制，100% 可靠
```

编写 `docs/engineering/workflow-design.md`：

```markdown
---
title: 工作流设计
slug: /engineering/workflow-design
draft: true
---

# 工作流设计

从人类驱动到 Agent 自驱的完整工作流设计。核心是让 Agent 能独立完成 Plan→Execute→Verify 循环，人类只在关键节点审批。

## 绿地项目工作流

从零开始的新项目，完整的 Agent 自驱流程：

```
1. 人类搭建基座 → 创建仓库、选择技术栈、配置规范文件
2. 头脑风暴 → spec.md（开发者级规格文档）
3. 制定计划 → prompt_plan.md（逐步执行计划）
4. 逐步执行 → 每步实现 + 集成 + 测试
5. 状态追踪 → todo.md（进度与待办）
6. 自我验证 → 运行测试套件 + lint + 安全扫描
7. 自我闭环 → 产出通过验证，提交 PR
```

**每步必接**：代码写完必须集成到系统，不留孤立代码。

## 棕地/遗留项目工作流

已有代码库的项目，Agent 需要先理解全局：

```
1. 生成上下文 → repomix 打包代码库
2. 如果太大 → 忽略无关部分，聚焦变更范围
3. 增量修改 → 一次改一个模块，每次验证
4. mise + llm CLI → 批量转换和验证
```

## Agent 交接点设计

| 何时 Agent 自主 | 何时需要人类确认 |
|----------------|-----------------|
| 明确需求的代码实现 | 需求模糊的探索 |
| 自动化测试执行 | 架构层面的权衡 |
| lint 和格式化 | 安全关键路径 |
| 文档更新 | 跨系统接口变更 |
| CI/CD 自动化 | 首次部署新环境 |

**关键原则**：低风险操作 Agent 自主，高风险操作人类审批。

## 团队 AI 协作

团队 AI 协作目前仍是未解决问题。多个 Agent 同时修改代码会导致：
- Bot 冲突（两个 Agent 修改同一文件）
- 恐怖的合并冲突
- 上下文隔离导致不一致

当前最佳实践：
- 每个 Agent 使用独立分支
- 避免多个 Agent 同时修改同一模块
- 使用 Git worktree 隔离工作空间
- 人类负责合并和冲突解决
```

- [ ] **Step 2: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add engineering docs (project-structure, spec-files, workflow-design) as drafts"`

---

### Task 9: 创建质量保障文档（quality/）

**Files:**
- Create: `ai-driven-engineering/docs/quality/code-review.md`
- Create: `ai-driven-engineering/docs/quality/testing-strategy.md`
- Create: `ai-driven-engineering/docs/quality/security-review.md`

- [ ] **Step 1: 创建目录并编写三篇文档**

创建目录：`mkdir -p docs/quality`

编写 `docs/quality/code-review.md`：

```markdown
---
title: Code Review 实践
slug: /quality/code-review
draft: true
---

# Code Review 实践

从人类逐行审查到 Agent 自主审查的演进。核心观点：让 Agent 的审查能力成为自我闭环的关键环节。

## AI 代码 vs 人工代码

AI 生成的代码有独特的质量特征，审查时需要特别关注：

| 维度 | 数据 | 来源 |
|------|------|------|
| 功能代码质量 | 大幅改善 | Veracode 2025 |
| 安全性 | 未改善 | Veracode 2025 |
| 重大问题数 | 1.7x 更多 | CodeRabbit 2025 |
| 安全漏洞 | 2.74x 更多 | CodeRabbit 2025 |
| 配置错误 | 75% 更多 | CodeRabbit 2025 |
| 代码重构率 | 从 25% 降至 <10% | GitClear 2024 |
| 代码重复 | 增加 ~4x | GitClear 2024 |

## Writer/Reviewer 并行模式

一个 Agent 写代码，另一个 Agent 审查——互相独立，上下文隔离：

```
Agent A（Writer）: 实现限流器
                    ↓
Agent B（Reviewer）: 审查限流器实现，查找边界条件和竞态问题
                    ↓
Agent A（Writer）: 根据审查反馈修复问题
```

**为什么有效**：审查者没有作者的确认偏差，能看到作者忽略的问题。

## 覆盖率优先于过滤

Anthropic 的建议：让审查者报告所有发现，不过滤重要性或置信度。目标是覆盖率——宁可误报也不要漏报。[Anthropic 2025]

```
报告你发现的所有问题，包括你不确定的或认为低严重性的。
不要在此阶段过滤重要性或置信度。
你的目标是覆盖率：宁可暴露一个后来被过滤掉的发现，也不要悄悄漏掉一个真正的 bug。
```

## Agent 自审

从人类审查到 Agent 自审的演进路径：

```
阶段 1：人类审查所有 Agent 产出
阶段 2：Agent 自审 + 人类抽查
阶段 3：Agent 自审 + 自动化检查（CI/CD）+ 人类审批关键变更
阶段 4：Agent 自审闭环 + 人类仅审批高风险变更
```

## 审查即验证

审查不是独立的步骤，而是自我闭环的验证环节。通过审查，Agent 验证：
- 代码是否符合预期行为
- 是否有边界情况未处理
- 是否符合项目编码规范
- 是否引入了安全风险

审查通过 = 验证完成 = 可以进入下一步。
```

编写 `docs/quality/testing-strategy.md`：

```markdown
---
title: 测试策略
slug: /quality/testing-strategy
draft: true
---

# 测试策略

**自我测试 = Agent 的反馈信号。** 没有测试，Agent 就没有反馈，就无法自我验证，就无法闭环。这是 AI-Driven Engineering 中最高杠杆的实践。

## 最高杠杆实践

给 Agent 验证自身工作的方法。没有验证，Agent 就没有反馈信号，你（人类）就是唯一的反馈环——这意味着 Agent 无法自我闭环。

| 没有测试 | 有测试 |
|---------|--------|
| Agent 不知道代码是否正确 | Agent 运行测试获得反馈 |
| 人类是唯一的验证者 | Agent 自己验证 |
| 每次变更都需要人工审查 | CI/CD 自动验证 |
| 开放式循环 | 自我闭环 |

## TDD + Agent

测试驱动开发与 AI-Driven Engineering 的天然结合：

1. **先写测试**：定义预期行为，如 tests.json
2. **让 Agent 实现功能**：Agent 目标明确——让测试通过
3. **提醒 Agent**："删除或修改测试是不可接受的"
4. **验证**：运行测试，全部通过 = 完成

TDD 在 AI-Driven Engineering 中不仅是开发方法论，更是 Agent 的行为约束——测试定义了"完成"的标准。

## 验证方法

| 方法 | 适用场景 | 示例 |
|------|----------|------|
| 测试套件 | 逻辑验证 | `pnpm test` |
| Lint/格式化 | 代码规范 | `pnpm lint` |
| Bash 命令输出 | 构建验证 | `pnpm build && echo "OK"` |
| UI 截图对比 | 视觉验证 | 截图对比原始设计 |
| 子 Agent 审查 | 代码质量 | 独立 Agent 审查变更 |

## 提示模板对比

| 模糊提示 | 精确提示 |
|---------|---------|
| "实现邮箱验证函数" | "写 validateEmail 函数。测试用例：user@example.com 为 true、invalid 为 false、user@.com 为 false。实现后运行 `pnpm test` 验证" |
| "修 bug" | "src/auth/handler.ts:47 在输入 null 时抛出 TypeError。修复并确保 `pnpm test` 通过" |
| "加个仪表盘" | "实现仪表盘设计。截图对比原始设计，列出差异并修复" |

## 测试即规范

测试不仅是质量保障，更是 Agent 理解预期行为的规格说明。测试用例告诉 Agent：
- 正常输入应该返回什么
- 边界条件应该如何处理
- 异常情况应该如何响应

**不能验证 = 不能发布。** 这是 AI-Driven Engineering 的铁律。
```

编写 `docs/quality/security-review.md`：

```markdown
---
title: 安全审查
slug: /quality/security-review
draft: true
---

# 安全审查

让 Agent 具备安全审查能力，将安全扫描纳入 Agent 的自我验证闭环。AI 生成代码的安全问题是真实的——功能改善但安全未改善。[Veracode 2025]

## AI 代码安全画像

| 指标 | 数据 | 含义 |
|------|------|------|
| 功能代码 | 改善 | Agent 能写出工作的代码 |
| 安全性 | 未改善 | Agent 不擅长写安全的代码 |
| 安全漏洞率 | 2.74x | AI 代码的安全漏洞是人工代码的 2.74 倍 |
| 配置错误 | 75% 更多 | AI 代码更容易出现配置安全问题 |

**核心结论**：AI Agent 能写出功能正确的代码，但不能自动写出安全的代码。安全审查不能省略。

## 安全审查 Agent

定义专门的安全审查 Agent，作为自我闭环的安全环节：

```markdown
# .claude/agents/security-reviewer.md

你是一名高级安全工程师。审查代码中的：
- 注入漏洞（SQL、XSS、命令注入）
- 认证和授权缺陷
- 代码中的密钥或凭据
- 不安全的数据处理
- 不安全的依赖引入
```

## 安全审查清单

Agent 在提交代码前应自动检查：

- [ ] 输入验证：所有外部输入是否经过验证和清理？
- [ ] 注入防护：是否使用参数化查询和转义？
- [ ] 认证授权：敏感操作是否有权限检查？
- [ ] 密钥管理：是否有硬编码的密钥或凭据？
- [ ] 依赖安全：新增依赖是否经过安全审查？
- [ ] 数据处理：敏感数据是否加密存储和传输？

## 安全扫描工具集成

将安全扫描纳入 CI/CD，成为 Agent 自我验证闭环的一部分：

```
Agent 产出 → 单元测试 → Lint 检查 → 安全扫描 → 部署
                                        ↓
                                     失败 → 回退 + 修复
```

安全扫描工具推荐：
- **npm audit** / **pnpm audit**：依赖安全检查
- **Snyk**：全面的安全扫描平台
- **SonarQube**：代码质量和安全分析
- **Trivy**：容器安全扫描

**安全扫描是 Agent 自我验证的最后一道防线。** 不能通过安全扫描的代码 = 不能发布。
```

- [ ] **Step 2: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add quality docs (code-review, testing-strategy, security-review) as drafts"`

---

### Task 10: 创建自动化与效率文档（automation/）

**Files:**
- Create: `ai-driven-engineering/docs/automation/ci-cd.md`
- Create: `ai-driven-engineering/docs/automation/agent-orchestration.md`
- Create: `ai-driven-engineering/docs/automation/efficiency-tools.md`

- [ ] **Step 1: 创建目录并编写三篇文档**

创建目录：`mkdir -p docs/automation`

编写 `docs/automation/ci-cd.md`：

```markdown
---
title: CI/CD 集成
slug: /automation/ci-cd
draft: true
---

# CI/CD 集成

CI/CD 不仅是部署工具，更是 Agent 自我验证的自动化基础设施。Agent 产出 → 自动测试 → 自动安全扫描 → 自动部署 → 自动回滚（如果验证失败）。

## CI/CD 即 Agent 的验证基础设施

```
Agent 产出
    ↓
自动测试（单元测试 + 集成测试）
    ↓
自动代码检查（lint + 类型检查）
    ↓
自动安全扫描（依赖 + 代码）
    ↓
自动部署（staging → production）
    ↓
自动回滚（如果验证失败）
```

每一步都是自动化的——Agent 不需要人类来运行测试或检查 lint。CI/CD 是 Agent 的外挂验证系统。

## 自动审查流水线

```yaml
# .github/workflows/agent-review.yml
name: Agent Code Review
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm test
      - run: pnpm lint
      - run: pnpm audit
```

## 非交互模式

使用 CLI 工具的非交互模式，Agent 可以在 CI/CD 中自主运行：

```bash
claude -p "将 $file 从 React 迁移到 Vue。返回 OK 或 FAIL。"
```

## 扇出扩展

从单个文件到大规模自动化：

```
1. 生成任务列表（需要迁移的文件清单）
2. 写一个迁移脚本
3. 在 2-3 个文件上试跑
4. 优化脚本
5. 大规模运行
```

## 部署策略

- **Staging 优先**：所有变更先部署到 staging 环境
- **金丝雀发布**：逐步扩大流量比例
- **自动回滚**：验证失败自动回滚到上一版本
- **Agent 友好的回滚**：`git revert` 即可回滚 Agent 的变更
```

编写 `docs/automation/agent-orchestration.md`：

```markdown
---
title: Agent 编排
slug: /automation/agent-orchestration
draft: true
---

# Agent 编排

从人类编排 Agent 到 Agent 自行编排的演进。核心是闭环编排——Agent 自行规划→执行→验证→调整，无需人类逐步驱动。

## Anthropic 四大工作流模式

[Anthropic 2025]

| 模式 | 描述 | 适用场景 |
|------|------|----------|
| **提示链** | 顺序步骤（大纲→验证→生成） | 需要高精度，延迟可接受 |
| **编排者-工作者** | 中心 Agent 动态分解任务并委派 | 复杂多文件变更，子任务未预定义 |
| **评估者-优化者** | 一个 Agent 生成，另一个评估反馈循环 | 有明确评估标准（如自动化测试） |
| **并行化/投票** | 多个 Agent 独立审查，增加置信度 | 代码审查、漏洞检测 |

## Agent 自主编排

从人类编排到 Agent 自编排的演进：

```
阶段 1：人类定义所有步骤，Agent 按步骤执行
阶段 2：人类定义目标，Agent 自行分解步骤
阶段 3：Agent 自行规划+执行+验证+调整
阶段 4：多个 Agent 协作，自行分配任务和合并结果
```

## 子 Agent 编排

子 Agent 的使用场景：
- **并行运行**：多个独立任务可同时执行
- **隔离上下文**：避免任务间的信息污染
- **独立工作流**：每个子 Agent 有自己的 Plan→Execute→Verify 循环

**不要为简单任务使用子 Agent**——能在一个响应中直接完成的任务不需要子 Agent。

## ACI 原则

Agent-计算机接口（ACI）设计比提示调优更有效。[Anthropic 2025]

Anthropic 的 SWE-bench 经验：优化工具定义比优化提示词带来更大的改进。例如，将工具参数从相对路径改为绝对路径，就消除了模型持续犯错的问题。

**启示**：当 Agent 反复犯错时，先检查：
1. 工具接口是否清晰？
2. 参数是否明确？
3. Agent 是否知道该调用哪个工具？

## 闭环编排

终极目标：Agent 自行完成完整循环：

```
Agent 接收目标
    ↓
自行规划（Plan）
    ↓
自行执行（Execute）
    ↓
自行验证（Verify）
    ↓
通过 → 提交结果
未通过 → 调整计划 → 重新执行
    ↓
关键节点 → 通知人类审批
```

人类从"逐步驱动者"变成"关键节点审批者"。
```

编写 `docs/automation/efficiency-tools.md`：

```markdown
---
title: 效率工具链
slug: /automation/efficiency-tools
draft: true
---

# 效率工具链

工具即 Agent 的感官——Agent 通过工具感知项目状态、执行操作、验证结果。工具的可达性直接决定 Agent 的能力边界。

## 工具全景图

| 工具 | 类型 | 核心能力 | 关键特性 |
|------|------|----------|----------|
| **Claude Code** | CLI Agent | 代码生成、文件操作、命令执行 | 子 Agent、并行会话、自动模式 |
| **Cursor** | AI IDE | 代码编辑、补全、重构 | Rules 系统、Agent 模式、MCP 集成 |
| **Aider** | 终端配对编程 | 代码生成、Git 集成 | 模型切换、文件选择、/ask 模式 |
| **repomix** | 上下文打包 | 将代码库打包为单文件 | 为 LLM 提供完整项目上下文 |
| **mise** | 任务运行器 | 自定义 LLM 任务 | 每项目配置、任务编排 |
| **llm CLI** | LLM 接口 | 通过管道将数据传入 LLM | 数据转换、批量处理 |

## 工具即 Agent 的感官

| 感官 | 工具对应 | 缺失后果 |
|------|----------|----------|
| 视觉 | 文件读取、代码浏览 | Agent 看不到代码 |
| 触觉 | 文件写入、命令执行 | Agent 无法修改代码 |
| 听觉 | 日志读取、错误输出 | Agent 听不到反馈 |
| 味觉 | 测试执行、lint 检查 | Agent 无法判断质量 |
| 嗅觉 | 安全扫描、依赖检查 | Agent 感知不到风险 |

**工具不可达 = 能力不存在。** 如果 Agent 无法运行测试，它就无法自我验证。

## IDE 集成

### Cursor Rules 系统

现代 `.cursor/rules/` 提供按文件类型的规则注入，节省上下文窗口。

### MCP 集成

Model Context Protocol 让 Agent 能访问外部工具和数据源——扩展 Agent 的感官范围。

## 上下文恢复

当 Agent 在执行中迷失时，使用 repomix 打包代码库传回 LLM：

```bash
npx repomix --output output.txt
```

配合 llm CLI 进行转换：

```bash
npx repomix --output output.txt && cat output.txt | llm "总结这个项目的架构"
```

## 工具组合乘数效应

单个工具的力量有限，但组合使用产生乘数效应：

| 组合 | 效应 |
|------|------|
| Claude Code + Git worktree | 并行开发，上下文隔离 |
| repomix + llm CLI | 完整上下文 + 智能转换 |
| Cursor + Rules | IDE 内的 Agent 约束 |
| Aider + 多模型 | 卡住时切换模型尝试 |
| mise + repomix | 任务编排 + 上下文生成 |

**核心洞察**：工具组合的价值 > 单个工具价值之和。为 Agent 配备完整的工具链，就是在扩展它的能力边界。
```

- [ ] **Step 2: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add automation docs (ci-cd, agent-orchestration, efficiency-tools) as drafts"`

---

### Task 11: 创建 Blog 模块

**Files:**
- Create: `ai-driven-engineering/blog/authors.yml`
- Create: `ai-driven-engineering/blog/tags.yml`
- Create: `ai-driven-engineering/blog/2025-05-22-hello-ai-driven-engineering/index.md`

- [ ] **Step 1: 编写 authors.yml**

编写 `blog/authors.yml`：

```yaml
jasongwq:
  name: jasongwq
  title: AI-Driven Engineering 探索者
  url: https://github.com/jasongwq
  image_url: https://github.com/jasongwq.png
```

- [ ] **Step 2: 编写 tags.yml**

编写 `blog/tags.yml`：

```yaml
思考:
  label: 思考
  description: 对 AI-Driven Engineering 的思考与洞察
实践:
  label: 实践
  description: 实际项目中的实践经验
转译:
  label: 转译
  description: 外网优秀文章的翻译与整理
工具推荐:
  label: 工具推荐
  description: AI 编码工具的推荐与评测
```

- [ ] **Step 3: 编写首篇博客**

创建目录：`mkdir -p blog/2025-05-22-hello-ai-driven-engineering`

编写 `blog/2025-05-22-hello-ai-driven-engineering/index.md`：

```markdown
---
slug: hello-ai-driven-engineering
title: 你好，AI-Driven Engineering
authors: [jasongwq]
tags: [思考]
draft: true
---

# 你好，AI-Driven Engineering

这个站点的核心理念不是"人类如何更好地使用 AI"，而是**为 AI Agent 构建一套可独立运行的工程体系**。

## 为什么不是 Vibe Coding？

Vibe Coding（Karpathy, 2025）是一个有趣的起点——它让人们意识到 AI 可以直接生成代码。但它的核心是"交给 vibes"，这意味着放弃了对代码的理解和控制。

AI-Driven Engineering 从 Vibe Coding 的实践经验出发，但走了一条不同的路：

- 不是放弃理解，而是让 Agent 自己验证
- 不是盲目接受，而是建立闭环
- 不是人类逐步驱动，而是 Agent 自主循环

## 核心循环

```
完整上下文 → 全局视野 → 信息可达 → 自我测试 → 自我验证 → 自我闭环
```

每个环节都是下一个环节的前提。这个循环定义了 AI-Driven Engineering 的全部核心理念。

## 这个站点会做什么？

这里会持续记录：

- 核心方法论：心智模型、原则、反模式
- AI 协作技巧：提示工程、上下文管理、多轮对话策略
- 工程化实践：项目结构、规范文件、工作流设计
- 质量保障：代码审查、测试策略、安全审查
- 自动化与效率：CI/CD、Agent 编排、效率工具链

欢迎关注。
```

- [ ] **Step 4: 删除脚手架默认博客**

Run: `rm -rf blog/2025-05-28* blog/2025-05-29*`（删除 Docusaurus 默认博客文章）

- [ ] **Step 5: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add blog module with authors, tags, and first post as draft"`

---

### Task 12: 自定义首页

**Files:**
- Modify: `ai-driven-engineering/src/pages/index.tsx`

- [ ] **Step 1: 编写首页**

将 `src/pages/index.tsx` 替换为以下内容：

```tsx
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`首页`}
      description="为 AI Agent 构建可自主运行的工程体系">
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4rem 2rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
        <Heading as="h1" style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>
          AI-Driven Engineering
        </Heading>
        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--ifm-color-emphasis-600)',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
          为 AI Agent 构建可自主运行的工程体系
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}>
          {['完整上下文', '全局视野', '信息可达', '自我测试', '自我验证', '自我闭环'].map(
            (item) => (
              <span
                key={item}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: 'var(--ifm-color-primary-lightest)',
                  color: 'var(--ifm-color-primary-darkest)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}>
                {item}
              </span>
            ),
          )}
        </div>

        <div
          style={{
            textAlign: 'center',
            lineHeight: '1.8',
            color: 'var(--ifm-color-emphasis-700)',
            maxWidth: '600px',
          }}>
          <p>
            AI-Driven Engineering 不是"人类如何更好地使用 AI"，而是
            <strong>为 AI Agent 构建一套可独立运行的工程体系</strong>。
          </p>
          <p>
            让 Agent 拥有完整上下文、全局视野、信息可达、自我测试、自我验证、自我闭环的能力——从人类逐步驱动到 Agent 自主循环。
          </p>
        </div>

        <div style={{marginTop: '2rem'}}>
          <a
            href="/docs/core/mindset"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}>
            开始阅读
          </a>
        </div>
      </main>
    </Layout>
  );
}
```

- [ ] **Step 2: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: customize homepage with AI-Driven Engineering branding"`

---

### Task 13: 创建 GitHub Actions 部署工作流

**Files:**
- Create: `ai-driven-engineering/.github/workflows/deploy.yml`

- [ ] **Step 1: 创建工作流目录**

Run: `mkdir -p .github/workflows`

- [ ] **Step 2: 编写部署工作流**

编写 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: latest

      - name: Get pnpm store directory
        shell: bash
        run: echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build website
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: 提交**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "feat: add GitHub Actions deploy workflow for GitHub Pages"`

---

### Task 14: 验证完整构建

**Files:**
- None (验证任务)

- [ ] **Step 1: 运行完整构建**

Run: `cd /root/code/ai-driven-engineering && pnpm build 2>&1`
Expected: 构建成功，无错误

- [ ] **Step 2: 检查生成的文件结构**

Run: `cd /root/code/ai-driven-engineering && find build -type f -name "*.html" | head -30`
Expected: 包含所有文档页面和 blog 页面的 HTML 文件

- [ ] **Step 3: 最终提交（如有遗漏修复）**

Run: `cd /root/code/ai-driven-engineering && git add -A && git commit -m "chore: final build verification and fixes" || echo "No changes needed"`

---

## Self-Review

### Spec Coverage Check

| Spec 需求 | 对应 Task |
|-----------|----------|
| Docusaurus 3.x + pnpm | Task 1 |
| 站点配置（名称/URL/主题） | Task 2 |
| 侧边栏结构 | Task 3 |
| 中文搜索（docusaurus-search-local） | Task 4 |
| Details 折叠组件 | Task 5 |
| core/ 3 篇文档 | Task 6 |
| ai-collaboration/ 3 篇文档 | Task 7 |
| engineering/ 3 篇文档 | Task 8 |
| quality/ 3 篇文档 | Task 9 |
| automation/ 3 篇文档 | Task 10 |
| Blog 模块 | Task 11 |
| 自定义首页 | Task 12 |
| GitHub Actions 部署 | Task 13 |
| 所有文档 draft: true | Task 6-11 |
| 金字塔原则+渐进式披露 | 内嵌于各文档 |
| GitHub Pages 部署 | Task 13 |

### Placeholder Scan

No TBD, TODO, or placeholder patterns found. All code blocks contain complete content.

### Type Consistency

All file paths, component names, and configuration keys are consistent across tasks.
