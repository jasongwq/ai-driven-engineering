---
title: 提示工程
slug: /ai-collaboration/prompt-engineering
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
