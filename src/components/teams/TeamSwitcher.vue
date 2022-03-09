<template>
  <v-container style="max-width: 800px;">

    <v-row justify="center">

      <v-col class="d-flex justify-center">
        <div
        :class="['switcher',
        teamSelected === 'black' ? 'selected' : 'no-selected']"
        @click="selectTeam('black')"
        >
          <h1
          :class="{'text-h5 font-weight-medium': xsOnly}"
          >
            <span v-if="windowWidth >= 325">Team Black</span>
            <span v-if="windowWidth < 325">Black</span>
          </h1>
        </div>
      </v-col>

      <v-col class="d-flex justify-center">
        <div
        :class="['switcher',
        teamSelected === 'white' ? 'selected' : 'no-selected']"
        @click="selectTeam('white')"
        >
          <h1
          :class="{'text-h5 font-weight-medium': xsOnly}"
          >
            <span v-if="windowWidth >= 325">Team White</span>
            <span v-if="windowWidth < 325">White</span>
          </h1>
        </div>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../../mixins/BreakpointsCond';

export default {
  name: 'TeamSwitcher',

  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },

  watch: {
    windowWidth(newVal) {
      this.windowWidth = newVal;
    },
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },

    ...mapMutations({ selectTeam: 'matches/setTeamSelected' }),
  },

  computed: {
    ...mapGetters({ teamSelected: 'matches/getTeamSelected' }),
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.switcher::after {
  display: block;
  margin-left: 5px;
  padding-top: 2px;
  content: "";
  border-bottom: solid 2px rgb(255, 255, 255);
  transform: scaleX(0);
}
.selected {
  cursor: default;
  pointer-events: none;
  color: white;
}
.selected:after {
  transition: 200ms ease-in-out;
  transform: scaleX(1);
}
.no-selected {
  color: white;
  opacity: 40%;
}
.no-selected:hover {
  opacity: 100%;
  cursor: pointer;
}
</style>
