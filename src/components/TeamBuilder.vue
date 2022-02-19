<template>
  <v-container fluid>
    <v-row justify="center" class="mt-6">
      <div
      :class="['switcher px-8', black ? 'selected' : 'no-selected']"
      @click="black = !black"
      >
        <h1
        v-if="smAndUp"
        class="white--text d-inline-flex text-size font-weight-medium pr-1"
        >
          Team
        </h1>
        <h1
        class="white--text d-inline-flex text-size font-weight-medium pl-1"
        >
          Black
        </h1>
      </div>
      <div
      :class="['switcher px-8', black ? 'no-selected' : 'selected']"
      @click="black = !black"
      >
        <h1
        v-if="smAndUp"
        class="white--text d-inline-flex text-size font-weight-medium pr-1"
        >
          Team
        </h1>
        <h1
        class="white--text d-inline-flex text-size font-weight-medium pl-1"
        >
          White
        </h1>
      </div>
    </v-row>
    <v-row justify="center" :class="lgAndUp ? 'ml-5' : null">
      <field />
    </v-row>
  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import Field from './Field.vue';

export default {
  name: 'TeamBuilder',

  data() {
    return {
      black: true,
    };
  },

  components: {
    Field,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.switcher {
  z-index: 100;
  margin: 20 auto;
}
.switcher::after {
  display: block;
  margin-left: 2px;
  content: "";
  border-bottom: solid 1px white;
  transform: scaleX(0);
}
.selected {
  cursor: default;
  pointer-events: none;
}
.selected:after {
  transition: 200ms ease-in-out;
  transform: scaleX(1);
}
.no-selected {
  opacity: 30%;
}
.no-selected:hover {
  opacity: 100%;
  cursor: pointer;
}
.text-size {
  font-size: calc(23px + 1vw);
}
</style>
