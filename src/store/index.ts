import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [
      { path: '#about', text: 'About' },
      { path: '#experience', text: 'Experience' },
      { path: '#skill', text: 'Skill' },
      { path: '#portfolio', text: 'Portfolio' },
      { path: `/storybook/index.html`, text: 'Blog', isStatic: true },
    ],
    experience: [
      {
        company: 'RE',
        url: '',
        info: 'Create and provide a cashback-cycle-system.',
        title: 'Front-end Engineer',
        period: {
          start: 'June 2018',
          end: 'November 2019',
        },
        description: [
          '',
        ],
      },
      {
        company: 'CrowdInsight',
        url: '',
        info: 'info2',
        title: 'Front-end Engineer',
        period: {
          start: 'October 2017',
          end: 'February 2018',
        },
        description: [
          '',
        ],
      },
      {
        company: 'Lovemove',
        url: '',
        info: 'info3',
        title: 'Marketing Management',
        period: {
          start: 'October 2017',
          end: 'February 2018',
        },
        description: [
          '',
        ],
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
