import Vue from 'vue';
import VueRouter from 'vue-router';
import Authentication from '../views/Authentication.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication,
  },
  {
    path: '/finder',
    name: 'Finder',
    component: () => import(/* webpackChunkName: "about" */ '../views/Finder.vue'),
  },
  {
    path: '/creator',
    name: 'Creator',
    component: () => import(/* webpackChunkName: "about" */ '../views/Creator.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});

export default router;
