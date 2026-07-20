import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

/**
 * 目录（简单实现：从 notion 渲染后的 h2/h3 抓取）
 */
export default function Catalog() {
  const { locale } = useGlobal()
  const [toc, setToc] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const headers = Array.from(
      document.querySelectorAll('#notion-article h2, #notion-article h3')
    )
    const items = headers.map((el, idx) => {
      if (!el.id) el.id = 'toc-' + idx
      return {
        id: el.id,
        text: el.innerText,
        level: el.tagName === 'H2' ? 2 : 3
      }
    })
    setToc(items)
  }, [])

  if (toc.length === 0) return null

  return (
    <aside className='widget widget_text'>
      <h3 className='widget-title'>
        <span className='widget-title-inner'>{locale.COMMON.TABLE_OF_CONTENTS || '目录'}</span>
      </h3>
      <ul className='list list--withIcon'>
        {toc.map((item, idx) => (
          <li key={idx} className='list-item' style={{ paddingLeft: item.level === 3 ? '1em' : '0' }}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
