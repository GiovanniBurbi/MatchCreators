import MatchService from '@/services/MatchService';

export default {
  namespaced: true,

  state: {
    matches: [],
    filteredMatches: [],
    userMatches: [],
    matchToOverview: {},
    loading: false,
    matchCreated: false,
    teamSelected: 'black',
    details: ['2022-03-29', '10:30 - 11:30', 'Albereta'],
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
      state.teamSelected = 'black';
      const { teamSize } = MatchService;
      for (let i = 1; i <= teamSize; i += 1) {
        state.teamBlack[i].user = {};
        state.teamWhite[i].user = {};
      }
    },

    setLoading(state, isLoading) {
      state.loading = isLoading;
    },

    setUserMatches(state, matches) {
      state.userMatches = matches;
    },

    setMatchToOverview(state, match) {
      state.matchToOverview = match;
    },

    setMatchCreated(state, value) {
      if (state.matchCreated !== value) state.matchCreated = value;
    },

    setTeamSelected(state, team) {
      if (state.teamSelected !== team) state.teamSelected = team;
    },
  },

  actions: {
    async allMatches({ dispatch, commit, state }) {
      commit('setLoading', true);
      await dispatch('fetchAllMatches');
      commit('setFilteredMatches', state.matches);
      commit('setLoading', false);
    },

    async fetchAllMatches({ commit }) {
      const matches = await MatchService.getAllMatches();
      commit('setMatches', matches);
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
      state, commit, rootGetters,
    }) {
      commit('setLoading', true);
      commit('setMatchCreated', false);
      await MatchService.createMatch(state.details, state.teamBlack, state.teamWhite)
        .then(async () => {
          commit('setLoading', false);
          commit('setMatchCreated', true);
          commit('clearMatchTmp');
          commit('addUser', rootGetters['auth/getUser']);
        });
    },

    async findUserMatches({
      state, commit, dispatch, rootGetters,
    }) {
      commit('setLoading', true);
      await dispatch('fetchAllMatches');
      await MatchService.findUserMatches(state.matches, rootGetters['auth/getUser'])
        .then((res) => {
          commit('setUserMatches', res);
          commit('setLoading', false);
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

    getLoading(state) {
      return state.loading;
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

    getMatchCreated(state) {
      return state.matchCreated;
    },

    getTeamSelected(state) {
      return state.teamSelected;
    },
  },
};
