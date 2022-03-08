<template>
  <v-container fluid>
    <v-row justify="center">

      <v-col
      class="d-inline-flex justify-center align-center"
      >
        <div :class="iconBg">
           <v-icon
           size="28"
           dark
           class="btn-icon-shadow"
           >
            mdi-calendar
          </v-icon>
        </div>

        <div :class="textBg">
          <h1 :class="textStyle">
            {{ dateFormatted }}
          </h1>
        </div>
      </v-col>

      <v-col
      class="d-inline-flex justify-center align-center"
      >
        <div :class="iconBg">
           <v-icon
           size="28"
           dark
           class="btn-icon-shadow"
           >
            mdi-clock-outline
          </v-icon>
        </div>

        <div :class="textBg">
          <h1 :class="textStyle">
            {{ details[1] }}
          </h1>
        </div>
      </v-col>

      <v-col
      class="d-inline-flex justify-center align-center"
      >
        <div :class="iconBg">
           <v-icon
           size="28"
           dark
           class="btn-icon-shadow"
           >
            mdi-map-marker-outline
          </v-icon>
        </div>

        <div :class="textBg">
          <h1 :class="textStyle">
            {{ details[2] }}
          </h1>
        </div>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>
import { mapGetters } from 'vuex';
import { parseISO, format } from 'date-fns';
import BreakpointsCond from '@/mixins/BreakpointsCond';

export default {
  name: 'DetailsRecap',

  data() {
    return {
      iconBg: 'background-label deep-purple darken-3 pa-2',
      textBg: 'bg-field grey darken-4 py-1 pl-2',
      textStyle: 'text-subtitle-1 white--text text-shadow py-1 font-weight-medium',
    };
  },

  computed: {
    ...mapGetters({ details: 'matches/getDetails' }),

    dateFormatted() {
      return this.details[0] ? format(parseISO(this.details[0]), 'do MMM yyyy') : '';
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background-label {
  border-radius: 6px 0 0 6px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  width: fit-content;
}
.bg-field {
  width: 140px;
  white-space: nowrap;
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  cursor: default;
}
.bg-field::-webkit-scrollbar {
  display: none;
}
</style>
