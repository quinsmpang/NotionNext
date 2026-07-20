/**
 * 对 Notion 图片地址追加 WebP 格式参数，减少现代图片格式审计扣分
 * @param {string} src
 * @returns {string}
 */
export const toWebp = src => {
  if (!src || typeof src !== 'string') return src
  // 仅对已知可支持 format 参数的 Notion/S3 图片做转换，避免破坏本地/static 图片
  const isNotionImage =
    src.includes('www.notion.so/image') ||
    src.includes('prod-files-secure.s3.us-west-2.amazonaws.com')
  if (!isNotionImage) return src
  const sep = src.includes('?') ? '&' : '?'
  return `${src}${sep}format=webp`
}
