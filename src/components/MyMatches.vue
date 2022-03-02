<template>
  <v-container fluid>

    <v-container fluid
    :class="['header',
    {'header-sm' : smAndDown},
    {'header-md' : lgOnly || mdOnly}]"
    >
      <v-row justify="space-between" align="center">
        <h1
        :class="['white--text text-size font-weight-bold shadow',
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

        <v-btn
        v-if="isFinder"
        color="deep-purple"
        dark
        @click="$emit('goBackToFinder')"
        >
          <span class="shadow">find new match</span>
          <v-icon right class="white-icon">$finder-icon</v-icon>
        </v-btn>
      </v-row>

      <v-divider
      :class="['mt-4', isFinder ? 'divider-light' : 'divider-dark']"
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
  name: 'myMatches',

  components: { MatchCardsGroup },

  props: {
    isFinder: {
      type: Boolean,
      required: true,
    },
  },

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
  drop-shadow( 2px 2px 1px rgba(0, 0, 0));
}
.divider-light {
  border-color: black !important;
  opacity: 15%;
}
.divider-dark {
  border-color: grey !important;
  opacity: 30%;
}
</style>
