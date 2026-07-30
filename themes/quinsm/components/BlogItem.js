import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

/**
 * 首页文章列表项（严格对齐旧主题 Pure 三段式结构）
 */
export default function BlogItem(props) {
  const { post } = props
  const { locale } = useGlobal()
  const accessibleTitle = post.title || post.summary || post.slug || 'Untitled'
  const publishTime = post.date?.start_date || post.createdTime
  const showCover = siteConfig('QUINSM_POST_COVER_ENABLE', true, CONFIG)
  const coverImage = showCover ? post?.pageCoverThumbnail : null

  return (
    <article
      className='block block--inset block--list homePost'
      itemType='http://schema.org/Article'
      itemScope='itemscope'
    >
      <div className='block-postMeta v-overflowHidden'>
        <div className='v-alignLeft'>
          <time
            className='postMetaInline--supplemental'
            dateTime={post.date?.start_date || undefined}
          >
            {publishTime}
          </time>
        </div>
      </div>

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
        {post.summary && (
          <div
            className='block-snippet block-snippet--subtitle'
            itemProp='about'
          >
            {post.summary}
          </div>
        )}
      </div>

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
