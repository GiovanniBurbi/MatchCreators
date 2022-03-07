<template>
  <v-container
  fluid
  :class="['background', {'content-padding': mdAndUp}]"
  >

    <v-slide-y-reverse-transition hide-on-leave>

      <v-container
      fluid
      v-if="!myMatches && !isOverview"
      >

        <finder-header />

        <match-cards-group
        :matches="matches"
        class="py-2"
        />

      </v-container>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <v-container
      fluid
      v-if="myMatches"
      v-show="!isOverview"
      >
        <my-matches
        :isFinder="true"
        :dark="false"/>
      </v-container>
    </v-slide-y-transition>

    <v-dialog
    v-model="isOverview"
    persistent
    hide-overlay
    scrollable
    fullscreen
    >
      <match-full-details
      v-if="isOverview" />
    </v-dialog>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import FinderHeader from '../components/finder/FinderHeader.vue';
import MatchCardsGroup from '../components/matchesCards/MatchCardsGroup.vue';
import MyMatches from '../components/myMatches/MyMatches.vue';
import MatchFullDetails from '../components/matchesCards/MatchFullDetails.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Finder',

  computed: {
    ...mapGetters({
      myMatches: 'app/isMyMatches',
      isOverview: 'app/isMatchOverview',
      matches: 'matches/getFilteredMatches',
    }),
  },

  methods: {
    ...mapMutations({ clearChips: 'filters/clearFilters' }),
    ...mapActions({ fetchMatches: 'matches/allMatches' }),
  },

  created() {
    this.fetchMatches();
  },

  destroyed() {
    console.log('remove filters');
    /* when component is destroyed clear the filters */
    this.clearChips();
  },

  components: {
    FinderHeader,
    MatchCardsGroup,
    MyMatches,
    MatchFullDetails,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  height: 100%;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/backgrounds/daylight.jpg')
  no-repeat center center fixed;
  background-size: cover;
}
</style>
