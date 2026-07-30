/**
 * 文章标题区（SSR 渲染，便于 SEO / GEO 抓取正文标题）
 */
export default function ArticleInfo({ post }) {
  const publishDate =
    post?.publishDay || post?.date?.start_date || post?.createdTime
  return (
    <header className='entry-header'>
      <h1 className='entry-title fontSmooth' itemProp='headline'>
        {post.title}
      </h1>
      <div className='entry-meta v-clearfix fontSmooth'>
        <time
          itemProp='datePublished'
          dateTime={post?.date?.start_date || undefined}
        >
          {publishDate}
        </time>
        {post?.category && (
          <>
            <span className='entry-metaDivider' aria-hidden='true'>
              /
            </span>
            <span itemProp='articleSection'>
              <a
                href={`/category/${encodeURIComponent(post.category)}`}
                rel='category tag'
              >
                {post.category}
              </a>
            </span>
          </>
        )}
      </div>
    </header>
  )
}
