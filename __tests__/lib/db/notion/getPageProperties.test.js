jest.mock('notion-utils', () => ({
  getDateValue: jest.fn(),
  getTextContent: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true,
  default: {
    getBlocks: jest.fn()
  }
}))

jest.mock('@/lib/db/notion/mapImage', () => ({
  mapImgUrl: jest.fn(source => source)
}))

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

import notionAPI from '@/lib/db/notion/getNotionAPI'
import {
  findFirstBodyImage,
  getBlockMapFromResponse,
  getImageUrlFromBlock,
  isNotionSolidColorCover,
  unwrapNotionBlock
} from '@/lib/db/notion/getPageProperties'

describe('Notion body image extraction', () => {
  const imageBlock = {
    id: 'image-block',
    type: 'image',
    properties: {
      source: [['https://example.com/first-image.png']]
    }
  }

  it('unwraps current double-value API entries', () => {
    const wrapped = {
      value: {
        value: imageBlock,
        role: 'reader'
      }
    }

    expect(unwrapNotionBlock(wrapped)).toEqual(imageBlock)
    expect(getImageUrlFromBlock(wrapped)).toContain(
      'https://example.com/first-image.png'
    )
  })

  it('keeps compatibility with legacy single-value entries', () => {
    expect(unwrapNotionBlock({ value: imageBlock })).toEqual(imageBlock)
    expect(getImageUrlFromBlock({ value: imageBlock })).toContain(
      'https://example.com/first-image.png'
    )
  })

  it('reads blocks from supported response envelopes', () => {
    const blockMap = { 'image-block': { value: imageBlock } }

    expect(getBlockMapFromResponse({ recordMap: { block: blockMap } })).toBe(
      blockMap
    )
    expect(
      getBlockMapFromResponse({ recordMapWithRoles: { block: blockMap } })
    ).toBe(blockMap)
    expect(getBlockMapFromResponse({ block: blockMap })).toBe(blockMap)
  })

  it('recognizes Notion solid color covers as thumbnail placeholders', () => {
    expect(isNotionSolidColorCover('/images/page-cover/solid_yellow.png')).toBe(
      true
    )
    expect(
      isNotionSolidColorCover(
        'https://www.notion.so/images/page-cover/solid_blue.png'
      )
    ).toBe(true)
    expect(
      isNotionSolidColorCover('https://example.com/images/article-cover.png')
    ).toBe(false)
  })

  it('finds the first body image in the current double-value response', async () => {
    notionAPI.getBlocks.mockResolvedValue({
      recordMap: {
        block: {
          'text-block': {
            value: {
              value: {
                id: 'text-block',
                type: 'text'
              },
              role: 'reader'
            }
          },
          'image-block': {
            value: {
              value: imageBlock,
              role: 'reader'
            }
          }
        }
      }
    })

    await expect(
      findFirstBodyImage(['text-block', 'image-block'])
    ).resolves.toBe('https://example.com/first-image.png')
  })
})
