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
