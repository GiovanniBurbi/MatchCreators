<template>
  <v-container fluid class="background">
    <v-row>
      <v-col>
        <h1 class="text-h3 white--text font-weight-bold header
        mt-16 pt-3 text-start"
        >
          Create a Match
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Creator',
};
</script>
<style scoped>
.background {
  height: 100vh;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/night.jpg') center center no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
