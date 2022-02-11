<template>
  <v-form>
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
      v-model="dates"
      :min="(new Date(Date.now() - (new Date()).
        getTimezoneOffset() * 60000)).toISOString()
        .substr(0, 10)"
      color="indigo"
      range
      ></v-date-picker>

    </v-row>

  </v-form>
</template>

<script>
import { format, parseISO } from 'date-fns';

export default {
  name: 'DateFilter',

  data() {
    return {
      dates: [],
    };
  },

  props: {
    dialogOpen: {
      type: Boolean,
    },
  },

  watch: {
    dialogOpen(val) {
      if (val === false) {
        this.dates = [];
      }
    },
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
  },

};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
