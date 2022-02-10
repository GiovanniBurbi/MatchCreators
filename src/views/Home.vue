<template>
  <v-container fluid class="background">

    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >
      <finder-header />
    </v-container>
  </v-container>
</template>

<script>
import FinderHeader from '@/components/FinderHeader.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Home',

  components: {
    FinderHeader,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  height: calc(100vh - 64px);
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/daylight.jpg') center center no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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
