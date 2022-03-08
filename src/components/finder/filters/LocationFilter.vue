<template>
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
      <span class="white--text card-title-shadow">Location</span>
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
        @click="$emit('dialogClose'), location = ''"
      >
        Cancel
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="indigo"
        text
        :disabled="!location"
        @click="$emit('dialogClose'), sendFilter()"
      >
        Add Filter
      </v-btn>
    </v-card-actions>

  </v-card>

</template>
<script>
import { mapActions } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';

export default {
  name: 'LocationFilter',

  data() {
    return {
      dialog: false,
      location: '',
    };
  },

  methods: {
    ...mapActions({ addFilter: 'filters/newFilter' }),

    sendFilter() {
      const filter = {
        type: 'Location',
        icon: 'mdi-map-marker-outline',
        msg: this.location,
      };
      this.addFilter(filter);
      this.location = '';
      this.$emit('filterPresent');
    },
  },

  mixins: [BreakpointsCond],
};
</script>
