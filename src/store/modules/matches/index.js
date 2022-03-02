import Vue from 'vue';
import MatchService from '@/services/MatchService';

export default {
  namespaced: true,

  state: {
    matches: [],
    filteredMatches: [],
    loadedMatches: false,
    userMatches: [],
    loadingUserMatches: false,
    filters: [],
    filter: {
      type: '',
      icon: '',
      msg: null,
    },
    currentRemoved: null,
    loading: false,
    details: ['2001-01-01', '10:00 - 11:00', 'Albereta'],
    teamBlack: [
      { team: 'Black' },
      {
        id: 1,
        user: {},
      },
      {
        id: 2,
        user: {},
      },
      {
        id: 3,
        user: {},
      },
      {
        id: 4,
        user: {},
      },
      {
        id: 5,
        user: {},
      },
    ],
    teamWhite: [
      { team: 'White' },
      {
        id: 1,
        user: {},
      },
      {
        id: 2,
        user: {},
      },
      {
        id: 3,
        user: {},
      },
      {
        id: 4,
        user: {},
      },
      {
        id: 5,
        user: {},
      },
    ],
  },

  mutations: {
    setMatches(state, allGames) {
      state.matches = allGames;
    },

    setFilteredMatches(state, games) {
      state.filteredMatches = games;
    },

    setLoadedMatches(state, val) {
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

    addPlayer(state, payload) {
      if (payload.isWhite) {
        state.teamWhite[payload.spot].user = payload.user;
      } else {
        state.teamBlack[payload.spot].user = payload.user;
      }
    },

    removePlayer(state, payload) {
      if (payload.isWhite) {
        state.teamWhite[payload.spot].user = {};
      } else {
        state.teamBlack[payload.spot].user = {};
      }
    },

    clearMatchTmp(state) {
      state.details = [];
      const { teamSize } = MatchService;
      for (let i = 1; i <= teamSize; i += 1) {
        state.teamBlack[i].user = {};
        state.teamWhite[i].user = {};
      }
    },

    setLoading(state, isLoading) {
      state.loading = isLoading;
    },

    setLoadingUserMatches(state, isLoading) {
      state.loadingUserMatches = isLoading;
    },

    setUserMatches(state, matches) {
      state.userMatches = matches;
    },
  },

  actions: {
    async allMatches({ commit }) {
      const matches = await MatchService.getAllMatches();
      commit('setMatches', matches);
      commit('setFilteredMatches', matches);
      commit('setLoadedMatches', true);
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

    async inviteValidation({ state }, playerId) {
      const res = await MatchService.validateNewPlayer(playerId, state.teamWhite, state.teamBlack);
      return res;
    },

    async createMatch({ state, commit, dispatch }) {
      commit('setLoading', true);
      await MatchService.createMatch(state.details, state.teamBlack, state.teamWhite)
        .then(async () => {
          await dispatch('allMatches');
          commit('clearMatchTmp');
          commit('setLoading', false);
          await dispatch('findUserMatches');
        });
    },

    async findUserMatches({
      state, commit, dispatch, rootGetters,
    }) {
      commit('setLoadingUserMatches', true);
      if (!state.loadedMatches) {
        await dispatch('allMatches');
      }
      await MatchService.findUserMatches(state.matches, rootGetters['auth/getUser'])
        .then((res) => {
          commit('setUserMatches', res);
          commit('setLoadingUserMatches', false);
        });
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

    getNumPlayers(state) {
      return MatchService.countParticipants(state.teamBlack, state.teamWhite);
    },

    getTeamBlack(state) {
      return state.teamBlack;
    },

    getTeamWhite(state) {
      return state.teamWhite;
    },

    getLoading(state) {
      return state.loading;
    },

    getLoadingUserMatches(state) {
      return state.loadingUserMatches;
    },

    getUserMatches(state) {
      return state.userMatches;
    },
  },
};
