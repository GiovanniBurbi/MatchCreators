<template>
  <v-card
  :class="['indigo lighten-5 ma-2 hover']"
  :elevation="hover ? 12 : 8"
  width="340"
  rounded="lg"
  @click="setOverview(match), setAppSection('match-overview')"
  >

    <v-card-title class="pl-2 pt-2 pb-1 indigo">
      <v-icon
      left
      size="22"
      color="white"
      class="icon-shadow"
      >
        mdi-calendar
      </v-icon>
      <h1
      :class="['white--text text-shadow font-weight-bold text-subtitle-1']"
      >
        {{ fullDate(this.match.date) }}
      </h1>
    </v-card-title>

    <v-card-text class="pt-5 px-5">

      <v-row>
        <v-icon
        left
        size="22"
        color="indigo"
        >
          mdi-clock-outline
        </v-icon>
        <h1
        :class="[infoText, 'font-weight-medium']"
        >
          {{ match.startTime }} - {{ match.endTime }}
        </h1>
      </v-row>

      <v-row class="py-1">
        <v-icon
        left
        color="indigo"
        size="24"
        >
          mdi-map-marker-outline
        </v-icon>
        <h1
        :class="[infoText, 'font-weight-medium']"
        >
          {{ match.location }}
        </h1>
      </v-row>

      <v-row>
        <v-icon
        class="pl-1 icon-indigo"
        size="23"
        >
          $player-icon
        </v-icon>
        <h1
        :class="[infoText, 'font-weight-regular pl-2']"
        >
          Participants:
        </h1>
      </v-row>

      <v-row justify="center" class="px-3 pt-3 pb-1">

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="[gkFilled ? 'filled-pos' : null]"
            >
              $goalkeeper-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="[posInfo,
            gkFilled ? 'red--text text--darken-1': 'indigo--text']"
            >
              {{ match.positions.goalkeepers }} / 2
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="[defFilled ? 'filled-pos' : null]"
            >
              $defender-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="[posInfo,
            defFilled ? 'red--text text--darken-1': 'indigo--text']"
            >
              {{ match.positions.defenders }} / 4
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="42"
            :class="['pb-1', fwFilled ? 'filled-pos' : null]"
            >
              $forward-icon
            </v-icon>
          </v-row>

          <v-row justify="center">
            <h1
            :class="[posInfo,
            fwFilled ? 'red--text text--darken-1': 'indigo--text']"
            >
              {{ match.positions.forwards }} / 4
            </h1>
          </v-row>
        </v-col>

      </v-row>

    </v-card-text>

    <v-fade-transition origin="center center 0">
      <v-overlay
        v-if="hover"
        absolute
        color="grey darken-4"
        class="overlay"
        :opacity="0.6"
      >

        <div class="d-inline-flex pr-2">
          <h1
          class="text-body-1 font-weight-bold text-shadow"
          >
            <span v-if="isFinder && !isMyMatches">JOIN THE MATCH</span>
            <span v-if="!isFinder || isMyMatches">SEE THE DETAILS</span>
          </h1>
          <v-icon
          :size="24"
          class="icon-shadow"
          >
            mdi-chevron-double-right
          </v-icon>
        </div>

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
      infoText: 'grey--text text--darken-4 text-subtitle-2',
      posInfo: 'text-caption font-weight-medium',
    };
  },

  computed: {
    ...mapGetters({
      isFinder: 'app/isFinder',
      isMyMatches: 'app/isMyMatches',
      darkMode: 'theme/getDarkMode',
    }),

    gkFilled() {
      if (this.match.positions.goalkeepers === 2) {
        return true;
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
  padding: 0 0 40px 0;
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
