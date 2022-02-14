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

  filter(matches, newFilter) {
    if (newFilter.type === 'Location') {
      return this.filterLocation(matches, newFilter.msg);
    }
    if (newFilter.type === 'Position') {
      return this.filterPosition(matches, newFilter.msg);
    }
    if (newFilter.type === 'Date') {
      return this.filterDate(matches, newFilter.msg);
    }
    return this.filterTime(matches, newFilter.msg);
  },

  filterLocation(matches, msg) {
    return matches.filter(
      (match) => match.location.toLowerCase().includes(msg.toLowerCase()),
    );
  },

  filterPosition(matches, msg) {
    let max = null;
    const pos = `${msg}s`;
    if (msg === 'goalkeeper') {
      max = 2;
    } else max = 4;
    return matches.filter(
      (match) => match.positions[pos] < max,
    );
  },

  filterDate(matches, msg) {
    if (msg.length === 1) {
      return matches.filter((match) => match.date === msg[0]);
    } return matches.filter(
      (match) => match.date <= msg[1] && match.date >= msg[0],
    );
  },

  filterTime(matches, msg) {
    return matches.filter(
      (match) => match.startTime >= msg[0] && match.endTime <= msg[1],
    );
  },

  multipleFilters(matches, filters) {
    let filteredMatches = matches;
    filters.forEach((filter) => {
      filteredMatches = this.filter(filteredMatches, filter);
    });
    return filteredMatches;
  },
};
