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
      size="20"
      :class="['icon-white', filterPresent ? 'icon-disabled' : null]"
      >
        $position-icon
      </v-icon>

      <span
      :class="['hidden-xs-only', filterPresent ? '' : 'text-shadow']">Position</span>
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>

        <v-card-title class="text-h5 indigo pl-3">
          <v-icon
          size="24"
          left
          class="icon-white"
          >
            $position-icon
          </v-icon>
          <span class="white--text">Position</span>
        </v-card-title>

        <v-card-text class="pt-4 pb-2">

          <v-row class="pl-2">

            <position-field
            label="Filter position"
            color="icon-indigo"
            />

          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="dialog = false, setSelection('')"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="indigo"
            text
            :disabled="!getPosSelection"
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
import PositionField from '@/components/inputFields/PositionField.vue';
import BreakpointsCond from '../../../mixins/BreakpointsCond';

export default {
  name: 'PositionFilter',

  data() {
    return {
      dialog: false,
      filterPresent: false,
    };
  },

  computed: {
    ...mapGetters({ getPosSelection: 'posInputField/getPosSelection' }),
    ...mapGetters({ currentRemoved: 'matches/getCurrentRemoved' }),
  },

  watch: {
    /* watch for activation filter, only one filter per type allowed.
    When filter feature will be improved, it will change. */
    currentRemoved(newVal) {
      if (newVal === 'Position') {
        this.filterPresent = false;
        this.resetDeleted();
      }
    },
  },

  components: {
    PositionField,
  },

  methods: {
    ...mapMutations({ setSelection: 'posInputField/setPosSelection' }),
    ...mapMutations({ resetDeleted: 'matches/resetCurrentDeleted' }),

    ...mapActions({ addFilter: 'matches/newFilter' }),

    sendFilter() {
      const filter = {
        type: 'Position',
        icon: '$position-icon',
        msg: this.getPosSelection,
      };
      this.addFilter(filter);
      this.setSelection('');
      this.filterPresent = true;
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.icon-white {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%)
  drop-shadow(1px 1px black);
}
.icon-purple {
  /* deep-purple */
  filter: invert(25%) sepia(75%) saturate(1998%) hue-rotate(247deg) brightness(82%) contrast(92%);
}
.icon-disabled {
  opacity: 30%;
}
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.8);
}
</style>
