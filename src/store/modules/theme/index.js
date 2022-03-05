export default {
  namespaced: true,

  state: {
    darkMode: false,
  },

  mutations: {
    setDarkMode(state, isDark) {
      state.darkMode = isDark;
    },
  },

  actions: {},

  getters: {
    getTheme(state) {
      return state.darkMode;
    },
  },
};
