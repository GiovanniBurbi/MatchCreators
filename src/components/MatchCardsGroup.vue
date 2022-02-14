<template>
  <v-container fluid>
    <v-row justify="center" v-if="!loaded">
      <v-skeleton-loader
      class="mx-2 my-2"
      v-for="index in 12"
      :key="index"
      elevation="8"
      tile
      type="card"
      width="340"
      height="200"
      />
    </v-row>
    <v-row justify="center" v-else>
      <match-card
      v-for="match in matches"
      :key="match.id"
      :match="match"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MatchCard from './MatchCard.vue';

export default {
  name: 'MatchCardGroup',

  data() {
    return {
      matches: [],
      loaded: null,
    };
  },

  components: {
    MatchCard,
  },

  methods: {
    ...mapActions({ fetchMatches: 'matches/allMatches' }),
  },

  computed: {
    ...mapGetters({ getAllMatches: 'matches/getMatches' }),
    ...mapGetters({ getStatusMatches: 'matches/getStatusMatches' }),
  },

  watch: {
    getAllMatches(newVal, oldVal) {
      if (oldVal.length === 0) {
        if (newVal.length !== 0) {
          this.matches = newVal;
        }
      }
    },
    getStatusMatches(newVal) {
      this.loaded = newVal;
    },
  },

  created() {
    this.loaded = this.getStatusMatches;
    if (!this.loaded) {
      this.fetchMatches();
    } else {
      this.matches = this.getAllMatches;
    }
  },

};
</script>

<style scoped>
.background-skeleton {
  background-image: linear-gradient(to top, #c5cae9, #c5cae9, #c5cae9, #c5cae9, #c5cae9,
  #c8cdea, #cbcfeb, #ced2ec, #d4d8ef, #dbdef1, #e1e4f4, #e8eaf6);
}
</style>
