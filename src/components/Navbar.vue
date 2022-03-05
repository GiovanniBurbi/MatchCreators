<template>
  <v-app-bar
  app
  hide-on-scroll
  scroll-threshold=70
  :color="darkMode ? null : 'grey lighten-5'"
  :dark="darkMode"
  style="z-index: 2000;"
  >
    <!-- return home button -->
    <v-app-bar-nav-icon>
      <v-icon
      size=35
      class="indigo-icon"
      @click="goHome()"
      >
        $ball-icon
      </v-icon>
    </v-app-bar-nav-icon>

    <v-slide-x-transition hide-on-leave>
      <v-app-bar-title v-if="mdAndUp" class="pl-1 text-uppercase">
        <h1 class="font-weight-bold d-inline-flex title">Match</h1>
        <h1 class="font-weight-light d-inline-flex title">Creators</h1>
      </v-app-bar-title>
    </v-slide-x-transition>

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
     @click="$emit('myMatches')"
    >
      <v-icon
      class="indigo-icon mx-0"
      :size="xsOnly ? 32 : 30"
      >
        $player-icon
      </v-icon>
      <v-slide-x-reverse-transition>
        <span v-if="mdAndUp" class="text-shadow">My matches</span>
      </v-slide-x-reverse-transition>
    </v-btn>

    <v-menu
    :close-on-content-click="false"
    :nudge-width="260"
    offset-y
    rounded="lg"
    transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs}">
        <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        >
          <v-avatar class="avatar-shadow-nav" :size="xsOnly ? 36 : 40">
            <v-img :src="getAvatarPicture" alt="User"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <player-info :darkMode="darkMode" :user="user" />

    </v-menu>

  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import ModeSwitcher from './ModeSwitcher.vue';
import PlayerInfo from './PlayerInfo.vue';
/* eslint-disable global-require */

export default {
  name: 'Navbar',

  components: {
    ModeSwitcher,
    PlayerInfo,
  },

  data() {
    return {
      /* darkMode: false, */
      toggleSwitch: false,
    };
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      darkMode: 'theme/getTheme',
    }),

    getAvatarPicture() {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../${this.user.picture}`);
    },
  },

  watch: {
    /* watch route path, change state of navbar and
    switcher based on current path */
    $route() {
      /* first if maybe is useless, do the actions in goHome
      if that's the case */
      if (this.$route.name === 'Home') {
        if (this.darkMode) {
          /* this.darkMode = false; */
          this.setDarkMode(false);
          this.toggleSwitch = true;
        }
      }
      if (this.$route.name === 'Creator') {
        if (!this.darkMode) {
          /* this.darkMode = true; */
          this.setDarkMode(true);
          this.toggleSwitch = true;
        }
      }
    },
  },

  methods: {
    ...mapMutations({ setDarkMode: 'theme/setDarkMode' }),

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
.indigo-icon{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%)
  drop-shadow(1px 1px rgba(0, 0, 0, 0.8));
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%);
}
.title {
  text-shadow: 1px 1px rgb(0, 0, 0, 0.6);
  cursor: default;
}
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
}
.avatar-shadow-nav {
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.8));
}
</style>
