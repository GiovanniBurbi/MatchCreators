<template>
  <div class="px-3">

    <v-row justify="center" class="mt-0">

      <v-col class="d-flex align-center justify-center">
        <div class="d-inline-flex">

          <v-icon
          left
          class="icon-shadow"
          color="white"
          :size="iconSize"
          >
            mdi-calendar
          </v-icon>

          <div>
            <h1
            :class="['text-shadow', textSize]"
            >
              {{matchDay}},
            </h1>

            <h1
            :class="['text-shadow', textSize]"
            >
              {{matchDate}}
            </h1>
          </div>

        </div>
      </v-col>

      <v-col class="d-flex align-center justify-center">
        <v-icon
          class="icon-shadow pr-1"
          color="white"
          :size="iconSize"
          >
            mdi-clock-outline
          </v-icon>
        <h1
        :class="['text-shadow', textSize]"
        >
          {{matchTime}}
        </h1>
      </v-col>

      <v-col class="d-flex align-center justify-center">
        <v-icon
          class="icon-shadow pr-1"
          color="white"
          :size="iconSize"
          >
            mdi-map-marker-outline
          </v-icon>
        <h1
        :class="['text-shadow', textSize]"
        >
          {{match.location}}
        </h1>
      </v-col>

    </v-row>

    <v-divider dark class="mt-4 mb-6" style="width: 80%; margin:0 auto;"></v-divider>

    <v-row justify="center" :class="[{'px-2': xsOnly}, 'pb-4']">

      <v-col :class="{'ml-1': xsOnly}">
        <v-row justify="center" :class="xsOnly ? 'pr-9' : 'pr-16'">

          <div class="d-inline-flex">

            <v-icon
            class="icon-shadow pb-1 pr-2"
            color="white"
            :size="iconSize - 6"
            >
              fas fa-solid fa-cake-candles
            </v-icon>

            <h1
            :class="['text-shadow', textSize]"
            >
              Average
            </h1>

          </div>

        </v-row>

        <v-row justify="center" :class="xsOnly ? 'mt-2 pr-10' : 'mt-2 pr-3'">
          <div>
            <h1
            :class="['text-shadow', secondaryTextSize]"
            >
              {{teamsAverageAge}} years old
            </h1>
          </div>
        </v-row>

      </v-col>

      <v-spacer></v-spacer>

      <v-col :class="{'mr-1': xsOnly}">
        <v-row justify="center" :class="xsOnly ? 'pr-2' : 'pr-6'">

          <div style="white-space:nowrap;" class="d-inline-flex">
            <v-icon
            class="icon-white-shadow pt-1"
            :size="iconSize - 1"
            >
              $player-icon
            </v-icon>
            <h1
            :class="['pl-1 text-shadow', textSize]"
            >
              Participants
            </h1>
          </div>

        </v-row>

        <v-row justify="center" :class="xsOnly ? 'mt-2 pl-16' : 'mt-2 ml-16'">
          <div>
            <h1
            :class="['text-shadow', secondaryTextSize]"
            >
              {{nMatchParticipants}} / 10
            </h1>
          </div>
        </v-row>

      </v-col>

    </v-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DataHelper from '@/mixins/DataHelper';
import BreakpointsCond from '../../mixins/BreakpointsCond';

export default {
  name: 'OverviewHeader',

  computed: {
    ...mapGetters({ match: 'matches/getMatchToOverview' }),

    textSize() {
      let type = '';
      if (this.$vuetify.breakpoint.smAndUp) type = 'text-h5';
      if (this.$vuetify.breakpoint.xsOnly) type = 'text-subtitle-1 font-weight-medium';
      return `white--text ${type}`;
    },

    secondaryTextSize() {
      let type = '';
      if (this.$vuetify.breakpoint.smAndUp) type = 'text-h6 font-weight-regular';
      if (this.$vuetify.breakpoint.xsOnly) type = 'text-subtitle-2 font-weight-regular';
      return `white--text ${type}`;
    },

    iconSize() {
      if (this.$vuetify.breakpoint.smAndUp) return '28';
      if (this.$vuetify.breakpoint.xsOnly) return '20';
      return 24;
    },
  },

  mixins: [BreakpointsCond, DataHelper],
};
</script>

<style scoped>
h1 {
  white-space: nowrap;
  cursor: default;
}
</style>
