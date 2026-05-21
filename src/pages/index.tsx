import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`首页`}
      description="为 AI Agent 构建可自主运行的工程体系">
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4rem 2rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
        <Heading as="h1" style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>
          AI-Driven Engineering
        </Heading>
        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--ifm-color-emphasis-600)',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
          为 AI Agent 构建可自主运行的工程体系
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}>
          {['完整上下文', '全局视野', '信息可达', '自我测试', '自我验证', '自我闭环'].map(
            (item) => (
              <span
                key={item}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: 'var(--ifm-color-primary-lightest)',
                  color: 'var(--ifm-color-primary-darkest)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}>
                {item}
              </span>
            ),
          )}
        </div>

        <div
          style={{
            textAlign: 'center',
            lineHeight: '1.8',
            color: 'var(--ifm-color-emphasis-700)',
            maxWidth: '600px',
          }}>
          <p>
            AI-Driven Engineering 不是"人类如何更好地使用 AI"，而是
            <strong>为 AI Agent 构建一套可独立运行的工程体系</strong>。
          </p>
          <p>
            让 Agent 拥有完整上下文、全局视野、信息可达、自我测试、自我验证、自我闭环的能力——从人类逐步驱动到 Agent 自主循环。
          </p>
        </div>

        <div style={{marginTop: '2rem'}}>
          <a
            href="/docs/core/mindset"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}>
            开始阅读
          </a>
        </div>
      </main>
    </Layout>
  );
}
