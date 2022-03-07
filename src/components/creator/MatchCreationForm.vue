<template>
  <v-container fluid class="form-padding">

    <v-form ref="details">

      <v-row justify="center">

        <div class="d-inline-flex">

          <div
          :class="[xsOnly ? 'px-3' : 'px-6',
          'custom-label deep-purple darken-2',
          'd-inline-flex justify-center align-center elevation-2']"
          >

            <h1
            v-if="smAndUp"
            class="text-button white--text btn-shadow pr-1"
            >
              Date
            </h1>
            <v-icon
            size="20"
            dark
            class="btn-icon-shadow"
            >
              mdi-calendar
            </v-icon>

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
              :value="dateNoDay"
              label="Define the date"
              color="deep-purple darken-2"
              class="rounded-l-0"
              dark
              solo
              single-line
              readonly
              clearable
              :rules="rulesVector"
              v-bind="attrs"
              v-on="on"
              @click:clear="date=null" />
            </template>

            <v-date-picker
            v-model="date"
            dark
            color="deep-purple darken-2"
            :active-picker.sync="activePicker"
            :min="(new Date(Date.now() - (new Date()).
            getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            @change="menu = false" />

          </v-menu>

        </div>

      </v-row>

      <v-row justify="center">

        <div class="d-inline-flex">

          <div
          :class="[xsOnly ? 'px-3' : 'px-6',
          'custom-label deep-purple darken-2',
          'd-inline-flex justify-center align-center elevation-2']"
          >

            <h1
            v-if="smAndUp"
            class="text-button white--text btn-shadow pr-1"
            >
              Time
            </h1>
            <v-icon
            size="20"
            dark
            class="btn-icon-shadow"
            >
              mdi-clock-outline
            </v-icon>

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
              :rules="rulesVector"
              v-model="time"
              label="Define the time"
              color="deep-purple darken-2"
              class="rounded-l-0"
              dark
              solo
              single-line
              readonly
              clearable
              v-bind="attrs"
              v-on="on"
              @click:clear="start=null, end=null, step=1"
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

      </v-row>

      <v-row justify="center">

        <div class="d-inline-flex">

          <div
          :class="[xsOnly ? 'px-3' : 'pr-1 pl-2',
          'custom-label deep-purple darken-2',
          'd-inline-flex justify-center align-center elevation-2']"
          >

            <h1
            v-if="smAndUp"
            class="text-button white--text btn-shadow pr-1"
            >
              Location
            </h1>
            <v-icon
            size="22"
            dark
            class="btn-icon-shadow"
            >
              mdi-map-marker-outline
            </v-icon>

          </div>

          <v-text-field
          v-model="location"
          label="Define the location"
          color="deep-purple darken-2"
          class="rounded-l-0"
          dark
          solo
          single-line
          clearable
          :rules="rulesVector"
          @click:clear="location=null" />

        </div>

      </v-row>

      <v-row justify="center">
        <v-btn
        class="shadow"
        dark
        color="deep-purple darken-2"
        elevation="6"
        @click="proceed()">
          Continue
        </v-btn>
      </v-row>

    </v-form>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import DataHelper from '@/mixins/DataHelper';

export default {
  name: 'MatchCreationForm',

  data() {
    return {
      step: 1,
      date: null,
      activePicker: null,
      menu: false,
      time: null,
      modal: false,
      start: null,
      end: null,
      location: null,
      rulesVector: [],
    };
  },

  computed: {
    ...mapGetters({ getDetails: 'matches/getDetails' }),
  },

  watch: {
    getDetails(newVal) {
      if (newVal.length === 0) {
        this.date = null;
        this.time = null;
        this.start = null;
        this.end = null;
        this.step = 1;
        this.location = null;
      }
    },
  },

  methods: {
    ...mapMutations({ sendDetails: 'matches/setDetails' }),

    proceed() {
      this.rulesVector.push(this.rules.required);
      if (this.$refs.details.validate()) {
        const details = [
          this.date,
          this.getTime,
          this.location,
        ];
        this.sendDetails(details);
        this.$emit('detailsPassed');
      }
      this.rulesVector.pop();
    },
  },

  mixins: [BreakpointsCond, DataHelper],
};
</script>

<style scoped>
.custom-label {
  height: 48px;
  border-radius: 5px 0 0 5px;
  width: fit-content;
}
.form-padding {
  padding-top: 120px;
}
</style>
