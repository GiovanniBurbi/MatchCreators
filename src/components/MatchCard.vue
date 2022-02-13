<template>
  <v-card
  class="background ma-2"
  elevation="6"
  width="380"
  rounded="lg"
  >

    <v-card-title class="px-2">
      <v-icon
      left
      color="indigo darken-1"
      >
        mdi-calendar
      </v-icon>
      <h1
      class="text-h5 font-weight-bold indigo--text
      text--darken-2"
      >
        Saturday, 12 September
      </h1>
    </v-card-title>

    <v-card-text class="px-4">

      <v-row class="px-1">
        <v-icon
        left
        color="indigo darken-2"
        >
          mdi-clock-outline
        </v-icon>
        <h1
        class="text-subtitle-1 font-weight-medium black--text"
        >
          10:00 - 12:00
        </h1>
      </v-row>

      <v-row class="px-1 py-1">
        <v-icon
        left
        color="indigo darken-2"
        size="25"
        >
          mdi-map-marker-outline
        </v-icon>
        <h1
        class="text-subtitle-1 font-weight-medium black--text"
        >
          Albereta
        </h1>
      </v-row>

      <v-row class="px-1">
        <v-icon
        class="pl-1 indigo-darken2-icon"
        >
          $player-icon
        </v-icon>
        <h1
        class="text-subtitle-1 font-weight-regular pl-1 black--text"
        >
          Participants:
        </h1>
      </v-row>

      <v-row justify="center" class="px-8 pt-2 pb-1">

        <v-col>
          <v-row justify="center">
            <v-icon size="39">$goalkeeper-icon</v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            class="text-subtitle-2 indigo--text text--darken-2"
            >
              1 / 2
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon size="40">$defender-icon</v-icon>
          </v-row>

          <v-row justify="center" class="pt-2">
            <h1
            class="text-subtitle-2 indigo--text text--darken-2"
            >
              3 / 4
            </h1>
          </v-row>
        </v-col>

        <v-col>
          <v-row justify="center">
            <v-icon
            size="48"
            class="pb-1 full-pos"
            >
              $forward-icon
            </v-icon>
          </v-row>

          <v-row justify="center">
            <h1
            class="text-subtitle-2 red--text text--darken-2"
            >
              4 / 4
            </h1>
          </v-row>
        </v-col>

      </v-row>

    </v-card-text>

  </v-card>
</template>

<script>

export default {
  name: 'MatchCard',

};
</script>

<style scoped>
.background {
  background-image: linear-gradient(to top, #c5cae9, #c5cae9, #c5cae9, #c5cae9, #c5cae9,
  #c8cdea, #cbcfeb, #ced2ec, #d4d8ef, #dbdef1, #e1e4f4, #e8eaf6);
}
.indigo-icon{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%);
}
.indigo-darken2-icon {
  /* indigo darken 2 */
  filter: invert(19%) sepia(50%) saturate(3328%) hue-rotate(224deg) brightness(90%) contrast(89%);
}
.full-pos {
  opacity: 50%;
}
</style>
