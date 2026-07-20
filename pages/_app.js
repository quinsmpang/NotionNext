// import '@/styles/animate.css' // @see https://animate.style/
import '@/styles/globals.css'
import '@/styles/utility-patterns.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css' // 原版的react-notion-x
import '@/styles/notion.css' //  重写部分notion样式

import useAdjustStyle from '@/hooks/useAdjustStyle'
import { GlobalContextProvider } from '@/lib/global'
import { getBaseLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'
import ErrorHandler from '@/lib/utils/errorHandler'

// 各种扩展插件：按主题按需加载，quinsm 等精简主题下通过动态导入避免阻塞首屏 JS
import BLOG from '@/blog.config'
import SEO from '@/components/SEO'
const ExternalPlugins = dynamic(
  () => import('@/components/ExternalPlugins'),
  { ssr: false }
)
import { zhCN } from '@clerk/localizations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// import { ClerkProvider } from '@clerk/nextjs'
const ClerkProvider = dynamic(() =>
  import('@clerk/nextjs').then(m => m.ClerkProvider)
)
const AppErrorBoundary = ErrorHandler.createErrorBoundary(
  <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h1>
    <p style={{ color: '#666', marginBottom: '1.5rem' }}>An unexpected error occurred. Please refresh the page.</p>
    <button onClick={() => window.location.reload()} style={{ padding: '0.5rem 1.5rem', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', background: 'transparent' }}>Refresh</button>
  </div>
)

/**
 * App挂载DOM 入口文件
 * @param {*} param0
 * @returns
 */
const MyApp = ({ Component, pageProps }) => {
  // 一些可能出现 bug 的样式，可以统一放入该钩子进行调整
  useAdjustStyle()

  const route = useRouter()
  const queryTheme = getQueryParam(route.asPath, 'theme')
  const notionTheme = pageProps?.NOTION_CONFIG?.THEME
  const configTheme = BLOG.THEME
  // 本地 blog.config.js 配置优先于 Notion 云端配置，便于用户通过代码稳定切换主题
  const theme = useMemo(() => {
    return queryTheme || configTheme || notionTheme
  }, [queryTheme, notionTheme, configTheme])

  useEffect(() => {
    const source = queryTheme
      ? 'url:theme'
      : configTheme
        ? 'blog/env:config'
        : 'notion:config'
    console.log(
      '[ThemeResolver][runtime-final]',
      JSON.stringify(
        {
          note: 'This is the final theme used for rendering.',
          configTheme,
          notionTheme: notionTheme || null,
          queryTheme: queryTheme || null,
          finalTheme: theme,
          source
        },
        null,
        2
      )
    )
  }, [configTheme, notionTheme, queryTheme, theme])

  // 整体布局
  const GLayout = useCallback(
    props => {
      const Layout = getBaseLayoutByTheme(theme)
      return <Layout {...props} />
    },
    [theme]
  )

  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const content = (
    <AppErrorBoundary>
      {/* quinsm 主题样式通过独立 CSS 文件加载，避免内联大量样式影响性能 */}
      {theme === 'quinsm' && (
        <Head>
          <link
            rel='preload'
            href='/quinsm/quinsm.min.css'
            as='style'
            fetchpriority='high'
          />
          <link rel='stylesheet' href='/quinsm/quinsm.min.css' />
          <link
            rel='preload'
            href='/quinsm/fonts/pure-icon.woff'
            as='font'
            type='font/woff'
            crossOrigin='anonymous'
          />
        </Head>
      )}
      <GlobalContextProvider {...pageProps}>
        <GLayout {...pageProps}>
          <SEO {...pageProps} />
          <Component {...pageProps} />
        </GLayout>
        <ExternalPlugins {...pageProps} />
      </GlobalContextProvider>
    </AppErrorBoundary>
  )
  return (
    <>
      {enableClerk ? (
        <ClerkProvider localization={zhCN}>{content}</ClerkProvider>
      ) : (
        content
      )}
    </>
  )
}

export default MyApp
