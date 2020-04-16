export default {
  '/': {
    selectText: '選擇語言',
    label: '繁體中文',
    nav: [
      { text: '關於', link: '/about'},
      { text: '文章', link: '/blog' },
      { text: 'Github', link: 'https://github.com/Cynthiafan' },
      { 
        text: 'Languages', 
        ariaLabel: 'Language Menu',
        items: [
            { text: '繁體中文', link: '/zhTW' },
            { text: 'English', link: '/en' }
        ]
      }
    ],
  },
  '/en/': {
    selectText: 'Language',
    label: 'English',
    nav: [
      { text: 'About Me', link: '/about'},
      { text: 'Articles', link: '/blog' },
      { text: 'Github', link: 'https://github.com/Cynthiafan' },
      { 
        text: 'Languages', 
        ariaLabel: 'Language Menu',
        items: [
            { text: '繁體中文', link: '/zhTW' },
            { text: 'English', link: '/en' }
        ]
      }
    ],
  },

}