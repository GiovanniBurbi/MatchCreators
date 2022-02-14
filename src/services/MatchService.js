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
  getAllMatches() {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(apiClient.get('/matches'));
      }, 500);
    });
    return promise;
  },
};
