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
  const logoSrc1x = originalLogo.replace(/\.png$/i, '@1x.png')
  const logoSrc2x = originalLogo.replace(/\.png$/i, '@2x.png')

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
                src={logoSrc1x}
                srcSet={`${logoSrc1x} 1x, ${logoSrc2x} 2x`}
                alt={siteConfig('TITLE')}
                className='h-8 w-auto'
                width='130'
                height='32'
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
