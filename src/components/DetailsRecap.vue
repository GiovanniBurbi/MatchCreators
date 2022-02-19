<template>
  <v-container fluid>
    <v-row justify="space-around">

      <div class="reminder py-2">
        <div class="background-label d-inline-flex px-3">
          <v-icon size="20" dark class="label-text py-2">mdi-calendar</v-icon>
        </div>
        <div class="bg-field d-inline-flex">
          <h1 class="text-subtitle-1 pl-1 py-1">27th Sept 2022</h1>
        </div>
      </div>

      <div class="reminder py-2">
        <div class="background-label d-inline-flex px-3">
          <v-icon size="20" dark class="label-text py-2">mdi-clock-outline</v-icon>
        </div>
        <div class="bg-field d-inline-flex">
          <h1 class="text-subtitle-1 pl-1 py-1">10:00 - 12:00</h1>
        </div>
      </div>

      <div class="reminder py-2">
        <div class="background-label d-inline-flex px-3">
          <v-icon size="20" dark class="label-text py-2">mdi-map-marker-outline</v-icon>
        </div>
        <div class="bg-field d-inline-flex">
          <h1 class="text-subtitle-1 pl-1 py-1">Albereta</h1>
        </div>
      </div>

    </v-row>
  </v-container>

</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'DetailsRecap',

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background-label {
  background-color: #512DA8;
  border-radius: 4px 0 0 4px;
  width: fit-content;
}
.bg-field {
  background-color: white;
  width: 140px;
  white-space: nowrap;
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6);
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  cursor: default;
}
.bg-field::-webkit-scrollbar {
  display: none;
}
.label-text {
  text-shadow: 2px 2px 3px black;
}
.reminder {
  display: flex;
  align-items: center;
}
</style>
