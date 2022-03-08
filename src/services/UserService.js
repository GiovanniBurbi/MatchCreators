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
  /* Method that search with a delay of 0.5s if
  given an username and password there is one user
  in the fake database. */
  getUser({ name, psw }) {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(apiClient.get('/users', {
          params: { username: name, password: psw },
        }));
      }, 500);
    });
    return promise;
  },

  registerUser(userData) {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(apiClient.post('/users', userData));
      }, 500);
    });
    return promise;
  },

  getUsers() {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(apiClient.get('/users'));
      }, 1000);
    });
    return promise;
  },
};
