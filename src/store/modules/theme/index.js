export default {
  namespaced: true,

  state: {
    darkMode: false,
  },

  mutations: {
    setDarkMode(state, isDark) {
      state.darkMode = isDark;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },

  actions: {},

  getters: {
    getTheme(state) {
      return state.darkMode;
    },
  },
};
