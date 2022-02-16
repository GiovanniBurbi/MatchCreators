<template>
  <v-container fluid class="background px-0">
    <v-container :class="[smAndDown ? 'dense' : 'normal', 'header']">
      <stepper :change="detailsOk" />
    </v-container>
    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >

      <!-- <v-container fluid fill-height class="pitch">
    </v-container> -->

    </v-container>
  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import Stepper from '../components/Stepper.vue';

export default {
  name: 'Creator',

  components: {
    Stepper,
  },

  data() {
    return {
      detailsOk: false,
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
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
.content {
  max-width: 80%
}
.biggerContent {
  max-width: 90%;
}
.fullscreen {
  max-width: 100%;
}
.header {
  margin-top: 65px;
}
.normal {
  max-width: 90%;
}
.dense {
  margin-top: 70px;
  max-width: 70%;
}
/* .pitch {
  background: url('../assets/pitch.png') center center fixed no-repeat;
  background-size: cover; Phones
  background-size: contain; Screen size big
  height: 700px;
  padding-top: 50px;
} */
</style>
