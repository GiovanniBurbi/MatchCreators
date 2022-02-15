<template>
  <v-card
  class="background ma-2"
  elevation="8"
  width="340"
  rounded="lg"
  >

    <v-card-title class="px-2">
      <v-icon
      left
      size="22"
      color="indigo darken-1"
      >
        mdi-calendar
      </v-icon>
      <h1
      :class="['font-weight-bold indigo--text      text--darken-2', {'text-h6': smAndUp},
      {'text-subtitle-1': xsOnly}]"
      >
        {{ this.dateFormatted }}
      </h1>
    </v-card-title>

    <v-card-text class="px-4">

      <v-row class="px-1">
        <v-icon
        left
        size="22"
        color="indigo darken-2"
        >
          mdi-clock-outline
        </v-icon>
        <h1
        class="text-subtitle-2 font-weight-medium black--text"
        >
          {{ match.startTime }} - {{ match.endTime }}
        </h1>
      </v-row>

      <v-row class="px-1 py-1">
        <v-icon
        left
        color="indigo darken-2"
        size="24"
        >
          mdi-map-marker-outline
        </v-icon>
        <h1
        class="text-subtitle-2 font-weight-medium black--text"
        >
          {{ match.location }}
        </h1>
      </v-row>

      <v-row class="px-1">
        <v-icon
        class="pl-1 indigo-darken2-icon"
        size="23"
        >
          $player-icon
        </v-icon>
        <h1
        class="text-subtitle-2 font-weight-regular pl-2 black--text"
        >
          Participants:
        </h1>
      </v-row>

      <v-row justify="center" class="px-6 pt-2 pb-1">

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="gkFilled ? 'filled-pos' : null"
            >
              $goalkeeper-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="['text-caption font-weight-medium',
            this.gkFilled ? 'red--text text--darken-2': 'indigo--text text--darken-2']"
            >
              {{ match.positions.goalkeepers }} / 2
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="defFilled ? 'filled-pos' : null"
            >
              $defender-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="['text-caption font-weight-medium',
            this.defFilled ? 'red--text text--darken-2': 'indigo--text text--darken-2']"
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
            :class="['text-caption font-weight-medium',
            this.fwFilled ? 'red--text text--darken-2': 'indigo--text text--darken-2']"
            >
              {{ match.positions.forwards }} / 4
            </h1>
          </v-row>
        </v-col>

      </v-row>

    </v-card-text>

    <v-fade-transition>
      <v-overlay
        v-if="hover"
        absolute
        color="indigo lighten-2"
      >
        <v-btn
        rounded
        color="deep-purple darken-2"
        >
          Join the Match
        </v-btn>
      </v-overlay>
    </v-fade-transition>

  </v-card>
</template>

<script>
import { format, parseISO } from 'date-fns';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'MatchCard',

  data() {
    return {
      gkFilled: false,
      defFilled: false,
      fwFilled: false,
      dateFormatted: null,
    };
  },

  mounted() {
    if (this.match.positions.goalkeepers === 2) {
      this.gkFilled = true;
    }
    if (this.match.positions.defenders === 4) {
      this.defFilled = true;
    }
    if (this.match.positions.forwards === 4) {
      this.fwFilled = true;
    }
    this.dateFormatted = format(parseISO(this.match.date), 'EEEE, d MMMM');
  },

  mixins: [BreakpointsCond],

  props: {
    match: {
      type: Object,
      required: true,
    },
    hover: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.background {
  background-image: linear-gradient(to top, #c5cae9, #c5cae9, #c5cae9, #c5cae9, #c5cae9,
  #c8cdea, #cbcfeb, #ced2ec, #d4d8ef, #dbdef1, #e1e4f4, #e8eaf6);
}
.indigo-icon{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%);
}
.indigo-darken2-icon {
  /* indigo darken 2 */
  filter: invert(19%) sepia(50%) saturate(3328%) hue-rotate(224deg) brightness(90%) contrast(89%);
}
.filled-pos {
  opacity: 30%;
}
</style>
