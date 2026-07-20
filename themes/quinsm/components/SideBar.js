import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

/**
 * 侧边栏
 */
export default function SideBar(props) {
  const { latestPosts, tagOptions, customMenu, notice } = props
  const { locale } = useGlobal()

  let navLinks = []
  if (customMenu && siteConfig('CUSTOM_MENU')) {
    navLinks = customMenu.filter(item => item && item.show !== false)
  } else {
    navLinks = [
      { name: locale.NAV.INDEX, href: '/', show: true },
      {
        name: locale.NAV.ARCHIVE,
        href: '/archive',
        show: siteConfig('QUINSM_MENU_ARCHIVE', true, CONFIG)
      },
      {
        name: locale.COMMON.CATEGORY,
        href: '/category',
        show: siteConfig('QUINSM_MENU_CATEGORY', true, CONFIG)
      },
      {
        name: locale.COMMON.TAGS,
        href: '/tag',
        show: siteConfig('QUINSM_MENU_TAG', true, CONFIG)
      },
      { name: '留言板', href: '/guestbook', show: true },
      {
        name: locale.NAV.SEARCH,
        href: '/search',
        show: siteConfig('QUINSM_MENU_SEARCH', true, CONFIG)
      }
    ].filter(item => item.show)
  }

  const hotPosts = latestPosts?.slice(0, 5) || []
  const tags = tagOptions?.slice(0, 20) || []

  return (
    <div className='js-sidebarWrapper'>
      {siteConfig('QUINSM_SIDEBAR_NAV', true, CONFIG) && (
        <aside className='widget widget_text'>
          <h3 className='widget-title'>
            <span className='widget-title-inner'>
              {locale.NAV.INDEX || '导航'}
            </span>
          </h3>
          <div className='textwidget'>
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.href}>
                {link.name}
                <br />
              </a>
            ))}
            <a href='/guestbook'>留言板</a>
            <br />
          </div>
        </aside>
      )}

      {siteConfig('QUINSM_SIDEBAR_HOT_POSTS', true, CONFIG) &&
        hotPosts.length > 0 && (
          <aside className='widget widget_hit-posts'>
            <h3 className='widget-title'>
              <span className='widget-title-inner'>
                {locale.COMMON.LATEST_POSTS || '最新文章'}
              </span>
            </h3>
            <ul className='list list--withIcon'>
              {hotPosts.map((post, idx) => (
                <li key={post.id} className='list-item'>
                  <a href={post.href}>
                    <button className='button button--circle u-disablePointerEvents'>
                      <span className='list-index'>{idx + 1}</span>
                    </button>
                  </a>
                  <div className='list-itemInfo'>
                    <h4 className='list-itemTitle'>
                      <a href={post.href}>{post.title}</a>
                    </h4>
                    <p className='list-itemDescription'>
                      {siteConfig('AUTHOR')} /{' '}
                      {post.date?.start_date || post.createdTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        )}

      {siteConfig('QUINSM_SIDEBAR_TAGS', true, CONFIG) && tags.length > 0 && (
        <aside className='widget widget_hot_tags'>
          <h3 className='widget-title'>
            <span className='widget-title-inner'>
              {locale.COMMON.TAGS || '标签'}
            </span>
          </h3>
          <div className='tag-items'>
            {tags.map(tag => (
              <a
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className='tag-item'
                title={`${tag.name} (${tag.count || 0})`}
              >
                <span>{tag.name}</span>
              </a>
            ))}
          </div>
        </aside>
      )}
    </div>
  )
}
