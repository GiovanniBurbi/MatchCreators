<template>
  <v-app>
    <navbar v-if="isNotAuth"></navbar>

    <v-snackbar
     v-model="snackbar"
     top color="green"
     :timeout="2000"
    >
      <v-icon
       class="pb-1"
       size=30
       left
      >mdi-check-circle-outline
      </v-icon>
      <span class="text-subtitle-1">
        Hello, {{ this.$store.state.auth.user.username }}!
      </span>
    </v-snackbar>

    <v-main>
      <router-view @loginSuccess="snackbar = true"></router-view>
    </v-main>
  </v-app>
</template>

<script>
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
  },

  components: { Navbar },

};
</script>
