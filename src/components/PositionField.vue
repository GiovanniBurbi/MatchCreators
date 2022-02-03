<template>
  <div class="container">
    <v-row class="px-2">
      <v-col cols="4">
        <gk-position-button></gk-position-button>
      </v-col>
     <v-col cols="4">
       <def-position-button></def-position-button>
      </v-col>
      <v-col cols="4">
        <fw-position-button></fw-position-button>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import GkPositionButton from '@/components/GkPositionButton.vue';
import DefPositionButton from '@/components/DefPositionButton.vue';
import FwPositionButton from '@/components/FwPositionButton.vue';

export default {
  name: 'PositionField',

  components: {
    GkPositionButton,
    DefPositionButton,
    FwPositionButton,
  },
};
</script>
<style scoped>
.container {
  max-width: 450px;
}
</style>
