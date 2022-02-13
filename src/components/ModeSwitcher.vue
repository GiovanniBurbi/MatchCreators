<template>
  <v-container fluid class="container">

    <div :class="['switch-bg', isFinder ? null : 'dark-bg']">
      <div :class="['selector', isFinder ? null : 'switch-selector']">&nbsp;</div>
        <h1 :class="['label pl-4', isFinder ? 'label-select' : 'finder-no-select']"
        @click="toggleMode(), finder()">Finder</h1>
        <h1 :class="['label pl-7', isFinder ? 'label-no-select' : 'label-select']"
        @click="toggleMode(), creator()">Creator</h1>
    </div>

  </v-container>
</template>
<script>
export default {
  name: 'ModeSwitcher',

  data() {
    return {
      isFinder: true,
    };
  },

  props: {
    switch: {
      type: Boolean,
    },
  },

  watch: {
    switch(newVal) {
      if (newVal) {
        this.toggleMode();
        this.$emit('update:switch', false);
      }
    },
  },

  methods: {
    creator() {
      this.$emit('modeSwitch');
      this.$router.replace('/creator');
    },
    finder() {
      this.$emit('modeSwitch');
      this.$router.replace('/home');
    },
    toggleMode() {
      this.isFinder = !this.isFinder;
    },
  },
};
</script>
<style scoped>
.container {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 100;
}
.switch-bg {
  background-color: white;
  z-index: -10;
  position: relative;
  height: 50px;
  width: 250px;
  border-radius: 8px;
  box-shadow: 2px 4px rgba(0, 0, 0, 0.5);
  transition: background-color 0.4s ease;
}
.dark-bg {
  background-color: #212121;
  transition: background-color 0.4s ease;
}
.label {
  display: inline;
  cursor: pointer;
}
.label-select {
  color: white;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);
  background-clip: text;
  cursor: default;
  pointer-events: none;
  transition: 0.3s ease;
}
.label-no-select {
  opacity: 50%;
  transition: 0.2s ease;
}
.label-no-select:hover {
  color: #3F51B5;
  opacity: 100%;
}
.finder-no-select {
  color: #515151;
  transition: color 0.2s ease;
}
.finder-no-select:hover {
  color: #3F51B5;
  opacity: 100%;
}
.selector {
  position: absolute;
  z-index: -1;
  width: 50%;
  height: 100%;
  background-color: #3F51B5;
  border-radius: 8px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.5);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.switch-selector {
  transform: translateX(125px);
  transition: 0.3s ease;
}

</style>
