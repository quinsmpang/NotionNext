import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'
import dynamic from 'next/dynamic'

const QuinsmComments = dynamic(
  () => import('@/themes/quinsm/components/QuinsmComments'),
  { ssr: false }
)
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })

/**
 * 独立留言板页面
 * 由于旧主题包含留言板，而 Notion 数据里不一定有 slug=guestbook 的 Page，
 * 这里提供一个静态路由，确保 /guestboard 始终可访问并带评论。
 */
const Guestbook = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  const isQuinsm = theme === 'quinsm'
  const frontMatter = {
    id: 'guestbook',
    slug: 'guestbook',
    title: '留言板',
    type: 'Page'
  }

  return (
    <DynamicLayout theme={theme} layoutName='LayoutBase' {...props}>
      <div className='layoutSingleColumn layoutSingleColumn--wide fontSmooth'>
        <div className='layoutMultiColumn-header hero hero--underline'>
          <h1 className='hero-title'>留言板</h1>
        </div>
        <div className='blockGroup fontSmooth'>
          <p className='block-snippet block-snippet--subtitle'>
            欢迎留下你的想法、建议或问题，我会尽快回复。
          </p>
          {isQuinsm ? (
            <QuinsmComments postId='guestbook' />
          ) : (
            <Comment frontMatter={frontMatter} />
          )}
        </div>
      </div>
    </DynamicLayout>
  )
}

export async function getStaticProps({ locale }) {
  const props = await fetchGlobalAllData({ from: 'guestbook', locale })
  delete props.allPages
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default Guestbook
