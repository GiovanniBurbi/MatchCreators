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
      <player-card style="position: absolute;" class="pb-4" :position="'Goalkeeper'" />
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
  padding-top: 120px;
}
.row-2 {
  height: 33.4%;
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 50px;
}
.row-3 {
  height: 33.3%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .box {
  display: inline-flex;
  flex-wrap: wrap;
} */
/* .resize {
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
} */
</style>
