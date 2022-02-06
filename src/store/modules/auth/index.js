export default {
  namespaced: true,

  state: {
    user: null,
  },

  mutations: {
    setUser(state, userData) {
      state.user = userData;
    },
  },

  actions: {
    async login({ commit }, credentials) {
      /* const user = await userService.attempt(credentials); */
      const res = await fetch('backend.json');
      const data = await res.json();
      console.log(data);
      /* const user = data.(search for user using credentials),
      if user null fail, else success and commit */
      const result = credentials.username !== '' && credentials.psw !== '';
      if (result) {
        commit('setUser', 'user');
        return true;
      } return false;
    },

    async signup({ commit }, userData) {
      /* const result = await userService.register(userData); */

      /* write in json the new user */
      commit('setUser', userData);
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
  },
};
