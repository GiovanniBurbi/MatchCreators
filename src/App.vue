<template>
  <v-app>
    <navbar
    v-if="isNotAuth"
    @myMatches="userMatches = true"
    ></navbar>

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
        Hello, {{ getUsername }}
      </span>
    </v-snackbar>

    <v-main>
      <router-view
      @loginSuccess="snackbar = true"
      :goToMyMatches.sync="userMatches"></router-view>
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
    isNotAuth() {
      return this.$route.name !== 'Authentication';
    },

    ...mapGetters({ getUserInfo: 'auth/getUser' }),

    getUsername() {
      if (!this.getUserInfo) return '';
      return this.getUserInfo.username;
    },
  },

  components: {
    Navbar,
  },

};
</script>
<style>
.shadow {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.6);
}

</style>
