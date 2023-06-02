import Vue from 'vue';
import Vuex from 'vuex';
import { setI18nLocale } from '@/plugins/i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [
      {
        path: '/',
        text: 'home',
        icon: 'lnr-home',
        componentName: 'Landing',
        i18n: true,
      },
      {
        path: '/about',
        text: 'about',
        icon: 'lnr-user',
        componentName: 'About',
        i18n: true,
      },
      {
        path: '/resume',
        text: 'resume',
        icon: 'lnr-briefcase',
        componentName: 'Resume',
        i18n: true,
      },
      {
        path: '/portfolio',
        text: 'portfolio',
        icon: 'lnr-book',
        componentName: 'Portfolio',
        i18n: true,
      },
      // { path: '/contact', text: 'Contact', icon: 'lnr-envelope', componentName: 'Contact' },
    ],
    links: [
      {
        key: 'linkedIn',
        url: 'https://www.linkedin.com/in/fanyatang/',
        icon: ['fab', 'linkedin-in'],
      },
      {
        key: 'github',
        url: 'https://github.com/Cynthiafan',
        icon: ['fab', 'github'],
      },
      {
        key: 'email',
        url: 'mailto:cynthiafan1230@gmail.com',
        icon: ['far', 'envelope'],
      },
    ],
    information: [
      { title: 'Location', value: 'location', i18n: true },
      { title: 'e-mail', value: 'cynthiafan1230@gmail.com' },
      { title: 'Status', value: '👋 HIRABLE' },
    ],
    testimonials: [
      {
        author: 'Kent Jian',
        company: 'kentTitle',
        content: 'kentTestimonial',
        i18n: true,
      },
    ],
    skills: [
      { label: 'Vue.js', value: '90%' },
      { label: 'Nuxt.js', value: '90%' },
      { label: 'Pinia/Vuex', value: '80%' },
      { label: 'JavaScript', value: '90%' },
      { label: 'HTML5', value: '90%' },
      { label: 'CSS3', value: '80%' },
      { label: 'Unit test', value: '75%' },
      { label: 'D3.js', value: '65%' },
      { label: 'Node.js/Express', value: '50%' },
    ],
    preloaderMs: 3000,
    knowledgeTags: [
      'Git/Git flow',
      'Github Actions',
      'Docker',
      'Rollup',
      'Storybook',
      'Vuepress',
      'Functional Programming',
      'Heroku',
      'Netlify',
      'AWS EC2',
      'Google Analytics',
      'Google Search Console',
      'Google Ad Manager',
      'Figma',
      'Sense of UI/UX',
    ],
    education: [
      {
        company: 'colleage',
        title: 'department',
        period: {
          start: '2010',
          end: '2014',
        },
        description: 'colleageDescription',
        i18n: true,
      },
      {
        company: 'koreaUniversity',
        title: 'koreanLanguageCenter',
        period: {
          start: '2014',
          end: '2015',
        },
        description: 'languageCenterDescription',
        i18n: true,
      },
    ],
    experience: [
      {
        company: 'aotter',
        url: 'https://aotter.net/',
        title: 'frontendEngineer',
        period: {
          start: '2020',
          end: '2023',
        },
        description: 'aotterJD',
        i18n: true,
      },
      {
        company: 'iStaging',
        url: 'https://www.istaging.com/',
        title: 'frontendEngineer',
        period: {
          start: '2020',
          end: '2020',
        },
        description: 'iStagingJD',
        i18n: true,
      },
      {
        company: 're',
        url: 'https://myre.life/',
        title: 'frontendEngineer',
        period: {
          start: '2018',
          end: '2019',
        },
        description: 'reJD',
        i18n: true,
      },
      {
        company: 'crowdinsight',
        url: 'https://www.crowdinsight.com.tw/',
        title: 'frontendEngineer',
        period: {
          start: '2017',
          end: '2018',
        },
        description: 'ciJD',
        i18n: true,
      },
      {
        company: 'lovemove',
        url: 'https://www.facebook.com/VolleyCube',
        title: 'marketingManagement',
        period: {
          start: '2016',
          end: '2017',
        },
        description: 'lmJD',
        i18n: true,
      },
    ],
    certificates: [
      {
        title: 'topik',
        logo: '',
        logoAlt: 'TOPIK',
        id: 'Level 3',
        year: '2015',
        i18n: true,
      },
    ],
    languages: [
      { label: 'mandarin', text: 'native', value: '100%', i18n: true },
      { label: 'english', text: 'intermediate', value: '70%', i18n: true },
      { label: 'korean', text: 'conversational', value: '40%', i18n: true },
    ],
    portfolio: [
      {
        title: 'techBlog',
        img: 'portfolio-blog.png',
        tags: ['vuepress', 'netlify'],
        repoUrl: 'https://github.com/Cynthiafan/tech-blog',
        action: {
          text: 'Visit',
          type: 'url',
          url: 'https://blog.cynthiafan.com',
        },
        i18n: true,
      },
      {
        title: 'components',
        img: 'portfolio-component.png',
        tags: ['storybook', 'd3.js'],
        repoUrl: 'https://github.com/Cynthiafan/personal-website-vue',
        action: {
          text: 'Visit',
          type: 'url',
          url: '/storybook',
        },
        i18n: true,
      },
      {
        title: 'seoulTravel',
        img: 'portfolio-line-bot.jpg',
        tags: ['line bot', 'express', 'mLab', 'heroku'],
        repoUrl: 'https://github.com/Cynthiafan/line-bot-api',
        action: {
          text: 'View Demo',
          type: 'video',
          video: 'portfolio-line-bot.gif',
        },
        i18n: true,
      },
      {
        title: 'mrStock',
        img: 'portfolio-line-notify.jpg',
        tags: ['line notify', 'Google Apps Script'],
        repoUrl: '',
        action: {
          text: 'View Note',
          type: 'url',
          url:
            'https://blog.cynthiafan.com/posts/lets-do-it/line-notify-gas.html',
        },
        i18n: true,
      },
      // {
      //   title: 'freecell',
      //   img: 'portfolio-freecell.png',
      //   tags: ['vue', 'fp'],
      //   repoUrl: 'https://github.com/Cynthiafan/personal-website-vue/tree/master/src/views/FreeCell',
      //   action: {
      //     text: 'Visit', type: 'url', url: '/f2e-challenge/free-cell',
      //   },
      //   i18n: true,
      // },
      {
        title: 'personalWeb',
        img: 'portfolio-personal-web.png',
        tags: ['vue', 'i18n', 'netlify'],
        url: '',
        repoUrl: 'https://github.com/Cynthiafan/personal-website-vue',
        i18n: true,
      },
    ],
    locale: 'en',
  },
  getters: {
    blocks: (state) => state.blocks,
    locale: (state) => state.locale,
  },
  mutations: {
    SWITCH_LOCALE(state, lang) {
      state.locale = lang;
    },
  },
  actions: {
    switchLocale({ commit }, lang) {
      commit('SWITCH_LOCALE', lang);
      setI18nLocale(lang);
    },
  },
  modules: {},
});
