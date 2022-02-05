<template>
  <div :class="classes" @mouseover="hoverOver" @mouseout="hoverOut" @click="clicked">
    <img :class="fieldPos" :src="require(`@/assets/${fieldPos}.png`)">
    <h1 class="position">{{ fieldPos }}</h1>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'PositionButton',

  props: {
    fieldPos: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      classes: ['button'],
      click: false,
    };
  },

  computed: {
    ...mapGetters({ currentSelection: 'getRgtPosSelection' }),
  },

  watch: {
    currentSelection(value) {
      if (value !== this.fieldPos && this.click === true) {
        this.click = false;
        this.classes = ['button'];
      }
    },
  },

  methods: {
    hoverOver() {
      if (!this.click) {
        this.classes.push('zoom');
      }
    },
    hoverOut() {
      if (!this.click) {
        this.classes.pop();
      }
    },
    ...mapMutations(['setRgtPosSelection']),
    clicked() {
      if (!this.click) {
        this.click = true;
        this.classes.push('selection');
        this.setRgtPosSelection(this.fieldPos);
        this.$emit('clicked');
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 450px;
  background-color: white;
}
.button {
  min-height: 80px;
  max-width: 100px;
  transform: scale(1);
  transition: transform 150ms ease-in-out;
  cursor: pointer;
}
.goalkeeper {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 58px;
  opacity: 40%;
  transition: 150ms;
}
.defender {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 28px;
  opacity: 40%;
  transition: 150ms;
}
.forward {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 80px;
  opacity: 35%;
  transition: 150ms;
}
.position {
  color: rgba(63, 81, 181);
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  opacity: 50%;
  text-transform: capitalize;
}
.position:after {
  display: block;
  content: '';
  border-bottom: solid 1px rgba(63, 81, 181);
  transform: scaleX(0);
  transition: transform 200ms ease-in-out;
  opacity: 100%;
}
.zoom {
  transform: scale(1.1);
}
.zoom img {
  opacity: 100%;
}
.zoom .position {
  opacity: 100%;
}
.selection .position:after {
  transform: scaleX(1);
}
</style>
