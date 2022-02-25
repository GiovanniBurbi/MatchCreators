<template>
  <v-container :class="['box', {'resize':xsOnly}]">
    <div class="row-1">
      <player-card class="mb-12" :position="'Forward'"/>
      <player-card class="mb-12" :position="'Forward'"/>
    </div>
    <div class="row-2">
      <player-card class="mt-4" :position="'Defender'"/>
      <player-card class="mt-4" :position="'Defender'"/>
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
  margin-top: 20px;
  max-width: 900px;
  height: 480px;
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
  margin: auto 180px;
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
  margin-bottom: 20px;
}
</style>
