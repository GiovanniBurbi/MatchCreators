<template>
  <v-container fluid class="px-0">
    <v-row justify="center" :class="[smAndUp ? 'mt-2' : 'mt-0']">
      <div
        :class="['switcher px-6', black ? 'selected' : 'no-selected']"
        @click="black = !black"
      >
        <h1
        v-if="windowWidth >= 370"
          :class="[
            'white--text d-inline-flex font-weight-medium pr-1',
            { 'text-size': mdAndUp },
            { 'text-small': xsOnly },
          ]"
        >
          Team
        </h1>
        <h1
          :class="[
            'white--text d-inline-flex font-weight-medium pl-1',
            { 'text-size': mdAndUp },
            { 'text-small': xsOnly },
          ]"
        >
          Black
        </h1>
      </div>
      <div
        :class="['switcher px-6', black ? 'no-selected' : 'selected']"
        @click="black = !black"
      >
        <h1
          v-if="windowWidth >= 370"
          :class="[
            'white--text d-inline-flex font-weight-medium pr-1',
            { 'text-size': mdAndUp },
            { 'text-small': xsOnly },
          ]"
        >
          Team
        </h1>
        <h1
          :class="[
            'white--text d-inline-flex font-weight-medium pl-1',
            { 'text-size': mdAndUp },
            { 'text-small': xsOnly },
          ]"
        >
          White
        </h1>
      </div>
    </v-row>

    <v-row justify="center">
      <field :isWhite="!black" :teamBlack="teamBlack" :teamWhite="teamWhite"/>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';
import Field from './Field.vue';

export default {
  name: 'TeamBuilder',

  data() {
    return {
      black: true,
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    ...mapGetters({ getUser: 'auth/getUser' }),
    teamWhite: {
      get() {
        return this.$store.state.matches.teamWhite;
      },
    },
    teamBlack: {
      get() {
        return this.$store.state.matches.teamBlack;
      },
    },
  },

  watch: {
    windowWidth(newVal) {
      this.windowWidth = newVal;
    },
  },

  components: {
    Field,
  },

  mounted() {
    const user = this.getUser;
    let pos = null;
    if (user.position === 'Goalkeeper') {
      pos = 1;
    } else if (user.position === 'Defender') {
      pos = 2;
    } else pos = 4;
    const payload = {
      spot: pos,
      isWhite: this.isWhite,
      user,
    };
    this.addPlayer(payload);

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    ...mapMutations({ addPlayer: 'matches/addPlayer' }),
    ...mapActions({ getAllUsers: 'users/getAllUsers' }),
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.switcher {
  z-index: 100;
  margin: 20 auto;
}
.switcher::after {
  display: block;
  margin-left: 2px;
  content: "";
  border-bottom: solid 1px white;
  transform: scaleX(0);
}
.selected {
  cursor: default;
  pointer-events: none;
}
.selected:after {
  transition: 200ms ease-in-out;
  transform: scaleX(1);
}
.no-selected {
  opacity: 30%;
}
.no-selected:hover {
  opacity: 100%;
  cursor: pointer;
}
.text-size {
  font-size: 2rem;
}
.text-small {
  font-size: 1.6rem;
}
</style>
