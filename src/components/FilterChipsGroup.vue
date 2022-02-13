<template>
  <v-chip-group
  :column="smAndUp"
  show-arrows
  >
    <v-chip
    v-for="(filter, i) in filters"
    :key="i"
    class="ma-2"
    close
    close-icon="mdi-delete"
    label
    color="indigo"
    text-color="white"
    @click:close="deleteFilter(i)"
    >
      <v-icon
      left size="22"
      :class="{'white-icon' : filter.type==='Position'}"
      >
        {{ filter.icon }}
      </v-icon>
      {{ formatMsg(filter.type, filter.msg) }}
    </v-chip>
  </v-chip-group>
</template>

<script>
import { mapMutations } from 'vuex';
import { format, parseISO } from 'date-fns';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'FilterChipsGroup',

  computed: {
    filters: {
      get() {
        return this.$store.state.filters.filters;
      },
    },
  },

  methods: {
    ...mapMutations({ removeFilter: 'filters/removeFilter' }),

    formatMsg(type, msg) {
      if (type === 'Position' || type === 'Location') {
        return msg.charAt(0).toUpperCase() + msg.slice(1);
      }
      if (type === 'Date') {
        const start = format(parseISO(msg[0]), 'do MMM');
        if (msg.length === 1) {
          return start;
        }
        const end = format(parseISO(msg[1]), 'do MMM');
        return `${start} - ${end}`;
      }
      /* type === 'Time' */
      return `${msg[0]} - ${msg[1]}`;
    },

    deleteFilter(index) {
      this.removeFilter(index);
    },
  },

  mixins: [BreakpointsCond],

};
</script>
<style scoped>
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
</style>
