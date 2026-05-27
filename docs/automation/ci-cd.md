---
title: CI/CD 集成
slug: /automation/ci-cd
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
