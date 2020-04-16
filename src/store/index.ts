import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [
      { id: 'about', text: 'About' },
      { id: 'experience', text: 'Experience' },
      { id: 'portfolio', text: 'Portfolio' },
      { id: 'contact', text: 'Contact' },
      { id: 'techBlog', text: 'Blog' },
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
