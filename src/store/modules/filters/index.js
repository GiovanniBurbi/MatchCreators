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
  },

  mutations: {
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
    removeFilter(state, indexFilter) {
      state.filters.splice(indexFilter, 1);
    },
  },

  actions: {},

  getters: {
    getFilters(state) {
      return state.filters;
    },
  },
};
