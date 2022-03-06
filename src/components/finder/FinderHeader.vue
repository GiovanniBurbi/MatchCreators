<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">

      <h1
      :class="['text-big header',
      {'text-h4' : mdAndDown},
      {'text-h5': xsOnly}]"
      >
        Search a Match
        <v-icon
        :size="iconSize"
        class="icon-white-shadow pb-3"
        >
          $finder-icon
        </v-icon>
      </h1>

      <v-btn
      :color="showFilters ?  'white' : 'deep-purple'"
      rounded
      :small="xsOnly"
      @click="showFilters = !showFilters"
      >
        <span
        :class="['hidden-xs-only',
        showFilters ? 'deep-purple--text' : 'white--text btn-shadow']">
          Filters
        </span>

        <v-icon
        :class="{'btn-icon-shadow': !showFilters}"
        :size="xsOnly ? 16 : null"
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
import BreakpointsCond from '@/mixins/BreakpointsCond';
import FilterChipsGroup from './FilterChipsGroup.vue';
import DateFilter from './filters/DateFilter.vue';
import TimeFilter from './filters/TimeFilter.vue';
import LocationFilter from './filters/LocationFilter.vue';
import PositionFilter from './filters/PositionFilter.vue';

export default {
  name: 'FinderHeader',

  data() {
    return {
      showFilters: false,
    };
  },

  computed: {
    iconSize() {
      if (this.$vuetify.breakpoint.lgAndUp) return 50;
      if (this.$vuetify.breakpoint.name === 'md'
        || this.$vuetify.breakpoint.name === 'sm') return 36;
      return 28;
    },
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
.text-big{
  font-size: 2.6rem;
}
.filtersGroup {
  max-width: 1200px;
}
</style>
