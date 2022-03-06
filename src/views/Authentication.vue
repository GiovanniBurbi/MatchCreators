<template>
  <v-container fluid class="background px-0">

    <v-container fluid>
      <v-row justify="center" class="pb-12">
        <h1
        :class="['font-weight-medium white--text logo',
        xsOnly ? 'logo-small' : 'logo-big']"
        >
          MatchCreators
        </h1>
      </v-row>

      <v-row justify="center" class="pb-12">
        <div class="mx-2">
          <login />
        </div>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import Login from '../components/authentication/Login.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Authentication',

  components: {
    Login,
  },

  methods: {
    ...mapMutations({ appMode: 'app/setAppMode' }),
  },

  created() {
    this.appMode('authentication');
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  background-image: linear-gradient(to left top, #673ab7, #6b40b9,
  #7045bb, #744bbd, #7850bf, #7c55c1, #805ac3, #845fc5,
  #8865c7, #8d6ac9, #9170cb, #9575cd);
  height: 100%;
  display: flex;
  align-items: center;
}
.logo {
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}
.logo-big {
  font-size: 3.75rem;
}
.logo-small {
  font-size: 3rem;
}
@media screen and (max-width: 335px) {
  .logo-small {
    font-size: 2.4rem;
  }
}
</style>
