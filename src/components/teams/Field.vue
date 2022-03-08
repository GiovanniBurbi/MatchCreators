<template>
  <v-container fluid class="px-0">

    <v-row justify="center" :class="[smAndUp ? 'mt-2' : 'mt-0']">
      <team-switcher />
    </v-row>

    <v-row justify="center">

      <v-img
      :class="xsOnly ? 'field-small' :'field'"
      src="@/assets/teamCreator/pitch.png"
      >

        <v-scale-transition hide-on-leave>
          <players-cards-group
          v-show="teamSelected === 'black'"
          :team="teamBlack"/>
        </v-scale-transition>

        <v-scale-transition hide-on-leave>
          <players-cards-group
          v-show="teamSelected === 'white'"
          :team="teamWhite"/>
        </v-scale-transition>

      </v-img>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import PlayersCardsGroup from './PlayersCardsGroup.vue';
import TeamSwitcher from './TeamSwitcher.vue';

export default {
  name: 'Field',

  components: {
    PlayersCardsGroup,
    TeamSwitcher,
  },

  props: {
    teamWhite: {
      type: Array,
      required: true,
    },
    teamBlack: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters({ teamSelected: 'matches/getTeamSelected' }),
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
