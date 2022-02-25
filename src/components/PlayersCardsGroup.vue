<template>
  <v-container class="box">
    <!-- <v-row class="px-15 mx-15">
      <v-col class="pt-0">
        <player-card class="pt-0" :position="'Forward'"/>
      </v-col>
      <v-col class="pt-0">
        <player-card class="pt-0" :position="'Forward'"/>
      </v-col>
    </v-row>
    <v-row class="mt-0" no-gutters style="background: white">
      <v-col>
        <player-card  :position="'Defender'"/>
      </v-col>
      <v-col>
        <player-card  :position="'Defender'"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <player-card  :position="'Goalkeeper'"/>
      </v-col>
    </v-row> -->
    <div class="row-1">
      <player-card class="mb-6 mx-10" :position="'Forward'"/>
      <player-card class="mb-6 mx-10" :position="'Forward'"/>
    </div>
    <div class="row-2">
      <player-card class="mb-6" :position="'Defender'"/>
      <player-card class="mb-6" :position="'Defender'"/>
    </div>
    <div class="row-3">
      <player-card class="mb-6" :position="'Goalkeeper'"/>
    </div>

  </v-container>
</template>

<script>
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'PlayersCardsGroup',

  components: {
    PlayerCard,
  },
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
  justify-content: center;
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
