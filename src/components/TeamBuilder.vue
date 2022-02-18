<template>
  <div class="container">
    <v-img class="pitch" contain src="../assets/teamCreator/pitch.png" ></v-img>
  </div>
</template>

<script>

export default {
  name: 'TeamBuilder',
};
</script>

<style scoped>
.container {
  position: fixed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pitch {
  width: 500px;
  height: 500px;
  transform: scale(1.4); /* animate scale with the decrease of the screen width */
}
</style>
