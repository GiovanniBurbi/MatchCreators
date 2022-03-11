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
    <v-btn
    icon
    :small="xsOnly"
    class="pl-2"
    >
      <v-icon
      :size=" xsOnly ? 32 : 36"
      class="icon-indigo"
      @click="goHome()"
      >
        $ball-icon
      </v-icon>
    </v-btn>

    <v-slide-x-transition hide-on-leave>

      <v-app-bar-title
      v-if="mdAndUp"
      class="pl-3"
      style="cursor: default;"
      >

        <div class="d-inline-flex text-uppercase">
          <h1 class="font-weight-bold text-h6">Match</h1>
          <h1 class="font-weight-light text-h6">Creators</h1>
        </div>

      </v-app-bar-title>

    </v-slide-x-transition>

    <v-spacer v-if="mdAndUp"></v-spacer>

    <mode-switcher :class="{'pl-4': xsOnly}"/>

    <v-spacer></v-spacer>

    <v-btn
     class="mr-1"
     :text="!xsOnly"
     :icon="xsOnly"
     rounded
     left
     @click="setAppSection('my-matches')"
    >
      <v-icon
      :class="['icon-indigo', xsOnly ? '' : 'pr-2']"
      :size="xsOnly ? 32 : 30"
      >
        $player-2-icon
      </v-icon>
      <v-slide-x-reverse-transition>

        <span v-if="!xsOnly">My matches</span>

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
          <v-avatar class="avatar-shadow" :size="xsOnly ? 36 : 40">
            <v-img :src="getAvatarPicture" alt="User"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <player-info  />

    </v-menu>

  </v-app-bar>
</template>

<script>
/* eslint-disable global-require */

import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import ModeSwitcher from './ModeSwitcher.vue';
import PlayerInfo from './PlayerInfo.vue';

export default {
  name: 'Navbar',

  components: {
    ModeSwitcher,
    PlayerInfo,
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      logged: 'auth/getLoginStatus',
      darkMode: 'theme/getDarkMode',
    }),

    getAvatarPicture() {
      if (this.user) {
        // eslint-disable-next-line import/no-dynamic-require
        return require(`@/${this.user.picture}`);
      } return require('@/assets/users/match.jpg');
    },
  },

  methods: {
    ...mapMutations({ setAppSection: 'app/setAppSection' }),

    goHome() {
      if (this.$route.name === 'Finder') {
        /* refresh current page */
        this.$router.go();
      } else this.$router.push({ name: 'Finder' });
    },
  },

  mixins: [BreakpointsCond],
};
</script>
