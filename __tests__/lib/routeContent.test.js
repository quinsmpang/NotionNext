import {
  findRouteContent,
  getOrphanMenuPageCandidates
} from '@/lib/site/routeContent'

describe('route content fallbacks', () => {
  const aboutMenu = {
    id: 'about-menu',
    title: '关于我',
    type: 'Menu',
    status: 'Published',
    slug: '/about'
  }

  it('prefers a real content page over a menu row with the same target', () => {
    const aboutPage = {
      id: 'about-page',
      title: '关于',
      type: 'Page',
      status: 'Invisible',
      slug: 'about'
    }

    expect(findRouteContent([aboutMenu, aboutPage], 'about')).toBe(aboutPage)
  })

  it('uses an orphaned published menu row as a page fallback', () => {
    expect(findRouteContent([aboutMenu], 'about')).toEqual({
      ...aboutMenu,
      type: 'Page',
      slug: 'about',
      ext: { menuFallback: true }
    })
  })

  it('builds only orphaned internal menu targets', () => {
    const pages = [
      aboutMenu,
      {
        id: 'about-page',
        type: 'Page',
        status: 'Invisible',
        slug: 'about'
      },
      {
        id: 'links-menu',
        type: 'Menu',
        status: 'Published',
        slug: '/links'
      },
      {
        id: 'home-menu',
        type: 'Menu',
        status: 'Published',
        slug: '/'
      },
      {
        id: 'github-menu',
        type: 'Menu',
        status: 'Published',
        slug: 'https://github.com/example'
      }
    ]

    expect(getOrphanMenuPageCandidates(pages)).toEqual([
      {
        ...pages[2],
        type: 'Page',
        slug: 'links',
        ext: { menuFallback: true }
      }
    ])
  })
})
