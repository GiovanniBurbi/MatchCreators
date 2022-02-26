<template>
  <v-row justify="space-between" align="center">

    <div
    class="d-inline-flex align-center"
    @click = "$emit('back')"
    :style="change ? 'cursor: pointer;' : 'cursor: default'">

      <div
      :class="['icon', {'icon-big': lgAndUp},
      {'icon-medium': mdAndDown},
      {'icon-back' : change && smAndDown}]"
      >
        <h1
        v-if="!change"
        :class="['white--text font-weight-bold number',
        {'text-big': lgAndUp}]"
        >
          1
        </h1>

        <v-fab-transition hide-on-leave>
          <v-icon
          v-if="change"
          color="white"
          :size="lgAndUp ? 40 : 32"
          >
            mdi-check
          </v-icon>
        </v-fab-transition>

      </div>

      <v-slide-x-transition hide-on-leave>
        <h1
        v-if="mdAndUp"
        :class="['white--text font-weight-bold header pl-2',
        {'text-back': change}, {'text-big': lgAndUp}]"
        >
          Define the Details
        </h1>
      </v-slide-x-transition>

    </div>

    <v-divider class="mx-2 divider"></v-divider>

    <div
    class="d-inline-flex align-center"
    style="cursor: default;"
    >

      <div :class="['icon', {'icon-disable': !change},
      {'icon-big': lgAndUp}, {'icon-medium': mdAndDown}]">
        <h1
        :class="['white--text font-weight-bold number',
        {'text-disable': !change}, {'text-big': lgAndUp}]"
        >
          2
        </h1>
      </div>

      <v-slide-x-transition hide-on-leave>
        <h1
        v-if="mdAndUp"
        :class="['white--text font-weight-bold header pl-2',
        {'text-disable': !change}, {'text-big': lgAndUp}]"
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
  white-space: nowrap;
}
.text-big {
  font-size: 2.4rem;
}
.number {
  text-shadow: 1px 2px rgba(0, 0, 0, 0.4);
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4527A0;
  border-radius: 50%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 0.3vw;
  cursor: default;
}
.icon-back {
  opacity: 60%;
  cursor: pointer;
}
.icon-back:hover {
  opacity: 100%;
}
.icon-big {
  height: 3.2rem;
  width: 3.2rem;
}
.icon-medium {
  height: 3rem;
  width: 3rem;
}
.icon-disable {
  background-color: rgba(158, 158, 158, 0.3);
}
.text-disable {
  opacity: 30%;
}
.text-back {
  opacity: 30%;
}
.text-back:hover {
  opacity: 100%;
}
.divider {
 border-color: #9E9E9E !important;
 opacity: 50%;
}
</style>
