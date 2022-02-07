<template>
  <div class="container">
    <!-- input field name -->
    <v-row justify="start">
      <!-- change color based on error value -->
      <v-icon :class="[error ? 'icon iconError' : 'icon']">
        $position-icon
      </v-icon>
      <!-- change color and shake based on error value -->
      <h3
        :class="[
          'pt-2 pl-2 font-weight-regular',
          error ? 'red--text text--accent-2 shake' : 'text--secondary',
        ]"
      >
        Position
      </h3>
    </v-row>

    <v-row :class="['pl-md-6 pl-2 pb-4', { shake: error }]">
      <v-col cols="4">
        <!-- listen for events of type clicked of this component -->
        <position-button
          v-on:clicked="buttonClick"
          field-pos="goalkeeper">
        </position-button>
      </v-col>

      <v-col cols="4">
        <position-button
          v-on:clicked="buttonClick"
          field-pos="defender"
        ></position-button>
      </v-col>

      <v-col cols="4">
        <position-button
          v-on:clicked="buttonClick"
          field-pos="forward"
        ></position-button>
      </v-col>
    </v-row>

    <div :class="[error ? 'error' : null, 'divider']"></div>

    <div
      :class="[
        'reduce font-weight-regular red--text text-accent-2 pl-5',
        error ? 'expand' : 'shrink',
      ]"
    >
      Required
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import PositionButton from '@/components/PositionButton.vue';

export default {
  name: 'PositionField',

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
    ...mapGetters({ currentSelection: 'posInputField/getRgtPosSelection' }),
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
    buttonClick() {
      /* reset error on position form selection if error had happened */
      if (this.error) {
        this.error = false;
      }
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 450px;
  max-height: 170px;
}
.divider {
  height: 0.1px;
  width: 385px;
  border-bottom: 0.1px solid gray;
  margin-left: 20px;
}
.container:hover .divider {
  border-color: black;
}
.reduce {
  font-size: 0.75rem;
}
/* sets svg icon color */
.icon {
  /* gray darken-1 */
  filter: invert(50%) sepia(0%) saturate(7%) hue-rotate(138deg) brightness(90%)
    contrast(92%);
}
.iconError {
  /* red accent-2 */
  filter: invert(46%) sepia(71%) saturate(3070%) hue-rotate(330deg)
    brightness(106%) contrast(109%);
}
/* error message transition */
.expand {
  max-height: 50px;
  transition: max-height 0.3s ease-in;
  overflow: hidden;
}
.shrink {
  max-height: 0;
  transition: max-height 0.25s ease-out;
  overflow: hidden;
}
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
