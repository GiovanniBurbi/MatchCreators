<template>
  <div class="container">

    <v-row justify="start">
      <v-icon :class="[error ? 'icon iconError' : 'icon']">$position-icon</v-icon>
      <h3 :class="['fieldName pt-1 pl-2 font-weight-regular',
      error ? 'red--text text--accent-2 shake' : 'text--secondary']">Position</h3>
    </v-row>

    <v-row class="px-2 pb-3">

      <v-col cols="4">
        <position-button v-on:clicked="buttonClick" field-pos="goalkeeper"></position-button>
      </v-col>

      <v-col cols="4">
        <position-button v-on:clicked="buttonClick" field-pos="defender"></position-button>
      </v-col>

      <v-col cols="4">
        <position-button v-on:clicked="buttonClick" field-pos="forward"></position-button>
      </v-col>

    </v-row>

    <v-divider :class="[error ? 'customError' : 'custom']">
    </v-divider>

  <div :class="['reduce font-weight-regular red--text text-accent-2', error ? 'expand' : 'shrink']">
  Required
  </div>

  </div>
</template>
<script>

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

  methods: {
    validate() {
      if (this.$store.getters.getRgtPosSelection === '') {
        this.error = true;
      }
    },
    buttonClick() {
      console.log('received');
      if (this.error) {
        this.error = false;
        console.log('yooooo');
      }
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 450px;
  max-height: 150px;
}
.custom {
  border-color: gray !important;
  opacity: 90%;
}
.customError {
  border-color: #FF5252 !important;
  opacity: 100%;
}
.container:hover .custom {
  opacity: 100%;
  border-color: black !important;
}
.reduce{
  font-size: 0.75rem;
}
.icon {
  /* gray darken-1 */
  filter: invert(50%) sepia(0%) saturate(7%) hue-rotate(138deg) brightness(90%) contrast(92%);
}
.iconError {
  /* red accent-2 */
  filter: invert(46%) sepia(71%) saturate(3070%)
  hue-rotate(330deg) brightness(106%) contrast(109%);
}

.expand{
  max-height: 50px;
  transition: max-height .3s ease-in;
  overflow: hidden;
}

.shrink{
  max-height: 0;
  transition: max-height .25s ease-out;
  overflow: hidden;
}

.shake {
  animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
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
