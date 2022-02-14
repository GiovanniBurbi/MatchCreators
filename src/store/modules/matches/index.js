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
      const matches = await MatchService.getAllMatches();
      commit('setMatches', matches);
      commit('setLoaded', true);
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
