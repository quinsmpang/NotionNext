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
 * Unicode emoji → alu 图标映射（情感相近）
 * 键为基础码点（不含 \uFE0F 变体选择符，匹配时自动兼容）
 * 未覆盖的 emoji（如 ZWJ 序列、肤色变体、无关符号）保持原样
 */
const EMOJI_ALU_MAP = {
  // 微笑 / 开心
  '😀': 'icon_smile.gif',
  '😃': 'icon_smile.gif',
  '😄': 'icon_smile.gif',
  '😊': 'icon_smile.gif',
  '🙂': 'icon_smile.gif',
  '😇': 'icon_mrgreen.gif',
  // 大笑 / 笑哭
  '😁': 'icon_biggrin.gif',
  '😆': 'icon_biggrin.gif',
  '😝': 'icon_biggrin.gif',
  '😂': 'icon_lol.gif',
  '🤣': 'icon_lol.gif',
  '🥳': 'icon_biggrin.gif',
  // 调皮 / 眨眼 / 吐舌
  '😉': 'icon_wink.gif',
  '😜': 'icon_wink.gif',
  '😋': 'icon_razz.gif',
  '😛': 'icon_razz.gif',
  '🤪': 'icon_razz.gif',
  '🤭': 'icon_mrgreen.gif',
  // 酷 / 得意
  '😎': 'icon_cool.gif',
  '🤓': 'icon_cool.gif',
  '🧐': 'icon_cool.gif',
  '😏': 'icon_mrgreen.gif',
  // 困惑 / 无语
  '🤔': 'icon_confused.gif',
  '🤨': 'icon_confused.gif',
  '🙃': 'icon_confused.gif',
  '😕': 'icon_confused.gif',
  '🙄': 'icon_rolleyes.gif',
  '😒': 'icon_rolleyes.gif',
  '😐': 'icon_neutral.gif',
  '😑': 'icon_neutral.gif',
  '😶': 'icon_neutral.gif',
  // 惊讶 / 震惊
  '😮': 'icon_surprised.gif',
  '😲': 'icon_surprised.gif',
  '😯': 'icon_surprised.gif',
  '😳': 'icon_redface.gif',
  '😦': 'icon_eek.gif',
  '😧': 'icon_eek.gif',
  '😨': 'icon_eek.gif',
  '😱': 'icon_eek.gif',
  '🤯': 'icon_eek.gif',
  // 难过 / 哭泣
  '😢': 'icon_cry.gif',
  '😭': 'icon_cry.gif',
  '😔': 'icon_sad.gif',
  '😞': 'icon_sad.gif',
  '😟': 'icon_sad.gif',
  '🙁': 'icon_sad.gif',
  '☹': 'icon_sad.gif',
  '😥': 'icon_sad.gif',
  '😓': 'icon_sad.gif',
  '😩': 'icon_sad.gif',
  '😫': 'icon_sad.gif',
  // 生气
  '😠': 'icon_mad.gif',
  '😡': 'icon_mad.gif',
  '🤬': 'icon_mad.gif',
  '😤': 'icon_mad.gif',
  '😖': 'icon_mad.gif',
  '😾': 'icon_mad.gif',
  // 邪恶
  '😈': 'icon_evil.gif',
  '👿': 'icon_evil.gif',
  '💀': 'icon_evil.gif',
  '👹': 'icon_evil.gif',
  // 心动 / 脸红
  '😍': 'icon_redface.gif',
  '🥰': 'icon_redface.gif',
  '😘': 'icon_redface.gif',
  '🥺': 'icon_redface.gif',
  // 其他
  '💡': 'icon_idea.gif',
  '❓': 'icon_question.gif',
  '❔': 'icon_question.gif',
  '❗': 'icon_exclaim.gif',
  '❕': 'icon_exclaim.gif',
  '‼': 'icon_exclaim.gif',
  '⁉': 'icon_exclaim.gif'
}

// 未映射 emoji 的兜底图标（保证任何 emoji 都不以原生形式残留）
const FALLBACK_ALU_IMG = 'icon_smile.gif'

// Unicode emoji 主要区段（不含常规符号区：箭头 U+2190-21FF、©®™ 等，避免误伤正文符号）
const EMOJI_CHARS = '\\u{1F000}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{2B00}-\\u{2BFF}'

/**
 * 通用 emoji 匹配源字符串：
 * 区域指示符对（国旗）优先，其次单字符 + 变体选择符 + ZWJ 序列 + 肤色修饰
 * 供正文组件拼入 alternation 正则（需 u flag）
 */
const GENERIC_EMOJI_SRC = `(?:[\\u{1F1E6}-\\u{1F1FF}]{2}|[${EMOJI_CHARS}](?:\\u{FE0F})?(?:\\u{200D}[${EMOJI_CHARS}](?:\\u{FE0F})*)*(?:[\\u{1F3FB}-\\u{1F3FF}])?)`

const GENERIC_EMOJI_REGEX = new RegExp(GENERIC_EMOJI_SRC, 'gu')

/**
 * 解析快捷码/emoji 对应的图片路径
 * 未映射的 emoji 使用兜底图标，保证渲染层不残留任何原生 emoji
 */
function resolveEmojiImg(shortcut) {
  const key = String(shortcut || '').replace(/\uFE0F$/g, '')
  return `${ALU_BASE}/${ALU_EMOJI_MAP[key] || FALLBACK_ALU_IMG}`
}

// 判断是否为 Unicode emoji（含代理对或符号区），用于追加变体选择符兼容
function isUnicodeEmoji(shortcut) {
  return /[\uD800-\uDBFF\u2190-\u2BFF]/.test(shortcut)
}

/**
 * 生成单个快捷码的匹配模式
 * Unicode emoji 后追加可选的 \uFE0F 变体选择符（如 😄️ 与 😄 都匹配）
 */
function buildShortcutPattern(shortcut) {
  const escaped = escapeRegex(shortcut)
  return isUnicodeEmoji(shortcut) ? `${escaped}\\uFE0F?` : escaped
}

/**
 * 文本快捷键 → 图片文件名映射（按长度降序，保证长模式优先匹配）
 * 包含命名快捷码、ASCII 表情符号和 Unicode emoji
 */
function buildEmojiMap() {
  const map = {}
  for (const item of ALU_EMOJI_LIST) {
    map[item.shortcut] = item.img
  }
  Object.assign(map, EMOJI_ALU_MAP)
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
  // 确保输入为字符串并转义 HTML 特殊字符
  let result = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  // 按长度降序替换（长模式优先）；emoji 键的 alt/title 留空，
  // 避免图片加载失败时兜底显示原生 emoji
  for (const shortcut of SORTED_SHORTCUTS) {
    const img = ALU_EMOJI_MAP[shortcut]
    const label = isUnicodeEmoji(shortcut) ? '' : shortcut
    const regex = new RegExp(buildShortcutPattern(shortcut), 'g')
    result = result.replace(
      regex,
      `<img class="alu-emoji" src="${ALU_BASE}/${img}" alt="${label}" title="${label}" />`
    )
  }

  // 兜底：替换所有未映射的 Unicode emoji，不残留任何原生 emoji
  result = result.replace(GENERIC_EMOJI_REGEX, match =>
    `<img class="alu-emoji" src="${resolveEmojiImg(match)}" alt="" />`
  )
  return result
}

/**
 * 获取表情图片路径（自动兼容 emoji 尾部的 \uFE0F 变体选择符）
 */
export function getEmojiSrc(shortcut) {
  const key = String(shortcut || '').replace(/\uFE0F$/g, '')
  const img = ALU_EMOJI_MAP[key]
  return img ? `${ALU_BASE}/${img}` : null
}

export {
  ALU_BASE,
  ALU_EMOJI_LIST,
  ALU_EMOJI_MAP,
  EMOJI_ALU_MAP,
  FALLBACK_ALU_IMG,
  GENERIC_EMOJI_SRC,
  GENERIC_EMOJI_REGEX,
  SORTED_SHORTCUTS,
  buildShortcutPattern,
  isUnicodeEmoji,
  resolveEmojiImg
}
