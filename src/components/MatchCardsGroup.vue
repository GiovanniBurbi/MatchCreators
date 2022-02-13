<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <match-card />
      <!-- <match-card />
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
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card />
      <match-card /> -->
    </v-row>
  </v-container>
</template>

<script>
import MatchCard from './MatchCard.vue';

export default {
  name: 'MatchCardGroup',

  data() {
    return {
    /* match: {
        id: 1,
        date: '2022-03-01',
        startTime: '10:00',
        endTime: '12:00',
        location: 'Albereta',
        positions: {
          goalkeepers: 2,
          defenders: 3,
          forwards: 4,
        },
      }, */
    };
  },

  components: {
    MatchCard,
  },
};
</script>

<style scoped>
</style>
