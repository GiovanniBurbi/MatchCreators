<template>
  <v-app-bar
  app
  hide-on-scroll
  scroll-threshold=70
  :color="darkMode ? null : 'white'" :dark="darkMode"
  style="z-index: 2000;"
  >
    <!-- return home button -->
    <v-app-bar-nav-icon>
      <v-icon
      size=35
      class="icon-light"
      @click="goHome()"
      >
        $ball-icon
      </v-icon>
    </v-app-bar-nav-icon>

    <v-app-bar-title class="pl-1 text-uppercase hidden-sm-and-down">
      <h1 class="font-weight-bold d-inline-flex title">Match</h1>
      <h1 class="font-weight-light d-inline-flex title">Creators</h1>
    </v-app-bar-title>

    <v-spacer v-if="mdAndUp"></v-spacer>

    <mode-switcher
    :switch.sync="toggleSwitch"
    @modeSwitch="darkMode = !darkMode"
    />

    <v-spacer></v-spacer>

    <v-btn
     class="mr-1"
     text rounded left
     style="text-shadow: 1px 1px rgba(63, 81, 181, 0.2);"
    >
      <v-icon class="icon-light" size=37> $player-icon </v-icon>
      <span class="hidden-sm-and-down">My matches</span>
    </v-btn>

    <v-btn icon>
      <v-avatar size=40>
        <v-img src="../assets/users/match.jpg" alt="User"></v-img>
      </v-avatar>
    </v-btn>

  </v-app-bar>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import ModeSwitcher from './ModeSwitcher.vue';

export default {
  name: 'Navbar',

  components: {
    ModeSwitcher,
  },

  data() {
    return {
      darkMode: false,
      toggleSwitch: false,
    };
  },

  watch: {
    /* watch route path, change state of navbar and
    switcher based on current path */
    $route() {
      /* first if maybe is useless, do the actions in goHome
      if that's the case */
      if (this.$route.name === 'Home') {
        if (this.darkMode) {
          this.darkMode = false;
          this.toggleSwitch = true;
        }
      }
      if (this.$route.name === 'Creator') {
        if (!this.darkMode) {
          this.darkMode = true;
          this.toggleSwitch = true;
        }
      }
    },
  },

  methods: {
    goHome() {
      if (this.$route.name === 'Home') {
        this.$router.go();
      } else {
        this.$router.push({ name: 'Home' });
      }
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.icon-light{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%);
}
.title {
  text-shadow: 1px 1px rgba(128, 128, 128, 0.40);
  cursor: default;
}
</style>
