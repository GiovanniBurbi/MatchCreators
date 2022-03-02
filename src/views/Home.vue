<template>
  <v-container fluid class="background">

    <v-slide-y-reverse-transition hide-on-leave>
      <!-- change width based on current viewport -->
      <v-container
      v-if="!showMyMatches"
      :class="['content',
      {'fullscreen' : smAndDown},
      {'biggerContent' : lgOnly || mdOnly}]"
      >

        <finder-header @filters="filtersOn = !filtersOn"/>

        <match-cards-group
        :loading="!statusMatches"
        :matches="filteredMatches"
        :isFinder=true
        class="py-2"/>

      </v-container>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <my-matches
      v-if="showMyMatches"
      :isFinder="true"
      @goBackToFinder="showMyMatches = false" />
    </v-slide-y-transition>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import FinderHeader from '@/components/FinderHeader.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';
import MatchCardsGroup from '../components/MatchCardsGroup.vue';
import MyMatches from '../components/MyMatches.vue';

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
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
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
