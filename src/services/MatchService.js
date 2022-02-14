import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  fetchMatches() {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(apiClient.get('/matches'));
      }, 500);
    });
    return promise;
  },

  getAllMatches() {
    const promise = new Promise((resolve) => {
      this.fetchMatches().then((resp) => {
        const matches = resp.data.sort(
          (a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          },
        );
        resolve(matches);
      });
    });
    return promise;
  },

};
