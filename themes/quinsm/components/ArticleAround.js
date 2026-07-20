import { useGlobal } from '@/lib/global'

/**
 * 上下篇文章导航
 */
export default function ArticleAround({ prev, next }) {
  const { locale } = useGlobal()
  if (!prev && !next) return null

  return (
    <div className='block--list block--withoutImage'>
      <div className='block-postMeta v-overflowHidden'>
        {prev && (
          <div className='v-alignLeft'>
            <a href={prev.href} className='link link--accent cute'>
              ← {prev.title}
            </a>
          </div>
        )}
        {next && (
          <div className='v-alignRight'>
            <a href={next.href} className='link link--accent cute'>
              {next.title} →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
