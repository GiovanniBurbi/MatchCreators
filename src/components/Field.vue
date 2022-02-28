<template>
  <v-container fluid class="px-0"
>

  <v-row justify="center">
    <v-img
    :class="xsOnly ? 'field-small' :'field'"
    src="../assets/teamCreator/pitch.png"
    >
      <v-scale-transition hide-on-leave>
        <players-cards-group v-show="!teamWhite" :team="match.blackTeam"/>
      </v-scale-transition>
      <v-scale-transition hide-on-leave>
        <players-cards-group v-show="teamWhite" :team="match.whiteTeam"/>
      </v-scale-transition>
    </v-img>
  </v-row>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
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
            picture: '',
            username: '',
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

  computed: {
    ...mapGetters({ getUser: 'auth/getUser' }),
  },

  components: {
    PlayersCardsGroup,
  },

  mounted() {
    const user = this.getUser;
    let pos = null;
    if (user.position === 'Goalkeeper') {
      pos = 1;
    } else if (user.position === 'Defender') {
      pos = 2;
    } else pos = 4;
    this.match.blackTeam[pos].username = user.username;
    this.match.blackTeam[pos].picture = user.picture;
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
