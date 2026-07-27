/**
 * 阿鲁表情数据模块
 * 来源：WordPress 插件 wp-alu-master/functions.php 中的 $wpsmiliestrans 映射
 */

const ALU_BASE = '/quinsm/alu'

// 表情图片文件名列表（用于选择器渲染）
const ALU_EMOJI_LIST = [
  { shortcut: ':mrgreen:', img: 'icon_mrgreen.gif' },
  { shortcut: ':neutral:', img: 'icon_neutral.gif' },
  { shortcut: ':twisted:', img: 'icon_twisted.gif' },
  { shortcut: ':arrow:', img: 'icon_arrow.gif' },
  { shortcut: ':shock:', img: 'icon_eek.gif' },
  { shortcut: ':smile:', img: 'icon_smile.gif' },
  { shortcut: ':???:', img: 'icon_confused.gif' },
  { shortcut: ':cool:', img: 'icon_cool.gif' },
  { shortcut: ':evil:', img: 'icon_evil.gif' },
  { shortcut: ':grin:', img: 'icon_biggrin.gif' },
  { shortcut: ':idea:', img: 'icon_idea.gif' },
  { shortcut: ':oops:', img: 'icon_redface.gif' },
  { shortcut: ':razz:', img: 'icon_razz.gif' },
  { shortcut: ':roll:', img: 'icon_rolleyes.gif' },
  { shortcut: ':wink:', img: 'icon_wink.gif' },
  { shortcut: ':cry:', img: 'icon_cry.gif' },
  { shortcut: ':eek:', img: 'icon_surprised.gif' },
  { shortcut: ':lol:', img: 'icon_lol.gif' },
  { shortcut: ':mad:', img: 'icon_mad.gif' },
  { shortcut: ':sad:', img: 'icon_sad.gif' },
  { shortcut: ':!:', img: 'icon_exclaim.gif' },
  { shortcut: ':?:', img: 'icon_question.gif' }
]

/**
 * 文本快捷键 → 图片文件名映射（按长度降序，保证长模式优先匹配）
 * 包含命名快捷码和 ASCII 表情符号
 */
function buildEmojiMap() {
  const map = {}
  for (const item of ALU_EMOJI_LIST) {
    map[item.shortcut] = item.img
  }
  // ASCII 表情符号（与 WordPress 插件完全对齐）
  const asciiMap = {
    '8-)': 'icon_cool.gif',
    '8-O': 'icon_eek.gif',
    ':-(': 'icon_sad.gif',
    ':-)': 'icon_smile.gif',
    ':-?': 'icon_confused.gif',
    ':-D': 'icon_biggrin.gif',
    ':-P': 'icon_razz.gif',
    ':-o': 'icon_surprised.gif',
    ':-x': 'icon_mad.gif',
    ':-|': 'icon_neutral.gif',
    ';-)': 'icon_wink.gif',
    '8O': 'icon_eek.gif',
    ':(': 'icon_sad.gif',
    ':)': 'icon_smile.gif',
    ':?': 'icon_confused.gif',
    ':D': 'icon_biggrin.gif',
    ':P': 'icon_razz.gif',
    ':o': 'icon_surprised.gif',
    ':x': 'icon_mad.gif',
    ':|': 'icon_neutral.gif',
    ';)': 'icon_wink.gif'
  }
  return { ...map, ...asciiMap }
}

const ALU_EMOJI_MAP = buildEmojiMap()

// 按长度降序排列的 shortcut 列表（长模式优先匹配）
const SORTED_SHORTCUTS = Object.keys(ALU_EMOJI_MAP).sort(
  (a, b) => b.length - a.length
)

/**
 * 转义正则特殊字符
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 将评论文本中的表情快捷码转换为 <img> 标签
 * @param {string} text - 原始文本（应已做 HTML 转义）
 * @returns {string} - 表情被替换为 img 标签的 HTML
 */
export function convertTextToEmoji(text) {
  if (!text) return ''
  // 先对 HTML 特殊字符转义
  let result = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  // 按长度降序替换（长模式优先）
  for (const shortcut of SORTED_SHORTCUTS) {
    const img = ALU_EMOJI_MAP[shortcut]
    const escaped = escapeRegex(shortcut)
    const regex = new RegExp(escaped, 'g')
    result = result.replace(
      regex,
      `<img class="alu-emoji" src="${ALU_BASE}/${img}" alt="${shortcut}" title="${shortcut}" />`
    )
  }

  return result
}

/**
 * 获取表情图片路径
 */
export function getEmojiSrc(shortcut) {
  const img = ALU_EMOJI_MAP[shortcut]
  return img ? `${ALU_BASE}/${img}` : null
}

export { ALU_BASE, ALU_EMOJI_LIST, ALU_EMOJI_MAP, SORTED_SHORTCUTS }
