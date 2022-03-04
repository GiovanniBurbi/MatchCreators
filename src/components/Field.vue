<template>
  <v-container fluid class="px-0">

    <v-row justify="center" :class="[smAndUp ? 'mt-2' : 'mt-0']">
      <div class="d-inline-flex justify-center align-center switch-bg">
        <div
        :class="['switcher px-6', black ? 'selected' : 'no-selected']"
        @click="black = !black"
        >
          <h1
          v-if="windowWidth >= 370"
            :class="[
              'd-inline-flex font-weight-medium pr-1',
              { 'text-size': mdAndUp },
              { 'text-small': xsOnly },
            ]"
          >
            Team
          </h1>
          <h1
            :class="[
              'd-inline-flex font-weight-medium pl-1',
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
              'd-inline-flex font-weight-medium pr-1',
              { 'text-size': mdAndUp },
              { 'text-small': xsOnly },
            ]"
          >
            Team
          </h1>
          <h1
            :class="[
              'd-inline-flex font-weight-medium pl-1',
              { 'text-size': mdAndUp },
              { 'text-small': xsOnly },
            ]"
          >
            White
          </h1>
        </div>

      </div>
    </v-row>

    <v-row justify="center">
      <v-img
      :class="xsOnly ? 'field-small' :'field'"
      src="../assets/teamCreator/pitch.png"
      >
        <v-scale-transition hide-on-leave>
          <players-cards-group v-show="black" :team="teamBlack" :builder="builder"/>
        </v-scale-transition>
        <v-scale-transition hide-on-leave>
          <players-cards-group v-show="!black" :team="teamWhite" :builder="builder"/>
        </v-scale-transition>
      </v-img>
    </v-row>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayersCardsGroup from './PlayersCardsGroup.vue';

export default {
  name: 'Field',

  data() {
    return {
      black: true,
      windowWidth: window.innerWidth,
    };
  },

  props: {
    teamWhite: {
      type: Array,
      required: true,
    },
    teamBlack: {
      type: Array,
      required: true,
    },
    reset: {
      type: Boolean,
    },
    builder: {
      type: Boolean,
      required: true,
    },
  },

  watch: {
    windowWidth(newVal) {
      this.windowWidth = newVal;
    },
    reset(newVal) {
      if (newVal) {
        this.black = true;
        this.$emit('update:reset', false);
      }
    },
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  components: {
    PlayersCardsGroup,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.field {
  max-width: 1500px;
  max-height: 690px;
}
.field-small {
  max-width: 1100px;
  max-height: 490px;
}
.switch-bg {
  position: relative;
}
.switch-bg::before {
  content: "";
  /* background: #212121; */
  background: #000000;
  position: absolute;
  border-radius: 20px 20px 5px 5px;
  top: 0px;
  right: -80px;
  bottom: -120px;
  left: -80px;
  opacity: 60%;
}
.switcher {
  z-index: 100;
  white-space: nowrap;
}
.switcher::after {
  display: block;
  margin-left: 2px;
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
h1 {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
}
</style>
