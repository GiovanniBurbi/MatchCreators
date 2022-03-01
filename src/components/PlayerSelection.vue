<template>
  <v-card dark>
    <v-card-title class="deep-purple darken-3">
      <h1
      class="text-h5 font-weight-bold white--text"
      >
        Select a Player
      </h1>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="px-2" style="height: 400px;">
      <v-container fluid class="pt-4 pb-0">

        <v-row
        justify="center"
        align="center"
        v-for="user in users" :key="user.id"
        class="selector px-0"
        >
          <v-col class="d-flex justify-center">
            <v-avatar size="40">
              <img :src="getPicture(user.picture)">
            </v-avatar>
          </v-col>
          <v-col class="d-flex justify-center">
            <h1 class="font-weight-medium text-subtitle-1">{{user.username}}</h1>
          </v-col>
          <v-col class="d-flex justify-center">
            <h1 class="font-weight-medium text-subtitle-1">{{ getAge(user.birthday) }} y/o</h1>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-icon size="36" class="white-icon">{{ positionIcon(user.position) }}</v-icon>
          </v-col>
        </v-row>

      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>

      <v-spacer />

      <v-btn color="deep-purple darken-2">
        <span class="pl-1">Invite</span>
        <v-icon
        size="20"
        right
        >
          mdi-email-outline
        </v-icon>
      </v-btn>

    </v-card-actions>

  </v-card>
</template>

<script>
/* eslint-disable global-require */
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerSelection',

  data() {
    return {
      users: [],
    };
  },

  computed: {
    ...mapGetters({ getUsers: 'users/getUsers' }),
  },

  methods: {
    getPicture(path) {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../${path}`);
    },

    positionIcon(position) {
      if (position === 'Goalkeeper') {
        return '$goalkeeper-icon';
      }
      if (position === 'Defender') {
        return '$defender-icon';
      } return '$forward-icon';
    },

    getAge(birthday) {
      const bday = new Date(birthday);
      const ageDiffMs = Date.now() - bday.getTime();
      const ageDate = new Date(ageDiffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },

  created() {
    this.users = this.getUsers;
  },
};

</script>

<style scoped>
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
.selector:hover {
  background: #3F51B5;
  cursor: pointer;
  border-radius: 16px;
}
</style>
