<template>
  <v-app>
    <navbar v-if="isNotAuth" :is-dark=darkNav></navbar>

    <v-snackbar
     v-model="snackbar"
     top color="green"
     :timeout="4000"
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
      <mode-switcher v-if="isNotAuth" @modeSwitch="modeSwitch()" />
      <router-view @loginSuccess="snackbar = true"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import ModeSwitcher from './components/ModeSwitcher.vue';

export default {
  name: 'App',

  data() {
    return {
      snackbar: false,
      darkNav: false,
    };
  },

  computed: {
    isNotAuth() {
      return this.$route.name !== 'Authentication';
    },
  },

  methods: {
    modeSwitch() {
      this.darkNav = !this.darkNav;
    },
  },

  components: {
    Navbar,
    ModeSwitcher,
  },

};
</script>
