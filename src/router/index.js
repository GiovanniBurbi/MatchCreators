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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});

export default router;
