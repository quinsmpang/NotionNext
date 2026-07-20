import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * 搜索输入
 */
export default function SearchInput() {
  const { locale } = useGlobal()
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const onKeyUp = e => {
    if (e.keyCode === 13 && keyword) {
      router.push({ pathname: '/search/' + encodeURIComponent(keyword) })
    }
  }

  return (
    <div className='widget widget_text fontSmooth'>
      <h3 className='widget-title'>
        <span className='widget-title-inner'>{locale.NAV.SEARCH || '搜索'}</span>
      </h3>
      <div className='textwidget'>
        <input
          type='text'
          className='textInput textInput--singleLine'
          placeholder={locale.NAV.SEARCH || 'Search...'}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  )
}
