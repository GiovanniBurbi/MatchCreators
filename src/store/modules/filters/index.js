import Vue from 'vue';

export default {
  namespaced: true,

  state: {
    filters: [],
    filter: {
      type: '',
      icon: '',
      msg: null,
    },
    currentRemoved: '',
  },

  mutations: {
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
      state.currentRemoved = '';
    },

    clearFilters(state) {
      if (state.filters.length !== 0) {
        state.filters = [];
      }
    },
  },

  actions: {
    newFilter({ commit, dispatch }, filter) {
      commit('addFilter', filter);
      dispatch('matches/addFilterMatches', filter, { root: true });
    },

    removeFilter({ commit, dispatch, state }, indexFilter) {
      commit('deleteFilter', indexFilter);
      dispatch('matches/multipleFiltersMatch', state.filters, { root: true });
    },
  },

  getters: {
    getFilters(state) {
      return state.filters;
    },

    getCurrentRemoved(state) {
      return state.currentRemoved.toLowerCase();
    },
  },
};
