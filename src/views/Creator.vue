<template>
  <div class="background">

    <v-snackbar
     v-model="snackbar"
     color="green darken-2"
     style="z-index: 9000"
     top
     :right="lgAndUp"
     :min-width="xsOnly ? '80vw' : null"
    >
      <v-icon
       class="pb-2 icon-white-shadow"
       size=32
      >
        $ball-icon
      </v-icon>
      <span class="pl-2 text-h6 text-shadow">
        Match Created!
      </span>
    </v-snackbar>

    <v-slide-y-reverse-transition hide-on-leave>
      <div v-show="!isMyMatches && !isOverview">

        <v-container
        fluid
        :class="['pt-10', {'content-padding': mdAndUp}, {'px-6': smAndDown}]"
        >
          <h1
          :class="['text-big header',
          {'text-h4' : mdAndDown},
          {'text-h5': xsOnly}]"
          >
            Create a Match
            <v-icon
            :class="[lgAndUp ? 'pb-3' : 'pb-2', 'icon-white-shadow']"
            :size="iconSize"
            >
              $creator-icon
            </v-icon>
          </h1>

          <v-divider class="divider-dark" />

          <stepper
          :class="['stepper-margin-lg mb-0',
          {'stepper-margin-md' : mdOnly},
          {'stepper-margin-sm' : smAndDown}]"
          :change="step === 2"
          @back="step--"
          />

        </v-container>

        <v-window v-model="step" touchless>
          <v-window-item :value="1">

            <match-creation-form @detailsPassed="step++" />

          </v-window-item>

          <v-window-item :value="2">
            <v-container fluid class="px-0">

              <details-recap
              v-if="!xsOnly"
              class="infos pt-8"
              />

              <v-row justify="center" :class="xsOnly ? 'pt-8 pb-6' : 'pt-12 pb-4'">

                <v-btn
                color="green darken-4"
                dark
                :disabled="nPlayers === 0 || loading"
                @click="createMatch()"
                :loading="loading"
                >
                  <span class="btn-shadow">create the match</span>
                </v-btn>

              </v-row>

              <team-builder class="pb-0"/>

            </v-container>
          </v-window-item>

        </v-window>
      </div>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <v-container
      v-if="isMyMatches"
      v-show="!isOverview"
      class="pt-8">

          <my-matches  />

          <v-fab-transition hide-on-leave>
            <div
            v-if="userMatches.length < 2"
            style="display:flex; justify-content: center;"
            >
              <v-btn
              v-if="!loading"
              :large="!xsOnly"
              fab
              dark
              color="deep-purple darken-2"
              @click="setAppSection(''), step = 1"
              >

                <v-icon :size="xsOnly ? 36 : 44">
                  mdi-plus
                </v-icon>

              </v-btn>
            </div>
          </v-fab-transition>

          <v-fab-transition>
            <v-btn
              v-if="!loading && userMatches.length >= 2"
              class="stick"
              :large="!xsOnly"
              fab
              dark
              color="deep-purple darken-2"
              @click="setAppSection(''), step = 1"
              >

                <v-icon :size="xsOnly ? 36 : 44">
                  mdi-plus
                </v-icon>

              </v-btn>
          </v-fab-transition>
        </v-container>

    </v-slide-y-transition>

    <v-dialog
    v-model="isOverview"
    persistent
    hide-overlay
    scrollable
    fullscreen
    >
      <match-overview
      v-if="isOverview"
      :dark="true"
      :match="matchToOverview" />
    </v-dialog>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import Stepper from '../components/creator/Stepper.vue';
import MatchCreationForm from '../components/creator/MatchCreationForm.vue';
import TeamBuilder from '../components/creator/TeamBuilder.vue';
import DetailsRecap from '../components/creator/DetailsRecap.vue';
import MyMatches from '../components/myMatches/MyMatches.vue';
import MatchOverview from '../components/matchesCards/MatchOverview.vue';

export default {
  name: 'Creator',

  components: {
    Stepper,
    MatchCreationForm,
    TeamBuilder,
    DetailsRecap,
    MyMatches,
    MatchOverview,
  },

  data() {
    return {
      step: 1,
      snackbar: false,
    };
  },

  computed: {
    ...mapGetters({
      isOverview: 'app/isMatchOverview',
      isMyMatches: 'app/isMyMatches',
      matchToOverview: 'matches/getMatchToOverview',
      loading: 'matches/getLoading',
      nPlayers: 'matches/getNumPlayers',
      matchCreated: 'matches/getMatchCreated',
      userMatches: 'matches/getUserMatches',
    }),

    iconSize() {
      if (this.$vuetify.breakpoint.lgAndUp) return 58;
      if (this.$vuetify.breakpoint.name === 'md'
        || this.$vuetify.breakpoint.name === 'sm') return 44;
      return 36;
    },
  },

  watch: {
    loading(val) {
      if (!val) {
        /* after the creation of the match go to my matches section */
        this.setAppSection('my-matches');
        this.step = 1;
      }
    },

    matchCreated(newVal) {
      if (newVal) this.snackbar = true;
    },

    step(newVal) {
      /* set team selected to black when step is 2,
      the user will be placed in team black by default */
      if (newVal === 2) this.setTeamSelected('black');
    },
  },

  methods: {
    ...mapMutations({
      setAppSection: 'app/setAppSection',
      setTeamSelected: 'matches/setTeamSelected',
    }),
    ...mapActions({ createMatch: 'matches/createMatch' }),
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  height: 100%;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.6),
  rgba(0, 0, 0, 0.4)), url('../assets/backgrounds/night.jpg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.stepper-margin-lg {
  margin: 16px 8vw;
}
.stepper-margin-md {
  margin: 16px 2vw;
}
.stepper-margin-sm {
  margin: 16px 6vw;
}
.stick {
  z-index: 4000;
  position: sticky;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.infos {
  max-width: 1000px;
}
</style>
