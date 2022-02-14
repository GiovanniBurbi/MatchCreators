import MatchService from '@/services/MatchService';

export default {
  namespaced: true,

  state: {
    matches: [],
    loadedMatches: false,
  },

  mutations: {
    setMatches(state, allGames) {
      state.matches = allGames;
    },

    setLoaded(state, val) {
      state.loadedMatches = val;
    },
  },

  actions: {
    async allMatches({ commit }) {
      await MatchService.getAllMatches().then(
        (response) => {
          commit('setMatches', response.data);
          commit('setLoaded', true);
        },
      );
    },
  },

  getters: {
    getMatches(state) {
      return state.matches;
    },
    getStatusMatches(state) {
      return state.loadedMatches;
    },
  },
};
