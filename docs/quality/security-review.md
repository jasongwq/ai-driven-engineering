---
title: 安全审查
slug: /quality/security-review
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
- 不安全依赖引入
```

## 安全扫描集成到 CI

安全扫描只有在 CI 中自动执行，才能成为 Agent 自我验证闭环的一部分——手动运行的安全扫描不是闭环，是检查清单。

### 三步安全流水线

```
Agent 产出
    ↓
步骤 1: 依赖安全审计（pnpm audit / npm audit）
    ↓
步骤 2: 代码静态分析（ESLint security rules / Semgrep）
    ↓
步骤 3: 容器/IaC 扫描（Trivy / Checkov）— 如适用
    ↓
全部通过 → 允许合并
任一失败 → Agent 读取报告 → 修复 → 重新提交
```

### CI 集成配置

```yaml
# .github/workflows/ci.yml 中的安全审计 job
security:
  name: Security Audit
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    # 步骤 1: 依赖安全审计
    - name: Dependency audit
      run: pnpm audit --audit-level moderate
      # --audit-level moderate: moderate 及以上级别的漏洞导致 CI 失败
      # 低级别漏洞仅警告，不阻塞

    # 步骤 2: 密钥泄露扫描
    - name: Secret scanning
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    # 步骤 3: 代码静态安全分析（可选，按项目需要）
    - name: Semgrep scan
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/default
          p/security-audit
          p/secrets
```

**设计决策**：

- **`--audit-level moderate`**：低级漏洞（如原型污染在特定场景下的利用）不阻塞 CI，因为它们的实际影响往往有限；moderate 及以上级别则必须修复才能合并
- **密钥扫描独立步骤**：即使依赖审计通过，密钥泄露扫描仍应运行——一个安全的依赖包无法弥补一个硬编码的 API key
- **Semgrep 可选**：对于小型项目，依赖审计 + 密钥扫描已覆盖大部分场景；中大型项目建议启用静态分析

## 依赖安全自动化

### CI 中的依赖审计

```yaml
# 最小化配置 — 适用于任何 Node.js 项目
- name: Dependency audit
  run: pnpm audit --audit-level moderate
```

**门槛选择**：

| 门槛 | 含义 | 适用场景 |
|------|------|----------|
| `low` | 所有已知漏洞都阻塞 CI | 安全敏感项目（支付、认证） |
| `moderate` | moderate 及以上阻塞 | 大多数项目的推荐设置 |
| `high` | 仅 high 和 critical 阻塞 | 快速迭代项目，低安全敏感度 |
| `critical` | 仅 critical 阻塞 | 最低门槛，不推荐 |

### 自动修复依赖漏洞

当 CI 报告依赖漏洞时，Agent 的闭环流程：

```
CI: pnpm audit 失败
    ↓
Agent 读取审计报告 → 识别有漏洞的包
    ↓
Agent 运行 pnpm update <package> 或替换为安全替代
    ↓
Agent 运行 pnpm test → 确保升级不破坏功能
    ↓
Agent 推送修复 → CI 重新运行 → 通过
```

**不可修复的场景**：当漏洞所在的包没有修复版本时：

1. 评估实际影响——是否真的在你的使用场景中可利用？
2. 如不可利用，在 `package.json` 中标记例外并注释原因
3. 如可利用，寻找替代包或自行实现安全封装

### Dependabot / Renovate 自动化

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 10
    labels:
      - dependencies
      - auto-merge  # 配合自动合并 workflow

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: monthly
```

Dependabot 自动创建依赖更新 PR，配合 CI Gate 和自动合并，形成"漏洞发现→更新→验证→合并"的完整闭环。

## 安全审查清单（CI 可执行版）

将安全审查从手动 checklist 升级为 CI 可自动执行的检查：

| 检查项 | CI 工具 | 失败时的 Agent 行为 |
|--------|---------|-------------------|
| 依赖漏洞 | `pnpm audit` | 升级依赖或添加例外 |
| 密钥泄露 | Gitleaks | 移除密钥，使用环境变量 |
| SQL 注入 | Semgrep `p/sql-injection` | 参数化查询 |
| XSS | Semgrep `p/xss` | 输出编码/转义 |
| 命令注入 | Semgrep `p/command-injection` | 避免拼接，使用子进程参数数组 |
| 路径穿越 | Semgrep `p/path-traversal` | 路径规范化 + 白名单 |
| 不安全反序列化 | Semgrep `p/insecure-deserialization` | 避免反序列化不可信输入 |
| 敏感数据日志 | 自定义规则 | 脱敏或移除日志 |

**从手动到自动的演进**：

```
阶段 1: 人类审查所有安全问题 → 人工 checklist
阶段 2: CI 自动扫描 + 人类审查高危发现
阶段 3: Agent 自动修复已知模式 + 人类审查零日和新模式
阶段 4: 安全闭环 — Agent 自主扫描、修复、验证
```

## 安全扫描工具集成

从"推荐"到"配置"——每个工具的 CI 集成方式：

### pnpm audit / npm audit — 依赖安全

```yaml
# CI 集成（已包含在上方安全流水线中）
- run: pnpm audit --audit-level moderate

# 本地运行
pnpm audit                    # 检查所有依赖
pnpm audit --audit-level high # 仅检查 high 和 critical
```

- **优势**：零配置，npm/pnpm 内置
- **局限**：仅检查依赖，不检查你的代码

### Gitleaks — 密钥泄露扫描

```yaml
# CI 集成
- uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

# 本地运行
# 安装: brew install gitleaks (macOS)
gitleaks detect --source . --verbose
```

- **优势**：扫描 git 历史（不只是当前代码），检测 100+ 种密钥模式
- **局限**：仅检测已知模式，自定义密钥格式可能漏检

### Semgrep — 代码静态安全分析

```yaml
# CI 集成
- uses: returntocorp/semgrep-action@v1
  with:
    config: >-
      p/default
      p/security-audit
      p/secrets

# 本地运行
# 安装: pip install semgrep
semgrep --config p/security-audit .
```

- **优势**：支持自定义规则，可针对项目特定模式；社区规则集覆盖主流漏洞
- **局限**：误报率较高，需要规则调优

### Trivy — 容器安全扫描

```yaml
# CI 集成（容器化项目）
- uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'your-image:latest'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'

# 本地运行
# 安装: brew install trivy (macOS)
trivy image your-image:latest
```

- **优势**：同时扫描容器镜像中的 OS 包和应用依赖；CVE 数据库更新快
- **局限**：仅适用于容器化项目

### Snyk — 全面安全平台（商业）

```yaml
# CI 集成
- uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  with:
    args: --severity-threshold=high
```

- **优势**：依赖 + 代码 + 容器 + IaC 全覆盖；修复建议质量高
- **局限**：商业产品，免费额度有限

**工具选择决策**：

| 项目规模 | 推荐组合 | 原因 |
|---------|---------|------|
| 小型 | `pnpm audit` + Gitleaks | 零成本，覆盖最常见的两类安全问题 |
| 中型 | + Semgrep | 增加代码层面的安全检查 |
| 大型 | + Trivy/Snyk | 容器化和全面安全平台 |

从最小组合开始，按需增加——安全工具的 ROI 随项目规模非线性增长。

## 安全扫描是最后一道防线

安全扫描是 Agent 自我验证的最后一道防线。不能通过安全扫描的代码 = 不能发布。

但安全扫描**不是唯一**的防线。它和测试、lint、code review 一起构成多层防御：

```
测试 → 验证功能正确性
Lint → 验证代码规范性
安全扫描 → 验证安全性
Code Review → 验证设计合理性
```

每一层捕获不同类型的问题。安全扫描捕获的是"功能正确但不安全"的代码——这正是 AI 最容易犯的错误。
