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
  const footerText =
    siteConfig('QUINSM_FOOTER_TEXT', null, CONFIG) ||
    `${siteConfig('TITLE')} with <span class="cute iconfont icon-heart"></span>`
  const footerCopyright =
    siteConfig('QUINSM_FOOTER_COPYRIGHT', null, CONFIG) ||
    `&copy;${copyrightDate} ${siteConfig('AUTHOR')}. All rights reserved.`

  return (
    <footer
      id='bentoHomepageFooter'
      className='layoutSingleColumn layoutSingleColumn--wide footer v-bentoHomepageFooter'
      role='contentinfo'
    >
      <div className='site-info fontSmooth'>
        <p dangerouslySetInnerHTML={{ __html: footerText }} />
        <p dangerouslySetInnerHTML={{ __html: footerCopyright }} />
      </div>
    </footer>
  )
}
