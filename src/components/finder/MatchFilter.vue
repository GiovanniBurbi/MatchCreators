<template>
  <v-sheet color="transparent" class="d-flex justify-center">

    <v-btn
    dark
    rounded
    :small="xsOnly"
    color="deep-purple"
    :disabled="filterPresent"
    @click.stop="dialog=true"
    >
      <v-icon
      :left="smAndUp"
      :size="xsOnly ? 18 : 22"
      :class="[
      {'btn-icon-shadow': !filterPresent},
      {'icon-white-shadow': type === 'position' && !filterPresent},
      {'icon-white disabled': type === 'position' && filterPresent}]"
      >
        {{icon}}
      </v-icon>

      <span
      :class="['hidden-xs-only',
      {'btn-shadow': !filterPresent}]"
      >
        {{type}}
      </span>
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <time-filter
      v-if="type === 'time'"
      @dialogClose="dialog = false"
      @filterPresent="filterPresent = true"
      />

      <location-filter
      v-if="type === 'location'"
      @dialogClose="dialog = false"
      @filterPresent="filterPresent = true"
      />

      <date-filter
      v-if="type === 'date'"
      @dialogClose="dialog = false"
      @filterPresent="filterPresent = true"
      />

      <position-filter
      v-if="type === 'position'"
      @dialogClose="dialog = false"
      @filterPresent="filterPresent = true"
      />
    </v-dialog>

  </v-sheet>

</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import TimeFilter from './filters/TimeFilter.vue';
import LocationFilter from './filters/LocationFilter.vue';
import DateFilter from './filters/DateFilter.vue';
import PositionFilter from './filters/PositionFilter.vue';

export default {

  name: 'MatchFilter',

  components: {
    TimeFilter,
    LocationFilter,
    DateFilter,
    PositionFilter,
  },

  data() {
    return {
      dialog: false,
      filterPresent: false,
    };
  },

  props: {
    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({ currentRemoved: 'filters/getCurrentRemoved' }),

    icon() {
      if (this.type === 'location') return 'mdi-map-marker-outline';
      if (this.type === 'time') return 'mdi-clock-outline';
      if (this.type === 'date') return 'mdi-calendar';
      return '$position-icon';
    },
  },

  watch: {
    currentRemoved(newVal) {
      if (newVal === this.type) {
        this.filterPresent = false;
        this.resetDeleted();
      }
    },
  },

  methods: {
    ...mapMutations({ resetDeleted: 'filters/resetCurrentDeleted' }),
  },

  mixins: [BreakpointsCond],
};
</script>

<style>
.disabled {
  opacity: 30%;
}
</style>
