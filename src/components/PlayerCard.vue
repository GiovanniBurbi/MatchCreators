<template>
  <div class="box-card">
    <v-img
    :src="getCard"
    contain
    :class="[xsOnly ? 'card-small' : 'card']"
    >
    </v-img>

    <div :class="xsOnly ? 'overCard-small' : 'overCard'">

      <!-- <v-container fill-height v-if="player">

        <v-avatar rounded size="100" class="pt-5">
          <img src="../assets/Carl.jpg">
          <img src="{{player.picture}}"> ???
        </v-avatar>

        <v-row justify="center">
          <h1 :class="['text-center text-h5 font-weight-light',
          white ? 'black--text' : 'white--text']" >Joseph</h1>
          <h1 class="white--text text-center text-h5
          font-weight-light" >{{player.username}}</h1>
        </v-row>

        <v-row justify="center">
          <v-icon
          :class="[white ? null : 'white-icon', 'pb-2']"
          :size="position === 'Forward' ? 50 : 45"
          >
            $forward-icon
          </v-icon>
        </v-row>

      </v-container> -->

      <!-- <v-container fill-height v-else> -->
      <v-container fill-height>

        <v-row justify="center" no-gutters
        :class="xsOnly ? '' : 'mt-1'">
          <v-btn fab outlined :small="xsOnly" :dark="!white">
            <v-icon size="38">
              mdi-plus
            </v-icon>
          </v-btn>
        </v-row>

        <v-row justify="center">
          <v-icon
          :class="[white ? null : 'white-icon', xsOnly ? 'pb-3' : null]"
          :size="position === 'Forward' ? 40 : 36"
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

export default {
  name: 'PlayerCard',

  computed: {
    getCard() {
      if (this.white) {
        // eslint-disable-next-line global-require
        return require('../assets/teamCreator/white-card.png');
      // eslint-disable-next-line global-require
      } return require('../assets/teamCreator/black-card.png');
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
  },

  props: {
    white: {
      type: Boolean,
    },
    position: {
      type: String,
    },
    /* player: {
      type: Object,
    }, */
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
  max-width: 120px;
}
.overCard {
  position: absolute;
  width: 100px;
  height: 170px;
}
.overCard-small {
  position: absolute;
  width: 80px;
  height: 130px;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
</style>
