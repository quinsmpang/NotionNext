import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * 归档月份项
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  const posts = archivePosts[archiveTitle] || []

  return (
    <article className='block block--inset block--list block--withoutImage'>
      <div className='block-content'>
        <h2 className='block-title'>{archiveTitle}</h2>
        {posts.map(post => (
          <div key={post.id} className='v-clearfix block-postMetaWrap'>
            <div className='block-postMeta'>
              <time itemProp='datePublished'>
                {formatDateFmt(post?.publishDate, 'yyyy-MM-dd')}
              </time>
              {' '}
              <a href={post.href}>{post.title}</a>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
