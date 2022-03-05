<template>
  <v-app>
    <v-slide-y-transition>
      <navbar
      v-if="appMode.mode !== 'authentication'"
      v-show="appMode.mode !== 'match-overview'"
      ></navbar>
      <!-- @myMatches="userMatches = true" -->
    </v-slide-y-transition>

    <v-snackbar
     v-model="snackbar"
     top color="green"
     :timeout="2000"
     style="z-index: 9000"
    >
      <v-icon
       class="pb-2"
       size=32
       left
      >
        mdi-check-circle-outline
      </v-icon>
      <span class="text-h6">
        Hello, {{ username }}
      </span>
    </v-snackbar>

    <v-main>
      <router-view
      @loginSuccess="snackbar = true"
      ></router-view>
      <!-- :goToMyMatches.sync="userMatches" -->
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',

  data() {
    return {
      snackbar: false,
      userMatches: false,
    };
  },

  computed: {
    /* isNotAuth() {
      return this.$route.name !== 'Authentication';
    }, */

    /* ...mapGetters({ getUserInfo: 'auth/getUser' }),
    ...mapGetters({ isOverview: 'matches/getIsOverview' }), */

    ...mapGetters({
      user: 'auth/getUser',
      appMode: 'app/getAppMode',
    }),

    username() {
      if (!this.user) return '';
      return this.user.username;
    },
  },

  components: {
    Navbar,
  },

};
</script>
<style>
.shadow {
  text-shadow: 2px 2px rgba(0, 0, 0, 0.6);
}
</style>
