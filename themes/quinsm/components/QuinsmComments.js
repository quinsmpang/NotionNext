import { buildCommentTree, countReplies } from '@/lib/plugins/notionComments'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { convertTextToEmoji } from '../lib/aluEmoji'
import AluEmojiPicker from './AluEmojiPicker'

const ROOT_PAGE_SIZE = 10
const REPLY_PAGE_SIZE = 3
const COMMENT_TEXTAREA_ID = 'quinsm-comment-textarea'

/**
 * 格式化时间为相对时间
 */
function formatTime(value) {
  const date = new Date(value)
  const diff = Date.now() - date.getTime()
  if (Number.isNaN(diff)) return ''
  if (diff < 60 * 1000) return '刚刚'
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / 3600000)} 小时前`
  }
  if (diff < 30 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))} 天前`
  }
  return date.toLocaleDateString()
}

/**
 * 获取昵称首字母（用于默认头像）
 */
function getInitial(name) {
  return (name || '?').trim().slice(0, 1).toUpperCase()
}

/**
 * 生成 Gravatar 头像 URL
 */
function getAvatarUrl(emailHash, author) {
  if (emailHash) {
    return `https://www.gravatar.com/avatar/${emailHash}?s=72&d=mm&r=g`
  }
  // 用昵称生成默认头像颜色
  const hue = (author || 'A').charCodeAt(0) % 36 * 10
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(getInitial(author))}&size=72&background=${hue}${hue}${hue}&color=fff`
}

/**
 * quinsm 主题自建评论组件
 * 使用 Notion 数据库存储，Pure 主题风格，集成阿鲁表情
 */
export default function QuinsmComments({ postId }) {
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [expandedReplies, setExpandedReplies] = useState({})
  const [visibleReplyCounts, setVisibleReplyCounts] = useState({})
  const [visibleRootCount, setVisibleRootCount] = useState(ROOT_PAGE_SIZE)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [apiAvailable, setApiAvailable] = useState(true)
  const [apiConfigured, setApiConfigured] = useState(true)
  const contentRef = useRef(null)
  const commentRef = useRef(null)

  // 懒加载：评论区可见时才加载数据
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '200px' }
    )

    const el = commentRef.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      if (el) {
        observer.unobserve(el)
      }
    }
  }, [])

  const loadComments = useCallback(async () => {
    setLoading(true)
    setError('')
    let response
    try {
      response = await fetch(
        `/api/notion-comments?postId=${encodeURIComponent(postId)}`
      )
      if (!response.ok) throw new Error('Failed to load comments')
      const data = await response.json()
      if (Array.isArray(data)) {
        setComments(data)
      }
      setApiAvailable(true)
      setApiConfigured(true)
    } catch (err) {
      // TypeError: 网络不通（静态模式 / API 路由不可达）
      // 404:      API 路由不存在（静态导出）
      // 500:      服务端错误（多半是未配置 NOTION_TOKEN / NOTION_COMMENT_DATABASE_ID）
      if (
        err instanceof TypeError ||
        (response && response.status === 404)
      ) {
        setApiAvailable(false)
      } else if (response && response.status >= 500) {
        setApiConfigured(false)
      } else {
        setError('评论加载失败，请重试')
      }
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    if (!postId || !shouldLoad) return
    void loadComments()
  }, [loadComments, postId, shouldLoad])

  const commentTree = useMemo(() => buildCommentTree(comments), [comments])
  const visibleRoots = commentTree.slice(0, visibleRootCount)
  const replyTarget = replyTo
    ? comments.find(comment => comment.id === replyTo)
    : null

  const handleSubmit = async event => {
    event.preventDefault()
    if (!content.trim() || !email.trim() || submitting) return

    setSubmitting(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch('/api/notion-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: content.trim(),
          author: email.trim(),
          nickname: nickname.trim() || email.trim().split('@')[0],
          parentId: replyTo,
          website
        })
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'Failed to submit comment')
      }
      const result = await response.json()
      setContent('')
      setReplyTo(null)
      setNotice(
        result.pending ? '评论已提交，审核通过后显示。' : '评论已发布。'
      )
      setApiConfigured(true)
      if (replyTo) {
        setExpandedReplies(current => ({ ...current, [replyTo]: true }))
        setVisibleReplyCounts(current => ({
          ...current,
          [replyTo]: Number(current[replyTo] || 0) + REPLY_PAGE_SIZE
        }))
      }
      await loadComments()
    } catch (err) {
      setError(err.message || '评论提交失败，请稍后重试')
      // 500 错误大概率是服务端未配置
      if (err.message && err.message.includes('Failed to create')) {
        setApiConfigured(false)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const cancelReply = () => {
    setReplyTo(null)
  }

  const startReply = comment => {
    setReplyTo(comment.id)
    setExpandedReplies(current => ({ ...current, [comment.id]: true }))
    if (!visibleReplyCounts[comment.id]) {
      setVisibleReplyCounts(current => ({
        ...current,
        [comment.id]: REPLY_PAGE_SIZE
      }))
    }
    // 滚动到评论框
    const el = document.getElementById(COMMENT_TEXTAREA_ID)
    if (el) {
      el.focus()
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const toggleReplies = commentId => {
    setExpandedReplies(current => ({
      ...current,
      [commentId]: !current[commentId]
    }))
    if (!visibleReplyCounts[commentId]) {
      setVisibleReplyCounts(current => ({
        ...current,
        [commentId]: REPLY_PAGE_SIZE
      }))
    }
  }

  const loadMoreReplies = commentId => {
    setVisibleReplyCounts(current => ({
      ...current,
      [commentId]: (current[commentId] || REPLY_PAGE_SIZE) + REPLY_PAGE_SIZE
    }))
  }

  const loadMoreRoots = () => {
    setVisibleRootCount(count => count + ROOT_PAGE_SIZE)
  }

  // 渲染单条评论
  const renderComment = (comment, level = 0) => {
    const replies = comment.children || []
    const hasReplies = replies.length > 0
    const repliesOpen = expandedReplies[comment.id] || level > 0
    const replyCount = hasReplies ? countReplies(comment) : 0
    const visibleReplyCountVal = visibleReplyCounts[comment.id] || REPLY_PAGE_SIZE
    const visibleReplies =
      repliesOpen ? replies.slice(0, visibleReplyCountVal) : []
    const hasHiddenReplies = repliesOpen && visibleReplies.length < replies.length

    return (
      <article
        key={comment.id}
        className='comment-block'
        id={`comment-${comment.id}`}
        itemProp='comment'
        itemScope
        itemType='https://schema.org/Comment'
      >
        <div className='comment-info v-clearfix'>
          <div className='comment-avatar'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='avatar avatar-36 photo'
              src={getAvatarUrl(comment.emailHash, comment.author)}
              alt={comment.author}
              width='36'
              height='36'
              loading='lazy'
            />
          </div>
          <div className='comment-meta'>
            <strong className='name' itemProp='author'>
              {comment.author}
            </strong>
            <span className='time'>
              {' '}
              /{' '}
              <time dateTime={comment.createdTime} itemProp='dateCreated'>
                {formatTime(comment.createdTime)}
              </time>
            </span>
            {level < 3 && (
              <button
                type='button'
                className='comment-reply-link'
                onClick={() => startReply(comment)}
              >
                <i className='iconfont icon-fi32' /> 回复
              </button>
            )}
          </div>
        </div>

        <div
          className='comment-content'
          itemProp='text'
          dangerouslySetInnerHTML={{
            __html: convertTextToEmoji(comment.content)
          }}
        />

        {hasReplies && level === 0 && (
          <div className='comment-reply-toggle'>
            <button
              type='button'
              className='buttton--commentmore'
              onClick={() => toggleReplies(comment.id)}
            >
              {repliesOpen
                ? `收起回复 ▲`
                : `查看 ${replyCount} 条回复 ▼`}
            </button>
          </div>
        )}

        {repliesOpen && visibleReplies.length > 0 && (
          <div className='children'>
            {visibleReplies.map(child => renderComment(child, level + 1))}
            {hasHiddenReplies && (
              <button
                type='button'
                className='buttton--commentmore'
                onClick={() => loadMoreReplies(comment.id)}
              >
                展开更多回复（还有 {replies.length - visibleReplies.length} 条）
              </button>
            )}
          </div>
        )}
      </article>
    )
  }

  // 缺少 postId 时不渲染评论区
  if (!postId) {
    return (
      <div id='quinsm-comments' ref={commentRef} className='comments-area fontSmooth'>
        <div style={{ height: '80px' }} />
      </div>
    )
  }

  // API 未配置（缺少 NOTION_TOKEN / NOTION_COMMENT_DATABASE_ID）
  if (shouldLoad && !apiConfigured && apiAvailable && !loading) {
    return (
      <div id='quinsm-comments' ref={commentRef} className='comments-area fontSmooth'>
        <div className='comment-notice comment-notice--info' style={{ display: 'block' }}>
          <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            评论服务未配置
          </p>
          <p style={{ marginBottom: '4px', fontSize: '13px' }}>
            请在部署环境变量中添加以下配置后重新部署：
          </p>
          <code style={{
            display: 'block',
            background: 'rgba(0,0,0,0.05)',
            padding: '10px 14px',
            fontSize: '12px',
            lineHeight: '1.8',
            borderRadius: '4px',
            marginTop: '6px',
            wordBreak: 'break-all'
          }}>
            NEXT_PUBLIC_COMMENT_NOTION_ENABLE=true<br />
            NOTION_COMMENT_DATABASE_ID=你的数据库ID<br />
            NOTION_TOKEN=secret_xxx
          </code>
          <p style={{ marginTop: '8px', fontSize: '13px' }}>
            配置方法详见{' '}
            <Link href='/guestbook' className='cute'>
              留言板
            </Link>
            {' '}页面说明。
          </p>
        </div>
      </div>
    )
  }

  // 静态导出模式提示
  if (shouldLoad && !apiAvailable && !loading) {
    return (
      <div id='quinsm-comments' ref={commentRef} className='comments-area fontSmooth'>
        <div className='comment-notice comment-notice--info'>
          评论功能仅在服务器模式下可用。欢迎前往
          <Link href='/guestbook' className='cute' style={{ margin: '0 4px' }}>
            留言板
          </Link>
          留言。
        </div>
      </div>
    )
  }

  // 未滚动到评论区时显示占位
  if (!shouldLoad) {
    return (
      <div id='quinsm-comments' ref={commentRef} className='comments-area fontSmooth'>
        <div style={{ height: '120px' }} />
      </div>
    )
  }

  return (
    <div id='quinsm-comments' ref={commentRef} className='comments-area fontSmooth'>
      {/* ---- 评论标签 ---- */}
      <div className='commentNavTabs'>
        <span className='commentNavTabs-item is-active'>
          评论 ({comments.length})
        </span>
      </div>

      {/* ---- 评论列表 ---- */}
      {loading ? (
        <div className='comment-skeleton-list'>
          {[1, 2, 3].map(i => (
            <div key={i} className='comment-skeleton' />
          ))}
        </div>
      ) : error && comments.length === 0 ? (
        <div className='comment-notice comment-notice--error'>
          <span>{error}</span>
          <button
            type='button'
            className='button button--chromeless'
            onClick={() => {
              void loadComments()
            }}
            style={{ marginLeft: '12px', textDecoration: 'underline' }}
          >
            重试
          </button>
        </div>
      ) : visibleRoots.length > 0 ? (
        <>
          <div className='comment-list'>
            {visibleRoots.map(comment => renderComment(comment))}
          </div>
          {visibleRootCount < commentTree.length && (
            <div className='commentnavholder v-textAlignCenter'>
              <button
                type='button'
                className='buttton--commentmore'
                onClick={loadMoreRoots}
              >
                加载更多评论（还有 {commentTree.length - visibleRoots.length} 条）
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='comment-nav-empty v-textAlignCenter' style={{ padding: '30px 0', color: 'rgba(0,0,0,0.45)' }}>
          还没有评论，来写第一条吧。
        </div>
      )}

      {/* ---- 通知与错误 ---- */}
      {notice && (
        <div className='comment-notice comment-notice--success'>{notice}</div>
      )}
      {error && comments.length > 0 && (
        <div className='comment-notice comment-notice--error'>{error}</div>
      )}

      {/* ---- 评论表单 ---- */}
      <div className='responsesWrapper' id='respond'>
        <h3 className='comments-title'>
          {replyTarget ? (
            <>
              回复 <strong>@{replyTarget.author}</strong>
              <button
                type='button'
                id='cancel-comment-reply-link'
                onClick={cancelReply}
                style={{ marginLeft: '12px' }}
              >
                取消回复
              </button>
            </>
          ) : (
            '发表评论'
          )}
        </h3>

        <form id='commentform' onSubmit={e => { void handleSubmit(e) }} noValidate>
          {/* 评论文本域 */}
          <p className='comment-form-comment'>
            <textarea
              ref={contentRef}
              id={COMMENT_TEXTAREA_ID}
              name='comment'
              maxLength={2000}
              required
              rows={5}
              placeholder={replyTarget ? '写下你的回复...' : '写下你的评论...'}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </p>

          {/* 阿鲁表情选择器 */}
          <AluEmojiPicker textareaId={COMMENT_TEXTAREA_ID} />

          {/* 昵称 */}
          <p className='comment-form-input'>
            <input
              id='quinsm-author'
              name='author'
              type='text'
              maxLength={40}
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder=' '
            />
            <label htmlFor='quinsm-author'>昵称</label>
          </p>

          {/* 邮箱 */}
          <p className='comment-form-input'>
            <input
              id='quinsm-email'
              name='email'
              type='email'
              maxLength={254}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=' '
            />
            <label htmlFor='quinsm-email'>邮箱（不会公开）</label>
          </p>

          {/* Honeypot 网站字段（对人隐藏，对机器人可见） */}
          <p
            className='comment-form-input'
            style={{ display: 'none' }}
            aria-hidden='true'
          >
            <input
              id='quinsm-url'
              name='url'
              type='text'
              autoComplete='off'
              tabIndex={-1}
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder=' '
            />
            <label htmlFor='quinsm-url'>网站</label>
          </p>

          {/* 提交 */}
          <p className='form-submit'>
            <input
              id='submit'
              name='submit'
              type='submit'
              value={submitting ? '提交中...' : replyTarget ? '回复' : '发表评论'}
              disabled={submitting}
            />
          </p>
        </form>
      </div>
    </div>
  )
}
