<template>
  <v-container
  fluid
  :class="[{'content-padding': mdAndUp}]"
  >
    <v-slide-y-reverse-transition hide-on-leave>

      <v-container
      fluid
      class="px-0"
      v-if="!myMatches && !isOverview"
      >

        <finder-header />

        <match-cards-group
        :matches="matches"
        class="py-2"
        />

        <v-container v-if="matches.length === 0">
          <v-row justify="center">
            <h1
            style="white-space:nowrap"
            :class="['text-shadow white--text font-weight-medium',
            {'text-h4': mdAndUp},
            {'text-h5': smOnly},
            {'text-body-1': xsOnly}]"
            >
              There are no match available now
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
              Try again later or create a new match yourself!
            </h1>
          </v-row>
        </v-container>

      </v-container>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <v-container
      fluid
      class="px-0"
      v-if="myMatches"
      v-show="!isOverview"
      >

        <my-matches />

      </v-container>
    </v-slide-y-transition>

    <v-dialog
    v-model="isOverview"
    persistent
    hide-overlay
    scrollable
    fullscreen
    >

      <match-overview
      v-if="isOverview"
      />

    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import FinderHeader from '../components/finder/FinderHeader.vue';
import MatchCardsGroup from '../components/matchesCards/MatchCardsGroup.vue';
import MyMatches from '../components/myMatches/MyMatches.vue';
import MatchOverview from '../components/matchesCards/MatchOverview.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Finder',

  components: {
    FinderHeader,
    MatchCardsGroup,
    MyMatches,
    MatchOverview,
  },

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
    /* when the component is created fetch all matches */
    this.fetchMatches();
  },

  destroyed() {
    /* when component is destroyed clear the filters */
    this.clearChips();
  },

  mixins: [BreakpointsCond],
};
</script>
