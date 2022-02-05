import Vue from 'vue';
import Vuex from 'vuex';
import positionInputField from './modules/positionInputField/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    posInputField: positionInputField,
  },
  getters: {
  },
});
