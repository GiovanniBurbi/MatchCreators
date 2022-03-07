<template>

  <v-container fluid class="pt-6">
    <v-row justify="space-between" align="center">

      <v-col :cols="windowWidth < 310 ? 12 : null" :class="{'pb-1': windowWidth < 310}">
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

    <v-divider :class="['mt-4']" />

    <match-cards-group
    :matches="userMatches"
    class="pt-6"/>

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
      this.windowWidth = newVal;
    },
  },

  methods: {
    ...mapActions({ fetchUserMatches: 'matches/findUserMatches' }),
    ...mapMutations({ setAppSection: 'app/setAppSection' }),

    onResize() {
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
