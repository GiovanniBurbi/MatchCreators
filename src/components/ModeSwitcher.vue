<template>
  <v-container fluid class="switch-container">

    <div :class="['switch-bg', isFinder ? null : 'dark-bg', smAndDown ? 'switch-small' : null]">

      <!-- div of the switch that highlight the selected mode -->
      <div :class="['selector',
      isFinder ? null : 'switch-selector',
      {'selector-small': smOnly && !isFinder},
      {'selector-xsmall' : xsOnly && !isFinder}]"
      >
        &nbsp;
      </div>

        <h1
        v-if="!xsOnly"
        :class="['label pl-4',
        isFinder ? 'label-select' : 'finder-no-select', {'label-small': smOnly}]"
        @click="toggleMode()"
        >
          Finder
        </h1>

        <h1
        v-if="!xsOnly"
        :class="['label pl-7 pr-2',
        isFinder ? 'label-no-select' : 'label-select',
        {'label-small': smOnly}]"
        @click="toggleMode()"
        >
          Creator
        </h1>

        <!-- Use icons instead of text when window width is
        small -->
        <v-icon
        v-if="xsOnly"
        size="28"
        :color="isFinder ? 'white' : null"
        :class="['mx-3 icon-switch white-icon',
        isFinder ? 'icon-select' : 'icon-no-select']"
        @click="toggleMode()"
        >
          $finder-icon
        </v-icon>

        <v-icon
        v-if="xsOnly"
        size="30"
        :class="['ml-3 mr-2 icon-switch',
        isFinder ? 'icon-no-select' : 'icon-select white-icon']"
        @click="toggleMode()"
        >
          $creator-icon
        </v-icon>
    </div>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

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
        this.isFinder = !this.isFinder;
        this.$emit('update:switch', false);
      }
    },
  },

  methods: {
    toggleMode() {
      this.isFinder = !this.isFinder;
      this.$emit('modeSwitch');
      if (this.isFinder) {
        this.$router.replace('/home');
      } else this.$router.replace('/creator');
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
/* switch is a fixed component that must be present
in finder page and creator page */
.switch-container {
  display: flex;
  justify-content: center;
  z-index: 100;
  width: fit-content;
}
/* white background of the switch */
.switch-bg {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: -10;
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 8px;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.4);
  transition: background-color 0.4s ease;
}
.switch-small {
  height: 36px;
}
.dark-bg {
  background-color: white;
  /* background-color: #212121; */
  transition: background-color 0.4s ease;
}
.label {
  display: inline;
  cursor: pointer;
}
.icon-switch {
  cursor: pointer;
}
.icon-select {
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);
  background-clip: text;
  cursor: default;
  pointer-events: none;
  transition: 0.3s ease;
}
.icon-no-select {
  opacity: 40%;
  transition: 0.2s ease;
}
.icon-no-select:hover {
  color: #3F51B5;
  opacity: 100%;
}

.label-small {
  font-size: 1.25rem;
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
  opacity: 30%;
}
.finder-no-select:hover {
  color: #3F51B5;
  opacity: 100%;
}
/* div styling and animation */
.selector {
  position: absolute;
  z-index: -1;
  width: 50%;
  height: 105%;
  background-color: #3F51B5;
  border-radius: 8px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.5);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.switch-selector {
  transform: translateX(126px);
  transition: 0.3s ease;
}

.selector-small {
  transform: translateX(89px);
}

.selector-xsmall {
  transform: translateX(53px);
}
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%)
  hue-rotate(291deg) brightness(122%) contrast(100%) drop-shadow( 1px 2px rgba(0, 0, 0));
}
</style>
