<template>
  <v-container fluid class="background px-0">

    <v-slide-y-reverse-transition hide-on-leave>
      <div v-show="!showMyMatches">

        <v-container
        :class="['header',
        {'header-sm' : smAndDown},
        {'header-md' : lgOnly || mdOnly}]"
        >
          <h1
          :class="['white--text text-size font-weight-bold',
          {'big': lgAndUp}, {'small': xsOnly}]"
          >
            Create a Match
            <v-icon
            class="white-icon pb-2 pl-1"
            :size="lgAndUp ? 54 : 40"
            >
              $creator-icon
            </v-icon>
          </h1>

          <v-divider
          style="border-color: grey !important; opacity: 30%;"
          ></v-divider>

          <stepper
          :class="['stepper-margin-lg mb-0',
          {'stepper-margin-md' : mdOnly},
          {'stepper-margin-sm' : smAndDown}]"
          :change="step === 2"
          @back="step--"
          />

        </v-container>

        <v-window v-model="step">
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
                  <span class="shadow">create the match</span>
                </v-btn>
              </v-row>
              <team-builder class="pb-0"/>
            </v-container>
          </v-window-item>

        </v-window>
      </div>
    </v-slide-y-reverse-transition>

    <v-slide-y-transition hide-on-leave>
      <div v-if="showMyMatches">

        <my-matches :isFinder="false" />

        <v-fade-transition hide-on-leave>
          <v-btn
          v-if="!loadingUserMatches"
          class="stick"
          large
          fab
          dark
          color="deep-purple darken-2"
          @click="showMyMatches = false, step = 1"
          >

            <v-icon size="44">
              mdi-plus
            </v-icon>

          </v-btn>
        </v-fade-transition>

      </div>
    </v-slide-y-transition>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import Stepper from '../components/Stepper.vue';
import MatchCreationForm from '../components/MatchCreationForm.vue';
import TeamBuilder from '../components/TeamBuilder.vue';
import DetailsRecap from '../components/DetailsRecap.vue';
import MyMatches from '../components/MyMatches.vue';

export default {
  name: 'Creator',

  components: {
    Stepper,
    MatchCreationForm,
    TeamBuilder,
    DetailsRecap,
    MyMatches,
  },

  data() {
    return {
      step: 1,
      showMyMatches: false,
    };
  },

  props: {
    goToMyMatches: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters({ nPlayers: 'matches/getNumPlayers' }),
    ...mapGetters({ loading: 'matches/getLoading' }),
    ...mapGetters({ loadingUserMatches: 'matches/getLoadingUserMatches' }),
  },

  watch: {
    loading(val) {
      if (!val) this.showMyMatches = true;
    },
    goToMyMatches(newVal) {
      if (newVal) {
        this.showMyMatches = true;
        this.step = 1;
        this.$emit('update:goToMyMatches', false);
      }
    },
  },

  methods: {
    ...mapActions({ newMatch: 'matches/createMatch' }),
    ...mapActions({ fetchUserMatches: 'matches/findUserMatches' }),

    createMatch() {
      this.newMatch();
    },
  },

  mixins: [
    BreakpointsCond,
  ],
};
</script>

<style scoped>
.background {
  height: 100%;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/backgrounds/night.jpg') center center no-repeat fixed;
  background-size: cover;
}
.header {
  max-width: 85%;
}
.header-md {
  max-width: 90%;
}
.header-sm {
  max-width: 97%;
}
.text-size {
  font-size: 2.2rem;
}
.big{
  font-size: 3rem;
}
.small{
  font-size: 1.75rem;
}
.stepper-margin-lg {
  margin: 16px 8vw;
}
.stepper-margin-md {
  margin: 16px 4vw;
}
.stepper-margin-sm {
  margin: 16px 6vw;
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%)
  drop-shadow( 2px 2px 1px rgba(0, 0, 0))
  drop-shadow( 1px 1px 1px rgba(0, 0, 0, 0.7));
}
.stick {
  z-index: 9000;
  position: sticky;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
