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
    currentRemoved: null,
    details: ['2001-01-01', 'test', 'test'],
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
      /* Needed for reactivity for Vue */
      Vue.set(state.filter, 'type', newFilter.type);
      Vue.set(state.filter, 'icon', newFilter.icon);
      Vue.set(state.filter, 'msg', newFilter.msg);
      state.filters.push(state.filter);
      state.filter = {
        type: '',
        icon: '',
        msg: null,
      };
    },

    deleteFilter(state, indexFilter) {
      const removed = state.filters.splice(indexFilter, 1);
      state.currentRemoved = removed[0].type;
    },

    resetCurrentDeleted(state) {
      state.currentRemoved = null;
    },

    clearFilters(state) {
      state.filters = [];
    },

    setDetails(state, details) {
      state.details = details.slice();
    },
  },

  actions: {
    async allMatches({ commit }) {
      const matches = await MatchService.getAllMatches();
      commit('setMatches', matches);
      commit('setLoaded', true);
    },

    addFilterMatches({ state, commit }, newFilter) {
      let matches = null;
      if (state.filteredMatches.length === 0) {
        matches = MatchService.filter(state.matches, newFilter);
      } else {
        matches = MatchService.filter(state.filteredMatches, newFilter);
      }
      commit('setFilteredMatches', matches);
    },

    multipleFiltersMatch({ state, commit }) {
      const matches = MatchService.multipleFilters(state.matches, state.filters);
      commit('setFilteredMatches', matches);
    },

    newFilter({ commit, dispatch }, filter) {
      commit('addFilter', filter);
      dispatch('addFilterMatches', filter);
    },
    removeFilter({ commit, dispatch }, indexFilter) {
      commit('deleteFilter', indexFilter);
      dispatch('multipleFiltersMatch');
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

    getCurrentRemoved(state) {
      return state.currentRemoved;
    },

    getDetails(state) {
      return state.details;
    },
  },
};
