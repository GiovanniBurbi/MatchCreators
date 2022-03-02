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
  teamSize: 5,

  /* fetch all matches from fake db, emulated a delay to get data */
  fetchMatches() {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(apiClient.get('/matches'));
      }, 500);
    });
    return promise;
  },

  getAllMatches() {
    /* call method to get all matches, and then sort by date
    May change the default order */
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
    /* switch to the right handler based on filter type */
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

  /* Handlers of filters, need to may a better filtering feature in the future */
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

  validateNewPlayer(playerId, teamWhite, teamBlack) {
    let duplicate = false;
    for (let i = 1; i <= this.teamSize; i += 1) {
      if (teamBlack[i].user.id === playerId || teamWhite[i].user.id === playerId) {
        duplicate = true;
        break;
      }
    }
    return !duplicate;
  },

  countParticipants(teamBlack, teamWhite) {
    let count = 0;
    for (let i = 1; i <= this.teamSize; i += 1) {
      if (!(teamBlack[i].user && Object.keys(teamBlack[i].user).length === 0
      && teamBlack[i].user.constructor === Object)) {
        count += 1;
      }
      if (!(teamWhite[i].user && Object.keys(teamWhite[i].user).length === 0
      && teamWhite[i].user.constructor === Object)) {
        count += 1;
      }
    }
    return count;
  },

  isEmpty(obj) {
    if (obj && Object.keys(obj).length === 0 && obj.constructor === Object) return true;
    return false;
  },

  createMatch(details, teamBlack, teamWhite) {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        const date = details[0];
        const location = details[2];
        const times = details[1].split(' - ');
        const positions = {
          goalkeepers: 0,
          defenders: 0,
          forwards: 0,
        };
        for (let i = 1; i <= this.teamSize; i += 1) {
          if (!this.isEmpty(teamBlack[i].user)) {
            positions[this.extractPositions(i)] += 1;
          }
          if (!this.isEmpty(teamWhite[i].user)) {
            positions[this.extractPositions(i)] += 1;
          }
        }

        const match = {
          date,
          startTime: times[0],
          endTime: times[1],
          location,
          positions,
          blackTeam: teamBlack,
          whiteTeam: teamWhite,
        };

        const matchData = JSON.stringify(match);
        resolve(apiClient.post('/matches', matchData));
      }, 500);
    });
    return promise;
  },

  extractPositions(index) {
    if (index === 1) return 'goalkeepers';
    if (index === 2 || index === 3) return 'defenders';
    return 'forwards';
  },

  findUserMatches(matches, user) {
    const promise = new Promise((resolve) => {
      window.setTimeout(() => {
        const userId = user.id;
        let teamBlack = [];
        let teamWhite = [];
        const userMatches = [];
        for (let i = 0; i < matches.length; i += 1) {
          teamBlack = matches[i].blackTeam;
          teamWhite = matches[i].whiteTeam;
          for (let j = 1; j <= this.teamSize; j += 1) {
            if (!this.isEmpty(teamBlack[j].user)) {
              if (teamBlack[j].user.id === userId) {
                userMatches.push(matches[i]);
                break;
              }
            } else if (!this.isEmpty(teamWhite[j].user)) {
              if (teamWhite[j].user.id === userId) {
                userMatches.push(matches[i]);
                break;
              }
            }
          }
        }
        resolve(userMatches);
      }, 500);
    });
    return promise;
  },
};
