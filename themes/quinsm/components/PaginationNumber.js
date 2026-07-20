import { useGlobal } from '@/lib/global'

/**
 * 简单分页
 */
export default function PaginationNumber({ page, totalPage }) {
  const { locale } = useGlobal()
  const currentPage = page || 1
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPage

  return (
    <nav className='v-textAlignCenter fontSmooth posts-load-btn'>
      {hasPrev ? (
        <a className='posts-load-prompt' href={`/page/${currentPage - 1}`}>
          {locale.PAGINATION.PREV || '上一页'}
        </a>
      ) : (
        <span className='posts-load-disabled'>{locale.PAGINATION.PREV || '上一页'}</span>
      )}
      <span className='posts-load-num'>
        {currentPage} / {totalPage || 1}
      </span>
      {hasNext ? (
        <a className='posts-load-prompt' href={`/page/${currentPage + 1}`}>
          {locale.PAGINATION.NEXT || '下一页'}
        </a>
      ) : (
        <span className='posts-load-disabled'>{locale.PAGINATION.NEXT || '下一页'}</span>
      )}
    </nav>
  )
}
