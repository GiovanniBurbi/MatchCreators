<template>
  <v-app>
    <navbar v-if="isNotAuth"></navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',

  data() {
    return {
      isAuth: false,
    };
  },

  computed: {
    isNotAuth() {
      return this.$route.name !== 'Authentication';
    },
  },

  components: { Navbar },

};
</script>
