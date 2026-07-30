import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

/**
 * 分享栏
 * @param {} param0
 * @returns
 */
const ShareBar = ({ post }) => {
  if (
    !JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE')) ||
    !post ||
    post?.type !== 'Post'
  ) {
    return <></>
  }

  return (
    <div className='share-bar my-3 overflow-visible'>
      <div className='share-bar-inner flex w-full flex-wrap items-center gap-1 md:justify-end'>
        <ShareButtons post={post} />
      </div>
    </div>
  )
}
export default ShareBar
