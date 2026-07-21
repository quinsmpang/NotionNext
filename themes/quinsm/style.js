/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'

/**
 * 主题样式：仅保留 NotionNext 集成所需的覆盖与夜间模式兼容。
 * 旧主题 Pure 的原始样式由 /quinsm/quinsm.min.css 提供。
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

      /* 文章底部提示 */
      #theme-quinsm .post-bottom-notice {
        background-color: #f8f8f8;
        padding: 5px 15px;
        font-size: 14px;
        margin-bottom: 20px;
      }
      #theme-quinsm .post-bottom-notice a {
        color: inherit;
        text-decoration: underline;
      }

      /* Logo 尺寸限制：适配 65px 高 metabar，保持清晰且不被压扁 */
      #theme-quinsm .site-title a {
        display: inline-block;
        line-height: 65px;
      }
      #theme-quinsm .site-title img {
        display: inline-block;
        max-width: 160px;
        max-height: 40px;
        width: auto;
        height: auto;
        vertical-align: middle;
      }

      /* 首页文章列表：恢复旧主题 link 高亮 */
      #theme-quinsm .link--accent,
      #theme-quinsm .cute {
        color: #f3a500;
      }
      #theme-quinsm .block-title a:hover {
        color: #f3a500;
      }

      /* 首页文章首图横幅：旧主题 timthumb 裁剪为 700×210 */
      #theme-quinsm .block-streamText .b-image {
        display: block;
        width: 100%;
        height: 210px;
        object-fit: cover;
        padding-top: 16px;
      }
      @media screen and (max-width: 640px) {
        #theme-quinsm .block-streamText .b-image {
          height: 140px;
        }
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
