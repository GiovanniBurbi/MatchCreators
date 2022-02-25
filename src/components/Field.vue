<template>
  <v-container fluid :class="['px-0', {'big': smAndUp}, {'small': xsOnly}]"
  style="overflow: hidden;">

    <v-container fluid fill-height class="box">

      <v-img
      :class="['soccer-field', {'field-normal': smAndUp}, {'field-big': xsOnly}]"
      src="../assets/teamCreator/pitch.png"
      >
      </v-img>

    </v-container>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Field',

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.big {
  height: 62vh;
}
.small {
  height: 70vh;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.soccer-field {
  position: fixed;
}
.field-normal {
  max-width: 1200px;
}
.field-big {
  max-width: 1450px;
}

@media (max-height: 800px) {
  .field-big {
    height: 60vh;
    max-width: 1100px;
  }
  .box {
    padding-bottom: 60px;
  }
}
</style>
