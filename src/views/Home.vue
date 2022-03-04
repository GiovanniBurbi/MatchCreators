<template>
  <v-container fluid :class="[xsOnly ? 'px-0' : '', 'background']">

    <v-slide-y-reverse-transition hide-on-leave>
      <!-- change width based on current viewport -->
      <v-container
      v-if="!showMyMatches && !isOverview"
      :class="['content',
      {'fullscreen' : smAndDown},
      {'biggerContent' : lgOnly || mdOnly}]"
      >

        <finder-header @filters="filtersOn = !filtersOn"/>

        <match-cards-group
        :loading="!statusMatches"
        :matches="filteredMatches"
        :isFinder=true
        class="py-2"
        />

      </v-container>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <my-matches
      v-if="showMyMatches"
      v-show="!isOverview"
      :isFinder="true"
      @goBackToFinder="showMyMatches = false" />
    </v-slide-y-transition>

    <!-- <v-scale-transition origin="center center 0" hide-on-leave>
      <match-full-details v-if="isOverview" :match="matchToOverview" />
    </v-scale-transition> -->

    <v-dialog
    v-model="isOverview"
    persistent
    fullscreen
    hide-overlay
    style="position:relative;"
    >
      <match-full-details
      v-if="isOverview"
      :match="matchToOverview" />
    </v-dialog>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import FinderHeader from '@/components/FinderHeader.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';
import MatchCardsGroup from '../components/MatchCardsGroup.vue';
import MyMatches from '../components/MyMatches.vue';
import MatchFullDetails from '../components/MatchFullDetails.vue';

export default {
  name: 'Home',

  data() {
    return {
      filtersOn: false,
      chipsOn: false,
      showMyMatches: false,
    };
  },

  props: {
    goToMyMatches: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters({ filters: 'matches/getFilters' }),
    ...mapGetters({ statusMatches: 'matches/getStatusMatches' }),
    ...mapGetters({ filteredMatches: 'matches/getFilteredMatches' }),
    ...mapGetters({ matchToOverview: 'matches/getMatchToOverview' }),
    ...mapGetters({ isOverview: 'matches/getIsOverview' }),
  },

  methods: {
    ...mapMutations({ clearChips: 'matches/clearFilters' }),
    ...mapActions({ fetchMatches: 'matches/allMatches' }),
  },

  watch: {
    /* watch if there are some filters active */
    filters(newVal) {
      if (newVal.length !== 0) {
        if (!this.chipsOn) this.chipsOn = true;
      } else this.chipsOn = false;
    },

    goToMyMatches(newVal) {
      if (newVal) {
        this.showMyMatches = true;
        this.$emit('update:goToMyMatches', false);
      }
    },
  },

  created() {
    /* At the creation of this component start the fetch
    from db of all matches if they are not already loaded */
    if (!this.statusMatches) {
      this.fetchMatches();
    }
  },

  destroyed() {
    /* when component is destroyed clear the filters */
    if (this.chipsOn) this.clearChips();
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
  rgba(0, 0, 0, 0.2)), url('../assets/backgrounds/daylight.jpg') no-repeat center center fixed;
  background-size: cover;
}
.content {
  max-width: 80%;
}
.biggerContent {
  max-width: 90%;
}
.fullscreen {
  max-width: 100%;
}
</style>
