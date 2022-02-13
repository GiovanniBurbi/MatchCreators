import UserService from '@/services/UserService';

export default {
  namespaced: true,

  state: {
    user: null,
  },

  mutations: {
    setUser(state, userData) {
      state.user = userData;
      const credentials = { name: userData.username, psw: userData.password };
      localStorage.setItem('userInfo', JSON.stringify(credentials));
    },
  },

  actions: {
    async login({ commit }, credentials) {
      /* get user using credentials, if not null return true, else false */
      if (!credentials) {
        return null;
      }
      const res = await UserService.getUser(credentials);
      const userData = res.data[0];
      if (userData) {
        commit('setUser', userData);
        return true;
      } return false;
    },

    async signup({ commit }, userData) {
      /* register user in db */
      await UserService.registerUser(JSON.stringify(userData));
      /* set the user in the vuex auth/state */
      commit('setUser', userData);
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
  },
};
