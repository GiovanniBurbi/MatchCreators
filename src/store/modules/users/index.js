import UserService from '@/services/UserService';

export default {
  namespaced: true,

  state: {
    users: null,
    loading: false,
  },

  mutations: {
    setUsers(state, usersData) {
      state.users = usersData;
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },

  actions: {
    async fetchAllUsers({ commit }) {
      commit('setLoading', true);
      const res = await UserService.getUsers();
      const usersData = res.data;
      commit('setUsers', usersData);
      commit('setLoading', false);
    },
  },

  getters: {
    getUsers(state) {
      return state.users;
    },

    getLoading(state) {
      return state.loading;
    },
  },
};
