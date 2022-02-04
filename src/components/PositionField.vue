<template>
  <div class="container">
    <v-row class="px-2">
      <v-col cols="4">
        <position-button field-pos="goalkeeper"></position-button>
      </v-col>
     <v-col cols="4">
       <position-button field-pos="defender"></position-button>
      </v-col>
      <v-col cols="4">
        <position-button field-pos="forward"></position-button>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import PositionButton from '@/components/PositionButton.vue';

export default {
  name: 'PositionField',

  components: {
    PositionButton,
  },
};
</script>
<style scoped>
.container {
  max-width: 450px;
}
</style>
