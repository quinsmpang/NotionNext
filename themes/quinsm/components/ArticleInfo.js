import { siteConfig } from '@/lib/config'

/**
 * 文章标题区
 */
export default function ArticleInfo({ post }) {
  return (
    <header className='entry-header'>
      <h2 className='entry-title fontSmooth' itemProp='headline'>
        {post.title}
      </h2>
    </header>
  )
}
