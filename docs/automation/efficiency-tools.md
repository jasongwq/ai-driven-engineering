---
title: 效率工具链
slug: /automation/efficiency-tools
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
