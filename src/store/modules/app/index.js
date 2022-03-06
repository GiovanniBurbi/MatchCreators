export default {
  namespaced: true,

  state: {
    mode: '',
    section: '',
  },

  mutations: {
    setAppMode(state, mode) {
      state.mode = mode;
    },
    setAppSection(state, section) {
      state.section = section;
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
  },
};
