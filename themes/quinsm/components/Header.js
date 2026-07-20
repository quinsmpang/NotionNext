import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { useQuinsmGlobal } from '..'

/**
 * 顶部 Metabar
 */
export default function Header(props) {
  const { siteInfo } = props
  const { searchModal } = useQuinsmGlobal()
  const originalLogo = siteConfig('QUINSM_LOGO_IMG', null, CONFIG)
  const isPngLogo = originalLogo.endsWith('.png')
  const retinaLogo = isPngLogo ? originalLogo.replace(/\.png$/, '@2x.png') : ''
  // 旧主题头部高度 65px；在移动端适当缩小，避免小屏下导航栏过高
  const logoSrcSet = retinaLogo
    ? `${originalLogo} 1x, ${retinaLogo} 2x`
    : undefined

  const handleSearch = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal?.current?.openSearch()
    } else {
      window.location.href = '/search'
    }
  }

  return (
    <header id='header-nav' className='metabar metabar--dark v-clearfix'>
      <div className='layoutSingleColumn layoutSingleColumn--wide fontSmooth'>
        <div className='metabar-block v-floatLeft'>
          <h1 className='site-title v-floatLeft'>
            <a href='/' title={siteConfig('TITLE')}>
              <img
                src={originalLogo}
                srcSet={logoSrcSet}
                alt={siteConfig('TITLE')}
                className='h-8 w-auto md:h-[65px]'
                width='264'
                height='65'
                decoding='async'
                fetchpriority='high'
              />
            </a>
          </h1>
        </div>
        <div className='metabar-block v-floatRight'>
          <div className='metabar-text'>
            <button
              className='button button--circle is-inSiteNavBar js-action'
              onClick={handleSearch}
              aria-label='Search'
            >
              <i className='iconfont icon-search'></i>
            </button>
            <a className='metabar-user-avatar js-action' href='/about'>
              <img
                alt={siteConfig('AUTHOR')}
                src={siteConfig('QUINSM_AUTHOR_AVATAR', null, CONFIG)}
                className='avatar avatar-32 photo'
                height='32'
                width='32'
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
