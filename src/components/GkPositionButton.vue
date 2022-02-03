<template>
  <div :class="classes" @mouseover="hoverOver" @mouseout="hoverOut" @click="clicked">
    <img class="player" src="../assets/goalkeeper.png">
    <h1 class="position">Goalkeeper</h1>
  </div>
</template>

<script>
export default {
  name: 'GkPositionButton',

  data() {
    return {
      classes: ['button'],
      click: false,
    };
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
    clicked() {
      this.click = true;
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
}
.player {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 58px;
  opacity: 40%;
}
.position {
  color: rgba(63, 81, 181);
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  opacity: 20%;
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
.zoom .player {
  opacity: 100%;
}
.zoom .position {
  opacity: 100%;
}
.zoom .position:after {
  transform: scaleX(1);
}
</style>
