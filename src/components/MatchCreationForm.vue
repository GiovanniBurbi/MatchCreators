<template>
  <v-container fluid class="form">

    <div class="bg-field d-inline-flex mb-10">

      <div class="background medium d-inline-flex justify-center align-center">
        <h1 class="text-button white--text pr-1">Date</h1>
        <v-icon size="20" dark>mdi-calendar</v-icon>
      </div>

      <v-text-field solo flat label="Define the date"></v-text-field>

    </div>

    <div class="bg-field d-inline-flex mb-10">

      <div class="background medium d-inline-flex justify-center align-center">
        <h1 class="text-button white--text pr-1">Time</h1>
        <v-icon size="20" dark>mdi-clock-outline</v-icon>
      </div>

      <v-text-field solo flat class="d-inline-flex" label="Define the time"></v-text-field>

    </div>

    <div class="bg-field-large d-inline-flex mb-10 mr-5">

      <div class="background large d-inline-flex justify-center align-center">
        <h1 class="text-button white--text pr-1">Location</h1>
        <v-icon size="20" dark>mdi-map-marker-outline</v-icon>
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
.background {
  background-color: #512DA8;
  height: 49px;
  border-radius: 5px 0 0 5px;
}
.medium {
  width: 100px
}
.large {
  width: 122px;
}
.bg-field {
  background-color: white;
  width: 300px;
  height: 49px;
  border-radius: 6px;
}
.bg-field-large {
  background-color: white;
  width: 326px;
  height: 49px;
  border-radius: 6px;
}
.container {
  height: 70vh;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 200px;
}
</style>
