<template>
  <div class="box-card">
    <v-img
    :src="getCard"
    contain
    :class="xsOnly ? 'card-small' : 'card'"
    >
    </v-img>

    <div :class="xsOnly ? 'overCard-small' : 'overCard'">

      <v-slide-y-transition hide-on-leave>

        <v-container fill-height v-if="spotTaken">

          <div :class="['close-button', xsOnly ? 'upper' : 'normal']">

            <v-btn
            v-if="!isOverview || user.id === spot.user.id"
            style="z-index: 1000;"
            x-small
            :width="xsOnly ? 20 : null"
            :height="xsOnly ? 20 : null"
            fab color="red darken-4" dark
            @click.stop="deletePlayer()"
            >
              <v-icon class="shadow" :x-small="xsOnly">mdi-close</v-icon>
            </v-btn>

            <v-dialog
            v-model="dialogDelete"
            max-width="290"
            persistent
            >
              <v-card :dark="darkMode" tile>
                <v-card-text class="pt-3 pb-2">
                  <h1
                  :class="['text-subtitle-1 font-weight-medium',
                  {'grey--text text--darken-3': !darkMode}]"
                  >
                    Do you want to leave this match?
                  </h1>
                </v-card-text>

                <v-card-actions>

                  <v-spacer></v-spacer>

                  <v-btn
                  :dark="darkMode"
                  small
                  text
                  color="red"
                  :disabled=loading
                  @click="dialogDelete = false"
                  >
                    back
                  </v-btn>

                  <v-btn
                  dark
                  small
                  color="green"
                  :loading=loading
                  @click="removeFromExistingMatch()"
                  >
                    yes
                  </v-btn>
                </v-card-actions>
              </v-card>

            </v-dialog>

          </div>

          <v-row justify="center">
            <v-avatar
            rounded="sm"
            :size="xsOnly ? 51 : 71"
            :class="[xsOnly ? 'mt-1' : 'mt-4', 'avatar-contrast']"
            >
              <img :src="getPicture" >
            </v-avatar>
          </v-row>

          <v-row justify="center">
            <h1
            :class="['text-center font-weight-light',
            xsOnly ? 'text-caption' : 'text-subtitle-1 pb-4',
            {'white--text': teamSelected === 'black'}]"
            >
              {{ spot.user.username }}
            </h1>
          </v-row>

          <v-row>
            <v-divider
            :class="['divide',
            {'divide-opacity': teamSelected === 'white'},
            {'divide-spacing': xsOnly}]"
            style="border-color: grey !important"
            ></v-divider>
          </v-row>

          <v-row justify="center">
            <v-icon
            :class="[{'icon-white': teamSelected === 'black'},
            xsOnly ? 'pb-1' : 'pb-6']"
            :size="iconSize"
            >
              {{ positionIcon }}
            </v-icon>
          </v-row>

        </v-container>

      </v-slide-y-transition>

      <v-slide-y-reverse-transition hide-on-leave>

        <v-container fill-height v-if="!spotTaken">

          <v-row
          justify="center"
          no-gutters
          :class="xsOnly ? '' : 'mt-1'"
          >
            <v-btn
            fab
            outlined
            :x-small="xsOnly"
            :dark="teamSelected === 'black'"
            @click.stop="invitationDialog = true"
            >

              <v-icon
              :size="xsOnly ? 26 : 38"
              >
                mdi-plus
              </v-icon>

            </v-btn>
          </v-row>

          <v-row justify="center">
            <v-icon
            :class="['pt-0',
            {'icon-white': teamSelected === 'black'}]"
            :size="iconSize"
            >
              {{ positionIcon }}
            </v-icon>
          </v-row>

        </v-container>
      </v-slide-y-reverse-transition>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';

/* eslint-disable global-require */
export default {
  name: 'PlayerCard',

  data() {
    return {
      dialogDelete: false,
    };
  },

  props: {
    spot: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      darkMode: 'theme/getDarkMode',
      teamSelected: 'matches/getTeamSelected',
      isOverview: 'app/isMatchOverview',
      isCreator: 'app/isCreator',
      loading: 'matches/getLoading',
    }),

    invitationDialog: {
      get() {
        return this.$store.state.matches.invitationDialog;
      },
      set(value) {
        this.$store.commit('matches/setInvitationDialog', value);
        if (value) {
          this.$store.commit('matches/setCardIdSelected', this.spot.id);
        }
      },
    },

    position() {
      if (this.spot.id === 1) return 'Goalkeeper';
      if (this.spot.id === 2 || this.spot.id === 3) return 'Defender';
      return 'Forward';
    },

    getCard() {
      if (this.teamSelected === 'white') {
        return require('@/assets/teamCreator/white-card.png');
      }
      return require('@/assets/teamCreator/black-card.png');
    },

    getPicture() {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`@/${this.spot.user.picture}`);
    },

    positionIcon() {
      switch (this.position) {
        case 'Goalkeeper':
          return '$goalkeeper-icon';
        case 'Defender':
          return '$defender-icon';
        default:
          return '$forward-icon';
      }
    },

    iconSize() {
      if (this.position === 'Forward') {
        if (this.$vuetify.breakpoint.xsOnly) return 24;
        return 34;
      }
      if (this.$vuetify.breakpoint.xsOnly) return 22;
      return 30;
    },

    spotTaken() {
      if (Object.keys(this.spot.user).length === 0) {
        return false;
      } return true;
    },
  },

  methods: {
    ...mapMutations({ removePlayer: 'matches/removePlayer' }),
    ...mapActions({ deletePlayerFromExistingMatch: 'matches/deletePlayerFromMatch' }),

    deletePlayer() {
      /* if i'm creating a match */
      if (!this.isOverview) {
        this.removePlayer(this.spot.id);
      } else this.dialogDelete = true;
    },

    removeFromExistingMatch() {
      this.deletePlayerFromExistingMatch(this.spot.id).then(() => {
        this.dialogDelete = false;
      });
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.box-card {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  max-width: 140px;
}
.card-small {
  max-width: 100px;
}
.overCard {
  position: absolute;
  width: 100px;
  height: 170px;
}
.overCard-small {
  position: absolute;
  width: 80px;
  height: 110px;
}
.close-button {
  position: absolute;
  left: 76%;
}
.upper {
  bottom: 84%;
  left: 74%;
}
.normal {
  top: 0%;
}
.divide {
  position: absolute;
  top: 68%;
  left: 10%;
  width: 80%;
  opacity: 20%;
}
.divide-opacity {
  opacity: 40%;
}
.divide-spacing {
  top: 70%;
  width: 70%;
  left: 15%;
}
.avatar-contrast {
  filter: contrast(130%) brightness(70%) saturate(90%);
}
</style>
