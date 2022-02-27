<template>
  <v-container fluid class="background px-0">
    <v-container
    :class="['header',
    {'header-sm' : smAndDown},
    {'header-md' : lgOnly || mdOnly}]"
    >
      <h1
      :class="['white--text font-weight-bold',
      {'big': lgAndUp}, {'small': xsOnly}]"
      >
        Create a Match
      </h1>

      <v-divider
      style="border-color: grey !important; opacity: 30%;"
      ></v-divider>

      <stepper
      :class="['stepper-margin-lg',
      {'stepper-margin-md' : mdOnly},
      {'stepper-margin-sm' : smAndDown}]"
      :change="step === 2"
      @back="step--"
      />

    </v-container>

    <v-container fluid class="px-0">

    <v-window v-model="step">
      <v-window-item :value="1">

        <match-creation-form @detailsPassed="step++" />

      </v-window-item>

      <v-window-item :value="2">
        <v-container fluid class="px-0">
          <details-recap
          :class="['header px-16 pt-0',
          {'header-sm' : smAndDown},
          {'header-md' : lgOnly || mdOnly}]"
          v-if="!xsOnly"
          />
          <v-row justify="center" class="pt-14 pb-6">
            <v-btn
            color="green darken-4"
            dark
            >
              Create the match
            </v-btn>
          </v-row>
          <team-builder />
        </v-container>
      </v-window-item>
    </v-window>

    </v-container>
  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import Stepper from '../components/Stepper.vue';
import MatchCreationForm from '../components/MatchCreationForm.vue';
import TeamBuilder from '../components/TeamBuilder.vue';
import DetailsRecap from '../components/DetailsRecap.vue';

export default {
  name: 'Creator',

  components: {
    Stepper,
    MatchCreationForm,
    TeamBuilder,
    DetailsRecap,
  },

  data() {
    return {
      step: 2,
    };
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
  max-width: 100%;
}
.big{
  font-size: 3rem;
}
.small{
  font-size: 1.5rem;
}
.stepper-margin-lg {
  margin: 16px 8vw;
}
.stepper-margin-md {
  margin: 16px 4vw;
}
.stepper-margin-sm {
  margin: 16px 12vw;
}
</style>
