<template>

  <v-container fluid>

    <v-row justify="start">

      <v-icon
      :class="iconColor"
      >
        $position-icon
      </v-icon>

      <h3
      :class="['pt-1 pl-2 font-weight-regular',
      error ? 'red--text text--accent-2 shake' : 'grey--text text--darken-1']"
      >
        <span>{{ label }}</span>
      </h3>

    </v-row>

    <v-row
    :class="['pb-3',
    {'shake' : error}]"
    justify="center"
    >

      <v-col
      v-for="pos in ['goalkeeper', 'defender', 'forward']"
      :key="pos"
      >

        <position-button
          @clicked="error ? error = false : null"
          :field-pos="pos">
        </position-button>

      </v-col>
    </v-row>

    <v-divider
    v-if="isAuth"
    :class="error ? 'red accent-2' : 'grey darken-1'"
    ></v-divider>

    <v-slide-y-transition hide-on-leave>
      <h1
      v-if="isAuth && error"
      :class="['text-caption font-weight-regular red--text text-accent-2']"
      >
        Required
      </h1>
    </v-slide-y-transition>

    <v-slide-y-transition hide-on-leave>
      <h1
      v-if="isAuth && !error"
      class="text-caption"
      style="color:transparent;"
      >
        placeholder
      </h1>
    </v-slide-y-transition>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import PositionButton from './PositionButton.vue';

export default {
  name: 'PositionField',

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      error: false,
    };
  },

  components: {
    PositionButton,
  },

  computed: {
    /* define getter of vuex state registrationPositionSelection */
    ...mapGetters({
      currentSelection: 'posInputField/getPosSelection',
      isAuth: 'app/isAuth',
    }),

    iconColor() {
      if (this.error) return 'icon-red';
      if (!this.error && this.isAuth) return 'icon-grey';
      return 'icon-indigo';
    },
  },

  methods: {
    /* method that verify if position form has been completed */
    validate() {
      if (this.currentSelection === '') {
        /* change error value */
        this.error = true;
        return false;
      } return true;
    },
  },

  mixins: [BreakpointsCond],
};
</script>
<style scoped>
/* shake on error animation */
.shake {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  animation-delay: 350ms;
}
@keyframes shake {
  10% {
    transform: translate3d(-2px, 0, 0);
  }
  20% {
    transform: translate3d(2px, 0, 0);
  }
  30% {
    transform: translate3d(-1px, 0, 0);
  }
  40% {
    transform: translate3d(1px, 0, 0);
  }
}
</style>
