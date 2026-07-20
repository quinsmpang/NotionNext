const fs = require('fs')
const path = require('path')
const csso = require('csso')

const cssPath = path.resolve(__dirname, '../public/quinsm/quinsm.css')
const outPath = path.resolve(__dirname, '../public/quinsm/quinsm.min.css')

const rawCss = fs.readFileSync(cssPath, 'utf8')

// 压缩
let css = csso.minify(rawCss).css

// 为缺少 font-display 的 @font-face 补充 font-display: optional，保留已存在值
css = css.replace(/(@font-face\s*\{[^}]*\})/g, (match) => {
  if (match.includes('font-display')) return match
  return match.replace(/\}$/, ';font-display:optional}')
})

// 提升文本对比度：将常见浅灰色加深
// 注意：替换顺序要从浅到深，避免重复替换
const contrastMap = [
  [/rgba\(0,\s*0,\s*0,\s*0\.3\)/g, 'rgba(0,0,0,0.6)'],
  [/rgba\(0,\s*0,\s*0,\s*0\.44\)/g, 'rgba(0,0,0,0.7)'],
  [/rgba\(0,\s*0,\s*0,\s*0\.6\)/g, 'rgba(0,0,0,0.75)'],
  [/rgba\(0,\s*0,\s*0,\s*0\.66\)/g, 'rgba(0,0,0,0.8)']
]

contrastMap.forEach(([regex, replacement]) => {
  css = css.replace(regex, replacement)
})

// 再次压缩确保没有冗余
css = csso.minify(css).css

// 把关键布局覆盖追加到渲染阻塞的 CSS 末尾，避免主题原 inline-block + letter-spacing
// 在首次 paint 时造成换行与整体 #theme-quinsm 布局偏移
const layoutOverride = `#theme-quinsm{min-height:100vh;display:flex;flex-direction:column}#theme-quinsm .metabar{position:fixed}#theme-quinsm .surface-container{flex:1}#theme-quinsm .layoutMultiColumn-container{display:flex;flex-wrap:nowrap;align-items:flex-start;letter-spacing:0}#theme-quinsm .layoutMultiColumn{display:block;box-sizing:border-box;position:relative;vertical-align:top;letter-spacing:0}#theme-quinsm .layoutMultiColumn--primary{flex:0 0 70%;max-width:70%;width:auto}#theme-quinsm .layoutMultiColumn--secondary{flex:0 0 30%;max-width:30%;padding-left:40px;box-sizing:border-box}@media screen and (max-width:1180px){#theme-quinsm .layoutMultiColumn-container{flex-direction:column}#theme-quinsm .layoutMultiColumn--primary,#theme-quinsm .layoutMultiColumn--secondary{flex:0 0 auto;max-width:100%;width:100%;padding-left:0}}`

css += layoutOverride

fs.writeFileSync(outPath, css)
console.log('Minified CSS:', cssPath, '->', outPath)
console.log('Original:', rawCss.length, 'chars -> Minified:', css.length, 'chars')
