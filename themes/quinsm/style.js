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
        margin-bottom: 1.75rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
      #theme-quinsm .entry-title {
        font-size: clamp(1.8rem, 4vw, 2.2rem);
        line-height: 1.28;
        font-weight: 700;
        letter-spacing: -0.025em;
        margin-bottom: 0.65rem;
        color: inherit;
      }
      #theme-quinsm .entry-meta {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.48);
      }
      #theme-quinsm .entry-meta a {
        color: inherit;
        text-decoration: none;
      }
      #theme-quinsm .entry-meta a:hover {
        color: #f3a500;
      }
      #theme-quinsm .entry-metaDivider {
        color: rgba(0, 0, 0, 0.22);
      }

      /* 内容页：保持舒展阅读宽度，同时收紧段落与标题节奏 */
      #theme-quinsm .postArticle {
        padding-top: 38px;
      }
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
        line-height: 1.72;
        color: rgba(0, 0, 0, 0.78);
      }
      #theme-quinsm .notion-text {
        margin: 0 0 0.65em;
      }
      #theme-quinsm .notion-h {
        font-family: inherit;
        color: rgba(0, 0, 0, 0.88);
        letter-spacing: -0.015em;
      }
      #theme-quinsm .notion-h1,
      #theme-quinsm .notion-h2 {
        margin-top: 1.9em;
        margin-bottom: 0.65em;
      }
      #theme-quinsm .notion-h3 {
        margin-top: 1.55em;
        margin-bottom: 0.55em;
      }
      #theme-quinsm .notion-list {
        margin-block: 0.25em;
      }
      #theme-quinsm .notion-quote {
        margin: 1rem 0;
        padding: 0.7rem 1rem;
        border-left: 3px solid #f3a500;
        background: rgba(243, 165, 0, 0.055);
        color: rgba(0, 0, 0, 0.68);
      }
      #theme-quinsm .notion-callout {
        margin: 1rem 0;
        border-radius: 8px;
      }
      #theme-quinsm .notion-asset-wrapper img,
      #theme-quinsm .notion-asset-wrapper iframe {
        max-width: 100%;
        height: auto;
      }
      #theme-quinsm .notion-asset-wrapper img {
        border-radius: 8px;
      }
      #theme-quinsm .notion-asset-wrapper {
        margin-top: 1rem;
        margin-bottom: 1.1rem;
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
        margin: 1rem 0;
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

      /* 首页文章列表：保留原主题的标题上方横幅图布局 */
      #theme-quinsm .homeGroup {
        padding-top: 0;
      }
      #theme-quinsm .homePost {
        padding: 42px 0;
      }
      #theme-quinsm .homePost .block-streamText .b-image {
        display: block;
        width: 100%;
        height: 210px;
        object-fit: cover;
        padding-top: 16px;
      }
      #theme-quinsm .homePost .block-postMeta {
        color: rgba(0, 0, 0, 0.46);
        font-size: 12px;
        line-height: 1.4;
      }
      #theme-quinsm .homePost .block-streamText .block-title {
        margin-top: 16px;
        margin-bottom: 4px;
      }
      #theme-quinsm .homePost .block-snippet {
        color: rgba(0, 0, 0, 0.7);
      }
      #theme-quinsm .homePost .postMeta-previewFooter {
        margin-top: 6px;
      }
      @media screen and (max-width: 640px) {
        #theme-quinsm .homeGroup {
          padding-top: 0;
        }
        #theme-quinsm .homePost {
          padding: 25px 0;
        }
        #theme-quinsm .homePost .block-streamText .b-image {
          height: 140px;
        }
        #theme-quinsm .homePost .block-streamText .block-title {
          margin-top: 14px;
          font-size: 18px;
        }
        #theme-quinsm .postArticle {
          padding-top: 28px;
        }
        #theme-quinsm .entry-header {
          margin-bottom: 1.35rem;
        }
      }

      /* 暗色模式 */
      .dark #theme-quinsm .entry-header {
        border-color: rgba(255, 255, 255, 0.09);
      }
      .dark #theme-quinsm .entry-meta,
      .dark #theme-quinsm .homePost .block-postMeta {
        color: rgba(255, 255, 255, 0.48);
      }
      .dark #theme-quinsm .entry-metaDivider {
        color: rgba(255, 255, 255, 0.2);
      }
      .dark #theme-quinsm .notion {
        color: rgba(255, 255, 255, 0.78);
      }
      .dark #theme-quinsm .notion-h {
        color: rgba(255, 255, 255, 0.9);
      }
      .dark #theme-quinsm .notion-quote {
        background: rgba(243, 165, 0, 0.08);
        color: rgba(255, 255, 255, 0.7);
      }
      .dark #theme-quinsm .homePost .block-snippet {
        color: rgba(255, 255, 255, 0.64);
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

      /* 评论表单 */
      #theme-quinsm .responsesWrapper {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }
      #theme-quinsm .quinsm-comment-form {
        width: 100%;
      }
      #theme-quinsm .quinsm-comment-form .comment-form-comment {
        margin: 0 0 10px;
      }
      #theme-quinsm .quinsm-comment-textarea {
        display: block;
        width: 100%;
        min-height: 136px;
        box-sizing: border-box;
        padding: 13px 15px;
        resize: vertical;
        border: 1px solid rgba(0, 0, 0, 0.16);
        border-radius: 6px;
        background: #fff;
        color: rgba(0, 0, 0, 0.78);
        font: inherit;
        line-height: 1.7;
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
      }
      #theme-quinsm .quinsm-comment-textarea:focus,
      #theme-quinsm .quinsm-comment-input:focus {
        border-color: #f3a500;
        box-shadow: 0 0 0 3px rgba(243, 165, 0, 0.1);
      }
      #theme-quinsm .quinsm-comment-fields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-top: 14px;
      }
      #theme-quinsm .quinsm-comment-fields .comment-form-input {
        display: flex;
        flex-direction: column-reverse;
        gap: 6px;
        min-width: 0;
        margin: 0;
      }
      #theme-quinsm .comment-form-input label {
        position: static;
        padding: 0;
        background: transparent;
        color: rgba(0, 0, 0, 0.58);
        font-size: 12px;
        line-height: 1.4;
      }
      #theme-quinsm .quinsm-comment-input {
        display: block;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding: 9px 12px;
        border: 1px solid rgba(0, 0, 0, 0.16);
        border-radius: 6px;
        background: #fff;
        color: rgba(0, 0, 0, 0.78);
        font: inherit;
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
      }
      #theme-quinsm .quinsm-comment-form .form-submit {
        margin: 16px 0 0;
      }
      #theme-quinsm .quinsm-comment-form #submit {
        min-width: 96px;
        height: 40px;
        padding: 0 18px;
        border-radius: 5px;
        background: #f3a500;
        color: #fff;
        font-size: 13px;
        transition:
          opacity 0.2s ease,
          transform 0.2s ease;
      }
      #theme-quinsm .quinsm-comment-form #submit:hover:not(:disabled) {
        opacity: 0.88;
        transform: translateY(-1px);
      }
      #theme-quinsm .quinsm-comment-form #submit:disabled {
        cursor: not-allowed;
        opacity: 0.55;
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
      .dark #theme-quinsm .responsesWrapper {
        border-top-color: rgba(255, 255, 255, 0.09);
      }
      .dark #theme-quinsm .comment-form-input label {
        background: transparent;
        color: rgba(255, 255, 255, 0.65);
      }
      .dark #theme-quinsm .quinsm-comment-input,
      .dark #theme-quinsm .quinsm-comment-textarea {
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
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        margin: 0;
        padding: 2px 0 10px;
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
        transition:
          transform 0.15s ease,
          border-color 0.15s ease;
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

      @media screen and (max-width: 640px) {
        #theme-quinsm .responsesWrapper {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
        }
        #theme-quinsm .quinsm-comment-textarea {
          min-height: 120px;
        }
        #theme-quinsm .quinsm-comment-fields {
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
        }
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
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
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
