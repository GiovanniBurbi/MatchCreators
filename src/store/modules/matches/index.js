import Vue from 'vue';
import MatchService from '@/services/MatchService';

export default {
  namespaced: true,

  state: {
    matches: [],
    filteredMatches: [],
    loadedMatches: false,
    filters: [],
    filter: {
      type: '',
      icon: '',
      msg: null,
    },
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

    addFilter(state, newFilter) {
      Vue.set(state.filter, 'type', newFilter.type);
      Vue.set(state.filter, 'icon', newFilter.icon);
      Vue.set(state.filter, 'msg', newFilter.msg);
      /* find if there is already a filter like this in filters, if not then push */
      state.filters.push(state.filter);
      state.filter = {
        type: '',
        icon: '',
        msg: null,
      };
    },
    deleteFilter(state, indexFilter) {
      state.filters.splice(indexFilter, 1);
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

    newFilter({ commit, dispatch }, filter) {
      commit('addFilter', filter);
      dispatch('addFilterMatches', filter);
    },
    removeFilter({ commit }, indexFilter) {
      commit('deleteFilter', indexFilter);
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

    getFilters(state) {
      return state.filters;
    },
  },
};
