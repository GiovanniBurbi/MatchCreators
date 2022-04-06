<template>
  <v-container fluid class="padding-login px-0">

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
    /* set the app mode to authentication when this component is created */
    this.appMode('authentication');
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.padding-login {
  padding-top: 14vh;
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
