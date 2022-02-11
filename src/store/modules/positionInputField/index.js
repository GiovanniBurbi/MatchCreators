export default {
  namespaced: true,

  state: {
    positionSelection: '',
  },

  mutations: {
    setPosSelection(state, payload) {
      state.positionSelection = payload;
    },
  },

  actions: {},

  getters: {
    getPosSelection(state) {
      return state.positionSelection;
    },
  },
};
