import { format, parseISO } from 'date-fns';

export default {
  data() {
    return {
      /* rules for validate input in text-fields */
      rules: {
        required: (v) => !!v || 'Required',
        userMax: (v) => v?.length <= 8 || 'Username must be less than 10 characters',
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
  },
};
