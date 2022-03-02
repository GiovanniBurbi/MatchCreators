<template>
  <v-container fluid class="background px-0">
    <v-scale-transition hide-on-leave>
      <v-container
      v-if="step < 3"
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
    </v-scale-transition>

    <v-container fluid class="px-0 pt-0">

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
              Create the match
            </v-btn>
          </v-row>
          <team-builder class="pb-0"/>
        </v-container>
      </v-window-item>

      <v-window-item :value="3">

        <my-matches />

      </v-window-item>

    </v-window>

    <v-scroll-y-transition hide-on-leave>
      <v-btn
      v-if="!loadingUserMatches && step === 3"
      class="stick"
      large
      fab
      dark
      color="deep-purple darken-2"
      @click="step = 1"
      >

        <v-icon size="44">
          mdi-plus
        </v-icon>

      </v-btn>
    </v-scroll-y-transition>

    </v-container>
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
      if (!val) this.step += 1;
    },
    goToMyMatches(newVal) {
      if (newVal) {
        this.step = 3;
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
