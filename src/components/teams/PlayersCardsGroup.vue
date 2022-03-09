<template>
  <v-container fluid class="formation">

    <div class="row-fw">
      <player-card
      :spot="team[5]" />
      <player-card
      :spot="team[4]" />
    </div>

    <div class="row-def">
      <player-card
      :spot="team[3]" />
      <player-card
      :spot="team[2]" />
    </div>

    <div class="row-gk">
      <player-card
      :spot="team[1]" />
    </div>

  </v-container>
</template>

<script>
import BreakpointsCond from '@/mixins/BreakpointsCond';
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'PlayersCardsGroup',

  components: {
    PlayerCard,
  },

  props: {
    team: {
      type: Array,
      required: true,
    },
  },

  computed: {
    isTeamWhite() {
      if (this.team[0].team === 'Black') return false;
      return true;
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.formation {
  margin-top: 10px;
  height: 90%;
}
.row-fw {
  height: 33.3%;
  width: 30%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.row-def {
  height: 33.4%;
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.row-gk {
  height: 33.3%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 430px) {
  .row-def {
    max-width: 40%;
  }
  .row-fw {
    max-width: 24%;
  }
}
@media screen and (max-width: 300px) {
  .row-def {
    max-width: 34%;
  }
  .row-fw {
    max-width: 20%;
  }
}
</style>
