<template>
  <v-container fluid>
    <!-- skeleton cards to be shown while waiting data from the db -->
    <v-row justify="center" v-if="!getStatusMatches">
      <v-skeleton-loader
      class="mx-2 my-2"
      v-for="index in 16"
      :key="index"
      elevation="8"
      tile
      type="card"
      width="340"
      height="200"
      />
    </v-row>

    <!-- list of cards representing available matches -->
    <v-slide-x-transition>

      <v-row justify="center" v-if="getStatusMatches">
        <template v-for="match in matches">
          <!-- component over handler with vuetify -->
          <v-hover v-slot="{ hover }" :key="match.id">
            <match-card
            :match="match"
            :hover="hover"
            />
          </v-hover>

        </template>
      </v-row>

    </v-slide-x-transition>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import MatchCard from './MatchCard.vue';

export default {
  name: 'MatchCardGroup',

  props: {
    matches: {
      type: Array,
      required: true,
    },
  },

  components: {
    MatchCard,
  },

  computed: {
    ...mapGetters({ getStatusMatches: 'matches/getStatusMatches' }),
  },

};
</script>

<style scoped>
.background-skeleton {
  background-image: linear-gradient(to top, #c5cae9, #c5cae9, #c5cae9, #c5cae9, #c5cae9,
  #c8cdea, #cbcfeb, #ced2ec, #d4d8ef, #dbdef1, #e1e4f4, #e8eaf6);
}
</style>
