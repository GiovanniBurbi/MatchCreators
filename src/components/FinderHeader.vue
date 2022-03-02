<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">

      <h1 :class="['white--text text-size font-weight-bold header',
      {'big': lgAndUp}, {'small': xsOnly}]">
        Search a Match
        <v-icon
        :size="lgAndUp ? 50 : 36"
        class="white-icon pb-3"
        >
          $finder-icon
        </v-icon>
      </h1>

      <v-btn
      :small="xsOnly"
      :color="showFilters ?  'white' : 'deep-purple'"
      rounded
      @click="showFilters = !showFilters, $emit('filters')"
      >
        <span
        :class="['hidden-xs-only',
        showFilters ? 'deep-purple--text' : 'white--text']">
          Filters
        </span>

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
      <v-slide-y-transition hide-on-leave>

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
      </v-slide-y-transition>
    </v-row>
    <v-row justify="center">
      <filter-chips-group/>
    </v-row>
    <v-divider class="mt-2" />
  </v-container>
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

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.header {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.6);
  white-space: nowrap;
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
.filtersGroup {
  max-width: 1200px;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%)
  hue-rotate(291deg) brightness(122%) contrast(100%) drop-shadow( 1px 2px rgba(0, 0, 0, 0.7));
}
</style>
