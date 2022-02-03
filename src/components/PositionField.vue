<template>
  <div class="container">
    <v-row class="px-2">
      <v-col cols="4">
        <div class="button">
          <img class="player-gk" src="../assets/goalkeeper.png">
          <h1 class="position">Goalkeeper</h1>
        </div>
      </v-col>
     <v-col cols="4">
        <div class="button">
          <img class="player-def" src="../assets/defender.png">
          <h1 class="position">Defender</h1>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="button">
          <img class="player-fw" src="../assets/forward.png">
          <h1 class="position">Forward</h1>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'PositionField',
};
</script>
<style scoped>
.container {
  max-width: 450px;
}
.player-fw {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 80px;
  opacity: 30%;
/*   filter: brightness(100); white
  filter: brightness(0); black */
}
 .player-def {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 28px;
  opacity: 40%;
}
.player-gk {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 58px;
  opacity: 40%;
}
h1 {
  color: rgba(63, 81, 181);
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  opacity: 70%;
}
h1:after {
  display: block;
  content: '';
  border-bottom: solid 1px rgba(63, 81, 181);
  transform: scaleX(0);
  transition: transform 200ms ease-in-out;
  opacity: 100%;
}
.button {
  min-height: 80px;
  max-width: 100px;
  transform: scale(1);
  transition: transform 200ms ease-in-out;
}
.button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: transform 200ms ease-in-out;
}
.button:hover .player-fw {
  opacity: 100%;
}
.button:hover .player-def {
  opacity: 100%;
}
.button:hover .player-gk {
  opacity: 100%;
}
.button:hover h1 {
  opacity: 100%;
}
.button:hover h1:after {
  transform: scaleX(1);
}
</style>
