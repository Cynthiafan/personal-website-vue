import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [
      { path: '/', text: 'Home', icon: 'lnr-home', componentName: 'Landing' },
      { path: '/about', text: 'About', icon: 'lnr-user', componentName: 'About' },
      { path: '/resume', text: 'Resume', icon: 'lnr-briefcase', componentName: 'Resume' },
      { path: '/portfolio', text: 'Portfolio', icon: 'lnr-book', componentName: 'Portfolio' },
      // { path: '/contact', text: 'Contact', icon: 'lnr-envelope', componentName: 'Contact' },
    ],
    links: [
      { key: 'linkedIn', url: 'https://www.linkedin.com/in/fanyatang/', icon: ['fab', 'linkedin-in'] },
      { key: 'github', url: 'https://github.com/Cynthiafan', icon: ['fab', 'github'] },
      { key: 'email', url: 'mailto:cynthiafan1230@gmail.com', icon: ['far', 'envelope'] },
    ],
    information: [
      { title: 'Location', value: 'Taipei, Taiwan' },
      { title: 'e-mail', value: 'cynthiafan1230@gmail.com' },
      { title: 'Status', value: 'HIRABLE' },
    ],
    testimonials: [
      {
        author: 'Kent Jian',
        company: 'CTO of RE Co., Ltd.',
        content: `Cynthia 在個人特質方面，文靜但不怯場，各種需表達的場合皆具有良好的表達與敘事能力，與同事合作共事氣氛十分融洽。
        在工作表現方面，思緒周延且具宏觀視野，做事細心有條理，是能分擔上司工作又能讓上司放心交辦重要任務的好夥伴。
        在專業技能方面，擁有扎實的 JavaScript 開發技能，具備有前端工程師應有的知識與技能，更難能可貴的是積極的充實自我，是個有實力又潛力無限的優秀工程師！`,
      },
    ],
    skills: [
      { label: 'Vue.js', value: '90%' },
      { label: 'JavaScript', value: '85%' },
      { label: 'HTML5/Pug', value: '90%' },
      { label: 'CSS3/SCSS', value: '80%' },
      { label: 'D3.js', value: '65%' },
      { label: 'Node.js/Express', value: '40%' },
      { label: 'Mongo/Mongoose', value: '30%' },
    ],
    preloaderMs: 3000,
    knowledgeTags: ['Git/Git flow', 'storybook', 'vuepress', 'fp', 'Heroku', 'Netlify', 'AWS EC2', 'Google Apps Script', 'Adobe XD', 'Sketch', 'MacOs', 'Social Marketing', 'Google analytics', 'Sense of UI/UX'],
    experience: [
      {
        company: 'RE',
        url: '',
        title: 'Front-end Engineer',
        period: {
          start: '2018',
          end: '2019',
        },
        description: 'Participated in brainstorming of products, discussed UI/UX design with other front-end developers and visual designers, worked to achieve improved user experiences and program structure.',
      },
      {
        company: 'CrowdInsight',
        url: '',
        title: 'Front-end Engineer',
        period: {
          start: '2017',
          end: '2018',
        },
        description: 'Built websites and initiated coding style guide with other front-end developers.',
      },
      {
        company: 'Lovemove',
        url: '',
        title: 'Marketing Management',
        period: {
          start: '2016',
          end: '2017',
        },
        description: 'Formulated the marketing plan of social media pages and implemented them with colleagues.',
      },
    ],
    certificates: [
      { title: 'Test of Proficiency in Korean', logo: '', logoAlt: 'TOPIK', id: 'Level 3', year: '2015' },
    ],
    languages: [
      { label: 'Mandarin', text: 'Native', value: '100%' },
      { label: 'English', text: 'Intermediate', value: '70%' },
      { label: 'Korean', text: 'Conversational', value: '40%' },
    ],
    portfolio: [
      {
        title: 'Tech Blog',
        img: 'blog.png',
        tags: ['vuepress', 'netlify'],
        repoUrl: 'https://github.com/Cynthiafan/tech-blog',
        action: {
          text: 'Visit', type: 'url', url: 'https://blog.cynthiafan.com',
        },
      },
      {
        title: 'Components',
        img: 'component.png',
        tags: ['storybook', 'd3.js'],
        repoUrl: 'https://github.com/Cynthiafan/personal-website-vue',
        action: {
          text: 'Visit', type: 'url', url: 'https://cynthiafan.com/storybook',
        },
      },
      {
        title: 'Seoul Travel',
        img: 'line-notify.jpg',
        tags: ['line bot', 'express', 'mLab', 'heroku'],
        repoUrl: 'https://github.com/Cynthiafan/line-bot-api',
        action: {
          text: 'View Demo', type: 'video', video: 'line-bot.gif',
        },
      },
      {
        title: 'Mr.Stock',
        img: 'line-notify.jpg',
        tags: ['line notify', 'Google Apps Script'],
        repoUrl: '',
        action: {
          text: 'View Note', type: 'url', url: 'https://blog.cynthiafan.com/posts/lets-do-it/line-notify-gas.html',
        },
      },
      {
        title: 'Freecell',
        img: 'freecell.png',
        tags: ['vue'],
        repoUrl: 'https://github.com/Cynthiafan/personal-website-vue/tree/master/src/views/FreeCell',
        action: {
          text: 'Visit', type: 'url', url: 'https://cynthiafan.com/f2e-challenge/free-cell',
        },
      },
      {
        title: 'Personal Website -- HERE',
        img: 'blog.png',
        tags: ['vue', 'netlify'],
        url: '',
        repoUrl: 'https://github.com/Cynthiafan/personal-website-vue',
      },
    ],
  },
  getters: {
    blocks: (state) => state.blocks,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
