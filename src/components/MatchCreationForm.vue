<template>
<v-form ref="details">
  <v-container fluid>
    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-3 justify-center align-center">
        <h1
        v-if="smAndUp"
        class="text-button white--text label-text pr-1"
        >
          Date
        </h1>
        <v-icon size="20" dark class="label-text">mdi-calendar</v-icon>
      </div>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
        >

          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            :value="dateFormatting"
            :rules="[rules.required]"
            label="Define the date"
            color="deep-purple darken-2"
            solo flat
            readonly clearable
            v-bind="attrs"
            v-on="on"
            @click:clear="date=null">
            </v-text-field>
          </template>

          <v-date-picker
          v-model="date"
          color="deep-purple darken-2"
          :active-picker.sync="activePicker"
          :min="(new Date(Date.now() - (new Date()).
          getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
          @change="menu = false"
          >
          </v-date-picker>

      </v-menu>

    </div>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-3 justify-center align-center">
        <h1
        v-if="smAndUp"
        class="text-button white--text label-text pr-1"
        >
          Time
        </h1>
        <v-icon size="20" dark class="label-text">mdi-clock-outline</v-icon>
      </div>

      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="time"
        persistent
        width="340"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :rules="[rules.required]"
            v-model="time"
            class="d-inline-flex"
            label="Define the time"
            solo flat
            color="deep-purple darken-2"
            readonly clearable
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-card dark>
          <v-window v-model="step">

            <v-window-item :value="1">
              <v-card-text class="pl-6">
                <h1 class="text-h4 white--text font-weight-medium">Start:</h1>
                <v-time-picker
                  v-if="modal"
                  v-model="start"
                  :max="end"
                  format="24hr"
                  color="deep-purple darken-2"
                >
                </v-time-picker>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="red"
                  @click="modal = false"
                >
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  :disabled="start === null"
                  color="indigo accent-2"
                  @click="step++"
                >
                  Next
                </v-btn>
              </v-card-actions>

            </v-window-item>

            <v-window-item :value="2">

              <v-card-text  class="pl-6">
                <h1 class="text-h4 white--text font-weight-medium">End:</h1>
                <v-time-picker
                  v-if="modal"
                  v-model="end"
                  :min="start"
                  format="24hr"
                  color="deep-purple darken-2"
                >
                </v-time-picker>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="red"
                  @click="step--"
                >
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="green"
                  :disabled="end === null"
                  @click="$refs.dialog.save(getTime)"
                >
                  Confirm
                </v-btn>
              </v-card-actions>

            </v-window-item>
          </v-window>
        </v-card>

      </v-dialog>

    </div>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-3 justify-center align-center">
        <h1
        v-if="smAndUp"
        class="text-button white--text label-text pr-1"
        >
          Location
        </h1>
        <v-icon size="20" dark class="label-text">mdi-map-marker-outline</v-icon>
      </div>

      <v-text-field
      :rules="[rules.required, rules.noSpaces]"
      solo clearable color="deep-purple darken-2"
      flat class="d-inline-flex" label="Define the location"></v-text-field>
    </div>
    <v-btn
    dark
    color="deep-purple darken-2"
    elevation="6"
    @click="proceed()">Continue</v-btn>
  </v-container>
</v-form>
</template>

<script>
import { parseISO, format } from 'date-fns';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'MatchCreationForm',

  data() {
    return {
      date: null,
      activePicker: null,
      menu: false,
      time: null,
      modal: false,
      start: null,
      end: null,
      step: 1,
      rules: {
        required: (v) => !!v || 'Required',
        noSpaces: (v) => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
      },
    };
  },

  computed: {
    /* format date */
    dateFormatting() {
      return this.date ? format(parseISO(this.date), 'do MMMM yyyy') : '';
    },

    getTime() {
      return `${this.start} - ${this.end}`;
    },
  },

  methods: {
    proceed() {
      if (this.$refs.details.validate()) {
        this.$emit('detailsPassed');
      }
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.container {
  height: 54vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.background-label {
  background-color: #512DA8;
  height: 49px;
  border-radius: 5px 0 0 5px;
  width: fit-content;
}
.bg-field {
  background-color: white;
  width: calc(260px + 14vw);
  height: 49px;
  border-radius: 6px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6);
}
.label-text {
  text-shadow: 2px 2px 3px black;
}
</style>
