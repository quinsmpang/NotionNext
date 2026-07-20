import { siteConfig } from '@/lib/config'

/**
 * 文章标题区（SSR 渲染，便于 SEO / GEO 抓取正文标题）
 */
export default function ArticleInfo({ post }) {
  const publishDate =
    post?.publishDate || post?.date?.start_date || post?.createdTime
  return (
    <header className='entry-header'>
      <h1 className='entry-title fontSmooth' itemProp='headline'>
        {post.title}
      </h1>
      <div
        className='entry-meta v-clearfix fontSmooth'
        itemProp='author'
        itemScope
        itemType='https://schema.org/Person'
      >
        <meta itemProp='name' content={siteConfig('AUTHOR')} />
        <span itemProp='datePublished'>{publishDate}</span>
        {post?.category && (
          <>
            {' · '}
            <span itemProp='articleSection'>
              <a href={`/category/${post.category}`} rel='category tag'>
                {post.category}
              </a>
            </span>
          </>
        )}
        {' · '}
        <span>{siteConfig('AUTHOR')}</span>
      </div>
    </header>
  )
}
