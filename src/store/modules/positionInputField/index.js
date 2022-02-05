export default {
  state: {
    registrationPositionSelection: '',
  },
  mutations: {
    setRgtPosSelection(state, payload) {
      state.registrationPositionSelection = payload;
    },
  },
  actions: {},
  getters: {
    getRgtPosSelection(state) {
      return state.registrationPositionSelection;
    },
  },
};
