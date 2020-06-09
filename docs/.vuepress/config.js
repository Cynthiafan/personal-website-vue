const utils = require('../.vuepress/utils');

module.exports = {
    title: 'CynCode',
    description: '',
    port: 8081,
    themeConfig: {
        smoothScroll: true,
        sidebar: [
            utils.generateSidebar('JavaScript', 'articles/javascript'),
            utils.generateSidebar('資料結構', 'articles/data-structure')
        ],
        locales: {
            '/': {
                nav: [
                    { text: 'About', link: 'https://www.cynthiafan.com' },
                    { text: 'Articles', link: '/articles/' },
                    { text: 'Github', link: 'https://github.com/Cynthiafan' },
                ],
            },
        }
    }
};