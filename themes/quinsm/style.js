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

      /* Logo 尺寸：适配 65px 高 metabar，保持清晰且不被压扁 */
      #theme-quinsm .site-title a {
        display: inline-block;
        line-height: 65px;
      }
      #theme-quinsm .site-title img {
        display: inline-block;
        max-width: 264px;
        max-height: 65px;
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

      /* ========== 自建评论系统：暗色模式 & 表情 & 表单适配 ========== */

      /* 评论空状态 */
      #theme-quinsm .comment-nav-empty {
        padding: 30px 0;
        color: rgba(0, 0, 0, 0.45);
      }
      .dark #theme-quinsm .comment-nav-empty {
        color: rgba(255, 255, 255, 0.35);
      }

      /* 评论区暗色适配 */
      .dark #theme-quinsm .comment-block {
        border-bottom-color: rgba(255, 255, 255, 0.08);
      }
      .dark #theme-quinsm .comment-content {
        color: rgba(255, 255, 255, 0.8);
      }
      .dark #theme-quinsm .comment-meta .name {
        color: rgba(255, 255, 255, 0.9);
      }
      .dark #theme-quinsm .comment-meta .time {
        color: rgba(255, 255, 255, 0.5);
      }
      .dark #theme-quinsm .comment-form-input label {
        background: #1a1a1a;
        color: rgba(255, 255, 255, 0.65);
      }
      .dark #theme-quinsm .comment-form-input input,
      .dark #theme-quinsm #comment {
        color: rgba(255, 255, 255, 0.85);
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.2);
      }
      .dark #theme-quinsm #submit,
      .dark #theme-quinsm #cancel-comment-reply-link {
        background: transparent;
        color: #f3a500;
        border-color: #f3a500;
      }
      .dark #theme-quinsm .commentNavTabs {
        border-top-color: rgba(255, 255, 255, 0.1);
      }
      .dark #theme-quinsm .commentNavTabs-item.is-active {
        border-top-color: rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.85);
      }
      .dark #theme-quinsm .buttton--commentmore {
        color: rgba(255, 255, 255, 0.5);
      }
      .dark #theme-quinsm .buttton--commentmore:hover {
        color: #f3a500;
      }

      /* 表情选择器容器 */
      #theme-quinsm .comment-form-smilies {
        margin-bottom: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
      }

      /* 阿鲁表情：渲染后的 img 和选择器中的 img */
      #theme-quinsm img.alu-emoji {
        width: 24px !important;
        height: auto !important;
        max-height: none !important;
        display: inline;
        vertical-align: middle;
        margin: 0 1px;
      }
      .dark #theme-quinsm img.alu-emoji {
        opacity: 0.9;
      }
      #theme-quinsm .add-smily {
        cursor: pointer;
        display: inline-block;
        margin: 2px;
        padding: 2px;
        border-radius: 3px;
        border: 1px solid transparent;
        background: transparent;
        transition: transform 0.15s ease, border-color 0.15s ease;
      }
      #theme-quinsm .add-smily:hover {
        transform: scale(1.2);
        border-color: rgba(243, 165, 0, 0.4);
      }
      #theme-quinsm img.wp-smiley {
        width: 24px !important;
        height: auto !important;
        max-height: none !important;
        display: block;
      }
      .dark #theme-quinsm img.wp-smiley {
        opacity: 0.85;
      }

      /* 回复提示条 */
      #theme-quinsm .comments-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* 通知条 */
      #theme-quinsm .comment-notice {
        padding: 10px 15px;
        margin-bottom: 15px;
        font-size: 13px;
        border-radius: 3px;
        display: flex;
        align-items: center;
      }
      #theme-quinsm .comment-notice--success {
        background: #f0f9eb;
        border: 1px solid #e1f3d8;
        color: #67c23a;
      }
      #theme-quinsm .comment-notice--error {
        background: #fef0f0;
        border: 1px solid #fde2e2;
        color: #f56c6c;
      }
      #theme-quinsm .comment-notice--info {
        background: #f5f5f5;
        border: 1px solid #e8e8e8;
        color: rgba(0, 0, 0, 0.65);
      }
      .dark #theme-quinsm .comment-notice--success {
        background: rgba(103, 194, 58, 0.1);
        border-color: rgba(103, 194, 58, 0.2);
      }
      .dark #theme-quinsm .comment-notice--error {
        background: rgba(245, 108, 108, 0.1);
        border-color: rgba(245, 108, 108, 0.2);
      }
      .dark #theme-quinsm .comment-notice--info {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.55);
      }

      /* 评论回复切换按钮 */
      #theme-quinsm .comment-reply-toggle {
        margin-top: 4px;
      }
      #theme-quinsm .comment-reply-link {
        display: inline-block;
        cursor: pointer;
      }
      #theme-quinsm .comment-reply-link .iconfont {
        margin-right: 2px;
      }

      /* 评论加载骨架屏 */
      #theme-quinsm .comment-skeleton-list {
        margin: 15px 0;
      }
      #theme-quinsm .comment-skeleton {
        height: 80px;
        margin-bottom: 15px;
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.04) 25%,
          rgba(0, 0, 0, 0.08) 50%,
          rgba(0, 0, 0, 0.04) 75%
        );
        background-size: 200% 100%;
        animation: quinsm-comment-skeleton 1.5s ease-in-out infinite;
        border-radius: 4px;
      }
      @keyframes quinsm-comment-skeleton {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .dark #theme-quinsm .comment-skeleton {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.03) 25%,
          rgba(255, 255, 255, 0.07) 50%,
          rgba(255, 255, 255, 0.03) 75%
        );
        background-size: 200% 100%;
      }

      /* 配置提示 / 排查指引暗色 */
      .dark #theme-quinsm .comment-notice code {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.75);
      }
      .dark #theme-quinsm .comment-notice details {
        color: rgba(255, 255, 255, 0.5);
      }
      .dark #theme-quinsm .comment-notice details summary {
        color: rgba(255, 255, 255, 0.65);
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

      /* Header 固定定位：白色背景 + 防止 Logo 溢出 */
      #theme-quinsm .metabar {
        overflow: hidden;
        background: #fff;
      }
      #theme-quinsm .surface-container {
        padding-top: 65px;
      }
      @media screen and (max-width: 640px) {
        #theme-quinsm .surface-container {
          padding-top: 55px;
        }
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
