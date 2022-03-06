<template>
  <v-container fluid>

    <v-container fluid
    :class="['header',
    {'header-sm' : smAndDown},
    {'header-md' : lgOnly || mdOnly}]"
    >
      <v-row justify="space-between" align="center">
        <h1
        :class="['white--text text-size font-weight-bold',
        {'big': lgAndUp}, {'small': xsOnly}, isFinder ? 'header-shadow-black' : 'white-shadow']"
        >
          My Matches
          <v-icon
          :class="[isFinder ? 'white-icon-black-shadow' : 'white-icon-light-shadow', 'pb-3']"
          :size="lgAndUp ? 46 : 34"
          >
            $player-icon
          </v-icon>
        </h1>

        <v-btn
        v-if="isFinder"
        color="deep-purple"
        dark
        rounded
        @click="$emit('goBackToFinder')"
        >
          <span class="text-shadow" v-if="!xsOnly">find new match</span>
          <v-icon
          :right="!xsOnly"
          class="white-icon-black-shadow"
          size="28"
          >
            $finder-icon
          </v-icon>
        </v-btn>
      </v-row>

      <v-divider
      :class="['mt-4', isFinder ? 'divider-light' : 'divider-dark']"
      ></v-divider>

      <match-cards-group
      :loading="loading"
      :matches="userMatches"
      :isFinder=false
      :darkMode="dark"
      class="pt-6"/>

    </v-container>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import MatchCardsGroup from '../matchesCards/MatchCardsGroup.vue';

export default {
  name: 'myMatches',

  components: { MatchCardsGroup },

  props: {
    isFinder: {
      type: Boolean,
      required: true,
    },
    dark: {
      type: Boolean,
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
.white-icon-light-shadow {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%)
  drop-shadow( 1px 2px rgb(200, 200, 200, 0.2));
}
.white-icon-black-shadow {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%)
  drop-shadow( 1px 2px rgba(0, 0, 0, 1));
}
.divider-light {
  border-color: black !important;
  opacity: 15%;
}
.divider-dark {
  border-color: grey !important;
  opacity: 30%;
}
.white-shadow {
  text-shadow: 1px 2px rgba(200, 200, 200, 0.4);
}
.text-shadow {
  text-shadow: 1px 2px black;
}
.header-shadow-black {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.6);
}
</style>
