<template>
  <v-container fluid class="px-0"
>

  <v-row justify="center">
    <v-img
    :class="xsOnly ? 'field-small' :'field'"
    src="../assets/teamCreator/pitch.png"
    >
      <v-scale-transition hide-on-leave>
        <players-cards-group v-show="!isWhite" :team="teamBlack"/>
      </v-scale-transition>
      <v-scale-transition hide-on-leave>
        <players-cards-group v-show="isWhite" :team="teamWhite"/>
      </v-scale-transition>
    </v-img>
  </v-row>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayersCardsGroup from './PlayersCardsGroup.vue';

export default {
  name: 'Field',

  props: {
    isWhite: {
      type: Boolean,
      required: true,
    },
    teamWhite: {
      type: Array,
      required: true,
    },
    teamBlack: {
      type: Array,
      required: true,
    },
  },

  components: {
    PlayersCardsGroup,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.field {
  max-width: 1500px;
  max-height: 690px;
}
.field-small {
  max-width: 1100px;
  max-height: 490px;
}
</style>
