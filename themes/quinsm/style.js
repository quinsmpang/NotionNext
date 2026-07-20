/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'

/**
 * 主题样式：仅保留夜间模式与控制台标识；关键布局覆盖已写入 /quinsm/quinsm.min.css，
 * 避免 styled-jsx 在 body 中延迟注入导致首屏布局偏移。
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* 修复 Notion 渲染后默认 margin 过大 */
      #theme-quinsm .notion {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

      /* 内容页标题与元信息 */
      #theme-quinsm .entry-header {
        margin-bottom: 1.5rem;
      }
      #theme-quinsm .entry-title {
        font-size: 1.875rem;
        line-height: 1.35;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: inherit;
      }
      #theme-quinsm .entry-meta {
        font-size: 0.875rem;
        color: rgba(0, 0, 0, 0.5);
      }
      #theme-quinsm .entry-meta a {
        color: inherit;
        text-decoration: underline;
      }

      /* Notion 正文可读性优化 */
      #theme-quinsm #notion-article {
        overflow: visible !important;
        width: 100%;
      }
      #theme-quinsm .notion-page {
        padding: 0 !important;
        width: 100% !important;
      }
      #theme-quinsm .notion {
        font-size: 16px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.8);
      }
      #theme-quinsm .notion-text {
        margin-bottom: 0.75em;
      }
      #theme-quinsm .notion-h {
        font-family: Georgia, 'Times New Roman', serif;
      }
      #theme-quinsm .notion-asset-wrapper img,
      #theme-quinsm .notion-asset-wrapper iframe {
        max-width: 100%;
        height: auto;
      }
      #theme-quinsm .notion-simple-table {
        display: block;
        width: 100%;
        overflow-x: auto;
        border-collapse: collapse;
      }
      #theme-quinsm .notion-simple-table td {
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0.5rem 0.75rem;
      }
      #theme-quinsm .notion-inline-code {
        font-size: 0.85em;
      }
      #theme-quinsm .notion-code {
        border-radius: 0.5rem;
        font-size: 0.85em;
        line-height: 1.6;
      }
      #theme-quinsm .post-bottom-notice {
        font-size: 0.875rem;
        color: rgba(0, 0, 0, 0.55);
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 0.375rem;
      }
      #theme-quinsm .post-bottom-notice a {
        color: inherit;
        text-decoration: underline;
      }

      /* 夜间模式简单兼容 */
      .dark #theme-quinsm {
        background-color: #1a1a1a;
        color: rgba(255, 255, 255, 0.85);
      }
      .dark #theme-quinsm .metabar {
        background: rgba(30, 30, 30, 0.97);
        box-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
      }
      .dark #theme-quinsm .site-title img {
        filter: invert(0.9);
      }
      .dark #theme-quinsm .entry-meta,
      .dark #theme-quinsm .post-bottom-notice {
        color: rgba(255, 255, 255, 0.55);
      }
      .dark #theme-quinsm .post-bottom-notice {
        background: rgba(255, 255, 255, 0.05);
      }
      .dark #theme-quinsm .notion {
        color: rgba(255, 255, 255, 0.85);
      }

      ${themeConsoleStyle('quinsm', CONFIG)}
    `}</style>
  )
}

export { Style }
