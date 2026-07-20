import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import BlogItem from './BlogItem'

/**
 * 滚动加载列表
 */
export default function BlogListScroll(props) {
  const { posts } = props
  const { locale } = useGlobal()
  const [page, updatePage] = useState(1)
  const postsToShow = posts.slice(0, page * 10)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          updatePage(p => p + 1)
        }
      },
      { threshold: 0.5 }
    )
    if (targetRef.current) {
      observer.observe(targetRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section id='posts-wrapper' className='blockGroup homeGroup'>
      {postsToShow.map(post => (
        <BlogItem key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <div className='blockGroup is-empty'>No posts yet.</div>
      )}
      <div ref={targetRef} className='v-textAlignCenter fontSmooth posts-load-btn'>
        {postsToShow.length < posts.length ? (
          <span className='posts-load-num'>Loading...</span>
        ) : (
          <span className='posts-load-disabled'>{locale.COMMON.NO_MORE || '没有更多了'}</span>
        )}
      </div>
    </section>
  )
}
