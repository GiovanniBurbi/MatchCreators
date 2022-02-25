<template>
  <v-container :class="['box', {'resize':xsOnly}]">
    <div class="row-1">
      <player-card class="mb-8 mx-4" :position="'Forward'"/>
      <player-card class="mb-8 mx-4" :position="'Forward'"/>
    </div>
    <div class="row-2">
      <player-card class="" :position="'Defender'"/>
      <player-card class="" :position="'Defender'"/>
    </div>
    <div class="row-3">
      <player-card class="gk" :position="'Goalkeeper'"/>
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
  padding-top: 30px;
  max-width: 900px;
  height: 70%;
  display: inline-flex;
  flex-wrap: wrap;
  position: absolute;
}
.resize {
  margin-top: 130px;
  max-width: 600px;
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
.gk {
  margin-bottom: 30px;
}
</style>
