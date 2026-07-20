import { useEffect, useState } from 'react'

/**
 * 回到顶部
 */
export default function JumpToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 200)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      id='backtoTop'
      className={`js-action ${show ? 'button--show' : ''}`}
      onClick={scrollToTop}>
      <div id='backtoTopCanvas' className='per'>
        <i className='iconfont icon-topxiangshangjiantou'></i>
      </div>
    </div>
  )
}
