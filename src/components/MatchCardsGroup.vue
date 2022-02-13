<template>
  <v-container fluid>
    <v-row justify="center">
      <match-card
      v-for="match in matches"
      :key="match.id"
      :match="match"
      />
    </v-row>
  </v-container>
</template>

<script>
import MatchCard from './MatchCard.vue';

export default {
  name: 'MatchCardGroup',

  data() {
    return {
      matches: [
        {
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
        },
        {
          id: 2,
          date: '2022-08-22',
          startTime: '18:00',
          endTime: '19:00',
          location: 'Galluzzo',
          positions: {
            goalkeepers: 1,
            defenders: 4,
            forwards: 4,
          },
        },
        {
          id: 3,
          date: '2022-04-17',
          startTime: '11:00',
          endTime: '12:00',
          location: 'Firenze sud',
          positions: {
            goalkeepers: 1,
            defenders: 2,
            forwards: 4,
          },
        },
        {
          id: 4,
          date: '2022-07-11',
          startTime: '18:00',
          endTime: '21:00',
          location: 'Albereta',
          positions: {
            goalkeepers: 1,
            defenders: 2,
            forwards: 3,
          },
        },
        {
          id: 5,
          date: '2022-03-11',
          startTime: '14:00',
          endTime: '15:00',
          location: 'Legnaia',
          positions: {
            goalkeepers: 2,
            defenders: 4,
            forwards: 3,
          },
        },
        {
          id: 6,
          date: '2022-03-21',
          startTime: '17:00',
          endTime: '18:00',
          location: 'Due strade',
          positions: {
            goalkeepers: 2,
            defenders: 2,
            forwards: 3,
          },
        },
        {
          id: 7,
          date: '2022-04-01',
          startTime: '15:00',
          endTime: '16:00',
          location: 'Porta Romana',
          positions: {
            goalkeepers: 1,
            defenders: 2,
            forwards: 4,
          },
        },
        {
          id: 8,
          date: '2022-05-05',
          startTime: '18:00',
          endTime: '19:00',
          location: 'Scandicci',
          positions: {
            goalkeepers: 1,
            defenders: 4,
            forwards: 3,
          },
        },
        {
          id: 9,
          date: '2022-04-14',
          startTime: '10:00',
          endTime: '11:00',
          location: 'Albereta',
          positions: {
            goalkeepers: 2,
            defenders: 2,
            forwards: 4,
          },
        },
        {
          id: 10,
          date: '2022-05-11',
          startTime: '11:00',
          endTime: '12:00',
          location: 'Campo di Marte',
          positions: {
            goalkeepers: 1,
            defenders: 4,
            forwards: 3,
          },
        },
        {
          id: 11,
          date: '2022-04-28',
          startTime: '13:00',
          endTime: '15:00',
          location: 'Settignano',
          positions: {
            goalkeepers: 0,
            defenders: 4,
            forwards: 4,
          },
        },
        {
          id: 12,
          date: '2022-03-01',
          startTime: '12:00',
          endTime: '14:00',
          location: 'Albereta',
          positions: {
            goalkeepers: 1,
            defenders: 0,
            forwards: 4,
          },
        },
        {
          id: 13,
          date: '2022-03-10',
          startTime: '9:00',
          endTime: '10:00',
          location: 'Ponte a sieve',
          positions: {
            goalkeepers: 2,
            defenders: 4,
            forwards: 3,
          },
        },
        {
          id: 14,
          date: '2022-03-05',
          startTime: '10:00',
          endTime: '11:00',
          location: 'Mercatale',
          positions: {
            goalkeepers: 0,
            defenders: 3,
            forwards: 4,
          },
        },
        {
          id: 15,
          date: '2022-07-11',
          startTime: '18:00',
          endTime: '21:00',
          location: 'Albereta',
          positions: {
            goalkeepers: 1,
            defenders: 2,
            forwards: 3,
          },
        },
      ],
    };
  },

  components: {
    MatchCard,
  },
};
</script>

<style scoped>
</style>
