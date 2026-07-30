jest.mock('p-limit', () => () => task => task())
jest.mock('@/lib/db/notion/getPostBlocks', () => ({
  fetchNotionPageBlocks: jest.fn(),
  getPageBlockCacheKey: jest.fn()
}))
jest.mock('@/lib/cache/cache_manager', () => ({
  getDataFromCache: jest.fn()
}))
jest.mock('@/lib/cache/build_session', () => ({
  getBuildSessionPath: jest.fn(() => '.cache/test')
}))
jest.mock('@/lib/build/buildEnv', () => ({
  getBuildPrefetchConcurrency: jest.fn(() => 1),
  isBuildPrefetchEnabled: jest.fn(() => false),
  logBuildEnvSummary: jest.fn()
}))

import { getPriorityPages } from '@/lib/build/prefetch'

describe('getPriorityPages', () => {
  it('includes every standalone page in ISR priority paths', () => {
    const pages = [
      {
        id: 'about-page',
        slug: 'about',
        type: 'Page',
        status: 'Invisible'
      },
      {
        id: 'draft-page',
        slug: 'draft',
        type: 'Page',
        status: 'Draft'
      },
      {
        id: 'post-1',
        slug: 'article/hello',
        type: 'Post',
        status: 'Published',
        publishDate: '2026-01-01'
      }
    ]

    expect(getPriorityPages(pages)).toEqual([pages[0], pages[1], pages[2]])
  })
})
