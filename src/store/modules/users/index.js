import UserService from '@/services/UserService';

export default {
  namespaced: true,

  state: {
    users: null,
  },

  mutations: {
    setUsers(state, usersData) {
      state.users = usersData;
    },
  },

  actions: {
    async getAllUsers({ commit }) {
      const res = await UserService.getUsers();
      const usersData = res.data;
      commit('setUsers', usersData);
    },
  },

  getters: {
    getUsers(state) {
      return state.users;
    },
  },
};
