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
.content-padding {
  padding: 0 5vw 0;
}

/* Colored position images */
.playerImg {
/* centering img and default opacity*/
  display: block;
  margin-left: auto;
  margin-right: auto;
}
/* custom sizes and opacity based on type of button */
.goalkeeper {
  max-width: 58px;
}
.defender {
  max-width: 28px;
}
.forward {
  max-width: 80px;
}

.header {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  font-weight: 700 !important;
  color: white;
  cursor: default;
}
.text-big{
  font-size: 2.6rem;
}

/* divider */
.divider-dark {
  border-color: grey !important;
  opacity: 30%;
}

/* shadows */
.avatar-shadow {
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.6));
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.7);
}
.icon-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
}
.icon-shadow-soft {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
}
.btn-shadow {
  text-shadow: 2px 2px rgba(0, 0, 0, 0.7);
}
.btn-icon-shadow {
  filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.7));
}
.card-title-shadow {
  text-shadow: 2px 2px rgba(0, 0, 0, 0.7);
}

/* svg colors with shadow */
.icon-white-shadow {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%)
  hue-rotate(291deg) brightness(122%) contrast(100%) drop-shadow( 1px 2px rgba(0, 0, 0));
}
.icon-indigo-shadow {
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%) hue-rotate(217deg)
  brightness(90%) contrast(83%) drop-shadow( 1px 1px rgba(0, 0, 0, 0.3));
}
.icon-indigo-darken2-shadow {
  /* indigo darken 2 */
  filter: invert(19%) sepia(50%) saturate(3328%) hue-rotate(224deg) brightness(90%) contrast(92%)
  drop-shadow(1px 1px rgba(0, 0, 0, 0.7));
}
.icon-black-shadow {
  filter: drop-shadow(2px 1px rgba(0, 0, 0, 0.2));
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
