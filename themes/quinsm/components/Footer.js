import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 页脚
 */
export default function Footer() {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer
      id='bentoHomepageFooter'
      className='layoutSingleColumn layoutSingleColumn--wide footer v-bentoHomepageFooter'
      role='contentinfo'>
      <div className='site-info fontSmooth'>
        <p
          dangerouslySetInnerHTML={{
            __html: siteConfig('QUINSM_FOOTER_TEXT', null, CONFIG)
          }}
        />
        <p>
          &copy;{`${copyrightDate}`} {siteConfig('AUTHOR')}.{' '}
          {siteConfig('QUINSM_FOOTER_COPYRIGHT', null, CONFIG)}
        </p>
      </div>
    </footer>
  )
}
