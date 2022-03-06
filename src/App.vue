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
     top right
     color="green"
     :timeout="3000"
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
      <router-view />
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
      /* userMatches: false, */
    };
  },

  watch: {
    logged(newVal) {
      if (newVal) {
        this.snackbar = true;
      }
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      appMode: 'app/getAppMode',
      logged: 'auth/getLoginStatus',
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
/* .shadow {
  text-shadow: 2px 2px rgba(0, 0, 0, 0.6);
} */

/* shadows */
.avatar-shadow {
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.8));
}
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
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
.icon-indigo-shadow{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%)
  drop-shadow(1px 1px rgba(0, 0, 0, 0.8));
}
</style>
