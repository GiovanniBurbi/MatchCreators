<template>
  <v-container fluid class="px-0"
>

  <v-row justify="center">
    <v-img
    :class="xsOnly ? 'field-small' :'field'"
    src="../assets/teamCreator/pitch.png"
    >
      <players-cards-group v-show="teamWhite" :team="match.whiteTeam"/>
      <players-cards-group v-show="!teamWhite" :team="match.blackTeam"/>
    </v-img>
  </v-row>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayersCardsGroup from './PlayersCardsGroup.vue';

export default {
  name: 'Field',

  data() {
    return {
      match: {
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
        blackTeam: [
          { team: 'Black' },
          {
            id: 1,
            picture: '',
            username: '',
          },
          {
            id: 2,
            picture: '',
            username: '',
          },
          {
            id: 3,
            picture: '',
            username: '',
          },
          {
            id: 4,
            picture: 'assets/users/Stephan.jpg',
            username: 'Stephan',
          },
          {
            id: 5,
            picture: '',
            username: '',
          },
        ],
        whiteTeam: [
          { team: 'White' },
          {
            id: 1,
            picture: 'assets/users/Vince.jpg',
            username: 'Vince',
          },
          {
            id: 2,
            picture: '',
            username: '',
          },
          {
            id: 3,
            picture: '',
            username: '',
          },
          {
            id: 4,
            picture: '',
            username: '',
          },
          {
            id: 5,
            picture: '',
            username: '',
          },
        ],
      },
    };
  },

  props: {
    teamWhite: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    PlayersCardsGroup,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.field {
  max-width: 1500px;
  max-height: 690px;
}
.field-small {
  max-width: 1100px;
  max-height: 490px;
}
</style>
