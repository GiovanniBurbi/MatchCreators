<template>
  <v-form>

    <position-field
    label="Filter position"
    color="icon-indigo"
    />

  </v-form>
</template>

<script>
import PositionField from '../PositionField.vue';

export default {
  name: 'PositionFilter',

  components: {
    PositionField,
  },
};
</script>

<style lang="">

</style>
