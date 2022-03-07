<template>
  <v-container fluid class="pt-4">
    <v-row justify="space-between" align="center">

      <v-col :cols="windowWidth < 330 ? 12 : null" :class="[{'pb-1': windowWidth < 330}, 'pb-1']">
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
      </v-col>

      <v-col :class="windowWidth < 330 ? 'd-flex justify-start pt-0 pb-1' : 'd-flex justify-end'">
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
      </v-col>
    </v-row>

    <v-row>

      <v-slide-y-transition hide-on-leave>
        <v-container v-if="showFilters" fluid class="filtersGroup">

          <v-row justify="center">

            <v-col
            cols="3"
            v-for="type in ['location', 'date', 'time', 'position']"
            :key="type"
            >
              <match-filter :type="type" />
            </v-col>

          </v-row>

        </v-container>
      </v-slide-y-transition>

    </v-row>

    <v-row justify="center" class="pb-2">

      <filter-chips-group/>

    </v-row>

    <v-divider />

  </v-container>
</template>

<script>
import BreakpointsCond from '@/mixins/BreakpointsCond';
import FilterChipsGroup from './FilterChipsGroup.vue';
import MatchFilter from './MatchFilter.vue';

export default {
  name: 'FinderHeader',

  components: {
    FilterChipsGroup,
    MatchFilter,
  },

  data() {
    return {
      showFilters: false,
      windowWidth: window.innerWidth,
    };
  },

  watch: {
    windowWidth(newVal) {
      this.windowWidth = newVal;
    },
  },

  computed: {
    iconSize() {
      if (this.$vuetify.breakpoint.lgAndUp) return 50;
      if (this.$vuetify.breakpoint.name === 'md'
        || this.$vuetify.breakpoint.name === 'sm') return 36;
      return 28;
    },
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.filtersGroup {
  max-width: 1200px;
}
</style>
