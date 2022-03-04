<template>
  <v-container fluid class="px-0">

    <v-row justify="center" :class="[smAndUp ? 'mt-2' : 'mt-0']">
      <div
      :class="['d-inline-flex justify-center align-center',
      switcherBg]"
      >
        <div
        :class="['switcher px-6', black ? 'selected' : 'no-selected']"
        @click="black = !black"
        >
          <h1
          v-if="windowWidth >= 325"
            :class="[
              'd-inline-flex font-weight-medium pr-1',
              { 'text-small': xsOnly },
            ]"
          >
            Team
          </h1>
          <h1
            :class="[
              'd-inline-flex font-weight-medium pl-1',
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
            v-if="windowWidth >= 325"
            :class="[
              'd-inline-flex font-weight-medium pr-1',
              { 'text-small': xsOnly },
            ]"
          >
            Team
          </h1>
          <h1
            :class="[
              'd-inline-flex font-weight-medium pl-1',
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

  computed: {
    switcherBg() {
      if (!this.builder) {
        if (this.$vuetify.breakpoint.name === 'xs') return 'switch-bg-smaller';
        return 'switch-bg';
      } return '';
    },
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
  background: #000000;
  position: absolute;
  border-radius: 20px 20px 5px 5px;
  top: 0px;
  right: -80px;
  bottom: -120px;
  left: -80px;
  opacity: 65%;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.8);
}
.switch-bg-smaller {
  position: relative;
}
.switch-bg-smaller::before {
  content: "";
  background: #000000;
  position: absolute;
  border-radius: 20px 20px 0px 0px;
  top: 0px;
  right: -42px;
  bottom: -82px;
  left: -42px;
  opacity: 60%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
.text-small {
  font-size: 1.5rem;
}
.switcher {
  z-index: 100;
  white-space: nowrap;
}
.switcher::after {
  display: block;
  margin-left: 0px;
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
@media screen and (max-width: 430px) {
  .switch-bg-smaller::before {
    border-radius: 5px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 70%;
  }
}
</style>
