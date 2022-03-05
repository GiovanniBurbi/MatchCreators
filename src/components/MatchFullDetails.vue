<template>
  <v-card tile color="transparent" style="overflow-x:hidden">

    <v-card-title
    :class="['px-0 py-0', dark ? 'grey darken-4' : 'indigo']"
    >

      <v-container fluid>

        <v-row>
          <v-btn
          :class="mdAndUp ? 'pl-6' : 'pl-4'"
          plain
          :x-large="mdAndUp"
          :large="smAndDown"
          dark
          @click="resetMatchOverview({})"
          >
            <v-icon>mdi-arrow-left</v-icon>
            <span>back</span>
          </v-btn>

        </v-row>

        <v-row justify="center" class="pb-2 mt-0">
          <h1
          :class="['title', titleSize, dark ? 'white--text' : 'white--text']"
          >
            Match Overview
          </h1>
        </v-row>

      </v-container>

    </v-card-title>

    <v-card-text :class="['px-0 card-content', dark ? 'light' : 'light']">

      <div :class="'info-padding'">

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
                :class="textSize"
                >
                  {{day}},
                </h1>

                <h1
                :class="textSize"
                >
                  {{date}}
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
            :class="textSize"
            >
              {{time}}
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
            :class="textSize"
            >
              {{match.location}}
            </h1>
          </v-col>

        </v-row>

        <v-divider class="mt-4 mb-6" style="width: 90%; margin:0 auto;"></v-divider>

        <v-row justify="center" class="pb-4">

          <v-col>
            <v-row justify="center" class="pr-16">

              <div class="d-inline-flex">

                <h1
                :class="textSize"
                >
                  Average
                </h1>

                <v-icon
                class="icon-shadow pb-1 pl-2"
                color="white"
                :size="iconSize - 6"
                >
                  fas fa-solid fa-cake-candles
                </v-icon>
              </div>

            </v-row>

            <v-row justify="center" class="pr-16 mr-3">
              <div>
                <h1
                :class="secondaryTextSize"
                >
                  {{meanAge}} yrs old
                </h1>
              </div>
            </v-row>

          </v-col>

          <v-spacer></v-spacer>

          <v-col>
            <v-row justify="center" class="pr-4">

              <v-icon
              class="icon-shadow white-icon pt-1 pr-2"
              :size="iconSize - 1"
              >
                $position-icon
              </v-icon>
              <h1
              :class="textSize"
              >
                Participants
              </h1>

            </v-row>

            <v-row justify="center" class="pl-16 ml-2">
              <div>
                <h1
                :class="secondaryTextSize"
                >
                  {{nParticipants}} / 10
                </h1>
              </div>
            </v-row>

          </v-col>

        </v-row>

      </div>

      <field
      class="pt-16 mt-8"
      :darkMode="dark"
      :teamBlack="match.blackTeam"
      :teamWhite="match.whiteTeam"
      :builder="false" />

    </v-card-text>

  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { format, parseISO } from 'date-fns';
import Field from './Field.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'MatchFullDetails',

  components: {
    Field,
  },

  props: {
    match: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
    },
  },

  computed: {
    date() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return format(parseISO(this.match.date), 'd MMM yyyy');
      }
      return format(parseISO(this.match.date), 'd MMMM yyyy');
    },

    day() {
      return format(parseISO(this.match.date), 'EEEE');
    },

    time() {
      return `${this.match.startTime}-${this.match.endTime}`;
    },

    meanAge() {
      let player = {};
      let playerAge = null;
      let sumAge = 0;
      let numPlayers = 0;
      for (let i = 1; i <= 5; i += 1) {
        player = this.match.blackTeam[i].user;
        if (Object.keys(player).length !== 0) {
          playerAge = this.getAge(player.birthday);
          sumAge += playerAge;
          numPlayers += 1;
        }
        player = this.match.whiteTeam[i].user;
        if (Object.keys(player).length !== 0) {
          playerAge = this.getAge(player.birthday);
          sumAge += playerAge;
          numPlayers += 1;
        }
      }
      if (numPlayers !== 0) {
        return Math.floor(sumAge / numPlayers);
      } return 'N/A';
    },

    nParticipants() {
      return (
        this.match.positions.goalkeepers
        + this.match.positions.defenders
        + this.match.positions.forwards
      );
    },

    textSize() {
      let type = '';
      if (this.$vuetify.breakpoint.mdAndUp) type = 'text-h5';
      if (this.$vuetify.breakpoint.smAndDown) type = 'text-subtitle-1 font-weight-medium';
      return `white--text ${type}`;
    },

    secondaryTextSize() {
      let type = '';
      if (this.$vuetify.breakpoint.mdAndUp) type = 'text-h6 font-weight-regular';
      if (this.$vuetify.breakpoint.smAndDown) type = 'text-subtitle-2 font-weight-regular';
      return `white--text ${type}`;
    },

    titleSize() {
      let type = '';
      if (this.$vuetify.breakpoint.mdAndUp) type = 'text-h4';
      if (this.$vuetify.breakpoint.smAndDown) type = 'text-h5 font-weight-medium';
      return `white--text ${type}`;
    },
    iconSize() {
      if (this.$vuetify.breakpoint.mdAndUp) return '28';
      if (this.$vuetify.breakpoint.smAndDown) return '20';
      return 24;
    },

  },

  methods: {
    getAge(birthday) {
      const bday = new Date(birthday);
      const ageDiffMs = Date.now() - bday.getTime();
      const ageDate = new Date(ageDiffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },

    ...mapActions({ fetchAllUsers: 'users/fetchAllUsers' }),
    ...mapMutations({ resetMatchOverview: 'matches/setMatchToOverview' }),
  },

  created() {
    this.fetchAllUsers();
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
  background: rgba(0, 0, 0, 0.4);
}
h1 {
  white-space: nowrap;
  cursor: default;
}
h1, .icon-shadow {
  text-shadow: 1px 1px black;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%) drop-shadow(1px 1px black);
}
.title {
  /* border-bottom: 1px solid white; */
  cursor: default;
}
.info-padding {
  padding: 0 200px 0;
}
</style>
