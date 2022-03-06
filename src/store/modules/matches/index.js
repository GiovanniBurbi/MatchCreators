import MatchService from '@/services/MatchService';

export default {
  namespaced: true,

  state: {
    matches: [],
    filteredMatches: [],
    loadedMatches: false,
    userMatches: [],
    loadingUserMatches: false,
    matchToOverview: {},
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

    addUser(state, user) {
      let pos = null;
      if (user.position === 'Goalkeeper') {
        pos = 1;
      } else if (user.position === 'Defender') {
        pos = 2;
      } else pos = 4;
      state.teamBlack[pos].user = user;
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

    setMatchToOverview(state, match) {
      state.matchToOverview = match;
    },
  },

  actions: {
    async allMatches({ commit }) {
      commit('setLoadedMatches', false);
      const matches = await MatchService.getAllMatches();
      commit('setMatches', matches);
      commit('setFilteredMatches', matches);
      commit('setLoadedMatches', true);
    },

    addFilterMatches({ state, commit }, newFilter) {
      let matches = null;
      matches = MatchService.filter(state.filteredMatches, newFilter);
      commit('setFilteredMatches', matches);
    },

    multipleFiltersMatch({ state, commit }, filters) {
      const matches = MatchService.multipleFilters(state.matches, filters);
      commit('setFilteredMatches', matches);
    },

    async inviteValidation({ state }, playerId) {
      const res = await MatchService.validateNewPlayer(playerId, state.teamWhite, state.teamBlack);
      return res;
    },

    async createMatch({
      state, commit, dispatch, rootGetters,
    }) {
      commit('setLoading', true);
      await MatchService.createMatch(state.details, state.teamBlack, state.teamWhite)
        .then(async () => {
          await dispatch('allMatches');
          commit('clearMatchTmp');
          commit('addUser', rootGetters['auth/getUser']);
          commit('setLoading', false);
          await dispatch('findUserMatches');
        });
    },

    async findUserMatches({
      state, commit, dispatch, rootGetters,
    }) {
      commit('setLoadingUserMatches', true);
      await dispatch('allMatches');
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

    getMatchToOverview(state) {
      return state.matchToOverview;
    },

    getIsOverview(state) {
      if (Object.keys(state.matchToOverview).length !== 0) {
        return true;
      } return false;
    },
  },
};
