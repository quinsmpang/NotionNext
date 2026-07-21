import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { createContext, useContext, useEffect, useRef } from 'react'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

import BlogListPage from './components/BlogListPage'
const BlogListScroll = dynamic(() => import('./components/BlogListScroll'), {
  ssr: false
})
const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), {
  ssr: false
})
const ArticleLock = dynamic(() => import('./components/ArticleLock'), {
  ssr: false
})
import ArticleInfo from './components/ArticleInfo'
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), {
  ssr: false
})
const ShareBar = dynamic(() => import('@/components/ShareBar'), { ssr: false })
import Header from './components/Header'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), {
  ssr: false
})
const SearchInput = dynamic(() => import('./components/SearchInput'), {
  ssr: false
})
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), {
  ssr: false
})

const ThemeGlobalQuinsm = createContext()
export const useQuinsmGlobal = () => useContext(ThemeGlobalQuinsm)

/**
 * 基础布局：只提供外层、头部、脚部、搜索、回到顶部
 */
const LayoutBase = props => {
  const { children } = props
  const searchModal = useRef(null)

  return (
    <ThemeGlobalQuinsm.Provider value={{ searchModal }}>
      <div
        id='theme-quinsm'
        className={`${siteConfig('FONT_STYLE')} site-main`}
      >
        <Style />
        <Header {...props} />
        <div className='surface-container'>{children}</div>
        <Footer {...props} />
        <JumpToTopButton />
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalQuinsm.Provider>
  )
}

/**
 * 两栏内容区（主栏 + 右侧边栏）
 */
const TwoColumnLayout = props => {
  const { children } = props

  return (
    <div className='layoutMultiColumn-container fontSmooth'>
      <div className='layoutMultiColumn layoutMultiColumn--primary'>
        {children}
      </div>
      <aside className='layoutMultiColumn layoutMultiColumn--secondary'>
        <SideBar {...props} />
      </aside>
    </div>
  )
}

/**
 * 博客首页
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  return (
    <TwoColumnLayout {...props}>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </TwoColumnLayout>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [keyword])

  const slotTop = siteConfig('ALGOLIA_APP_ID') ? null : (
    <SearchInput {...props} />
  )

  return (
    <TwoColumnLayout {...props}>
      <div className='layoutMultiColumn-header hero hero--underline fontSmooth'>
        <h2 className='hero-title'>Search</h2>
      </div>
      {slotTop}
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </TwoColumnLayout>
  )
}

/**
 * 归档页
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <TwoColumnLayout {...props}>
      <div className='layoutMultiColumn-header hero hero--underline fontSmooth'>
        <h2 className='hero-title'>归档</h2>
      </div>
      <div className='blockSmall blockGroup fontSmooth'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </TwoColumnLayout>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props

  return (
    <div className='layoutSingleColumn layoutSingleColumn--wide fontSmooth'>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && post && (
        <>
          <div className='layoutSingleColumn--main'>
            <article className='postArticle'>
              <ArticleInfo post={post} />
              <div
                id='article-wrapper'
                className='entry-content'
                itemProp='articleBody'
              >
                <NotionPage post={post} />
              </div>
              <div className='postFooter-ad v-textAlignCenter v-overflowHidden'>
                <AdSlot type='in-article' />
              </div>
              <div className='supplementalPostContent v-overflowHidden'>
                <div
                  className='post-bottom-notice fontSmooth'
                  dangerouslySetInnerHTML={{
                    __html: siteConfig(
                      'QUINSM_POST_BOTTOM_NOTICE',
                      null,
                      CONFIG
                    )
                  }}
                />
                <ShareBar post={post} />
              </div>
              {post?.type === 'Post' && (
                <>
                  <ArticleAround prev={prev} next={next} />
                  <RecommendPosts recommendPosts={recommendPosts} />
                </>
              )}
              <Comment frontMatter={post} />
            </article>
          </div>
          <div className='layoutSingleColumn--sidebar'>
            <div className='sidebar-wrapper fontSmooth'>
              <div className='infoCard-info'>
                <div className='infoCard-avatar'>
                  <img
                    alt={siteConfig('AUTHOR')}
                    src={siteConfig('QUINSM_AUTHOR_AVATAR', null, CONFIG)}
                    className='avatar avatar-74 photo'
                    height='74'
                    width='74'
                  />
                </div>
                <div className='infoCard-wrapper'>
                  <h3 className='infoCard-title'>{siteConfig('AUTHOR')}</h3>
                  <div
                    className='infoCard-bio'
                    dangerouslySetInnerHTML={{
                      __html: siteConfig('BIO') || ''
                    }}
                  />
                </div>
                {post?.publishDay && (
                  <div className='post--time' itemProp='datePublished'>
                    发表于 {post.publishDay}
                  </div>
                )}
              </div>
              {post?.category && (
                <div className='infoCard-info infoCard-category'>
                  <div className='infoCard-wrapper'>
                    <h3 className='infoCard-title'>
                      <a href={`/category/${post.category}`}>{post.category}</a>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <div className='layoutSingleColumn layoutSingleColumn--wide fontSmooth v-textAlignCenter'>
      <div className='hairline'>404 Not Found</div>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <TwoColumnLayout {...props}>
      <div className='layoutMultiColumn-header hero hero--underline fontSmooth'>
        <h2 className='hero-title'>分类</h2>
      </div>
      <div className='blockSmall blockGroup fontSmooth'>
        {categoryOptions?.map(category => (
          <article
            key={category.name}
            className='block block--inset block--list block--withoutImage'
          >
            <div className='block-content'>
              <h2 className='block-title'>
                <a href={`/category/${category.name}`}>{category.name}</a>
              </h2>
              <div className='block-snippet block-snippet--subtitle'>
                共 {category.count} 篇文章
              </div>
            </div>
          </article>
        ))}
      </div>
    </TwoColumnLayout>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <TwoColumnLayout {...props}>
      <div className='layoutMultiColumn-header hero hero--underline fontSmooth'>
        <h2 className='hero-title'>标签</h2>
      </div>
      <div className='tag-items fontSmooth'>
        {tagOptions?.map(tag => (
          <a
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className='tag-item'
            title={`${tag.name} (${tag.count})`}
          >
            <span>
              {tag.name}
              {tag.count ? ` (${tag.count})` : ''}
            </span>
          </a>
        ))}
      </div>
    </TwoColumnLayout>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
