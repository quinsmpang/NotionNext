import BLOG from '@/blog.config'
import { getOrSetDataWithCache } from '@/lib/cache/cache_manager'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { getPriorityPages, prefetchAllBlockMaps } from '@/lib/build/prefetch'
import { isExport } from '@/lib/utils/buildMode'

const inProcessAllPagesPromises = new Map()
const STANDALONE_PAGE_REVALIDATE_SECONDS = 24 * 60 * 60

function getStaticPathsCacheKey({ pageId = BLOG.NOTION_PAGE_ID, locale }) {
  const safePageId = String(pageId || BLOG.NOTION_PAGE_ID).replace(
    /[^a-z0-9,_:-]/gi,
    '_'
  )
  const safeLocale = String(locale || 'default').replace(/[^a-z0-9_-]/gi, '_')
  return `build_static_paths_all_pages_${safeLocale}_${safePageId}`
}

export function getSharedAllPages({
  from = 'slug-paths',
  pageId = BLOG.NOTION_PAGE_ID,
  locale
} = {}) {
  const cacheKey = getStaticPathsCacheKey({ pageId, locale })

  if (!inProcessAllPagesPromises.has(cacheKey)) {
    const promise = getOrSetDataWithCache(cacheKey, async () => {
      const { allPages = [] } = await fetchGlobalAllData({
        pageId,
        from,
        locale
      })
      return Array.isArray(allPages) ? allPages : []
    })
    promise.catch(() => {
      inProcessAllPagesPromises.delete(cacheKey)
    })
    inProcessAllPagesPromises.set(cacheKey, promise)
  }

  return inProcessAllPagesPromises.get(cacheKey)
}

export async function getStaticPathsBase({
  filterFn = () => true,
  mapPageToParams,
  from = 'slug-paths',
  pageId = BLOG.NOTION_PAGE_ID,
  locale
}) {
  const allPages = await getSharedAllPages({ from, pageId, locale })

  if (isExport()) {
    await prefetchAllBlockMaps(allPages)
    return {
      paths: allPages.filter(filterFn).map(mapPageToParams),
      fallback: false
    }
  }

  const priorityPages = getPriorityPages(allPages) || []
  return {
    paths: priorityPages.filter(filterFn).map(mapPageToParams),
    fallback: 'blocking'
  }
}

/**
 * Standalone pages are typically low-frequency content such as About or Links.
 * Keep their prerender alive long enough to survive deployment propagation so
 * the first visitor does not trigger a blocking Notion fetch in serverless.
 */
export function getContentRevalidateSeconds(post, configuredSeconds) {
  if (post?.type !== 'Page') {
    return configuredSeconds
  }

  const parsedSeconds = Number(configuredSeconds)
  const validSeconds =
    Number.isFinite(parsedSeconds) && parsedSeconds > 0 ? parsedSeconds : 0

  return Math.max(validSeconds, STANDALONE_PAGE_REVALIDATE_SECONDS)
}
