<template>
  <v-container fluid class="formation">

    <div class="row-1">
      <player-card :player="user" :white="teamWhite" :position="'Forward'" />
      <player-card :white="teamWhite" :position="'Forward'" />
    </div>
    <div class="row-2">
      <player-card :white="teamWhite" :position="'Defender'" />
      <player-card :white="teamWhite" :position="'Defender'" />
    </div>
    <div class="row-3">
      <player-card :white="teamWhite" :position="'Goalkeeper'" />
    </div>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'PlayersCardsGroup',

  data() {
    return {
      user: 'Carl',
    };
  },

  components: {
    PlayerCard,
  },

  props: {
    teamWhite: {
      type: Boolean,
      required: true,
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.formation {
  margin-top: 10px;
  height: 90%;
}
.row-1 {
  height: 33.3%;
  width: 30%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.row-2 {
  height: 33.4%;
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.row-3 {
  height: 33.3%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 430px) {
  .row-2 {
    max-width: 40%;
  }
  .row-1 {
    max-width: 24%;
  }
}
</style>
