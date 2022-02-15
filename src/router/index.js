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
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
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
