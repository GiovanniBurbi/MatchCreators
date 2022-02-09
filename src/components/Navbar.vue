<template>
  <v-app-bar app>
    <div>
      {{ prova }}
    </div>
  </v-app-bar>
</template>

<script>

export default {
  name: 'Navbar',

  data() {
    return {
      prova: this.$store.state.auth.user,
    };
  },

  mounted() {
  },

  methods: {

  },
};
</script>

<style scoped>

</style>
