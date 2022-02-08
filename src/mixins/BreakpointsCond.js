export default {
  computed: {
    /* Vuetify conditionals for responsive */
    smOnly() {
      return this.$vuetify.breakpoint.smOnly;
    },

    xsOnly() {
      return this.$vuetify.breakpoint.xsOnly;
    },

    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    smAndUp() {
      return this.$vuetify.breakpoint.smAndUp;
    },

    mdOnly() {
      return this.$vuetify.breakpoint.mdOnly;
    },

    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
    },

    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    lgOnly() {
      return this.$vuetify.breakpoint.lgOnly;
    },

    lgAndDown() {
      return this.$vuetify.breakpoint.lgAndDown;
    },

    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp;
    },

    xlOnly() {
      return this.$vuetify.breakpoint.xlOnly;
    },
  },
};
