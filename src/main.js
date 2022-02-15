import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

/* re-authenticate user on refresh getting user info from the local storage */
store.dispatch('auth/login', JSON.parse(localStorage.getItem('userInfo'))).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
});
