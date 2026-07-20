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

      ${themeConsoleStyle('quinsm', CONFIG)}
    `}</style>
  )
}

export { Style }
