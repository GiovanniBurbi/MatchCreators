<template>
  <v-container fluid class="background">

    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >
      <v-row justify="space-between" align="center">
        <h1 :class="['white--text font-weight-bold header']">
          Search a Match
        </h1>
        <v-btn dark
        :small="smAndDown"
        color="indigo"
        elevation="3"
        >
          Filters
          <v-icon
          :small="smAndDown"
          right>fa-solid fa-sliders
          </v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-container fluid class="filtersGroup">
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon size="22" left>mdi-clock-outline</v-icon>
                  Time
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="4">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon size="22" left>mdi-map-marker-outline</v-icon>
                  Location
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="4">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon size="22" left>mdi-calendar</v-icon>
                  Date
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="5">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  Free spots
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="5">
              <v-sheet color="transparent" class="d-flex justify-center">
                <v-btn dark color="deep-purple">
                  <v-icon left size=24 class="icon-white">$position-icon</v-icon>
                  Field position
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'Home',

  components: {
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  height: 100vh;
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/daylight.jpg') center center no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.header {
  text-shadow: 2px 3px rgba(0, 0, 0, 0.8);
  font-size: calc(20px + 2vw);
  white-space: nowrap;
}
.content {
  margin-top: 60px;
  max-width: 80%
}
.fullscreen {
  max-width: 100%;
}
.biggerContent {
  max-width: 90%;
}
.filtersGroup {
  /* width:50%;  */
}
.icon-white {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
</style>
