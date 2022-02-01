<template>
  <div class=background>
    <h1 class=logo>MatchCreators</h1>
    <login />
  </div>
</template>
<script>
import Login from '../components/Login.vue';

export default {
  name: 'Authentication',

  components: {
    Login,
  },
};
</script>

<style scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    90deg,
    #673ab7 33.33%,
    #7e57c2 33.33%,
    #7e57c2 66.66%,
    #9575cd 66.66%,
    #9575cd 99.99%
  );
}
.logo {
  text-shadow: 0 0 2px black;
  padding-bottom: 60px;
  padding-top: 60px;
  color: white;
  text-align: center;
  font-size: 80px;
}
</style>
