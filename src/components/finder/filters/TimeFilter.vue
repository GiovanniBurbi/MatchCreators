<template>
  <v-card>

    <v-card-title class="text-h5 indigo">
      <v-icon
      size="28"
      left
      color="white"
      class="icon-shadow"
      >
        mdi-clock-outline
      </v-icon>
      <span class="white--text card-title-shadow">Time</span>
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
          min-width="280px"
          >

            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="start"
                label="Filter from"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              >

                <template v-slot:prepend>
                  <v-icon
                  left
                  color="indigo"
                  >
                    mdi-clock-time-four-outline
                  </v-icon>
                </template>

              </v-text-field>
            </template>

            <v-time-picker
            v-if="menuStart"
            v-model="start"
            format="24hr"
            full-width
            color="indigo"
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
                <template v-slot:prepend>
                  <v-icon
                  left
                  color="indigo"
                  >
                    mdi-clock-time-eight-outline
                  </v-icon>
                </template>
              </v-text-field>
            </template>

            <v-time-picker
            v-if="menuEnd"
            v-model="end"
            format="24hr"
            full-width
            color="indigo"
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
        @click="$emit('dialogClose'), start = null, end = null"
      >
        Cancel
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="indigo"
        text
        :disabled="!(start || end)"
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

  computed: {
    ...mapGetters({ currentRemoved: 'matches/getCurrentRemoved' }),
  },

  methods: {
    ...mapActions({ addFilter: 'matches/newFilter' }),
    ...mapMutations({ resetDeleted: 'matches/resetCurrentDeleted' }),

    sendFilter() {
      if (!this.start) {
        this.start = '00:00';
      }
      if (!this.end) {
        this.end = '23:59';
      }
      const filter = {
        type: 'Time',
        icon: 'mdi-clock-outline',
        msg: [this.start, this.end],
      };
      this.addFilter(filter);
      this.start = null;
      this.end = null;
      this.$emit('filterPresent');
    },
  },

  mixins: [BreakpointsCond],
};
</script>
