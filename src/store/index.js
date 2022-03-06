import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/index';
import positionInputField from './modules/positionInputField/index';
import matches from './modules/matches/index';
import users from './modules/users/index';
import theme from './modules/theme/index';
import app from './modules/app/index';

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
    matches,
    users,
    app,
    theme,
  },
  getters: {
  },
});
