import { useGlobal } from '@/lib/global'
import { useRef } from 'react'

/**
 * 文章密码保护
 */
export default function ArticleLock({ validPassword }) {
  const { locale } = useGlobal()
  const passwordRef = useRef('')

  const submitPassword = () => {
    validPassword(passwordRef.current.value)
  }

  return (
    <div className='layoutSingleColumn layoutSingleColumn--wide fontSmooth'>
      <div className='entry-content'>
        <div className='post-bottom-notice'>{locale.ARTICLE.LOCKED_TIPS}</div>
        <p className='comment-form-input'>
          <input
            ref={passwordRef}
            type='password'
            className='inputGroup'
            placeholder={locale.COMMON.PASSWORD}
          />
        </p>
        <div
          className='inputSubmit js-action v-cursorPointer'
          onClick={submitPassword}>
          <span className='inputSubmit-inset'>{locale.COMMON.SUBMIT}</span>
        </div>
      </div>
    </div>
  )
}
