import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/index';
import positionInputField from './modules/positionInputField/index';
import filters from './modules/filters/index';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    posInputField: positionInputField,
    auth,
    filters,
  },
  getters: {
  },
});
