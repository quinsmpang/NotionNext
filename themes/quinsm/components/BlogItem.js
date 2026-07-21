import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { toWebp } from '../lib/toWebp'

/**
 * 首页文章列表项（严格对齐旧主题 Pure 三段式结构）
 */
export default function BlogItem(props) {
  const { post } = props
  const { locale } = useGlobal()
  const accessibleTitle = post.title || post.summary || post.slug || 'Untitled'
  const publishTime = post.date?.start_date || post.createdTime
  const coverImage = post?.pageCoverThumbnail
    ? toWebp(post.pageCoverThumbnail)
    : null

  return (
    <article
      className='block block--inset block--list'
      itemType='http://schema.org/Article'
      itemScope='itemscope'
    >
      {/* 顶部作者/时间元信息 */}
      <div className='block-postMeta v-overflowHidden'>
        <div className='v-alignLeft'>
          <div className='postMetaInline-feedSummary'>
            <a
              className='link link--accent link--darken'
              href='/'
              title={`Go to the profile of ${siteConfig('AUTHOR')}`}
            >
              {siteConfig('AUTHOR')}
            </a>
            <span className='postMetaInline postMetaInline--supplemental'>
              {publishTime}
            </span>
          </div>
        </div>
        <div className='v-alignRight'></div>
      </div>

      {/* 标题与摘要：旧主题把文章首图放在标题上方 */}
      <div className='block-streamText'>
        {coverImage && (
          <a href={post.href} aria-label={accessibleTitle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='b-image' src={coverImage} alt={accessibleTitle} />
          </a>
        )}
        <h2 className='block-title' itemProp='headline'>
          <a href={post.href} aria-label={accessibleTitle}>
            {accessibleTitle}
          </a>
        </h2>
        <div className='block-snippet block-snippet--subtitle' itemProp='about'>
          {post.summary}
        </div>
      </div>

      {/* 底部阅读更多 */}
      <div className='block-postMeta postMeta-previewFooter'>
        <div className='v-alignLeft'>
          <a className='link link--accent cute' href={post.href}>
            {locale.COMMON.READ_MORE || 'Continue reading'}
          </a>
          <span className='middotDivider'></span>
        </div>
      </div>
    </article>
  )
}
