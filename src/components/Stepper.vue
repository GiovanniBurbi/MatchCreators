<template>
  <v-row justify="space-between" align="center">

    <div class="d-inline-flex">

      <div class="icon">
        <h1
        v-if="!change"
        class="white--text font-weight-bold number"
        >
          1
        </h1>

        <v-fab-transition>
          <v-icon
          v-if="change"
          color="white"
          :size="mdAndUp ? 38 : 26"
          >
            mdi-check
          </v-icon>
        </v-fab-transition>

      </div>

      <v-slide-x-transition hide-on-leave>
        <h1
        v-if="mdAndUp"
        :class="['white--text font-weight-bold header pl-2',
        {'text-disable': change}]"
        >
          Define the Details
        </h1>
      </v-slide-x-transition>

    </div>

    <v-divider class="mx-2 divider"></v-divider>

    <div class="d-inline-flex">

      <div :class="['icon', {'icon-disable': !change}]">
        <h1
        :class="['white--text font-weight-bold number',
        {'text-disable': !change}]"
        >
          2
        </h1>
      </div>

      <v-slide-x-transition hide-on-leave>
        <h1
        v-if="mdAndUp"
        :class="['white--text font-weight-bold header pl-2',
        {'text-disable': !change}]"
        >
          Build the Teams
        </h1>
      </v-slide-x-transition>

    </div>
  </v-row>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Stepper',

  props: {
    change: {
      type: Boolean,
      required: true,
    },
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.header {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.8);
  font-size: calc(15px + 2vw);
  white-space: nowrap;
}
.number {
  text-shadow: 1px 2px rgba(0, 0, 0, 0.4);
  font-size: calc(16px + 1vw);
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4527A0;
  height: calc(24px + 2vw);
  width: calc(24px + 2vw);
  border-radius: 50%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 0.3vw;
  cursor: default;
}
.icon-disable {
  background-color: rgba(158, 158, 158, 0.3);
}
.text-disable {
  opacity: 30%;
}
.divider {
 border-color: #9E9E9E !important;
 opacity: 50%;
}
</style>
