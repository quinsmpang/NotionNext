import { siteConfig } from '@/lib/config'

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
      role='contentinfo'
    >
      <div className='site-info fontSmooth'>
        <p>
          <a href='/' title={siteConfig('TITLE')}>
            {siteConfig('TITLE')}
          </a>{' '}
          with <span className='cute iconfont icon-heart'></span>
        </p>
        <p>
          &copy;{`${copyrightDate}`} {siteConfig('AUTHOR')}. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
