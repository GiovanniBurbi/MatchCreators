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

      <v-card :dark="darkMode">

        <v-card-title :class="darkMode ? 'indigo darken-2' : 'indigo'">
          <h1 class="text-h5 white--text card-title-shadow">Player Info</h1>
        </v-card-title>

        <v-card-text>

          <v-row justify="center">
            <v-avatar size=80 class="avatar-shadow">
              <v-img :src="getAvatarPicture" alt="User"></v-img>
            </v-avatar>
          </v-row>

          <v-row class="mt-5" justify="center">
            <h1
            :class="['text-h4', darkMode ? 'white--text' : 'black--text']"
            >
              {{user.username}}
            </h1>
          </v-row>

          <v-row justify="center" class="mt-4">
            <h1 class="text-subtitle-1 font-weight-regular">{{user.email}}</h1>
          </v-row>

          <v-row justify="center" class="mt-4">
            <h1 class="text-subtitle-2 font-weight-regular">{{getAge(user.birthday)}} years old</h1>
          </v-row>

          <v-row justify="center" class="mt-6">
            <h1
            :class="['text-caption font-weight-medium',
            darkMode ? 'white--text' : 'black--text']"
            >
              {{user.position}}
            </h1>
          </v-row>

          <v-row justify="center" class="mt-5 mb-2">
            <img
            :class="[positionImage, 'playerImg']"
            :src="require(`@/assets/myButtons/${positionImage}.png`)"
            />
          </v-row>

        </v-card-text>
      </v-card>

    </v-menu>

  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import ModeSwitcher from './ModeSwitcher.vue';
/* eslint-disable global-require */

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

  computed: {
    ...mapGetters({ user: 'auth/getUser' }),
    getAvatarPicture() {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../${this.user.picture}`);
    },
    positionImage() {
      return this.user.position.toLowerCase();
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

    getAge(birthday) {
      const bday = new Date(birthday);
      const ageDiffMs = Date.now() - bday.getTime();
      const ageDate = new Date(ageDiffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
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
.card-title-shadow {
  text-shadow: 2px 2px rgba(0, 0, 0, 0.7);
}
.playerImg {
  /* centering img and default opacity*/
  display: block;
  margin-left: auto;
  margin-right: auto;
  filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.6));
}
/* custom sizes and opacity based on type of button */
.goalkeeper {
  max-width: 58px;
}
.defender {
  max-width: 28px;
}
.forward {
  max-width: 70px;
}
.avatar-shadow {
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
.avatar-shadow-nav {
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.8));
}
</style>
