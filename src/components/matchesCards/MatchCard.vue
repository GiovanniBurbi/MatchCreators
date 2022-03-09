<template>
  <v-card
  :class="['ma-2 hover', darkMode ? 'card-color-dark' : 'card-color-light']"
  :elevation="hover ? 12 : 8"
  width="340"
  rounded="lg"
  @click="setMatchOverview(match), setOverview(true)"
  >

    <v-card-title :class="['pl-2 pt-2 pb-1', darkMode ? 'grey darken-4' : 'indigo']">
      <v-icon
      left
      size="22"
      color="white"
      class="icon-shadow"
      >
        mdi-calendar
      </v-icon>
      <h1
      class="white--text text-shadow font-weight-bold text-subtitle-1"
      >
        {{ fullDate(this.match.date) }}
      </h1>
    </v-card-title>

    <v-card-text class="pt-5 px-5">

      <v-row>
        <v-icon
        left
        size="22"
        :color="darkMode ? 'indigo lighten-1' : 'indigo darken-2'"
        >
          mdi-clock-outline
        </v-icon>
        <h1
        :class="[darkMode ? 'white--text' : 'black--text',
        'font-weight-medium text-subtitle-2']"
        >
          {{ match.startTime }} - {{ match.endTime }}
        </h1>
      </v-row>

      <v-row class="py-1">
        <v-icon
        left
        :color="darkMode ? 'indigo lighten-1' : 'indigo darken-2'"
        size="24"
        >
          mdi-map-marker-outline
        </v-icon>
        <h1
        :class="[darkMode ? 'white--text' : 'black--text',
        'font-weight-medium text-subtitle-2']"
        >
          {{ match.location }}
        </h1>
      </v-row>

      <v-row>
        <v-icon
        :class="['pl-1', darkMode ? 'icon-indigo-lighten1' : 'icon-indigo-darken2']"
        size="23"
        >
          $player-icon
        </v-icon>
        <h1
        :class="[darkMode ? 'white--text' : 'black--text',
        'font-weight-regular text-subtitle-2 pl-2']"
        >
          Participants:
        </h1>
      </v-row>

      <v-row justify="center" class="px-3 pt-3 pb-1">

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="[gkFilled && !darkMode ? 'filled-pos' : null,
            gkFilled && darkMode ? 'filled-pos-dark' : null,
            darkMode ? 'icon-white' : '']"
            >
              $goalkeeper-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="[posInfo,
            gkFilled ? 'red--text text--darken-1': 'indigo--text text--darken-1']"
            >
              {{ match.positions.goalkeepers }} / 2
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="34"
            :class="[defFilled && !darkMode ? 'filled-pos' : null,
            defFilled && darkMode ? 'filled-pos-dark' : null,
            darkMode ? 'icon-white' : '']"
            >
              $defender-icon
            </v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            :class="[posInfo,
            defFilled ? 'red--text text--darken-1': 'indigo--text text--darken-1']"
            >
              {{ match.positions.defenders }} / 4
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="42"
            :class="['pb-1', fwFilled && !darkMode ? 'filled-pos' : null,
            fwFilled && darkMode ? 'filled-pos-dark' : null,
            darkMode ? 'icon-white' : '']"
            >
              $forward-icon
            </v-icon>
          </v-row>

          <v-row justify="center">
            <h1
            :class="[posInfo,
            fwFilled ? 'red--text text--darken-1': 'indigo--text text--darken-1']"
            >
              {{ match.positions.forwards }} / 4
            </h1>
          </v-row>
        </v-col>

      </v-row>

    </v-card-text>

    <v-slide-x-transition origin="center center 0">
      <v-overlay
        v-if="hover"
        absolute
        :color="isFinder ? 'grey darken-4' : 'black'"
        class="overlay"
        :opacity="isFinder ? 0.8 : 0.6"
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
    </v-slide-x-transition>

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
      setMatchOverview: 'matches/setMatchToOverview',
      setOverview: 'app/setOverview',
    }),
  },

  mixins: [BreakpointsCond, DataHelper],
};
</script>

<style scoped>
.filled-pos {
  opacity: 40%;
}
.filled-pos-dark {
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
.card-color-dark {
  background: rgba(0, 0, 0, 0.8);
}
.card-color-dark:hover {
  background:black;
}
.card-color-light {
  background: rgba(255, 255, 255, 0.6);
}
.card-color-light:hover {
  background: white;
}
</style>
