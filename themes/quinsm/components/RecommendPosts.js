import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import { toWebp } from '../lib/toWebp'

/**
 * 推荐文章
 */
export default function RecommendPosts({ recommendPosts }) {
  const { locale } = useGlobal()
  if (!recommendPosts || recommendPosts.length === 0) return null

  return (
    <div className='related--posts'>
      <h3 className='related--posts-title'>
        {locale.COMMON.RELATE_POSTS || '相关文章'}
      </h3>
      {recommendPosts.map(post => (
        <div key={post.id} className='related--post'>
          <a href={post.href}>
            <div className='block-image'>
              {post.pageCoverThumbnail ? (
                <LazyImage
                  src={toWebp(post.pageCoverThumbnail)}
                  alt={post.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-gray-100' />
              )}
            </div>
            <h4 className='related--post-title'>{post.title}</h4>
          </a>
        </div>
      ))}
    </div>
  )
}
