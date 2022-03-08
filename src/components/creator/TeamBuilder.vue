<template>
  <v-container fluid class="px-0">

    <v-row justify="center">
      <field
      :teamBlack="teamBlack"
      :teamWhite="teamWhite"
      />
    </v-row>

    <v-dialog
    v-model="invitationDialog"
    :max-width="xsOnly ? 320 : 400"
    scrollable
    transition="scale-transition"
    >

      <player-selection />

    </v-dialog>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import Field from '../teams/Field.vue';
import PlayerSelection from '../teams/PlayerSelection.vue';

export default {
  name: 'TeamBuilder',

  components: {
    Field,
    PlayerSelection,
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      teamBlack: 'matches/getTeamBlack',
      teamWhite: 'matches/getTeamWhite',
    }),

    invitationDialog: {
      get() {
        return this.$store.state.matches.invitationDialog;
      },
      set(value) {
        this.$store.commit('matches/setInvitationDialog', value);
      },
    },
  },

  methods: {
    ...mapMutations({ addUser: 'matches/addUser' }),
  },

  mounted() {
    this.addUser(this.user);
  },

  mixins: [BreakpointsCond],
};
</script>
