import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    registrationPositionSelection: '',
  },
  mutations: {
    setRgtPosSelection(state, payload) {
      state.registrationPositionSelection = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getRgtPosSelection(state) {
      return state.registrationPositionSelection;
    },
  },
});
