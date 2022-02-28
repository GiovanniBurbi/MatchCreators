<template>
  <v-container fluid class="px-0"
>

  <v-row justify="center">
    <v-img
    :class="xsOnly ? 'field-small' :'field'"
    src="../assets/teamCreator/pitch.png"
    >
      <v-scale-transition hide-on-leave>
        <players-cards-group v-show="!isWhite" :team="teamBlack"/>
      </v-scale-transition>
      <v-scale-transition hide-on-leave>
        <players-cards-group v-show="isWhite" :team="teamWhite"/>
      </v-scale-transition>
    </v-img>
  </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayersCardsGroup from './PlayersCardsGroup.vue';

export default {
  name: 'Field',

  props: {
    isWhite: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapGetters({ getUser: 'auth/getUser' }),
    teamWhite: {
      get() {
        return this.$store.state.matches.teamWhite;
      },
    },
    teamBlack: {
      get() {
        return this.$store.state.matches.teamBlack;
      },
    },
  },

  methods: {
    ...mapMutations({ addPlayer: 'matches/addPlayer' }),
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
    const payload = {
      spot: pos,
      isWhite: this.isWhite,
      info: {
        username: user.username,
        picture: user.picture,
      },
    };
    this.addPlayer(payload);
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
