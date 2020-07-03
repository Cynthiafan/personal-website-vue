import Vue from 'vue';
import VueRouter from 'vue-router';
import { lazyLoading, fetchComponent } from '@/utils/router.utils';
import store from '@/store';

const blocks = store.getters.blocks;
const homepageChildren = blocks.map((block: any) => {
  return {
    path: block.path.replace('/', ''),
    name: block.text,
    component: fetchComponent(block.componentName, 'HomepageTemplate'),
  };
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: lazyLoading('Home'),
    children: homepageChildren,
  },
  // {
  //   path: '/f2e-challenge/free-cell',
  //   name: 'freeCell',
  //   component: lazyLoading('FreeCell', true),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
