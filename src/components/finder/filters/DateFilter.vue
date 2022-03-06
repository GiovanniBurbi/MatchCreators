<template>
  <v-card>

    <v-card-title class="text-h5 indigo">
      <v-icon
      size="28"
      left
      color="white"
      class="text-shadow"
      >
        mdi-calendar
      </v-icon>
      <span class="white--text card-title-shadow">Date</span>
    </v-card-title>

    <v-card-text class="pt-4 pb-2">

      <v-row>
        <v-text-field
        v-model="dateRange"
        color="indigo"
        label="Filter date range"
        class="centered-input"
        readonly
        >

          <template v-slot:append>
            <v-icon
            left
            color="indigo"
            >
              mdi-calendar
            </v-icon>
          </template>

        </v-text-field>
      </v-row>

      <v-row justify="center">

        <v-date-picker
        full-width
        v-model="dates"
        :min="(new Date(Date.now() - (new Date()).
        getTimezoneOffset() * 60000)).toISOString()
        .substr(0, 10)"
        color="indigo"
        range
        ></v-date-picker>

      </v-row>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        color="error"
        text
        @click="$emit('dialogClose'), dates = []"
      >
        Cancel
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="indigo"
        text
        :disabled="!dates.length"
        @click="$emit('dialogClose'), sendFilter()"
      >
        Add Filter
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import DataHelper from '@/mixins/DataHelper';

export default {
  name: 'DateFilter',

  data() {
    return {
      dates: [],
      dialog: false,
      filterPresent: false,
    };
  },

  computed: {
    ...mapGetters({ currentRemoved: 'matches/getCurrentRemoved' }),
  },

  watch: {
    currentRemoved(newVal) {
      if (newVal === 'Date') {
        this.filterPresent = false;
        this.resetDeleted();
      }
    },
  },

  methods: {
    ...mapActions({ addFilter: 'matches/newFilter' }),
    ...mapMutations({ resetDeleted: 'matches/resetCurrentDeleted' }),

    sendFilter() {
      const filter = {
        type: 'Date',
        icon: 'mdi-calendar',
        msg: this.dates,
      };
      this.addFilter(filter);
      this.dates = [];
      this.$emit('filterPresent');
    },
  },

  mixins: [BreakpointsCond, DataHelper],

};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.8);
}
</style>
