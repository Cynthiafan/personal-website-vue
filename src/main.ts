import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAnalytics from 'vue-analytics';

import { BootstrapVue } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faQuoteRight, faVolleyballBall, faPuzzlePiece, faFilm, faGlobe } from '@fortawesome/free-solid-svg-icons';

import i18n from './plugins/i18n';
import '@/mixins';

library.add(faGithub, faLinkedinIn, faEnvelope, faQuoteRight, faVolleyballBall, faPuzzlePiece, faFilm, faGlobe);

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-91843640-4',
    router,
  });
}

Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
