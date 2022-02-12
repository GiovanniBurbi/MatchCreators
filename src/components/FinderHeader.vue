<template>
  <div>
    <v-row justify="space-between" align="center">

      <h1 :class="['white--text font-weight-bold header']">
        Search a Match
      </h1>

      <v-btn
      :small="xsOnly"
      :color="showFilters ?  'white' : 'deep-purple'"
      rounded
      @click="showFilters = !showFilters"
      >
        <span
        :class="['hidden-xs-only',
        showFilters ? 'deep-purple--text' : 'white--text']">Filters</span>
        <v-icon
        :small="xsOnly"
        :right="smAndUp"
        :color="showFilters ? 'deep-purple' : 'white'"
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
              <location-filter />
            </v-col>

            <v-col cols="3">
              <date-filter />
            </v-col>

            <v-col cols="3">
              <time-filter />
            </v-col>

            <v-col cols="3">
              <position-filter />
            </v-col>

          </v-row>
          <div>

          </div>

        </v-container>
      </v-scroll-y-transition>
    </v-row>
    <v-row justify="center">
      <filter-chips-group/>
    </v-row>
  </div>
</template>

<script>
import FilterChipsGroup from './FilterChipsGroup.vue';
import DateFilter from './Filters/DateFilter.vue';
import TimeFilter from './Filters/TimeFilter.vue';
import LocationFilter from './Filters/LocationFilter.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';
import PositionFilter from './Filters/PositionFilter.vue';

export default {
  name: 'FinderHeader',

  data() {
    return {
      showFilters: false,
    };
  },

  components: {
    FilterChipsGroup,
    DateFilter,
    TimeFilter,
    LocationFilter,
    PositionFilter,
  },

  methods: {
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
</style>
