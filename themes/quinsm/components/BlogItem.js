import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { toWebp } from '../lib/toWebp'

/**
 * 首页文章列表项
 */
export default function BlogItem(props) {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showCover = siteConfig('QUINSM_POST_COVER_ENABLE', true, CONFIG)
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap
  const accessibleTitle = post.title || post.summary || post.slug || 'Untitled'

  return (
    <article className='block block--inset block--list'>
      {showCover && post?.pageCoverThumbnail && (
        <a
          className='block-image effect-apollo'
          href={post.href}
          aria-label={accessibleTitle}
          style={{
            backgroundImage: `url(${toWebp(post.pageCoverThumbnail)})`
          }}>
          <LazyImage
            src={toWebp(post.pageCoverThumbnail)}
            alt={accessibleTitle}
            className='v-hide'
          />
        </a>
      )}
      <div className='block-content'>
        <h2 className='block-title' itemProp='headline'>
          <a href={post.href} aria-label={accessibleTitle}>
            {accessibleTitle}
          </a>
        </h2>
        <div className='block-snippet block-snippet--subtitle' itemProp='about'>
          {!showPreview && (
            <>
              {post.summary}
              {post.summary && <span>...</span>}
            </>
          )}
          {showPreview && post?.blockMap && (
            <span>Preview mode is not supported in this theme.</span>
          )}
        </div>
        <div className='v-clearfix block-postMetaWrap'>
          <div className='block-postMeta'>
            <time itemProp='datePublished'>{post.date?.start_date || post.createdTime}</time>
            {post.category && (
              <>
                {' '}
                in{' '}
                <span itemProp='articleSection'>
                  <a href={`/category/${post.category}`} rel='category tag'>
                    {post.category}
                  </a>
                </span>
              </>
            )}
            {' '}by{' '}
            <span itemProp='author'>
              <a className='cute' href='/about'>
                {siteConfig('AUTHOR')}
              </a>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
