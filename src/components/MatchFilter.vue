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
      :class="(category==='position') ? 'icon-white' : null"
      >
        {{ icon }}
      </v-icon>

      <span class="hidden-xs-only">{{ category }}</span>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>

        <v-card-title class="text-h5 deep-purple">
          <v-icon
          size="28"
          left
          :class="(category==='position') ? 'icon-white' : null"
          color="white"
          >
            {{ icon }}
          </v-icon>
          <span class="capitalize white--text">{{ category }}</span>
        </v-card-title>

        <v-card-text class="pt-4 pb-2">

          <date-filter :dialogOpen="dialog" v-if="category==='date'"/>
          <time-filter v-if="category==='time'"/>
          <location-filter v-if="category==='location'"/>
          <position-filter v-if="category==='position'"/>

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
import DateFilter from './Filters/DateFilter.vue';
import TimeFilter from './Filters/TimeFilter.vue';
import LocationFilter from './Filters/LocationFilter.vue';
import PositionFilter from './Filters/PositionFilter.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'MatchFilter',

  components: {
    DateFilter,
    TimeFilter,
    LocationFilter,
    PositionFilter,
  },

  data() {
    return {
      icon: '',
      dialog: false,
    };
  },

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  created() {
    switch (this.category) {
      case 'date':
        this.icon = 'mdi-calendar';
        break;
      case 'time':
        this.icon = 'mdi-clock-outline';
        break;
      case 'location':
        this.icon = 'mdi-map-marker-outline';
        break;
      /* position case */
      default:
        this.icon = '$position-icon';
        break;
    }
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
.capitalize {
  text-transform: capitalize;
}
</style>
