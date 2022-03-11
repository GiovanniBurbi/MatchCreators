<template>
  <v-container fluid class="pt-4">
    <v-row justify="space-between" align="center">

      <v-col :cols="windowWidth < 310 ? 12 : null" :class="[{'pb-1': windowWidth < 310}, 'pb-0']">
        <h1
        :class="['text-big header',
        {'text-h4' : mdAndDown},
        {'text-h5': xsOnly}]"
        >
          My Matches
          <v-icon
          :class="['pb-3 icon-white-shadow']"
          :size="lgAndUp ? 46 : 34"
          >
            $player-2-icon
          </v-icon>
        </h1>
      </v-col>

      <v-col :class="windowWidth < 310 ? 'd-flex justify-start pt-0 pb-1' : 'd-flex justify-end'">
        <v-btn
        v-if="isFinder"
        color="deep-purple"
        dark
        :small="xsOnly"
        rounded
        @click="setAppSection('')"
        >
          <span class="btn-shadow hidden-xs-only">
            find new match
          </span>

          <v-icon
          class="icon-white-shadow"
          :size="xsOnly ? 25 : 28"
          >
            $finder-icon
          </v-icon>

        </v-btn>
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
