import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouterOptions, RouteConfig } from 'vue-router';
import { lazyLoading } from '@/utils/router.utils';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyLoading('Home'),
  },
  {
    path: '/f2e-challenge/free-cell',
    name: 'freeCell',
    component: lazyLoading('FreeCell', true),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
