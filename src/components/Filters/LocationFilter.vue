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
      class="text-shadow"
      >
        mdi-map-marker-outline
      </v-icon>

      <span class="hidden-xs-only text-shadow">Location</span>
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
          class="text-shadow"
          >
            mdi-map-marker-outline
          </v-icon>
          <span class="white--text text-shadow">Location</span>
        </v-card-title>

        <v-card-text class="pt-4 pb-2">

          <v-text-field
          v-model="location"
          color="indigo"
          label="Filter location"
          clearable
          >

            <template v-slot:prepend>
              <v-icon
              left
              color="indigo"
              >
                mdi-map-marker-outline
              </v-icon>
            </template>

          </v-text-field>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="dialog = false, location = ''"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="indigo"
            text
            :disabled="!location"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../../mixins/BreakpointsCond';

export default {
  name: 'LocationFilter',

  data() {
    return {
      dialog: false,
      location: '',
      filterPresent: false,
    };
  },

  computed: {
    ...mapGetters({ currentRemoved: 'matches/getCurrentRemoved' }),
  },

  watch: {
    currentRemoved(newVal) {
      if (newVal === 'Location') {
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
        type: 'Location',
        icon: 'mdi-map-marker-outline',
        msg: this.location,
      };
      this.addFilter(filter);
      this.location = '';
      this.filterPresent = true;
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.8);
}
</style>
