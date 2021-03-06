/* Some data and methods common to some components. */

import { format, parseISO } from 'date-fns';

export default {

  data() {
    return {
      /* rules for validate input in text-fields */
      rules: {
        required: (v) => !!v || 'Required',
        userMax: (v) => v?.length <= 8 || 'Username must be less than 8 characters',
        pswMin: (v) => v?.length >= 8 || 'Password must be at least 8 characters',
        emailFormat: (v) => /.+@.+\...+/.test(v) || 'Email must be valid',
        noSpaces: (v) => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
      },
    };
  },

  computed: {
    /* format date */
    dateNoDay() {
      return this.date ? format(parseISO(this.date), 'do MMMM yyyy') : '';
    },

    dateRange() {
      /* sort date range as ascending */
      const sortedDates = this.dates;
      sortedDates.sort();
      const datesFormatted = [];
      for (let i = 0; i < sortedDates.length; i += 1) {
        datesFormatted.push(
          format(parseISO(sortedDates[i]), 'do MMM yyyy'),
        );
      }
      return datesFormatted.join(' ~ ');
    },

    getTime() {
      /* format start and end times in a single
      string */
      return `${this.start} - ${this.end}`;
    },

    matchDay() {
      /* format iso date in the correspondent day of the week */
      return format(parseISO(this.match.date), 'EEEE');
    },

    matchDate() {
      /* format date based on breakpoint */
      if (this.$vuetify.breakpoint.xsOnly) {
        return format(parseISO(this.match.date), 'd MMM yyyy');
      }
      return format(parseISO(this.match.date), 'd MMMM yyyy');
    },

    matchTime() {
      return `${this.match.startTime}-${this.match.endTime}`;
    },

    teamsAverageAge() {
      /* compute the average age of the participants of a match */
      let player = {};
      let playerAge = null;
      let sumAge = 0;
      let numPlayers = 0;
      for (let i = 1; i <= 5; i += 1) {
        player = this.match.teamBlack[i].user;
        if (Object.keys(player).length !== 0) {
          playerAge = this.getAge(player.birthday);
          sumAge += playerAge;
          numPlayers += 1;
        }
        player = this.match.teamWhite[i].user;
        if (Object.keys(player).length !== 0) {
          playerAge = this.getAge(player.birthday);
          sumAge += playerAge;
          numPlayers += 1;
        }
      }
      if (numPlayers !== 0) {
        return Math.floor(sumAge / numPlayers);
      } return 'N/A';
    },

    nMatchParticipants() {
      /* return the number of total participants in a match */
      return (
        this.match.positions.goalkeepers
        + this.match.positions.defenders
        + this.match.positions.forwards
      );
    },
  },

  methods: {
    getAge(birthday) {
      /* compute age based on birthday iso date */
      const bday = new Date(birthday);
      const ageDiffMs = Date.now() - bday.getTime();
      const ageDate = new Date(ageDiffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },

    formatMsg(type, msg) {
      /* format msg for chips based on type */
      if (type === 'Position' || type === 'Location') {
        return msg.charAt(0).toUpperCase() + msg.slice(1);
      }
      if (type === 'Date') {
        const start = format(parseISO(msg[0]), 'do MMM');
        if (msg.length === 1) {
          return start;
        }
        const end = format(parseISO(msg[1]), 'do MMM');
        return `${start} - ${end}`;
      }
      /* type === 'Time' */
      return `${msg[0]} - ${msg[1]}`;
    },

    fullDate(date) {
      return date ? format(parseISO(date), 'EEEE, d MMMM yyyy') : '';
    },

    positionIcon(position) {
      /* return the icon defined in vuetify.js based on string value */
      if (position.toLowerCase() === 'goalkeeper') {
        return '$goalkeeper-icon';
      }
      if (position.toLowerCase() === 'defender') {
        return '$defender-icon';
      } return '$forward-icon';
    },
  },
};
