<template>
  <v-container class="box">
    <div class="row-1">
      <player-card class="mb-6 mx-4" :position="'Forward'"/>
      <player-card class="mb-6 mx-4" :position="'Forward'"/>
    </div>
    <div class="row-2">
      <player-card class="mb-2" :position="'Defender'"/>
      <player-card class="mb-2" :position="'Defender'"/>
    </div>
    <div class="row-3">
      <player-card class="mb-12" :position="'Goalkeeper'"/>
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
.box {
  max-width: 950px;
  height: 100%;
  display: inline-flex;
  flex-wrap: wrap;
}
.row-1 {
  height: 33.3%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 180px 0 180px;
}
.row-2 {
  height: 33.4%;
  width: 100%;
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
</style>
