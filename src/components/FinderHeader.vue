<template>
  <div>
    <v-row justify="space-between" align="center">
      <h1 :class="['white--text font-weight-bold header']">
        Search a Match
      </h1>
      <v-btn
      :small="xsOnly"
      :color="showFilters ?  'white' : 'indigo'"
      rounded
      @click="showFilters = !showFilters"
      >
        <span
        :class="['hidden-xs-only', showFilters ? 'indigo--text' : 'white--text']">Filters</span>
        <v-icon
        :small="xsOnly"
        :right="smAndUp"
        :class="showFilters ? 'icon-indigo' : 'icon-white'"
        >
          fa-solid fa-sliders
        </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-scroll-y-transition hide-on-leave>
        <v-container v-if="showFilters" fluid class="filtersGroup">
          <v-row justify="center">
            <v-col cols="3">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon :left="smAndUp" size="22">mdi-map-marker-outline</v-icon>
                  <span class="hidden-xs-only">Location</span>
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="3">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon size="22" :left="smAndUp">mdi-calendar</v-icon>
                  <span class="hidden-xs-only">Date</span>
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="3">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon size="22" :left="smAndUp">mdi-clock-outline</v-icon>
                  <span class="hidden-xs-only">Time</span>
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="3">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon size=24 class="icon-white" :left="smAndUp">$position-icon</v-icon>
                  <span class="hidden-xs-only">position</span>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-scroll-y-transition>
    </v-row>
    <v-row justify="center">
      <v-chip
        class="ma-2"
        close
        color="indigo"
        text-color="white"
      >
        <v-icon left size="22">
          mdi-clock-outline
        </v-icon>
        10:30 - 12:30
      </v-chip>
      <v-chip
        class="ma-2"
        close
        color="indigo"
        text-color="white"
        @click:close="closeChip"
      >
        <v-icon left size="22">
          mdi-calendar
        </v-icon>
        29 Nov - 11 Dec
      </v-chip>
      <v-chip
        class="ma-2"
        close
        color="indigo"
        text-color="white"
      >
        <v-icon class="icon-white" left>
          $position-icon
        </v-icon>
        Forward
      </v-chip>
      <v-chip
        class="ma-2"
        close
        color="indigo"
        text-color="white"
      >
        <v-icon size="22" left>
          mdi-map-marker-outline
        </v-icon>
        Rose Stadium
      </v-chip>
    </v-row>
  </div>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'FinderHeader',

  data() {
    return {
      showFilters: false,
    };
  },

  methods: {
    closeChip() {
      /* TODO */
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.header {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.8);
  font-size: calc(20px + 2vw);
  white-space: nowrap;
}
.filtersGroup {
  max-width: 1200px;
}
.icon-white {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
.icon-indigo {
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%);
}
</style>
