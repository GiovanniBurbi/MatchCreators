<template>
  <v-container fluid>
    <!-- skeleton cards to be shown while waiting data from the db -->
    <v-row justify="center" v-if="loading">
      <v-skeleton-loader
      class="mx-2 my-2"
      v-for="index in 25"
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

      <v-row justify="center" v-if="!loading">
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

  computed: {
    ...mapGetters({ loading: 'matches/getLoading' }),
  },

  props: {
    matches: {
      type: Array,
      required: true,
    },
  },

  components: {
    MatchCard,
  },
};
</script>
