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
    cardIdSelected: null,
    details: [],
    /* teams skeleton for new match */
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
      /* add player to a team based on the current team selected.
      it is used while creating a new match */
      if (state.teamSelected === 'white') {
        state.teamWhite[state.cardIdSelected].user = user;
      } else {
        state.teamBlack[state.cardIdSelected].user = user;
      }
    },

    addUser(state, user) {
      /* Sdds the user in a default position based on the one selected
      for the profile while register in the authentication page.
      (Used when a new game is being created) */
      let pos = null;
      if (user.position === 'Goalkeeper') {
        pos = 1;
      } else if (user.position === 'Defender') {
        pos = 2;
      } else pos = 4;
      state.teamBlack[pos].user = user;
    },

    removePlayer(state, spot) {
      /* remove a player from the current team selected given the spot */
      if (state.teamSelected === 'white') {
        state.teamWhite[spot].user = {};
      } else {
        state.teamBlack[spot].user = {};
      }
    },

    clearMatchTmp(state) {
      /* resets the tmp variables used while insert the match details and
      player after creating a new match */
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
      /* set the invitation dialog to value. if false then resets the card id selected */
      state.invitationDialog = value;
      if (!value) state.cardIdSelected = null;
    },

    setCardIdSelected(state, value) {
      state.cardIdSelected = value;
    },

    deletePlayerFromOverviewTeam(state, spotId) {
      /* remove player from match overview in vuex state
      and update the fill of the positions based on the spot.
      Used to visualize the updates to the match overview after changes */
      if (state.teamSelected === 'black') {
        state.matchToOverview.teamBlack[spotId].user = {};
      } else state.matchToOverview.teamWhite[spotId].user = {};
      if (state.cardIdSelected === 1) {
        state.matchToOverview.positions.goalkeepers -= 1;
      }
      if (state.cardIdSelected === 2 || state.cardIdSelected === 3) {
        state.matchToOverview.positions.defenders -= 1;
      }
      state.matchToOverview.positions.forwards -= 1;
    },

    setUserIsPresentInOverview(state, value) {
      if (state.userIsPresentInOverview !== value) state.userIsPresentInOverview = value;
    },

    addPlayerInOverviewTeam(state, player) {
      /* add player in match overview in vuex state
      and update the fill of the positions based on the spot.
      Used to visualize the updates to the match overview after changes */
      if (state.teamSelected === 'black') {
        state.matchToOverview.teamBlack[state.cardIdSelected].user = player;
      } else state.matchToOverview.teamWhite[state.cardIdSelected].user = player;
      if (state.cardIdSelected === 1) {
        state.matchToOverview.positions.goalkeepers += 1;
      }
      if (state.cardIdSelected === 2 || state.cardIdSelected === 3) {
        state.matchToOverview.positions.defenders += 1;
      }
      state.matchToOverview.positions.forwards += 1;
    },
  },

  actions: {
    async allMatches({ dispatch, commit, state }) {
      /* sets the loading when dispatch the method to fetch all matches
      from the db */
      commit('setLoading', true);
      await dispatch('fetchAllMatches');
      commit('setFilteredMatches', state.matches);
      commit('setLoading', false);
    },

    async fetchAllMatches({ commit }) {
      /* delegates to match service the fetch of all matches and commit the
      return value in the vuex state */
      const matches = await MatchService.getAllMatches();
      commit('setMatches', matches);
    },

    async updateMatches({
      dispatch, commit, state, rootGetters,
    }) {
      /* dispatch the method to fetch all matches and updates the filtered
      matches with the new filtered matches */
      await dispatch('fetchAllMatches');
      const filteredMatches = MatchService.multipleFilters(state.matches,
        rootGetters['filters/getFilters']);
      commit('setFilteredMatches', filteredMatches);
    },

    addFilterMatches({ state, commit }, newFilter) {
      /* method to delegate to match service the fetch of the matches with the new filter added */
      let matches = null;
      matches = MatchService.filter(state.filteredMatches, newFilter);
      commit('setFilteredMatches', matches);
    },

    multipleFiltersMatch({ state, commit }, filters) {
      /* methods to apply more than one filters, it delegates to match service */
      const matches = MatchService.multipleFilters(state.matches, filters);
      commit('setFilteredMatches', matches);
    },

    async inviteValidation({ state }, playerId) {
      /* delegates to match service the validation of a new player.
      Used in creation of a new match */
      const res = await MatchService.validateNewPlayer(playerId, state.teamWhite, state.teamBlack);
      return res;
    },

    async overviewAddValidation({ state }, playerId) {
      /* delegates to match service the validation of a new player.
      Used in addition to an existing match */
      const res = await MatchService.validateNewPlayer(playerId,
        state.matchToOverview.teamWhite, state.matchToOverview.teamBlack);
      return res;
    },

    async createMatch({
      state, commit, rootGetters,
    }) {
      /* Action to create a match, delegates to match service to write
      in the db and updates the vuex state */
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
      /* action to find all matches of the user. It set up the loading */
      commit('setLoading', true);
      await dispatch('fetchAllMatches');
      await MatchService.findUserMatches(state.matches, rootGetters['auth/getUser'].id)
        .then((res) => {
          commit('setUserMatches', res);
          commit('setLoading', false);
        });
    },

    async updateUserMatches({ state, commit, rootGetters }) {
      /* used to updates the user matches without set up the loading */
      await MatchService.findUserMatches(state.matches, rootGetters['auth/getUser'].id)
        .then((res) => {
          commit('setUserMatches', res);
        });
    },

    selectTeamBasedOnUser({ state, commit, rootGetters }) {
      /* select team based on user. if user is not found, set the team to black as default. */
      const res = MatchService.findPlayerInsideMatch(state.matchToOverview, rootGetters['auth/getUser'].id);
      if (res.isPresent) {
        commit('setTeamSelected', res.team);
      } else commit('setTeamSelected', 'black');
      commit('setUserIsPresentInOverview', res.isPresent);
    },

    async deletePlayerFromMatch({ commit, dispatch, state }, spotId) {
      /* action to remove a player from an existing match. it delegates
      to match service the interaction with the db */
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

    async addPlayerInMatch({ state, commit, dispatch }, player) {
      /* action to add a player in an existing match. it delegates
      to match service the interaction with the db */
      commit('setLoading', true);
      await MatchService.addPlayerInMatch(state.matchToOverview,
        state.teamSelected, state.cardIdSelected, player)
        .then(async () => {
          await dispatch('updateMatches');
          await dispatch('updateUserMatches');
          commit('addPlayerInOverviewTeam', player);
          commit('setLoading', false);
        });
    },

    async addUserInMatch({
      state, commit, dispatch, rootGetters,
    }) {
      /* action to add the user in an existing match. it delegates
      to match service the interaction with the db */
      commit('setLoading', true);
      const user = rootGetters['auth/getUser'];
      await MatchService.addPlayerInMatch(state.matchToOverview,
        state.teamSelected, state.cardIdSelected, user)
        .then(async () => {
          await dispatch('updateMatches');
          await dispatch('updateUserMatches');
          commit('addPlayerInOverviewTeam', user);
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

    getInvitationDialog(state) {
      return state.invitationDialog;
    },

    getCardIdSelected(state) {
      return state.cardIdSelected;
    },

    getUserIsPresentInOverview(state) {
      return state.userIsPresentInOverview;
    },
  },
};
