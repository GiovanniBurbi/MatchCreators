<template>
  <v-app>
    <navbar
    v-if="isNotAuth"
    :is-dark=darkNav
    ></navbar>

    <v-snackbar
     v-model="snackbar"
     top color="green"
     :timeout="4000"
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
      <mode-switcher
      v-if="isNotAuth"
      :switch.sync="toggleSwitch"
      @modeSwitch="modeSwitch()"
      />
      <router-view @loginSuccess="snackbar = true"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from './components/Navbar.vue';
import ModeSwitcher from './components/ModeSwitcher.vue';

export default {
  name: 'App',

  data() {
    return {
      snackbar: false,
      darkNav: false,
      toggleSwitch: false,
    };
  },

  watch: {
    /* watch route path, change state of persistent
    app components based on current path */
    $route() {
      if (this.$route.name === 'Home') {
        if (this.darkNav) {
          this.darkNav = false;
          this.toggleSwitch = true;
        }
      }
      if (this.$route.name === 'Creator') {
        if (!this.darkNav) {
          this.darkNav = true;
          this.toggleSwitch = true;
        }
      }
    },
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
