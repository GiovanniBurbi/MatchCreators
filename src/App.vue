<template>
  <v-app>
    <navbar
    v-if="isNotAuth"
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
      @loginSuccess="snackbar = true"></router-view>
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
