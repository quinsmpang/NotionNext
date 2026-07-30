const { createGravatarHash } = require('@/pages/api/notion-comments')

describe('notion comments API helpers', () => {
  test('creates a normalized SHA-256 Gravatar identifier', () => {
    expect(createGravatarHash(' MyEmailAddress@example.com ')).toBe(
      '84059b07d4be67b806386c0aad8070a23f18836bbaae342275dc0a83414c32ee'
    )
  })
})
