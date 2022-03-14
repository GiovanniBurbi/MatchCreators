<template>
  <v-card tile color="transparent" style="overflow-x:hidden">

    <v-card-title
    :class="['px-0 py-0', dark ? 'grey darken-4' : 'indigo']"
    >

      <v-container fluid>

        <v-row>
          <v-btn
          :class="[mdAndUp ? 'pl-4' : 'pl-2', 'btn-icon-shadow']"
          plain
          :x-large="mdAndUp"
          :large="smAndDown"
          dark
          @click="setOverview(false)"
          >
            <v-icon>mdi-arrow-left</v-icon>
            <span>back</span>
          </v-btn>

        </v-row>

        <v-row justify="center" class="pb-2 mt-0">
          <h1
          :class="['header white--text',
          smAndUp ? 'text-h4 font-weight-medium' : 'text-h5 font-weight-medium']"
          >
            Match Overview
          </h1>
        </v-row>

      </v-container>

    </v-card-title>

    <v-card-text :class="['px-0 card-content', dark ? 'dark overview' : 'light overview-light']">

      <overview-header />

      <field
      class="pt-16 mt-8"
      :teamBlack="match.teamBlack"
      :teamWhite="match.teamWhite" />

       <v-dialog
        v-model="invitationDialog"
        :max-width="xsOnly ? 320 : 400"
        style="z-index: 2000"
        scrollable
        transition="scale-transition"
        >

          <v-scale-transition origin="center center 0" hide-on-leave>
            <v-card
            v-if="!inviteFriend && invitationDialog"
            tile
            :dark="dark"
            >

              <v-card-text class="pt-3 pb-2">
                <h1
                :class="['text-wrap text-subtitle-1 font-weight-medium',
                {'grey--text text--darken-3': !dark}]"
                >
                  Who do you want to add in this match?
                </h1>
              </v-card-text>

              <v-card-actions>

                <v-spacer v-if="!xsOnly"></v-spacer>

                <v-btn
                small
                color="deep-purple"
                :disabled="loading"
                @click="inviteFriend = true"
                >
                  <span
                  :class="{'white--text': !loading}"
                  >
                    Add a Friend
                  </span>
                </v-btn>

                <v-spacer v-if="xsOnly"></v-spacer>

                <v-btn
                small
                color="green"
                :disabled="userPresent"
                :loading=loading
                @click="addUser()"
                >
                  <span
                  :class="{'white--text': !userPresent}"
                  >
                    Add myself
                  </span>
                </v-btn>

              </v-card-actions>
            </v-card>

          </v-scale-transition>

          <v-scale-transition origin="center center 0">
            <player-selection v-if="inviteFriend" />
          </v-scale-transition>

        </v-dialog>

    </v-card-text>

  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import Field from '../teams/Field.vue';
import PlayerSelection from '../teams/PlayerSelection.vue';
import OverviewHeader from './OverviewHeader.vue';

export default {
  name: 'MatchOverview',

  data() {
    return {
      inviteFriend: false,
    };
  },

  components: {
    Field,
    PlayerSelection,
    OverviewHeader,
  },

  watch: {
    invitationDialog(newVal) {
      if (!newVal) this.inviteFriend = false;
    },
  },

  computed: {
    ...mapGetters({
      match: 'matches/getMatchToOverview',
      dark: 'theme/getDarkMode',
      userPresent: 'matches/getUserIsPresentInOverview',
      loading: 'matches/getLoading',
    }),

    /* two way binding with vuex state */
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
    ...mapMutations({
      resetMatchOverview: 'matches/setMatchToOverview',
      setOverview: 'app/setOverview',
    }),
    ...mapActions({
      selectTeamWithUser: 'matches/selectTeamBasedOnUser',
      addUserInMatch: 'matches/addUserInMatch',
    }),

    addUser() {
      /* wait for the end of addUserInMatch and then set invitation dialog
      to false */
      this.addUserInMatch().then(() => {
        this.invitationDialog = false;
      });
    },
  },

  created() {
    /* select team to the one where the user is present */
    this.selectTeamWithUser();
  },

  destroyed() {
    /* reset match overview when this component is destroyed */
    this.resetMatchOverview('');
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.card-content {
  height: 100%;
  overflow-x:hidden;
}
.light {
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0.3));
}
.dark {
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.7),
  rgba(0, 0, 0, 0.3));
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
.overview::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;

}
/* Handle */
.overview::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 16px;
}
/* Handle on hover */
.overview::-webkit-scrollbar-thumb:hover {
  background: #3F51B5;
}
.overview-light::-webkit-scrollbar-track {
  background: rgba(189, 189, 189, 0.3);
  border-radius: 16px;
}
.overview-light::-webkit-scrollbar-thumb {
  background: #7986CB;
  border-radius: 16px;
}
.overview-light::-webkit-scrollbar-thumb:hover {
  background: #E8EAF6;
}
</style>
