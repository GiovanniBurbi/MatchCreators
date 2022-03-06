export default {
  namespaced: true,

  state: {
    darkMode: false,
  },

  mutations: {
    setDarkMode(state, isDark) {
      if (isDark !== state.darkMode) state.darkMode = isDark;
    },
  },

  actions: {},

  getters: {
    getDarkMode(state) {
      return state.darkMode;
    },
  },
};
