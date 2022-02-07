<template>
  <v-content class="background fill-height">
    <v-container fluid align="center">
    <v-row justify="center mt-12">
      <h1 :class="['text-center white--text font-weight-medium logo',
      { 'small' : smAndDown }, {'big': mdAndUp}]">
      MatchCreators
    </h1>
    </v-row>
    <v-row justify="center pt-14">
      <v-col cols="9" sm="10" md="12">
        <login />
      </v-col>
    </v-row>
  </v-container>
 </v-content>
</template>
<script>
import Login from '../components/Login.vue';

export default {
  name: 'Authentication',

  components: {
    Login,
  },

  computed: {
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
  },
};
</script>

<style scoped>
.background {
  /* background-image: linear-gradient(
    90deg,
    #673ab7 33.33%,
    #7e57c2 33.33%,
    #7e57c2 66.66%,
    #9575cd 66.66%,
    #9575cd 100%
  ) center center; */
  background-image: linear-gradient(to left top, #673ab7, #6b40b9, #7045bb, #744bbd, #7850bf,
  #7c55c1, #805ac3, #845fc5, #8865c7, #8d6ac9, #9170cb, #9575cd);
}
.logo {
  text-shadow: 1px 1px 20px rgba(50, 50, 50, 0.4);
  height: 100px;
}
.small {
  font-size: 4rem;
}
.big {
  font-size: 5rem;
}
</style>
