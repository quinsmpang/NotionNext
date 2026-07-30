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
      className={`block block--inset block--list homePost${coverImage ? '' : ' homePost--withoutCover'}`}
      itemType='http://schema.org/Article'
      itemScope='itemscope'
    >
      {coverImage && (
        <a
          className='homePost-cover'
          href={post.href}
          aria-label={accessibleTitle}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className='b-image' src={coverImage} alt={accessibleTitle} />
        </a>
      )}
      <div className='homePost-body'>
        <div className='block-postMeta'>
          <time dateTime={post.date?.start_date || undefined}>
            {publishTime}
          </time>
          {post.category && (
            <>
              <span className='homePost-metaDivider' aria-hidden='true'>
                /
              </span>
              <a href={`/category/${encodeURIComponent(post.category)}`}>
                {post.category}
              </a>
            </>
          )}
        </div>
        <div className='block-streamText'>
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
          <a className='link link--accent cute' href={post.href}>
            {locale.COMMON.READ_MORE || 'Continue reading'}
            <span aria-hidden='true'> →</span>
          </a>
        </div>
      </div>
    </article>
  )
}
