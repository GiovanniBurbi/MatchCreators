<template>
  <v-container fluid class="formation">

    <div class="row-1">
      <player-card
      :player="team[5]"
      :white="isTeamWhite"
      :builder="builder"
      :position="'Forward'"
      :darkMode="darkMode" />
      <player-card
      :player="team[4]"
      :white="isTeamWhite"
      :builder="builder"
      :position="'Forward'"
      :darkMode="darkMode" />
    </div>

    <div class="row-2">
      <player-card
      :player="team[3]"
      :white="isTeamWhite"
      :builder="builder"
      :position="'Defender'" />
      <player-card
      :player="team[2]"
      :white="isTeamWhite"
      :builder="builder"
      :position="'Defender'"
      :darkMode="darkMode" />
    </div>

    <div class="row-3">
      <player-card
      :player="team[1]"
      :white="isTeamWhite"
      :builder="builder"
      :position="'Goalkeeper'"
      :darkMode="darkMode" />
    </div>

  </v-container>
</template>

<script>
import BreakpointsCond from '../../mixins/BreakpointsCond';
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
    builder: {
      type: Boolean,
      required: true,
    },
    darkMode: {
      type: Boolean,
    },
  },

  computed: {
    isTeamWhite() {
      const type = this.team[0].team;
      if (type === 'Black') return false;
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
.row-1 {
  height: 33.3%;
  width: 30%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.row-2 {
  height: 33.4%;
  width: 60%;
  margin: 0 auto;
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

@media screen and (max-width: 430px) {
  .row-2 {
    max-width: 40%;
  }
  .row-1 {
    max-width: 24%;
  }
}
@media screen and (max-width: 300px) {
  .row-2 {
    max-width: 34%;
  }
  .row-1 {
    max-width: 20%;
  }
}
</style>
