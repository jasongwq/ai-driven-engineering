import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AI-Driven Engineering',
  tagline: '为 AI Agent 构建可自主运行的工程体系',
  favicon: 'img/favicon.ico',

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
