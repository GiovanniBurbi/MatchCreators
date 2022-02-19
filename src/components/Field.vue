<template>
  <div class="container">
    <v-img
    :class="['pitch', lgAndUp ? 'mr-10' : null, xsOnly ? 'mb-8' : null]"
    contain
    src="../assets/teamCreator/pitch.png"
    ></v-img>
  </div>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Field',

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.container {
  position: fixed;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pitch {
  position: fixed;
  max-width: 1200px;
}
</style>
