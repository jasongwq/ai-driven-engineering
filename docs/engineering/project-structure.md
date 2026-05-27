---
title: 项目结构设计
slug: /engineering/project-structure
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
