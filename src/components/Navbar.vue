<template>
  <v-app-bar app flat
  :color="isDark ? null : 'white'" :dark="isDark"
  >

    <v-app-bar-nav-icon>
      <v-icon size=35 class="icon-light"> $ball-icon </v-icon>
    </v-app-bar-nav-icon>

    <v-app-bar-title class="text-uppercase hidden-xs-only">
      <h1 class="font-weight-bold d-inline-flex title">Match</h1>
      <h1 class="font-weight-light d-inline-flex title">Creators</h1>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn
     class="mr-2"
     text rounded left
     style="text-shadow: 1px 1px rgba(63, 81, 181, 0.2);"
    >
      <v-icon class="icon-light" size=37> $player-icon </v-icon>
      <span class="hidden-xs-only">My matches</span>
    </v-btn>

    <v-btn icon>
      <v-avatar size=40>
        <v-img src="../assets/CR7.jpg" alt="User"></v-img>
      </v-avatar>
    </v-btn>

  </v-app-bar>
</template>

<script>

export default {
  name: 'Navbar',

  props: {
    isDark: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.icon-light{
  /* indigo */
  filter: invert(26%) sepia(55%) saturate(2295%)
  hue-rotate(217deg) brightness(90%) contrast(83%);
}
.title {
  text-shadow: 1px 1px rgba(128, 128, 128, 0.40);
  cursor: default;
}
</style>
