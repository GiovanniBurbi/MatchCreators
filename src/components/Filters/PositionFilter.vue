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
      class="icon-white"
      >
        $position-icon
      </v-icon>

      <span class="hidden-xs-only">Position</span>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>

        <v-card-title class="text-h5 indigo">
          <v-icon
          size="28"
          left
          class="icon-white"
          >
            $position-icon
          </v-icon>
          <span class="white--text">Position</span>
        </v-card-title>

        <v-card-text class="pt-4 pb-2">

          <position-field
          label="Filter position"
          color="icon-indigo"
          />

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="dialog = false"
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
import PositionField from '../PositionField.vue';

export default {
  name: 'PositionFilter',

  data() {
    return {
      dialog: false,
    };
  },

  components: {
    PositionField,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.icon-white {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
.icon-purple {
  /* deep-purple */
  filter: invert(25%) sepia(75%) saturate(1998%) hue-rotate(247deg) brightness(82%) contrast(92%);
}
</style>
