<template>
  <v-row justify="space-between" align="center">

    <div
    class="d-inline-flex align-center pb-1"
    :style="change ? 'cursor: pointer;' : 'pointer-events:none'"
    @click = "$emit('back')"
    >

      <div
      :class="['icon',
      {'icon-big': lgAndUp},
      {'icon-medium': mdAndDown},
      {'icon-small': xsOnly},
      {'icon-back' : change && smAndDown}]"
      >
        <h1
        v-if="!change"
        :class="['header',
        {'text-h4': lgAndUp},
        {'text-h5': xsOnly}]"
        >
          1
        </h1>

        <v-fab-transition hide-on-leave>
          <v-icon
          v-if="change"
          color="white icon-shadow"
          :size="iconSize"
          >
            mdi-check
          </v-icon>
        </v-fab-transition>

      </div>

      <v-slide-x-transition hide-on-leave>
        <h1
        v-if="mdAndUp"
        :class="['header pl-2',
        {'text-back': change},
        {'text-h4': lgAndUp}]"
        >
          Define the Details
        </h1>
      </v-slide-x-transition>

    </div>

    <v-divider class="mx-2 divider-stepper"></v-divider>

    <div
    class="d-inline-flex align-center"
    style="cursor: default;"
    >

      <div :class="['icon',
      {'icon-big': lgAndUp},
      {'icon-medium': mdAndDown},
      {'icon-small': xsOnly},
      {'icon-disable': !change}]"
      >
        <h1
        :class="['header',
        {'text-disable': !change},
        {'text-h4': lgAndUp},
        {'text-h5': xsOnly}]"
        >
          2
        </h1>
      </div>

      <v-slide-x-transition hide-on-leave>
        <h1
        v-if="mdAndUp"
        :class="['header pl-2',
        {'text-disable': !change},
        {'text-h4': lgAndUp}]"
        >
          Build the Teams
        </h1>
      </v-slide-x-transition>

    </div>
  </v-row>
</template>

<script>
import BreakpointsCond from '@/mixins/BreakpointsCond';

export default {
  name: 'Stepper',

  props: {
    change: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    iconSize() {
      if (this.$vuetify.breakpoint.lgAndUp) return 40;
      if (this.$vuetify.breakpoint.name === 'md'
      || this.$vuetify.breakpoint.name === 'sm') return 32;
      return 26;
    },
  },

  mixins: [BreakpointsCond],

};
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4527A0;
  border-radius: 50%;
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
.icon-small {
  height: 2.4rem;
  width: 2.4rem;
}
.icon-disable {
  background-color: rgba(158, 158, 158, 0.2);
}
.text-disable {
  opacity: 30%;
}
.text-back {
  opacity: 30%;
}
.text-back:hover {
  cursor: pointer;
  opacity: 100%;
}
.divider-stepper {
 border-color: #9E9E9E !important;
 opacity: 50%;
}
</style>
