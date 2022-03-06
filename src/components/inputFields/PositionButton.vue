<template>
  <v-container fluid
    :class="[classes, 'py-3']"
    @mouseover="hoverOver"
    @mouseout="hoverOut"
    @click="clicked"
  >
    <v-row justify="center">
      <img
      :class="[fieldPos, 'playerImg']"
      :src="require(`@/assets/myButtons/${fieldPos}.png`)"
      />
    </v-row>

    <v-row justify="center">
      <h1
      :class="['position indigo--text pt-2 font-weight-light',
      xsOnly ? 'text-subtitle-2' : 'text-h6']"
      >
        {{ fieldPos }}
      </h1>
    </v-row>

  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import BreakpointsCond from '../../mixins/BreakpointsCond';

export default {
  name: 'PositionButton',

  props: {
    /* type of button, goalkeeper, defender or forward */
    fieldPos: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      /* styling classes for the button based on mouse events */
      classes: ['button'],
      /* flag,true when button has been pressed */
      click: false,
    };
  },

  computed: {
    /* declare currentSelection as a method to get vuex state of
    registrationPositionSelection */
    ...mapGetters({ currentSelection: 'posInputField/getPosSelection' }),
  },

  watch: {
    /* method to watch vuex state change on registrationPositionSelection
    using currentSelection method */
    currentSelection(value) {
      /* If current selection is not this instance of button and was clicked
      change click state e change styling classes for this instance */
      if (value !== this.fieldPos && this.click === true) {
        this.click = false;
        this.classes = ['button'];
      }
    },
  },

  methods: {
    hoverOver() {
      /* if button has not been pressed */
      if (!this.click) {
        this.classes.push('zoom');
      }
    },
    hoverOut() {
      /* if button has not been pressed */
      if (!this.click) {
        this.classes.pop();
      }
    },
    /* declare vuex mutation for state registrationPositionSelection */
    ...mapMutations({ setSelection: 'posInputField/setPosSelection' }),
    clicked() {
      /* if button was not pressed, change styling class to be permanent */
      if (!this.click) {
        this.click = true;
        this.classes.push('selection');
        /* set on vuex state this button position name (goalkeeper, defender, forward) */
        this.setSelection(this.fieldPos);
        /* emit a signal to communicate that one instance of this button has been pressed */
        this.$emit('clicked');
      }
    },
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.button {
  cursor: pointer;
  /* transition for hoverOut */
  transform: scale(1);
  transition: transform 150ms ease-in-out;
}
.playerImg {
  /* centering img and default opacity*/
  display: block;
  margin-left: auto;
  margin-right: auto;
  opacity: 40%;
  transition: 150ms;
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
  opacity: 35%;
}
/* name of the type of button */
.position {
  opacity: 50%;
  text-transform: capitalize;
  width: fit-content;
  margin: auto;
  line-height: 1.3;
}
/* bottom border for setup transition */
.position:after {
  display: block;
  content: "";
  border-bottom: solid 1px rgba(63, 81, 181);
  transform: scaleX(0);
  transition: transform 200ms ease-in-out;
  opacity: 100%;
}
.selection .playerImg {
  filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.6));
}
/* bottom border start transition on selection */
.selection .position:after {
  transform: scaleX(1);
}
/* zoom transform  */
.zoom {
  transform: scale(1.1);
}
.zoom .playerImg {
  opacity: 100%;
  filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.6));
}
.zoom .position {
  opacity: 100%;
}

@media screen and (max-width: 600px) {
  .goalkeeper {
  max-width: 42px;
  }
  .defender {
    max-width: 20px;
  }
  .forward {
    max-width: 58px;
  }
}
</style>
