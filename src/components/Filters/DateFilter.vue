<template>
  <v-sheet color="transparent" class="d-flex justify-center">

    <v-btn
    dark
    rounded
    color="deep-purple"
    :disabled="filterPresent"
    @click.stop="dialog=true"
    >
      <v-icon
      :left="smAndUp"
      size="22"
      >
        mdi-calendar
      </v-icon>

      <span class="hidden-xs-only">Date</span>
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>

        <v-card-title class="text-h5 indigo">
          <v-icon
          size="28"
          left
          color="white"
          >
            mdi-calendar
          </v-icon>
          <span class="white--text">Date</span>
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
            @click="dialog = false, dates = []"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="indigo"
            text
            :disabled="!dates.length"
            @click="dialog = false, sendFilter()"
          >
            Add Filter
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-sheet>
</template>

<script>
import { format, parseISO } from 'date-fns';
import { mapActions, mapGetters } from 'vuex';
import BreakpointsCond from '../../mixins/BreakpointsCond';

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
    dateRange() {
      const sortedDates = this.dates;
      sortedDates.sort();
      const datesFormatted = [];
      for (let i = 0; i < sortedDates.length; i += 1) {
        datesFormatted.push(
          format(parseISO(sortedDates[i]), 'do MMM yyyy'),
        );
      }
      return datesFormatted.join(' ~ ');
    },

    ...mapGetters({ currentRemoved: 'matches/getCurrentRemoved' }),
  },

  watch: {
    currentRemoved(newVal) {
      if (newVal === 'Date') {
        this.filterPresent = false;
      }
    },
  },

  methods: {
    ...mapActions({ addFilter: 'matches/newFilter' }),

    sendFilter() {
      const filter = {
        type: 'Date',
        icon: 'mdi-calendar',
        msg: this.dates,
      };
      this.addFilter(filter);
      this.dates = [];
      this.filterPresent = true;
    },
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
