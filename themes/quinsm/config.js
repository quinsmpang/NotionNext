const CONFIG = {
  // quinsm 主题使用系统字体与主题自带图标字体，无需额外加载 Google Fonts 与 FontAwesome
  FONT_URL: [],
  FONT_AWESOME: '',

  // 关闭主题切换器与调试面板，避免引入额外 DOM、图片和布局偏移
  THEME_SWITCH: false,
  DEBUG: false,

  QUINSM_LOGO_IMG:
    process.env.NEXT_PUBLIC_THEME_QUINSM_LOGO_IMG ||
    '/quinsm/imgs/quinsmpang_logo.png',
  QUINSM_AUTHOR_AVATAR:
    process.env.NEXT_PUBLIC_THEME_QUINSM_AUTHOR_AVATAR ||
    '/quinsm/icon/icon.jpeg',
  QUINSM_FOOTER_TEXT:
    process.env.NEXT_PUBLIC_THEME_QUINSM_FOOTER_TEXT ||
    'Pure with <span class="cute iconfont icon-heart"></span>',
  QUINSM_FOOTER_COPYRIGHT:
    process.env.NEXT_PUBLIC_THEME_QUINSM_FOOTER_COPYRIGHT ||
    '齿轮游戏 版权所有',

  // 是否显示文章封面缩略图（默认关闭，避免 Notion 外链图片引入第三方 Cookie 与布局偏移）
  QUINSM_POST_COVER_ENABLE:
    process.env.NEXT_PUBLIC_THEME_QUINSM_POST_COVER_ENABLE || false,

  // 侧边栏 widget 开关
  QUINSM_SIDEBAR_NAV: true,
  QUINSM_SIDEBAR_HOT_POSTS: true,
  QUINSM_SIDEBAR_TAGS: true,

  // 文章底部提示
  QUINSM_POST_BOTTOM_NOTICE:
    '如对文章内容有疑问请在文章下或者<a href="/guestbook" class="cute">留言板</a>留言。',

  // 菜单配置
  QUINSM_MENU_CATEGORY: true,
  QUINSM_MENU_TAG: true,
  QUINSM_MENU_ARCHIVE: true,
  QUINSM_MENU_SEARCH: true
}

export default CONFIG
