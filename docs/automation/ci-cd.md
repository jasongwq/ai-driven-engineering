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

## 双层覆盖率 Gate

单一覆盖率百分比不足以保证代码质量。实践中需要两层互补的门槛：

### Tier 1 — 防退化 Gate

确保整体覆盖率不因变更而下降：

```
当前覆盖率% >= 基线覆盖率% - 容差（1.5%）
```

- **基线来源**：主分支最近一次 CI 上传的覆盖率制品（见"基线即制品模式"）
- **容差设计**：1.5% 的容差避免因微小波动导致的 CI 失败，同时防止覆盖率的持续滑坡
- **粒度**：按包/目录独立检查，一个包的覆盖率提升不能掩盖另一个包的下降
- **优雅降级**：如果基线制品不存在（首次运行、制品过期），Tier 1 自动跳过，不阻塞 CI

### Tier 2 — 变更覆盖 Gate

确保新增和修改的代码有足够的测试覆盖：

```
变更行覆盖率 >= 80%
```

- **计算方式**：通过 `git diff` 找到相对 merge-base 的新增行，交叉引用覆盖率数据，计算变更行的覆盖比例
- **严格门槛**：80% 是硬性要求，没有容差。新代码必须被测试，不是可选的
- **豁免机制**：部分代码因本质原因难以单元测试（如 CLI 子进程启动、Android Service 生命周期），可声明为豁免文件，不计入 Gate 计算（详见测试策略中的"豁免文件策略"）

### 为什么需要两层

| 场景 | 仅 Tier 1 | 仅 Tier 2 | 双层 |
|------|----------|----------|------|
| 新增大量未测试代码 | 可能通过（被旧代码稀释） | 不通过 | 不通过 |
| 删除未测试代码导致基线上浮 | 误报失败 | 不受影响 | Tier 1 用调整后基线，通过 |
| 重构导致部分包下降 | 不通过 | 可能通过（变更行覆盖够） | 不通过 |
| 纯文档变更 | 通过 | 不适用（无代码变更） | 通过 |

**设计决策**：Tier 1 宽容（防退化），Tier 2 严格（保新增质量）。两层互补，缺一不可。

## 自动审查流水线

将所有质量检查组织为 CI 流水线，每一步都是 Agent 的验证信号：

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test (${{ matrix.os }})
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - run: pnpm typecheck

  coverage:
    name: Coverage Gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Tier 2 diff 计算需要完整历史
      - name: Download main baseline
        if: github.event_name == 'pull_request'
        uses: dawidd6/action-download-artifact@v8
        with:
          workflow: ci.yml
          branch: main
          name: main-coverage
          path: .baseline/
        continue-on-error: true  # 基线不存在时优雅降级
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
      - run: ./scripts/check-coverage.sh
      - name: Upload coverage baseline
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: actions/upload-artifact@v4
        with:
          name: main-coverage
          path: coverage/
          retention-days: 90

  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  security:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm audit --audit-level moderate

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [coverage, lint]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

**设计决策**：

- **`fetch-depth: 0`**：覆盖率 Gate 的 Tier 2 需要 merge-base 来计算 diff，浅克隆无法获取
- **`continue-on-error: true`**：基线下载失败时（首次运行、制品过期），Tier 1 自动跳过而非阻塞
- **`needs: [coverage, lint]`**：构建依赖覆盖率和 lint 通过，确保构建产物来自已验证的代码
- **`retention-days: 90`**：基线制品保留 90 天，避免无限膨胀
- **安全审计独立 job**：即使测试通过，安全审计失败也应阻塞合并

## 基线即制品模式

覆盖率基线的存储和获取，不需要外部服务，利用 CI 制品即可：

```
主分支 push → CI 运行 → 上传覆盖率数据为制品
    ↓
PR 创建 → CI 下载主分支制品 → 与当前覆盖率对比 → Gate 判定
```

**基线解析链**（覆盖率检查脚本内部）：

1. `.baseline/coverage-summary.json` — CI workflow 预先下载的制品
2. `gh run download --name main-coverage` — 通过 GitHub CLI 下载
3. 跳过 Tier 1 — 以上都不可用时，Tier 1 自动跳过

**为什么不用第三方覆盖率服务**：

- **零外部依赖**：不需要 Codecov、Coveralls 等额外服务，减少供应链风险
- **制品即审计**：GitHub Actions 制品有版本和保留策略，天然可追溯
- **足够用**：对于大多数项目，制品模式完全满足需求

**删除代码的基线调整**：当删除了未覆盖的代码时，原始基线会人为上浮。好的覆盖率脚本会从基线中排除已删除行，重新计算调整后的基线，避免误报。

## PR 标题规范与自动检查

Conventional Commit 规范在 CI 中强制执行，确保提交历史可追溯、自动发版可解析：

```yaml
# .github/workflows/lint-pr.yml
name: PR Lint

on:
  pull_request:
    types: [opened, edited, synchronize, reopened]

jobs:
  lint-pr-title:
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v5
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          types: |
            feat
            fix
            docs
            style
            refactor
            perf
            test
            chore
            ci
            build
            revert
          requireScope: false
          subjectPattern: ^.{1,200}$
          subjectPatternError: |
            PR 标题描述部分不能为空且不超过 200 字符。
```

**与 CI Gate 的对齐**：

| PR Type | 覆盖率 Gate 期望 | 说明 |
|---------|-----------------|------|
| `feat` | 必须有新测试 | 新功能必须有测试覆盖 |
| `fix` | 必须有回归测试 | Bug 修复必须有回归测试防止再发 |
| `refactor` | 覆盖率不下降 | 重构不应导致测试覆盖下降 |
| `test` | 覆盖率应提升 | 纯测试 PR 应提升覆盖率 |
| `docs`/`style`/`chore` | 不适用 | 非代码变更，不触发覆盖率 Gate |
| `ci` | 不适用 | CI 配置变更，不触发覆盖率 Gate |

**自洽的 PR 模板**：PR 模板的变更类型应与 lint-pr 的 type 列表一一对应，测试检查项应与覆盖率 Gate 对齐：

```markdown
## 变更说明

<!-- 简述做了什么、为什么做 -->

## 变更类型

- [ ] feat: 新功能
- [ ] fix: Bug 修复
- [ ] refactor: 重构
- [ ] perf: 性能优化
- [ ] docs: 文档
- [ ] test: 测试
- [ ] chore/ci/build: 构建/工具

## 测试

- [ ] 已通过现有测试
- [ ] 已添加新测试覆盖
- [ ] 手动验证（描述验证方式）

## 自检清单

- [ ] 代码遵循项目现有风格
- [ ] 无硬编码密钥或敏感信息
```

## 自动合并与闭环

当 CI 全部通过后，Agent 可以自动合并 PR，完成"产出→验证→合并"的完整闭环：

```yaml
# .github/workflows/auto-merge.yml
name: Auto Merge

on:
  pull_request:
    types: [opened, synchronize, reopened, labeled]
  check_suite:
    types: [completed]

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: contains(github.event.pull_request.labels.*.name, 'auto-merge')
    steps:
      - name: Wait for CI and merge
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          PR_NUMBER=${{ github.event.pull_request.number }}
          HEAD_SHA=${{ github.event.pull_request.head.sha }}

          # 轮询 CI 状态（最多 10 分钟）
          MAX_ATTEMPTS=40
          INTERVAL=15

          for i in $(seq 1 $MAX_ATTEMPTS); do
            # 检查所有非自身的 check run
            STATUS=$(gh api "repos/$GITHUB_REPOSITORY/commits/$HEAD_SHA/check-runs" \
              --jq '[.check_runs[] | select(.name != "Auto Merge") | .status] | unique')

            IN_PROGRESS=$(echo "$STATUS" | grep -c '"in_progress"\|"queued"' || true)

            if [ "$IN_PROGRESS" -eq 0 ]; then
              echo "All checks completed"
              break
            fi

            echo "Attempt $i/$MAX_ATTEMPTS: checks still running, waiting ${INTERVAL}s..."
            sleep "$INTERVAL"
          done

          # 验证所有 check 通过
          CONCLUSIONS=$(gh api "repos/$GITHUB_REPOSITORY/commits/$HEAD_SHA/check-runs" \
            --jq '[.check_runs[] | select(.conclusion != "skipped") | .conclusion] | unique')

          if echo "$CONCLUSIONS" | grep -q '"failure"'; then
            echo "Some checks failed, skipping auto-merge"
            exit 1
          fi

          # Squash merge
          gh pr merge "$PR_NUMBER" --squash --delete-branch
```

**闭环流程**：

```
Agent 提交代码 → 创建 PR + auto-merge 标签
    ↓
CI 自动运行（测试 + 覆盖率 + lint + 安全）
    ↓
全部通过 → 自动 squash merge → 删除分支
    ↓
部分失败 → Agent 读取失败日志 → 修复 → 推送 → CI 重新运行
```

**Agent 修复 CI 失败的模式**：

- 覆盖率 Gate 失败 → Agent 补充测试用例
- Lint 失败 → Agent 自动修复格式问题
- 安全审计失败 → Agent 升级依赖或替换不安全用法
- 构建失败 → Agent 修复编译错误

**关键设计**：自动合并不是绕过人类审查，而是将人类从"等待 CI → 点合并"的机械操作中解放出来。人类通过 PR review 在合并前审查代码，CI 通过后自动完成合并动作。

## Agent 自动守护 PR

自动合并解决了"CI 通过后自动合并"的问题，但真正的闭环需要覆盖 CI 失败和 Review 意见的场景——Agent 不仅要能合并，还要能**自愈**。

### 完整的 PR 生命周期闭环

```
Agent 创建 PR
    ↓
CI 自动运行
    ↓
┌── 通过 → Review → 通过 → 自动合并 → 闭环完成
│           ↓
│       Review 有意见？
│           ↓ 是
│       Agent 读取意见 → 修改代码 → 推送 → CI 重跑
│           ↓
└── 失败 → Agent 读取失败日志 → 修复 → 推送 → CI 重跑
```

### Agent 修复 CI 失败

通过定时任务或 webhook 触发，Agent 定期检查自己提交的 PR 的 CI 状态：

**Step 1 — 发现问题**

```bash
# 获取自己所有 open 的 PR
gh pr list --state open --json number,title,statusCheckRollup --author @me

# 检查 CI 失败详情
gh pr view <PR号> --json statusCheckRollup --jq \
  '.statusCheckRollup[] | select(.conclusion == "failure") | {name, conclusion}'
```

**Step 2 — 隔离修复**

使用 git worktree 隔离修复环境，绝不污染主工作区：

```bash
# 在独立 worktree 中修复，避免 checkout 切换导致上下文丢失
git fetch origin <headRefName>
git worktree add .worktrees/prfix-<PR号> -b fix/pr<PR号>-ci <headRefName>
cd .worktrees/prfix-<PR号>
```

**Step 3 — 按失败类型修复**

| CI 失败类型 | Agent 修复策略 |
|------------|---------------|
| 测试失败 | 读取失败日志，修复代码使测试通过 |
| 覆盖率 Gate 失败 | 在 `*_test.go` / `__tests__/` 中补充测试用例 |
| Lint 失败 | 自动修复格式和规范问题 |
| 安全审计失败 | 升级依赖或替换不安全用法 |
| 构建失败 | 修复编译/类型错误 |
| 合并冲突 | Rebase onto main，解决冲突 |

**关键规则**：
- **覆盖率 Gate 失败必须补充测试**，不能通过降低覆盖率门槛绕过
- **Bug 修复必须附带回归测试**，确保同一 bug 不会重现
- **每次最多修复 3 次**，超过后记录失败原因并通知人类，避免无限循环

**Step 4 — 推送并轮询 CI**

```bash
# 推送修复
git add -A
git commit -m "fix: resolve CI failures"
git push origin <headRefName> --force-with-lease

# 清理 worktree
cd ../..
git worktree remove .worktrees/prfix-<PR号> --force
git branch -D fix/pr<PR号>-ci

# 轮询 CI（最多 20 分钟）
MAX_POLLS=40
POLL_INTERVAL=30
for i in $(seq 1 $MAX_POLLS); do
  PENDING=$(gh pr view <PR号> --json statusCheckRollup \
    --jq '[.statusCheckRollup[] | select(.status == "in_progress" or .status == "queued")] | length')
  if [ "$PENDING" = "0" ]; then
    FAILED=$(gh pr view <PR号> --json statusCheckRollup \
      --jq '[.statusCheckRollup[] | select(.conclusion == "failure")] | length')
    if [ "$FAILED" = "0" ]; then
      echo "CI passed"
      break
    else
      echo "CI still failing"
      break
    fi
  fi
  sleep $POLL_INTERVAL
done
```

**Step 5 — 确认合并**

```bash
# CI 通过后启用自动合并
gh pr merge <PR号> --auto --squash

# 轮询确认合并完成
for i in $(seq 1 10); do
  STATE=$(gh pr view <PR号> --json state --jq '.state')
  if [ "$STATE" = "MERGED" ]; then
    echo "PR merged"
    break
  fi
  sleep 15
done
```

### Agent 处理 Review 意见

Review 意见是来自人类或其他 Agent 的反馈。Agent 需要读取、理解、响应这些意见：

**Step 1 — 获取 Review 意见**

```bash
# 获取 PR 的所有 review
gh api repos/$GITHUB_REPOSITORY/pulls/<PR号>/reviews \
  --jq '.[] | {user: .user.login, state: .state, body: .body}'

# 获取 PR 的行级评论（更精确的代码反馈）
gh api repos/$GITHUB_REPOSITORY/pulls/<PR号>/comments \
  --jq '.[] | {path: .path, line: .line, body: .body}'
```

**Step 2 — 分类处理**

| Review 类型 | Agent 行为 |
|------------|-----------|
| 明确的 Bug 指出 | 修复代码 + 补充回归测试 |
| 缺失测试的指出 | 补充测试用例 |
| 代码风格建议 | 按项目规范调整 |
| 架构/设计建议 | 评估可行性，可行的采纳修改 |
| 不明确或有歧义 | 评论回复请求澄清，不猜测 |
| 已过时的意见（代码已改） | 评论说明已解决 |

**Step 3 — 修复并回复**

```bash
# 修复代码（同样使用 worktree 隔离）
# ... 修复逻辑同 CI 修复流程 ...

# 推送修复后，回复 review 意见
gh pr comment <PR号> --body "已根据 review 意见修复：
- ✅ 处理了 XXX 建议：...
- ✅ 补充了 YYY 的测试用例
- ⚠️ 关于 ZZZ 的建议，因为 ... 原因暂未采纳，请确认"
```

**Step 4 — 去重规则**

避免对同一 PR 重复评论造成通知轰炸：

```bash
# 评论前检查是否已有自己的评论
REVIEWERS=$(gh api repos/$GITHUB_REPOSITORY/pulls/<PR号>/reviews \
  --jq '.[].user.login')
COMMENTERS=$(gh api repos/$GITHUB_REPOSITORY/issues/<PR号>/comments \
  --jq '.[].user.login')

# 如果自己的用户名已出现在评论列表中，跳过重复评论
```

### Agent 审查他人的 PR

当 Agent 作为 Reviewer 审查他人提交的 PR 时，有不同的职责边界：

| 场景 | 自己的 PR | 他人的 PR |
|------|----------|----------|
| CI 失败 | 直接拉 worktree 修复 | Request changes，指出具体问题 |
| 合并冲突 | Rebase 解决 | 评论通知作者解决，不自行处理 |
| 缺少测试 | 补充测试 | 明确指出缺少测试的具体位置 |
| 代码问题 | 直接修复 | Review 意见 + 修改建议 |

**审查重点**：

1. **测试覆盖**：Bug 修复是否有回归测试？新功能是否有单元测试？没有测试 = 严重问题
2. **逻辑正确性**：边界条件、错误路径、并发安全
3. **安全性**：输入验证、注入防护、密钥管理
4. **代码风格**：与项目现有风格一致，但不纠结格式小问题

### 定时守护 vs 事件驱动

两种触发 Agent 守护 PR 的方式：

**定时守护**（适用于所有项目）：

```yaml
# 通过 cron 定时任务触发 Agent 检查所有 PR
# 例如每小时运行一次
# Cron: 0 * * * *
```

- **优势**：零外部依赖，任何项目都能用
- **局限**：有延迟（最长等待一个 cron 周期）

**事件驱动**（需要 webhook 配置）：

```yaml
# GitHub webhook 触发 Agent
on:
  pull_request:
    types: [opened, synchronize, labeled]
  check_suite:
    types: [completed]
  pull_request_review:
    types: [submitted]
```

- **优势**：实时响应，CI 完成或 Review 提交后立即触发
- **局限**：需要 webhook 配置和 Agent 常驻服务

**推荐组合**：事件驱动处理自己提交的 PR（快速响应），定时守护处理他人的 PR 和 Issue 清理（批量处理）。

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

**Agent 回滚的完整闭环**：

```
部署后监控异常
    ↓
自动检测到错误率上升
    ↓
触发自动回滚（git revert + 重新部署）
    ↓
通知 Agent 回滚原因
    ↓
Agent 分析原因 → 修复 → 重新提交
```

回滚不是失败，而是闭环中的自我修正。Agent 能回滚 = Agent 能从错误中恢复 = 系统具备弹性。
