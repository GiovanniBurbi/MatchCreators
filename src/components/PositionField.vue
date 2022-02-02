<template>
  <div class="button">
    <img class="player" src="../assets/forward.png">
    <h1 class="position">Forward</h1>
  </div>
</template>
<script>
export default {
  name: 'PositionField',
};
</script>
<style scoped>
.button {
  margin: 30px auto;
  padding-top: 10px;
  min-height: 230px;
  max-width: 220px;
  fill-opacity: 20%;
  transform: scale(1);
  transition: transform 100ms ease-in-out;
}
.button:hover {
  cursor: pointer;
/*   border: solid 1px rgba(63, 81, 181, 0.4);
  border-radius: 20px; */
  transform: scale(1.1);
  transition: transform 200ms ease-in-out;
}
.button:hover .player{
  opacity: 100%;
}
.button:hover h1 {
  opacity: 100%;
}
.button:hover h1:after {
  transform: scaleX(0.6);
}
.player {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
  opacity: 20%;
  /* filter: brightness(100); white */
  /* filter: brightness(0); black*/
}
h1 {
  color: white;
  font-weight: 400;
  text-align: center;
  opacity: 20%;
}
h1:after {
  display: block;
  content: '';
  border-bottom: solid 1px white;
  transform: scaleX(0);
  transition: transform 150ms ease-in-out;
  opacity: 100%;
}
</style>
