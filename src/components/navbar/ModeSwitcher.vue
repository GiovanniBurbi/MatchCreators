<template>
  <v-container fluid class="switch-container">

    <div
    :class="['switch-bg',
    {'dark-bg': darkMode},
    {'switch-small': smAndDown}]"
    >

      <!-- div of the switch that highlight the selected mode -->
      <div :class="['selector',
      {'icon-selector' : xsOnly},
      {'selector-normal': !isFinder},
      {'selector-small': smOnly && !isFinder},
      {'selector-xsmall icon-selector' : xsOnly && !isFinder}]"
      >
        &nbsp;
      </div>

        <div v-if="!xsOnly" class="d-inline-flex">
          <div class="pl-2 pr-4">
            <h1
            style="cursor:pointer"
            :class="[isFinder ? 'label-select' : 'finder-no-select',
            {'text-h6': smOnly}]"
            @click="toggleMode()"
            >
              Finder
            </h1>
          </div>

          <div class="pr-2">
            <h1
            style="cursor:pointer"
            :class="[isFinder ? 'creator-no-select' : 'label-select',
            smOnly ? 'text-h6' : '']"
            @click="toggleMode()"
            >
              Creator
            </h1>
          </div>

        </div>

        <!-- Use icons instead of text when window width is
        small -->
        <div v-if="xsOnly">
          <v-icon
          style="cursor:pointer"
          size="28"
          :class="['mx-3 icon-white-shadow',
          isFinder ? 'icon-select' : 'icon-no-select']"
          @click="toggleMode()"
          >
            $finder-icon
          </v-icon>

          <v-icon
          style="cursor:pointer"
          size="30"
          :class="['mx-3',
          isFinder ? 'icon-no-select' : 'icon-select icon-white-shadow']"
          @click="toggleMode()"
          >
            $creator-icon
          </v-icon>
        </div>
    </div>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import BreakpointsCond from '../../mixins/BreakpointsCond';

export default {
  name: 'ModeSwitcher',

  computed: {
    ...mapGetters({
      darkMode: 'theme/getDarkMode',
      isFinder: 'app/isFinder',
    }),
  },

  methods: {
    toggleMode() {
      if (this.isFinder) this.$router.replace('/creator');
      else this.$router.replace('/finder');
    },
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
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
  background-color: #212121;
  transition: background-color 0.4s ease;
}
.label-select {
  color: white;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);
  background-clip: text;
  cursor: default;
  pointer-events: none;
  transition: 0.3s ease;
}
.creator-no-select {
  opacity: 50%;
  transition: 0.2s ease;
}
.creator-no-select:hover {
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
.icon-select {
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);
  background-clip: text;
  cursor: default;
  pointer-events: none;
  transition: 0.3s ease;
}
.icon-no-select {
  opacity: 30%;
  transition: 0.2s ease;
}
.icon-no-select:hover {
  color: #3F51B5;
  opacity: 100%;
}

/* div styling and animation */
.selector {
  position: absolute;
  z-index: -1;
  height: 105%;
  width: 48%;
  background-color: #3F51B5;
  border-radius: 8px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.5);
  transform: translateX(0);
  transition: transform 0.3s ease;
}
.icon-selector {
  width: 50%;
}
.selector-normal {
  transform: translateX(107px);
  width: 53%;
  transition: 0.3s ease;
}
.selector-small {
  transform: translateX(75px);
  width: 52%;
}
.selector-xsmall {
  transform: translateX(50px);
}
</style>
