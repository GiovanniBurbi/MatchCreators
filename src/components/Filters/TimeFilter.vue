<template>
  <v-sheet color="transparent" class="d-flex justify-center">

    <v-btn
    dark
    rounded
    color="deep-purple"
    @click.stop="dialog=true"
    >
      <v-icon
      :left="smAndUp"
      size="22"
      >
        mdi-clock-outline
      </v-icon>

      <span class="hidden-xs-only">Time</span>
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <v-card>

        <v-card-title class="text-h5 indigo">
          <v-icon
          size="28"
          left
          color="white"
          >
            mdi-clock-outline
          </v-icon>
          <span class="white--text">Time</span>
        </v-card-title>

        <v-card-text class="pt-4 pb-2">

          <v-row>
            <v-col cols="12" sm="5">
              <v-menu
              ref="menu1"
              v-model="menuStart"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="start"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start"
                    label="From"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-time-picker
                v-if="menuStart"
                v-model="start"
                format="24hr"
                full-width
                :max="end"
                @click:minute="$refs.menu1.save(start)"
                ></v-time-picker>
              </v-menu>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="12" sm="6">
              <v-menu
              ref="menu2"
              v-model="menuEnd"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="end"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="end"
                    label="To"
                    prepend-icon="mdi-clock-time-eight-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-time-picker
                v-if="menuEnd"
                v-model="end"
                format="24hr"
                full-width
                :min="start"
                @click:minute="$refs.menu2.save(end)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="dialog = false, start = null, end = null"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="indigo"
            text
            disabled
            @click="dialog = false"
          >
            Add Filter
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-sheet>

</template>
<script>
import BreakpointsCond from '../../mixins/BreakpointsCond';

export default {
  name: 'TimeFilter',

  data() {
    return {
      dialog: false,
      menuStart: false,
      menuEnd: false,
      start: null,
      end: null,
    };
  },

  mixins: [BreakpointsCond],
};
</script>
<style scoped>

</style>
