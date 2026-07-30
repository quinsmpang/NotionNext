function isMenuType(type) {
  return typeof type === 'string' && type.includes('Menu')
}

export function normalizeRouteSlug(slug) {
  const value = String(slug || '').trim()
  if (
    !value ||
    /^(?:https?:)?\/\//i.test(value) ||
    /^(?:#|mailto:|tel:)/i.test(value)
  ) {
    return ''
  }

  return value.replace(/^\/+|\/+$/g, '')
}

export function asMenuFallbackPage(menu) {
  return {
    ...menu,
    type: 'Page',
    slug: normalizeRouteSlug(menu.slug),
    ext: {
      ...(menu.ext || {}),
      menuFallback: true
    }
  }
}

/**
 * Prefer a real content row. A published Menu row is only used when its target
 * has no matching Page/Post, which keeps legacy Notion menus routable.
 */
export function findRouteContent(allPages, fullSlug) {
  if (!Array.isArray(allPages)) return null

  const normalizedSlug = normalizeRouteSlug(fullSlug)
  const content = allPages.find(
    page =>
      page &&
      !isMenuType(page.type) &&
      normalizeRouteSlug(page.slug) === normalizedSlug
  )
  if (content) return content

  const byId = allPages.find(page => page?.id === fullSlug)
  if (byId && !isMenuType(byId.type)) return byId

  const menu = allPages.find(
    page =>
      page &&
      isMenuType(page.type) &&
      page.status === 'Published' &&
      normalizeRouteSlug(page.slug) === normalizedSlug
  )

  return menu ? asMenuFallbackPage(menu) : null
}

/**
 * Convert only orphaned internal Menu targets into Page-shaped build entries.
 * Existing Page/Post rows always win and root/external menu links are ignored.
 */
export function getOrphanMenuPageCandidates(allPages) {
  if (!Array.isArray(allPages)) return []

  const contentSlugs = new Set(
    allPages
      .filter(page => page && !isMenuType(page.type))
      .map(page => normalizeRouteSlug(page.slug))
      .filter(Boolean)
  )
  const fallbackSlugs = new Set()

  return allPages
    .filter(page => {
      if (!page || !isMenuType(page.type) || page.status !== 'Published') {
        return false
      }

      const slug = normalizeRouteSlug(page.slug)
      if (!slug || contentSlugs.has(slug) || fallbackSlugs.has(slug)) {
        return false
      }

      fallbackSlugs.add(slug)
      return true
    })
    .map(asMenuFallbackPage)
}
