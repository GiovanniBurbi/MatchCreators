<template>
  <v-chip-group>

    <v-chip
    v-for="(filter, i) in filters"
    :key="i"
    class="ma-2"
    close
    close-icon="mdi-delete"
    label
    :ripple="false"
    color="indigo"
    text-color="white"
    @click:close="removeFilter(i)"
    >
      <v-icon
      left size="22"
      :class="{'icon-white' : filter.type==='Position'}"
      >
        {{ filter.icon }}
      </v-icon>
      {{ formatMsg(filter.type, filter.msg) }}
    </v-chip>

  </v-chip-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import DataHelper from '@/mixins/DataHelper';

export default {
  name: 'FilterChipsGroup',

  computed: {
    ...mapGetters({ filters: 'filters/getFilters' }),
  },

  methods: {
    ...mapActions({ removeFilter: 'filters/removeFilter' }),
  },

  mixins: [BreakpointsCond, DataHelper],
};
</script>
