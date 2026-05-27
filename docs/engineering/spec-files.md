---
title: 规范文件
slug: /engineering/spec-files
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
