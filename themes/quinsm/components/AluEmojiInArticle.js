/**
 * 正文内阿鲁表情解析
 * 将文章正文中的 alu 快捷码（如 :smile:、:)、:D）解析为评论同款表情图片。
 * react-notion-x 不支持覆盖文本渲染器，故在 hydration 后对正文 DOM 的文本节点
 * 做一次原地替换（SSR 输出保持纯文本，不破坏首屏与 SEO）。
 *
 * 跳过区域：代码块 / 行内代码 / 链接 / 书签 / 图片包装，避免误伤代码与链接结构。
 */
import { useEffect } from 'react'
import {
  ALU_BASE,
  ALU_EMOJI_MAP,
  SORTED_SHORTCUTS
} from '../lib/aluEmoji'

// 这些容器内的文本不参与替换
const SKIP_SELECTOR =
  '.notion-code, pre, code, a, .notion-bookmark, .notion-asset-wrapper, .notion-callout-emoji'

// 按长度降序构建交替正则，长模式优先（与评论 convertTextToEmoji 行为一致）
const EMOJI_REGEX = new RegExp(
  SORTED_SHORTCUTS.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'g'
)
// 无 g 标记的测试副本（避免 lastIndex 副作用）
const EMOJI_TEST_REGEX = new RegExp(EMOJI_REGEX.source)

function replaceEmojiInTextNode(node) {
  const parent = node.parentNode
  const text = node.nodeValue
  const frag = document.createDocumentFragment()
  let lastIndex = 0
  EMOJI_REGEX.lastIndex = 0
  let match
  while ((match = EMOJI_REGEX.exec(text))) {
    if (match.index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
    }
    const img = document.createElement('img')
    img.className = 'alu-emoji'
    img.src = `${ALU_BASE}/${ALU_EMOJI_MAP[match[0]]}`
    img.alt = match[0]
    img.title = match[0]
    img.loading = 'lazy'
    img.decoding = 'async'
    frag.appendChild(img)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)))
  }
  if (frag.childNodes.length > 0) {
    parent.replaceChild(frag, node)
  }
}

export default function AluEmojiInArticle() {
  useEffect(() => {
    const root = document.getElementById('article-wrapper')
    if (!root) return

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const el = node.parentElement
        if (!el || el.closest(SKIP_SELECTOR)) {
          return NodeFilter.FILTER_REJECT
        }
        EMOJI_TEST_REGEX.lastIndex = 0
        return EMOJI_TEST_REGEX.test(node.nodeValue)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT
      }
    })

    const nodes = []
    while (walker.nextNode()) {
      nodes.push(walker.currentNode)
    }
    nodes.forEach(replaceEmojiInTextNode)
  }, [])

  return null
}
