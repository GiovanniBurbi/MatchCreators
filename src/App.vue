<template>
  <v-app>
    <v-slide-y-transition>
      <navbar
      v-if="!isAuth"
      v-show="!isMatchOverview"
      ></navbar>
    </v-slide-y-transition>

    <v-snackbar
     v-model="snackbar"
     color="green"
     style="z-index: 9000"
     top
     :right="lgAndUp"
     :timeout="3000"
     :min-width="xsOnly ? '80vw' : null"
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
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Navbar from './components/navbar/Navbar.vue';
import BreakpointsCond from './mixins/BreakpointsCond';

export default {
  name: 'App',

  data() {
    return {
      snackbar: false,
    };
  },

  watch: {
    logged(newVal) {
      if (newVal) {
        this.snackbar = true;
      }
    },

    $route() {
      if (this.$route.name === 'Finder') {
        this.setDarkMode(false);
        this.setAppMode('finder');
      }
      if (this.$route.name === 'Creator') {
        this.setDarkMode(true);
        this.setAppMode('creator');
      }
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      logged: 'auth/getLoginStatus',
      isAuth: 'app/isAuth',
      isMatchOverview: 'app/isMatchOverview',
    }),

    username() {
      if (!this.logged) return 'Error, user not found';
      return this.user.username;
    },
  },

  methods: {
    ...mapMutations({
      setDarkMode: 'theme/setDarkMode',
      setAppMode: 'app/setAppMode',
    }),
  },

  components: {
    Navbar,
  },

  mixins: [BreakpointsCond],

};
</script>

<style>
/* shadows */
.avatar-shadow {
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.8));
}
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
}
/* svg colors with shadow */
.icon-white-shadow {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%)
  hue-rotate(291deg) brightness(122%) contrast(100%) drop-shadow( 1px 2px rgba(0, 0, 0));
}
.icon-indigo-shadow{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%)
  drop-shadow(1px 1px rgba(0, 0, 0, 0.8));
}

/* sets svg icon color */
.icon-grey {
  /* gray darken-1 */
  filter: invert(50%) sepia(0%) saturate(7%) hue-rotate(138deg)
  brightness(90%) contrast(92%);
}
.icon-red {
  /* red accent-2 */
  filter: invert(46%) sepia(71%) saturate(3070%) hue-rotate(330deg)
  brightness(106%) contrast(109%);
}
.icon-purple {
  /* deep-purple */
  filter: invert(25%) sepia(75%) saturate(1998%) hue-rotate(247deg)
  brightness(82%) contrast(92%);
}
.icon-indigo {
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%) hue-rotate(217deg)
  brightness(90%) contrast(83%);
}
.icon-white {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg)
  brightness(122%) contrast(100%);
}
</style>
