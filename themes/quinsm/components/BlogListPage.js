import BlogItem from './BlogItem'
import PaginationNumber from './PaginationNumber'

/**
 * 分页列表
 */
export default function BlogListPage(props) {
  const { posts = [], totalPages = 1, page, emptyText } = props

  return (
    <section id='posts-wrapper' className='blockGroup homeGroup'>
      {posts.map(post => (
        <BlogItem key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <div className='blockGroup is-empty'>{emptyText || 'No posts yet.'}</div>
      )}
      <PaginationNumber page={page} totalPage={totalPages} />
    </section>
  )
}
