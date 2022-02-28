<template>
  <div class="box-card">
    <v-img
    :src="getCard"
    contain
    :class="xsOnly ? 'card-small' : 'card'"
    >
    </v-img>

    <div :class="xsOnly ? 'overCard-small' : 'overCard'">

      <v-container fill-height v-if="player.username !== ''">

        <v-row justify="center">
          <v-avatar
          :width="xsOnly ? 60 : 80"
          rounded="sm"
          :size="xsOnly ? 50 : 70"
          :class="xsOnly ? 'mt-1' : 'mt-4'"
          >
            <img :src="getPicture" >
          </v-avatar>
        </v-row>

        <v-row justify="center">
          <h1
          :class="['text-center font-weight-light',
          xsOnly ? 'text-caption' : 'text-h6 pb-4',
          white ? '' : 'white--text']"
          >
            {{ player.username }}
          </h1>
        </v-row>

        <v-row justify="center">
          <v-icon
          :class="[white ? null : 'white-icon',
          xsOnly ? 'pb-1' : 'pb-6']"
          :size="iconSize"
          >
            {{ positionIcon }}
          </v-icon>
        </v-row>

      </v-container>

      <v-container fill-height v-else>

        <v-row justify="center" no-gutters
        :class="xsOnly ? '' : 'mt-1'">
          <v-btn fab outlined :x-small="xsOnly" :dark="!white">
            <v-icon :size="xsOnly ? 26 : 38">
              mdi-plus
            </v-icon>
          </v-btn>
        </v-row>

        <v-row justify="center">
          <v-icon
          :class="[white ? null : 'white-icon',
          xsOnly ? 'pt-1' : '']"
          :size="iconSize"
          >
            {{ positionIcon }}
          </v-icon>
        </v-row>

      </v-container>

    </div>
  </div>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

/* eslint-disable global-require */
export default {
  name: 'PlayerCard',

  computed: {
    getCard() {
      if (this.white) {
        return require('../assets/teamCreator/white-card.png');
      } return require('../assets/teamCreator/black-card.png');
    },

    getPicture() {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../${this.player.picture}`);
    },

    positionIcon() {
      switch (this.position) {
        case 'Goalkeeper':
          return '$goalkeeper-icon';
        case 'Defender':
          return '$defender-icon';
        default:
          return '$forward-icon';
      }
    },

    iconSize() {
      if (this.position === 'Forward') {
        if (this.$vuetify.breakpoint.xsOnly) return 24;
        return 34;
      }
      if (this.$vuetify.breakpoint.xsOnly) return 22;
      return 30;
    },
  },

  props: {
    white: {
      type: Boolean,
    },
    position: {
      type: String,
    },
    player: {
      type: Object,
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.box-card {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  max-width: 140px;
}
.card-small {
  max-width: 100px;
}
.overCard {
  position: absolute;
  width: 100px;
  height: 170px;
}
.overCard-small {
  position: absolute;
  width: 80px;
  height: 110px;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
</style>
