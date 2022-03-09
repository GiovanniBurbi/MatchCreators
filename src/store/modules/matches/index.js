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
    userIsPresentInOverview: false,
    invitationDialog: false,
    invitationCardId: null,
    details: [],
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

    addPlayer(state, user) {
      if (state.teamSelected === 'white') {
        state.teamWhite[state.invitationCardId].user = user;
      } else {
        state.teamBlack[state.invitationCardId].user = user;
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

    removePlayer(state, spot) {
      if (state.teamSelected === 'white') {
        state.teamWhite[spot].user = {};
      } else {
        state.teamBlack[spot].user = {};
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

    setInvitationDialog(state, value) {
      state.invitationDialog = value;
      if (!value) state.invitationCardId = null;
    },

    setInvitationCardId(state, value) {
      state.invitationCardId = value;
    },

    deletePlayerFromOverviewTeam(state, spotId) {
      if (state.teamSelected === 'black') {
        state.matchToOverview.blackTeam[spotId].user = {};
      } else state.matchToOverview.whiteTeam[spotId].user = {};
    },

    setUserIsPresentInOverview(state, value) {
      if (state.userIsPresentInOverview !== value) state.userIsPresentInOverview = value;
    },

    addPlayerInOverviewTeam(state, player) {
      if (state.teamSelected === 'black') {
        state.matchToOverview.blackTeam[state.invitationCardId].user = player;
      } else state.matchToOverview.whiteTeam[state.invitationCardId].user = player;
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

    async updateMatches({ dispatch, commit, state }) {
      await dispatch('fetchAllMatches');
      commit('setFilteredMatches', state.matches);
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

    async overviewAddValidation({ state }, playerId) {
      const res = await MatchService.validateNewPlayer(playerId,
        state.matchToOverview.whiteTeam, state.matchToOverview.blackTeam);
      return res;
    },

    async createMatch({
      state, commit, rootGetters,
    }) {
      commit('setLoading', true);
      commit('setMatchCreated', false);
      await MatchService.createMatch(state.details, state.teamBlack, state.teamWhite)
        .then(() => {
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
      await MatchService.findUserMatches(state.matches, rootGetters['auth/getUser'].id)
        .then((res) => {
          commit('setUserMatches', res);
          commit('setLoading', false);
        });
    },

    async updateUserMatches({ state, commit, rootGetters }) {
      await MatchService.findUserMatches(state.matches, rootGetters['auth/getUser'].id)
        .then((res) => {
          commit('setUserMatches', res);
        });
    },

    selectTeamBasedOnUser({ state, commit, rootGetters }) {
      const res = MatchService.findPlayerInsideMatch(state.matchToOverview, rootGetters['auth/getUser'].id);
      if (res.isPresent) {
        commit('setTeamSelected', res.team);
      } else commit('setTeamSelected', 'black');
      commit('setUserIsPresentInOverview', res.isPresent);
    },

    async deletePlayerFromMatch({ commit, dispatch, state }, spotId) {
      commit('setLoading', true);
      await MatchService.deletePlayerInMatch(state.matchToOverview, state.teamSelected, spotId)
        .then(async () => {
          await dispatch('updateMatches');
          await dispatch('updateUserMatches');
          commit('deletePlayerFromOverviewTeam', spotId);
          commit('setUserIsPresentInOverview', false);
          commit('setLoading', false);
        });
    },

    async addPlayerInMatch({ commit }, player) {
      commit('addPlayerInOverviewTeam', player);
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

    getInvitationDialog(state) {
      return state.invitationDialog;
    },

    getInvitationCardId(state) {
      return state.invitationCardId;
    },

    getUserIsPresentInOverview(state) {
      return state.userIsPresentInOverview;
    },
  },
};
