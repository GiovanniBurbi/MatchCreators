<template>
  <v-container fluid fill-height class="container">
    <v-row justify="center" align="center" class="centering">
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
    </v-row>
  </v-container>
</template>

<script>
import MatchCard from './MatchCard.vue';

export default {
  name: 'MatchCardGroup',

  components: {
    MatchCard,
  },
};
</script>

<style scoped>
.container {
  height: 585px;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
  right: -17px;
}
</style>
