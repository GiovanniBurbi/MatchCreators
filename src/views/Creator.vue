<template>
  <v-container
  fluid
  :class="['background px-0', {'content-padding': mdAndUp}]"
  >

    <v-slide-y-reverse-transition hide-on-leave>
      <div v-show="!isMyMatches && !isOverview">

        <v-container
        class="pt-4"
        >
          <v-container fluid>
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

        </v-container>

        <v-window v-model="step" touchless>
          <v-window-item :value="1">

            <match-creation-form @detailsPassed="step++" />

          </v-window-item>

          <v-window-item :value="2">
            <v-container fluid class="px-0">
              <details-recap
              v-if="!xsOnly"
              :class="['header px-16 pt-0',
              {'header-sm' : smAndDown},
              {'header-md' : lgOnly || mdOnly}]"
              />
              <v-row justify="center" :class="xsOnly ? 'pt-4 pb-6' : 'pt-10 pb-4'">
                <v-btn
                color="green darken-4"
                dark
                :disabled="nPlayers === 0 || loading"
                @click="createMatch()"
                :loading="loading"
                >
                  <span class="text-shadow">create the match</span>
                </v-btn>
              </v-row>
              <team-builder :reset.sync="reset" class="pb-0"/>
            </v-container>
          </v-window-item>

        </v-window>
      </div>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <v-container v-if="isMyMatches && !isOverview" class="pt-1">

        <v-container fluid>
          <my-matches  />

          <v-fab-transition hide-on-leave>
            <v-btn
            v-if="!loading"
            class="stick"
            large
            fab
            dark
            color="deep-purple darken-2"
            @click="setAppSection(''), step = 1"
            >

              <v-icon size="44">
                mdi-plus
              </v-icon>

            </v-btn>
          </v-fab-transition>
        </v-container>

      </v-container>
    </v-slide-y-transition>

    <v-dialog
    v-model="isOverview"
    persistent
    hide-overlay
    scrollable
    fullscreen
    >
      <match-full-details
      v-if="isOverview"
      :dark="true"
      :match="matchToOverview" />
    </v-dialog>

  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import Stepper from '../components/creator/Stepper.vue';
import MatchCreationForm from '../components/creator/MatchCreationForm.vue';
import TeamBuilder from '../components/creator/TeamBuilder.vue';
import DetailsRecap from '../components/creator/DetailsRecap.vue';
import MyMatches from '../components/myMatches/MyMatches.vue';
import MatchFullDetails from '../components/matchesCards/MatchFullDetails.vue';

export default {
  name: 'Creator',

  components: {
    Stepper,
    MatchCreationForm,
    TeamBuilder,
    DetailsRecap,
    MyMatches,
    MatchFullDetails,
  },

  data() {
    return {
      step: 1,
      reset: false,
    };
  },

  computed: {
    ...mapGetters({
      isOverview: 'app/isMatchOverview',
      isMyMatches: 'app/isMyMatches',
      matchToOverview: 'matches/getMatchToOverview',
      loading: 'matches/getLoading',
      nPlayers: 'matches/getNumPlayers',
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
        this.reset = true;
      }
    },

    isMyMatches(newVal) {
      if (!newVal) this.step = 1;
    },
  },

  methods: {
    ...mapMutations({ setAppSection: 'app/setAppSection' }),
    ...mapActions({ createMatch: 'matches/createMatch' }),
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  height: 100%;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.7),
  rgba(0, 0, 0, 0.2)), url('../assets/backgrounds/night.jpg') center center no-repeat fixed;
  background-size: cover;
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
  z-index: 9000;
  position: sticky;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
