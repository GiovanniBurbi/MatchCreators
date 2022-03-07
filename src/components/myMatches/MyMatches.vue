<template>

  <v-container fluid class="pt-6">
    <v-row justify="space-between" align="center">

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

      <v-btn
      v-if="isFinder"
      color="deep-purple"
      dark
      :small="xsOnly"
      rounded
      @click="setAppSection('')"
      >
        <span
        class="btn-shadow"
        v-if="!xsOnly"
        >
          find new match
        </span>

        <v-icon
        :right="!xsOnly"
        class="icon-white-shadow"
        :size="xsOnly ? 25 : 28"
        >
          $finder-icon
        </v-icon>

      </v-btn>
    </v-row>

    <v-divider
    :class="['mt-4']"
    ></v-divider>

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

  computed: {
    ...mapGetters({
      userMatches: 'matches/getUserMatches',
      isFinder: 'app/isFinder',
      dark: 'theme/getDarkMode',
    }),
  },

  methods: {
    ...mapActions({ fetchUserMatches: 'matches/findUserMatches' }),
    ...mapMutations({ setAppSection: 'app/setAppSection' }),
  },

  created() {
    this.fetchUserMatches();
  },

  mixins: [BreakpointsCond],

};
</script>
