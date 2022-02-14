import MatchService from '@/services/MatchService';

export default {
  namespaced: true,

  state: {
    matches: [],
    filteredMatches: [],
    loadedMatches: false,
  },

  mutations: {
    setMatches(state, allGames) {
      state.matches = allGames;
    },

    setFilteredMatches(state, games) {
      state.filteredMatches = games;
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

    async addFilterMatches({ state, commit }, newFilter) {
      let matches = null;
      if (state.filteredMatches.length === 0) {
        matches = MatchService.filter(state.matches, newFilter);
      } else {
        matches = MatchService.filter(state.filteredMatches, newFilter);
      }
      commit('setFilteredMatches', matches);
    },
  },

  getters: {
    getMatches(state) {
      return state.matches;
    },

    getFilteredMatches(state) {
      return state.filteredMatches;
    },

    getStatusMatches(state) {
      return state.loadedMatches;
    },
  },
};
