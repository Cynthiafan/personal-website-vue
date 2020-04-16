module.exports = {
    title: 'Cynthia\'s Tech Blog',
    description: '',
    port: 8081,
    locales: {
        '/': {
            lang: 'zh-TW',
            title: 'Cyncode',
            description: 'Cynthia Fan 個人網站',
        },
        '/en/': {
            lang: 'en-US',
            title: 'Cyncode',
            description: 'Cynthia Fan\'s page',
        },
    },
    themeConfig: {
        locales: {
            '/': {
                selectText: '選擇語言',
                label: '繁體中文',
                nav: [
                    { text: '關於', link: '/about'},
                    { text: '作品集', link: '/portfolio'},
                    { text: '技術文章', link: '/blog' },
                ],
            },
            '/en/': {
                selectText: 'Language',
                label: 'English',
                nav: [
                    { text: 'About Me', link: '/about'},
                    { text: 'Portfolio', link: '/portfolio'},
                    { text: 'Tech Blog', link: '/blog' },
                ],
            },
        }
    }
}