import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
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
