<template>
  <v-card :dark="darkMode">

    <v-card-title :class="darkMode ? 'indigo darken-1' : 'indigo'">
      <h1 class="text-h5 white--text card-title-shadow">Player Info</h1>
    </v-card-title>

    <v-card-text>

      <v-row justify="center">
        <v-avatar size=80 class="avatar-shadow">
          <v-img :src="getAvatarPicture" alt="User"></v-img>
        </v-avatar>
      </v-row>

      <v-row class="mt-5" justify="center">
        <h1
        :class="['text-h4', darkMode ? 'white--text' : 'black--text']"
        >
          {{user.username}}
        </h1>
      </v-row>

      <v-row justify="center" class="mt-4">
        <h1 class="text-subtitle-1 font-weight-regular">{{user.email}}</h1>
      </v-row>

      <v-row justify="center" class="mt-4">
        <h1 class="text-subtitle-2 font-weight-regular">
          {{getAge(user.birthday)}} years old
        </h1>
      </v-row>

      <v-row justify="center" class="mt-6">
        <h1
        :class="['text-caption text-capitalize font-weight-medium',
        darkMode ? 'white--text' : 'black--text']"
        >
          {{user.position}}
        </h1>
      </v-row>

      <v-row justify="center" class="mt-5 mb-2">
        <img
        :class="[positionImage, 'playerImg pos-shadow']"
        :src="require(`@/assets/myButtons/${positionImage}.png`)"
        />
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable global-require */

import { mapGetters } from 'vuex';
import DataHelper from '@/mixins/DataHelper';

export default {
  name: 'PlayerInfo',

  computed: {
    ...mapGetters({
      darkMode: 'theme/getDarkMode',
      user: 'auth/getUser',
    }),

    getAvatarPicture() {
      if (this.user.id > 10) return this.user.picture;
      // eslint-disable-next-line import/no-dynamic-require
      return require(`@/${this.user.picture}`);
    },
    positionImage() {
      return this.user.position.toLowerCase();
    },
  },

  mixins: [DataHelper],
};
</script>

<style scoped>
.pos-shadow {
  filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.6));
}
</style>
