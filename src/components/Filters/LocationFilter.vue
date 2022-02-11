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
        mdi-map-marker-outline
      </v-icon>

      <span class="hidden-xs-only">Location</span>
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
          color="white"
          >
            mdi-map-marker-outline
          </v-icon>
          <span class="white--text">Location</span>
        </v-card-title>

        <v-card-text class="pt-4 pb-2">

          <v-text-field
          color="indigo"
          label="'Filter location'"
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

export default {
  name: 'LocationFilter',

  data() {
    return {
      dialog: false,
    };
  },

  mixins: [BreakpointsCond],
};
</script>
