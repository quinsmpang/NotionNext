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
  // 使用原始 logo 尺寸（264x65），与旧主题头部 65px 高度保持一致
  // 旧主题没有提供高 DPR 适配图，直接用原图避免 1x/2x 图被强制放大
  const logoSrc = originalLogo

  const handleSearch = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal?.current?.openSearch()
    } else {
      window.location.href = '/search'
    }
  }

  return (
    <header
      id='header-nav'
      className='metabar metabar--dark v-clearfix'>
      <div className='layoutSingleColumn layoutSingleColumn--wide fontSmooth'>
        <div className='metabar-block v-floatLeft'>
          <h1 className='site-title v-floatLeft'>
            <a href='/' title={siteConfig('TITLE')}>
              <img
                src={logoSrc}
                alt={siteConfig('TITLE')}
                className='h-[65px] w-auto'
                width='264'
                height='65'
                decoding='async'
              />
            </a>
          </h1>
        </div>
        <div className='metabar-block v-floatRight'>
          <div className='metabar-text'>
            <button
              className='button button--circle is-inSiteNavBar js-action'
              onClick={handleSearch}
              aria-label='Search'>
              <i className='iconfont icon-search'></i>
            </button>
            <a
              className='metabar-user-avatar js-action'
              href='/about'>
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
