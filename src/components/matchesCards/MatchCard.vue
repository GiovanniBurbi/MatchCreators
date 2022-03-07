<template>
  <v-card
  :class="[darkMode ? 'grey darken-4' : 'indigo lighten-5',
  'ma-2 hover']"
  :elevation="hover ? 12 : 8"
  width="340"
  rounded="lg"
  @click="setOverview(match), setAppSection('match-overview')"
  >

    <v-card-title class="px-2">
      <v-icon
      left
      size="22"
      color="indigo lighten-1"
      >
        mdi-calendar
      </v-icon>
      <h1
      :class="['font-weight-bold text-subtitle-1',
      !darkMode ? 'indigo--text' : 'indigo--text text--lighten-2']"
      >
        {{ fullDate(this.match.date) }}
      </h1>
    </v-card-title>

    <v-card-text class="px-4">

      <v-row class="px-1">
        <v-icon
        left
        size="22"
        color="indigo lighten-1"
        >
          mdi-clock-outline
        </v-icon>
        <h1
        :class="['text-subtitle-2 font-weight-medium',
        !darkMode ? 'black--text' : 'white--text']"
        >
          {{ match.startTime }} - {{ match.endTime }}
        </h1>
      </v-row>

      <v-row class="px-1 py-1">
        <v-icon
        left
        color="indigo lighten-1"
        size="24"
        >
          mdi-map-marker-outline
        </v-icon>
        <h1
        :class="['text-subtitle-2 font-weight-medium',
        !darkMode ? 'black--text' : 'white--text']"
        >
          {{ match.location }}
        </h1>
      </v-row>

      <v-row class="px-1">
        <v-icon
        class="pl-1"
        size="23"
        >
          $player-icon
        </v-icon>
        <h1
        :class="['text-subtitle-2 font-weight-regular pl-2',
        !darkMode ? 'black--text' : 'white--text']"
        >
          Participants:
        </h1>
      </v-row>

      <v-row justify="center" class="px-6 pt-2 pb-1">

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="[gkFilled ? 'filled-pos' : null,
            !darkMode ? '' : '']"
            >
              $goalkeeper-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="['text-caption num-shadow font-weight-medium',
            gkFilled ? 'red--text text--darken-1': 'indigo--text text--lighten-1']"
            >
              {{ match.positions.goalkeepers }} / 2
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="[defFilled ? 'filled-pos' : null,
            !darkMode ? '' : '']"
            >
              $defender-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="['text-caption num-shadow font-weight-medium',
            defFilled ? 'red--text text--darken-1': 'indigo--text text--lighten-1']"
            >
              {{ match.positions.defenders }} / 4
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="42"
            :class="['pb-1', fwFilled ? 'filled-pos' : null,
            !darkMode ? '' : '']"
            >
              $forward-icon
            </v-icon>
          </v-row>

          <v-row justify="center">
            <h1
            :class="['text-caption num-shadow font-weight-medium',
            fwFilled ? 'red--text text--darken-1': 'indigo--text text--lighten-1']"
            >
              {{ match.positions.forwards }} / 4
            </h1>
          </v-row>
        </v-col>

      </v-row>

    </v-card-text>

    <!-- if mouse hovers on the card then show an overlay with the button
    to join the match, it will redirect to another page passing the id of the match -->
    <v-fade-transition origin="center center 0">
      <v-overlay
        v-if="hover"
        absolute
        color="black"
        class="overlay"
        :opacity="isFinder ? 0.5 : 0.6"
      >
        <div class="d-inline-flex pr-3">
          <h1 class="text-body-1 font-weight-medium shadow">SEE THE DETAILS</h1>
          <v-icon
          :size="xsOnly ? 24 : 24"
          class="shadow"
          >
            mdi-chevron-double-right
          </v-icon>
        </div>
        <!-- <v-btn
        color="deep-purple darken-2"
        class="mb-12"
        tile
        depressed
        :small="xsOnly"
        @click="setOverview(match)"
        >
          <span v-if="isFinder && xsOnly" class="shadow">Join match</span>
          <span v-if="isFinder && !xsOnly" class="shadow">Join the match</span>
          <span v-if="!isFinder && xsOnly" class="shadow">see details</span>
          <span v-if="!isFinder && !xsOnly" class="shadow">see the details</span>
          <v-icon
          right
          :size="xsOnly ? 24 : 28"
          class="shadow"
          >
            mdi-chevron-double-right
          </v-icon>
        </v-btn> -->

      </v-overlay>
    </v-fade-transition>

  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import DataHelper from '@/mixins/DataHelper';

export default {
  name: 'MatchCard',

  data() {
    return {
      dateFormatted: null,
    };
  },

  computed: {
    ...mapGetters({
      isFinder: 'app/isFinder',
      darkMode: 'theme/getDarkMode',
    }),

    gkFilled() {
      if (this.match.positions.goalkeepers === 2) {
        return true; /* ritorna direttamente lo styling */
      } return false;
    },

    defFilled() {
      if (this.match.positions.defenders === 4) {
        return true;
      } return false;
    },

    fwFilled() {
      if (this.match.positions.forwards === 4) {
        return true;
      } return false;
    },
  },

  props: {
    match: {
      type: Object,
      required: true,
    },
    hover: {
      type: Boolean,
    },
  },

  methods: {
    ...mapMutations({
      setOverview: 'matches/setMatchToOverview',
      setAppSection: 'app/setAppSection',
    }),
  },

  mixins: [BreakpointsCond, DataHelper],
};
</script>

<style scoped>
.filled-pos {
  opacity: 20%;
}
.overlay {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 50px 0px;
  border-radius: 8px;
}
.hover {
  transition: 0.2s ease-in-out;
}
.hover:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
