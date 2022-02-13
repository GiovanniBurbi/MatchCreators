<template>
  <v-container fluid fill-height class="container">
    <v-row justify="center">
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
  background-color: white;
}
</style>
