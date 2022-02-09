<template>
  <v-container class="background" fluid fill-height>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center white--text font-weight-medium logo">
        MatchCreators
        </h1>
      </v-col>
      <v-col>
        <login class="card" @loginSuccess="$emit('loginSuccess')"></login>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Login from '../components/Login.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Authentication',

  components: {
    Login,
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.card {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}
.background {
  background-image: linear-gradient(to left top, #673ab7, #6b40b9,
  #7045bb, #744bbd, #7850bf, #7c55c1, #805ac3, #845fc5,
  #8865c7, #8d6ac9, #9170cb, #9575cd);
}
.logo {
  text-shadow: 1px 1px 20px rgba(50, 50, 50, 0.4);
  font-size: calc(40px + 2vw);
}
</style>
