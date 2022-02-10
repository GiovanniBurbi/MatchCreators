<template>
  <v-container fluid class="background">
    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >
      <v-row justify="space-between" align="center">
        <h1 :class="['white--text font-weight-bold header']">
          Create a Match
        </h1>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Creator',

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  height: 100vh;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/night.jpg') center center no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.header {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.8);
  font-size: calc(20px + 2vw);
  white-space: nowrap;
}
.content {
  margin-top: 60px;
  max-width: 80%
}
.fullscreen {
  max-width: 100%;
}
.biggerContent {
  max-width: 90%;
}
</style>
