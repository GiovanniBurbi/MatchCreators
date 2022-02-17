<template>
  <v-container fluid>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-3 justify-center align-center">
        <h1 class="text-button white--text label-text pr-1">Date</h1>
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
            label="Define the date"
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
        <h1 class="text-button white--text label-text pr-1">Time</h1>
        <v-icon size="20" dark class="label-text">mdi-clock-outline</v-icon>
      </div>

      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="time"
        persistent
        width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            class="d-inline-flex"
            label="Define the time"
            solo flat
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-card dark>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col style="width: 350px; flex: 0 1 auto;">
                <h1 class="text-h4 white--text font-weight-medium pt-2">Start:</h1>
                <v-time-picker
                  v-if="modal"
                  v-model="start"
                  :max="end"
                  format="24hr"
                  color="deep-purple darken-2"
                >
                </v-time-picker>
              </v-col>
              <v-col style="width: 350px; flex: 0 1 auto;">
                <h1 class="text-h4 white--text font-weight-medium pt-2">End:</h1>
                <v-time-picker
                  v-if="modal"
                  v-model="end"
                  :min="start"
                  format="24hr"
                  color="deep-purple darken-2"
                >
                </v-time-picker>
              </v-col>
            </v-row>
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
              color="green"
              @click="$refs.dialog.save(time)"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>

    </div>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-2 justify-center align-center">
        <h1 class="text-button white--text label-text pr-1">Location</h1>
        <v-icon size="20" dark class="label-text">mdi-map-marker-outline</v-icon>
      </div>

      <v-text-field solo
      flat class="d-inline-flex" label="Define the location"></v-text-field>

    </div>

  </v-container>
</template>

<script>
import { parseISO, format } from 'date-fns';

export default {
  name: 'MatchCreationForm',

  data() {
    return {
      date: null,
      activePicker: null,
      menu: false,
      time: null,
      modal: false,
    };
  },

  computed: {
    /* format date */
    dateFormatting() {
      return this.date ? format(parseISO(this.date), 'do MMMM yyyy') : '';
    },
  },
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
