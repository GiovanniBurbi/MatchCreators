import UserService from '@/services/UserService';

export default {
  namespaced: true,

  state: {
    user: null,
    loginStatus: false,
  },

  mutations: {
    setUser(state, userData) {
      /* sets the user in vuex storage and save it in the local storage of the browser.
      To use it after refresh */
      state.user = userData;
      const credentials = { name: userData.username, psw: userData.password };
      localStorage.setItem('userInfo', JSON.stringify(credentials));
    },

    setLoginStatus(state, logged) {
      if (state.loginStatus !== logged) state.loginStatus = logged;
    },
  },

  actions: {
    async login({ commit }, credentials) {
      /* get user using credentials, if not null return true, else false */
      if (!credentials) {
        return null;
      }
      commit('setLoginStatus', false);
      /* verify if there is a user that match the credentials provided */
      const res = await UserService.getUser(credentials);
      const userData = res.data[0];
      if (userData) {
        commit('setUser', userData);
        commit('setLoginStatus', true);
        return true;
      } return false;
    },

    async signup({ commit }, userData) {
      /* register user in db */
      await UserService.registerUser(userData);
      /* set the user in the vuex auth/state */
      commit('setUser', userData);
      commit('setLoginStatus', true);
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    getLoginStatus(state) {
      return state.loginStatus;
    },
  },
};
