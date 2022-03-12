<template>
  <v-container fluid class="pt-4">
    <v-row justify="space-between" align="center">

      <v-col class="d-flex justify-start pb-1">
        <v-btn
        v-if="isFinder"
        color="deep-purple"
        dark
        :small="xsOnly"
        rounded
        @click="setAppSection('')"
        >

          <v-icon class="btn-shadow pr-1">
            mdi-arrow-left
          </v-icon>

          <span class="btn-shadow" v-if="!xsOnly">
            find matches
          </span>

          <v-icon
          v-if="xsOnly"
          class="icon-white-shadow pl-1"
          :size="xsOnly ? 24 : 26"
          >
            $finder-icon
          </v-icon>

        </v-btn>
      </v-col>

      <v-col
      class="d-flex justify-end pb-0"
      >
        <h1
        :class="['text-big header',
        {'text-h4' : mdAndDown},
        {'text-h5': xsOnly},
        {'text-h6': windowWidth < 310}]"
        >
          <v-icon
          :class="['pb-3 icon-white-shadow']"
          :size=iconSize
          >
            $player-2-icon
          </v-icon>
          My Matches
        </h1>
      </v-col>
    </v-row>

    <v-divider :class="['mt-4', {'divider-dark': dark}]" />

    <match-cards-group
    :matches="userMatches"
    class="pt-6"/>

    <v-container v-if="userMatches.length === 0">
      <v-row justify="center">
        <h1
        style="white-space:nowrap"
        :class="['text-shadow white--text font-weight-medium',
        {'text-h4': mdAndUp},
        {'text-h5': smOnly},
        {'text-subtitle-1': xsOnly}]"
        >
          No upcoming matches to play
        </h1>
      </v-row>
      <v-row justify="center">
        <h1
        style="white-space:nowrap"
        :class="['text-shadow white--text font-weight-medium',
        {'text-h6': mdAndUp},
        {'text-subtitle-1': smOnly},
        {'text-caption': xsOnly}]"
        >
        <span v-if="isFinder">Search a new match and join it!</span>
        <span v-if="!isFinder">Try to create a new match!</span>
        </h1>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import MatchCardsGroup from '../matchesCards/MatchCardsGroup.vue';

export default {
  name: 'myMatches',

  components: {
    MatchCardsGroup,
  },

  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    ...mapGetters({
      userMatches: 'matches/getUserMatches',
      isFinder: 'app/isFinder',
      dark: 'theme/getDarkMode',
    }),

    iconSize() {
      if (this.$vuetify.breakpoint.lgAndUp) return 46;
      if (this.$vuetify.breakpoint.mdOnly) return 40;
      if (this.$vuetify.breakpoint.xsOnly) return 30;
      if (this.windowWidth < 310) return 28;
      return 34;
    },
  },

  watch: {
    windowWidth(newVal) {
      /* listen to window width change of the window */
      this.windowWidth = newVal;
    },
  },

  methods: {
    ...mapActions({ fetchUserMatches: 'matches/findUserMatches' }),
    ...mapMutations({ setAppSection: 'app/setAppSection' }),

    onResize() {
      /* update local variable with new value of window width */
      this.windowWidth = window.innerWidth;
    },
  },

  created() {
    this.fetchUserMatches();
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mixins: [BreakpointsCond],
};
</script>
