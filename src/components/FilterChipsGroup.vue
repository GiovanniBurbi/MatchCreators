<template>
  <v-chip
  class="ma-2"
  close
  color="indigo"
  text-color="white"
  >
    <v-icon left size="22">
      {{ category() }}
    </v-icon>
    ciao
  </v-chip>
</template>
<script>
export default {
  name: 'FilterChipsGroup',

  data() {
    return {
      icons: ['mdi-clock-outline', 'mdi-calendar', 'mdi-map-marker-outline', '$position-icon'],
    };
  },

  props: {
    filterType: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },

  methods: {
    category() {
      return 'mdi-clock-outline';
    },
  },

};
</script>
<style scoped>

</style>
