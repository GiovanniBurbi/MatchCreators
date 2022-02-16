<template>
  <v-container fluid>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-3 justify-center align-center">
        <h1 class="text-button white--text label-text pr-1">Date</h1>
        <v-icon size="20" dark class="label-text">mdi-calendar</v-icon>
      </div>

      <v-text-field solo flat label="Define the date"></v-text-field>

    </div>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-3 justify-center align-center">
        <h1 class="text-button white--text label-text pr-1">Time</h1>
        <v-icon size="20" dark class="label-text">mdi-clock-outline</v-icon>
      </div>

      <v-text-field solo flat class="d-inline-flex" label="Define the time"></v-text-field>

    </div>

    <div class="bg-field d-inline-flex mb-12">

      <div class="background-label d-inline-flex px-2 justify-center align-center">
        <h1 class="text-button white--text label-text pr-1">Location</h1>
        <v-icon size="20" dark class="label-text">mdi-map-marker-outline</v-icon>
      </div>

      <v-text-field solo
      flat class="d-inline-flex" label="Define the location"></v-text-field>

    </div>

  </v-container>
</template>

<script>
export default {
};
</script>

<style scoped>
.container {
  height: 54vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.background-label {
  background-color: #512DA8;
  height: 49px;
  border-radius: 5px 0 0 5px;
  width: fit-content;
}
.bg-field {
  background-color: white;
  width: calc(260px + 14vw);
  height: 49px;
  border-radius: 6px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6);
}
.label-text {
  text-shadow: 2px 2px 3px black;
}
</style>
