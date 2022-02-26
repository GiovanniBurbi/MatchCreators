<template>
  <v-container fluid class="background px-0">
    <v-container :class="[smAndDown ? 'dense' : 'normal', 'header']">
      <stepper :change="step === 2" @back="step--" />
    </v-container>
    <v-container fluid class="px-0">

    <v-window v-model="step">
      <v-window-item :value="1">

        <match-creation-form @detailsPassed="step++" />

      </v-window-item>

      <v-window-item :value="2">
        <v-container fluid>
          <details-recap v-if="!xsOnly"/>
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
  height: calc(100vh - 64px);
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/backgrounds/night.jpg') center center no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
.header {
  /* margin-top: 70px; */
}
.normal {
  max-width: 90%;
}
.dense {
  max-width: 70%;
}
</style>
