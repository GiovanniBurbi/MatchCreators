<template>
  <v-card
  :class="[darkMode ? 'grey darken-4' : 'indigo lighten-5', 'ma-2 hover']"
  :elevation="hover ? 12 : 8"
  width="340"
  rounded="lg"
  @click="setOverview(match), setAppSection('match-overview')"
  >

    <v-card-title class="px-2">
      <v-icon
      left
      size="22"
      class="icon-shadow"
      color="indigo lighten-1"
      >
        mdi-calendar
      </v-icon>
      <h1
      :class="['font-weight-bold',
      {'text-subtitle-1': smAndUp},
      {'text-subtitle-1': xsOnly},
      !darkMode ? 'indigo--text' : 'indigo--text text--lighten-2']"
      >
        {{ this.dateFormatted }}
      </h1>
    </v-card-title>

    <v-card-text class="px-4">

      <v-row class="px-1">
        <v-icon
        left
        size="22"
        color="indigo lighten-1"
        class="icon-shadow"
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
        class="icon-shadow"
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
        class="pl-1 indigo-icon"
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
            !darkMode ? 'posIcon-shadow' : 'white-icon']"
            >
              $goalkeeper-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="['text-caption num-shadow font-weight-medium',
            this.gkFilled ? 'red--text text--darken-1': 'indigo--text text--lighten-1']"
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
            !darkMode ? 'posIcon-shadow' : 'white-icon']"
            >
              $defender-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="['text-caption num-shadow font-weight-medium',
            this.defFilled ? 'red--text text--darken-1': 'indigo--text text--lighten-1']"
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
            !darkMode ? 'posIcon-shadow' : 'white-icon']"
            >
              $forward-icon
            </v-icon>
          </v-row>

          <v-row justify="center">
            <h1
            :class="['text-caption num-shadow font-weight-medium',
            this.fwFilled ? 'red--text text--darken-1': 'indigo--text text--lighten-1']"
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
import { mapMutations } from 'vuex';
import { format, parseISO } from 'date-fns';
import BreakpointsCond from '@/mixins/BreakpointsCond';

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
    /* Based on match participant verify if a position is filled.
    in a match there can be max 2 gk, 4 def, 4 fw */
    if (this.match.positions.goalkeepers === 2) {
      this.gkFilled = true;
    }
    if (this.match.positions.defenders === 4) {
      this.defFilled = true;
    }
    if (this.match.positions.forwards === 4) {
      this.fwFilled = true;
    }
    this.dateFormatted = format(parseISO(this.match.date), 'EEEE, d MMMM yyyy');
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
    isFinder: {
      type: Boolean,
      required: true,
    },
    darkMode: {
      type: Boolean,
    },
  },

  methods: {
    ...mapMutations({
      setOverview: 'matches/setMatchToOverview',
      setAppSection: 'app/setAppSection',
    }),
  },
};
</script>

<style scoped>
.background {
  background-image: linear-gradient(to top, #c5cae9, #c5cae9, #c5cae9, #c5cae9, #c5cae9,
  #c8cdea, #cbcfeb, #ced2ec, #d4d8ef, #dbdef1, #e1e4f4, #e8eaf6);
}
/* .background-dark {
  background: #9575CD;
} */
.indigo-icon{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(95%) contrast(83%)
  drop-shadow(1px 1px black);
}
.indigo-darken2-icon {
  /* indigo darken 2 */
  filter: invert(19%) sepia(50%) saturate(3328%) hue-rotate(224deg) brightness(90%) contrast(92%)
  drop-shadow(1px 1px rgba(0, 0, 0, 0.7));
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%) drop-shadow(1px 1px black);
}
.filled-pos {
  opacity: 20%;
}
.overlay {
  display: flex;
  justify-content: flex-end;
  /* justify-content: center; */
  padding: 0 0 50px 0px;
  border-radius: 8px;
}
.icon-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
}
.posIcon-shadow {
  filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.3));
}
.num-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
}
.hover {
  transition: 0.2s ease-in-out;
}
.hover:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
