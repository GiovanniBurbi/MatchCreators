<template>
  <div :class="['card', mdAndDown ? 'normal' : 'compress']">
    <v-container fluid class="background px-0">

      <div class="content">

        <v-container fluid class="header pt-0">

          <v-row>
            <v-btn
            :class="mdAndUp ? 'pl-6' : 'pl-1'"
            plain
            :x-large="mdAndUp"
            :large="smAndDown"
            dark
            >
              <v-icon>mdi-arrow-left</v-icon>
              <span>back</span>
            </v-btn>
          </v-row>

          <v-row justify="center">

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

          <v-divider class="mt-4 mb-6"></v-divider>

          <v-row justify="space-around" align="center" class="mb-1">

            <div>
              <div class="d-inline-flex">

                <v-icon
                class="icon-shadow pb-1 pr-2"
                color="white"
                :size="iconSize - 6"
                >
                  fas fa-solid fa-cake-candles
                </v-icon>

                <h1
                :class="textSize"
                >
                  Average
                </h1>

              </div>

              <div class="d-flex justify-center">

                <h1
                :class="secondaryTextSize"
                >
                  {{meanAge}} yrs old
                </h1>

              </div>

            </div>

            <div>
              <div class="d-inline-flex">

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

              </div>

              <div class="d-flex justify-center">
                <h1
                :class="secondaryTextSize"
                >
                  {{nParticipants}} / 10
                </h1>
              </div>

            </div>

          </v-row>

        </v-container>

        <field class="pt-4"
        :teamBlack="match.blackTeam" :teamWhite="match.whiteTeam" />

      </div>

    </v-container>
  </div>
</template>

<script>
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
      /* if (this.$vuetify.breakpoint.xsOnly) type = 'text-h5'; */
      return `white--text ${type}`;
    },

    secondaryTextSize() {
      let type = '';
      if (this.$vuetify.breakpoint.mdAndUp) type = 'text-h6 font-weight-regular';
      if (this.$vuetify.breakpoint.smAndDown) type = 'text-subtitle-2 font-weight-regular';
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
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.card {
  height: 100%;
}
.compress {
  width: 90%;
}
.normal {
  width: 100%;
}
.background {
  position: relative;
  height: 100%;
  overflow-x: hidden;
}
.background::before {
  content: "";
  background-image: linear-gradient(to top, #c5cae9, #c5cae9, #c5cae9, #c5cae9, #c5cae9,
  #c8cdea, #cbcfeb, #ced2ec, #d4d8ef, #dbdef1, #e1e4f4, #e8eaf6);
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 40%;
}
.content {
  position: relative;
}
.header {
  background: #3F51B5;
}
h1 {
  white-space: nowrap;
}
h1, .icon-shadow {
  text-shadow: 1px 1px black;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%) drop-shadow(1px 1px black);
}
</style>
