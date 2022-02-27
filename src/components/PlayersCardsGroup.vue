<template>
  <v-container fluid class="formation">

    <div class="row-1">
      <player-card :position="'Forward'" />
      <player-card :position="'Forward'" />
    </div>
    <div class="row-2">
      <player-card :position="'Defender'" />
      <player-card :position="'Defender'" />
    </div>
    <div class="row-3">
      <player-card :position="'Goalkeeper'" />
    </div>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'PlayersCardsGroup',

  components: {
    PlayerCard,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.formation {
  margin-top: 10px;
  height: 90%;
  position: relative;
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
