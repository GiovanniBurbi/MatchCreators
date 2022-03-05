export default {
  namespaced: true,

  state: {
    mode: '',
    section: '',
    loginStatus: false,
  },

  mutations: {
    setAppMode(state, mode) {
      state.mode = mode;
    },
    setAppSection(state, section) {
      state.section = section;
    },

    setLoginStatus(state, logged) {
      state.loginStatus = logged;
    },
  },

  actions: {},

  getters: {
    getAppMode(state) {
      return {
        mode: state.mode,
        section: state.section,
      };
    },

    getLoginStatus(state) {
      return state.loginStatus;
    },
  },
};
