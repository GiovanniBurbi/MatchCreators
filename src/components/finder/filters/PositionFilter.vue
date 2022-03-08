<template>
  <v-card>

    <v-card-title class="text-h5 indigo">
      <v-icon
      size="24"
      left
      class="icon-white-shadow"
      >
        $position-icon
      </v-icon>
      <span class="white--text card-title-shadow">Position</span>
    </v-card-title>

    <v-card-text class="pt-4 pb-2">

      <v-row class="pl-2">

        <position-field label="Filter position"/>

      </v-row>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        color="error"
        text
        @click="$emit('dialogClose'), setSelection('')"
      >
        Cancel
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="indigo"
        text
        :disabled="!getPosSelection"
        @click="$emit('dialogClose'), sendFilter()"
      >
        Add Filter
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import PositionField from '@/components/inputFields/PositionField.vue';
import BreakpointsCond from '@/mixins/BreakpointsCond';

export default {
  name: 'PositionFilter',

  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    ...mapGetters({ getPosSelection: 'posInputField/getPosSelection' }),
  },

  components: {
    PositionField,
  },

  methods: {
    ...mapMutations({ setSelection: 'posInputField/setPosSelection' }),

    ...mapActions({ addFilter: 'filters/newFilter' }),

    sendFilter() {
      const filter = {
        type: 'Position',
        icon: '$position-icon',
        msg: this.getPosSelection,
      };
      this.addFilter(filter);
      this.setSelection('');
      this.$emit('filterPresent');
    },
  },

  mixins: [BreakpointsCond],
};
</script>
