<template>
  <v-container fluid class="pt-0">

    <v-container
    :class="['header',
    {'header-sm' : smAndDown},
    {'header-md' : lgOnly || mdOnly}]"
    >
      <h1
      :class="['white--text text-size font-weight-bold',
      {'big': lgAndUp}, {'small': xsOnly}]"
      >
        My Matches
        <v-icon
        class="white-icon pb-3"
        :size="lgAndUp ? 46 : 34"
        >
          $player-icon
        </v-icon>
      </h1>

      <v-divider
      style="border-color: grey !important; opacity: 30%;"
      ></v-divider>

      <match-cards-group
      :loading="loading"
      :matches="userMatches"
      :isFinder=false
      class="pt-6"/>

    </v-container>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import MatchCardsGroup from './MatchCardsGroup.vue';

export default {
  components: { MatchCardsGroup },
  name: 'myMatches',

  computed: {
    ...mapGetters({
      loading: 'matches/getLoadingUserMatches',
      userMatches: 'matches/getUserMatches',
    }),
  },

  methods: {
    ...mapActions({ fetchUserMatches: 'matches/findUserMatches' }),
  },

  mounted() {
    this.fetchUserMatches();
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.header {
  max-width: 80%;
}
.header-md {
  max-width: 90%;
}
.header-sm {
  max-width: 100%;
}
.text-size {
  font-size: 2.2rem;
}
.big{
  font-size: 3rem;
}
.small{
  font-size: 1.75rem;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%)
  drop-shadow( 2px 2px 1px rgba(0, 0, 0))
  drop-shadow( 1px 1px 1px rgba(0, 0, 0, 0.7));
}
</style>
