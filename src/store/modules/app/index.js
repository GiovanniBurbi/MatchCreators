export default {
  namespaced: true,

  state: {
    mode: '',
    section: '',
    overview: false,
  },

  mutations: {
    setAppMode(state, mode) {
      if (state.mode !== mode) {
        state.mode = mode;
        state.section = '';
      }
    },
    setAppSection(state, section) {
      if (state.section !== section) {
        state.section = section;
      }
    },
    setOverview(state, value) {
      state.overview = value;
    },
  },

  actions: {},

  getters: {
    isFinder(state) {
      if (state.mode === 'finder') return true;
      return false;
    },

    isCreator(state) {
      if (state.mode === 'creator') return true;
      return false;
    },

    isAuth(state) {
      if (state.mode === 'authentication') return true;
      return false;
    },

    isMyMatches(state) {
      if (state.section === 'my-matches') return true;
      return false;
    },

    isMatchOverview(state) {
      return state.overview;
    },
  },
};
