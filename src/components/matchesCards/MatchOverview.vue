<template>
  <v-card tile color="transparent" style="overflow-x:hidden">

    <v-card-title
    :class="['px-0 py-0', dark ? 'grey darken-4' : 'indigo']"
    >

      <v-container fluid>

        <v-row>
          <v-btn
          :class="[mdAndUp ? 'pl-6' : 'pl-4', 'btn-icon-shadow']"
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

      <div class="px-3">

        <v-row justify="center" class="mt-0">

          <v-col class="d-flex align-center justify-center">
            <div class="d-inline-flex">

              <v-icon
              left
              class="icon-shadow"
              color="white"
              :size="iconSize"
              >
                mdi-calendar
              </v-icon>

              <div>
                <h1
                :class="['text-shadow', textSize]"
                >
                  {{matchDay}},
                </h1>

                <h1
                :class="['text-shadow', textSize]"
                >
                  {{matchDate}}
                </h1>
              </div>

            </div>
          </v-col>

          <v-col class="d-flex align-center justify-center">
            <v-icon
              class="icon-shadow pr-1"
              color="white"
              :size="iconSize"
              >
                mdi-clock-outline
              </v-icon>
            <h1
            :class="['text-shadow', textSize]"
            >
              {{matchTime}}
            </h1>
          </v-col>

          <v-col class="d-flex align-center justify-center">
            <v-icon
              class="icon-shadow pr-1"
              color="white"
              :size="iconSize"
              >
                mdi-map-marker-outline
              </v-icon>
            <h1
            :class="['text-shadow', textSize]"
            >
              {{match.location}}
            </h1>
          </v-col>

        </v-row>

        <v-divider dark class="mt-4 mb-6" style="width: 80%; margin:0 auto;"></v-divider>

        <v-row justify="center" :class="[{'px-2': xsOnly}, 'pb-4']">

          <v-col :class="{'ml-1': xsOnly}">
            <v-row justify="center" :class="xsOnly ? 'pr-9' : 'pr-16'">

              <div class="d-inline-flex">

                <v-icon
                class="icon-shadow pb-1 pr-2"
                color="white"
                :size="iconSize - 6"
                >
                  fas fa-solid fa-cake-candles
                </v-icon>

                <h1
                :class="['text-shadow', textSize]"
                >
                  Average
                </h1>

              </div>

            </v-row>

            <v-row justify="center" :class="xsOnly ? 'mt-2 pr-10' : 'mt-2 pr-3'">
              <div>
                <h1
                :class="['text-shadow', secondaryTextSize]"
                >
                  {{teamsAverageAge}} years old
                </h1>
              </div>
            </v-row>

          </v-col>

          <v-spacer></v-spacer>

          <v-col :class="{'mr-1': xsOnly}">
            <v-row justify="center" :class="xsOnly ? 'pr-2' : 'pr-6'">

              <div style="white-space:nowrap;" class="d-inline-flex">
                <v-icon
                class="icon-white-shadow pt-1"
                :size="iconSize - 1"
                >
                  $player-icon
                </v-icon>
                <h1
                :class="['pl-1 text-shadow', textSize]"
                >
                  Participants
                </h1>
              </div>

            </v-row>

            <v-row justify="center" :class="xsOnly ? 'mt-2 pl-16' : 'mt-2 ml-16'">
              <div>
                <h1
                :class="['text-shadow', secondaryTextSize]"
                >
                  {{nMatchParticipants}} / 10
                </h1>
              </div>
            </v-row>

          </v-col>

        </v-row>

      </div>

      <field
      class="pt-16 mt-8"
      :teamBlack="match.blackTeam"
      :teamWhite="match.whiteTeam" />

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
                @click="inviteFriend = true"
                >
                  <span class="white--text">Add a Friend</span>
                </v-btn>

                <v-spacer v-if="xsOnly"></v-spacer>

                <v-btn
                small
                :disabled="userPresent"
                color="green"
                >
                  <span :class="{'white--text': !userPresent}">Add myself</span>
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
import DataHelper from '@/mixins/DataHelper';
import Field from '../teams/Field.vue';
import PlayerSelection from '../teams/PlayerSelection.vue';

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
    }),

    invitationDialog: {
      get() {
        return this.$store.state.matches.invitationDialog;
      },
      set(value) {
        this.$store.commit('matches/setInvitationDialog', value);
      },
    },

    textSize() {
      let type = '';
      if (this.$vuetify.breakpoint.smAndUp) type = 'text-h5';
      if (this.$vuetify.breakpoint.xsOnly) type = 'text-subtitle-1 font-weight-medium';
      return `white--text ${type}`;
    },

    secondaryTextSize() {
      let type = '';
      if (this.$vuetify.breakpoint.smAndUp) type = 'text-h6 font-weight-regular';
      if (this.$vuetify.breakpoint.xsOnly) type = 'text-subtitle-2 font-weight-regular';
      return `white--text ${type}`;
    },

    iconSize() {
      if (this.$vuetify.breakpoint.smAndUp) return '28';
      if (this.$vuetify.breakpoint.xsOnly) return '20';
      return 24;
    },

  },

  methods: {
    ...mapMutations({
      resetMatchOverview: 'matches/setMatchToOverview',
      setOverview: 'app/setOverview',
    }),
    ...mapActions({ selectTeamWithUser: 'matches/selectTeamBasedOnUser' }),
  },

  created() {
    this.selectTeamWithUser();
  },

  destroyed() {
    this.resetMatchOverview('');
  },

  mixins: [BreakpointsCond, DataHelper],

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
h1 {
  white-space: nowrap;
  cursor: default;
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
