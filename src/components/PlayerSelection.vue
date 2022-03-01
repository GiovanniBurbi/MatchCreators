<template>
  <v-card :dark="!white">
    <v-card-title class="deep-purple darken-3">
      <h1
      class="text-h5 font-weight-bold white--text"
      >
        Select a Player
      </h1>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text
    class="px-2"
    :style="xsOnly ? 'height:320px' : 'height: 400px;'"
    >
      <v-container fluid class="pt-4 pb-0">

        <v-row
        justify="center"
        align="center"
        v-for="user in users" :key="user.id"
        class="px-0"
        @click="select(user.id)"
        >

          <div
          :class="['selector', selection === user.id ? 'selected' : '']">

            <v-col class="d-flex justify-center">
              <v-avatar :size="windowWidth <= 336 ? 24 : avatarSize">
                <img :src="getPicture(user.picture)">
              </v-avatar>
            </v-col>

            <v-col class="d-flex justify-center">
              <h1
              :class="[
              xsOnly ? 'text-subtitle-2 x-small' : 'text-subtitle-1',
              white ? 'black-text font-weight-medium' : 'font-weight-medium']"
              >
                {{user.username}}
              </h1>
            </v-col>

            <v-col class="d-flex justify-center">
              <h1
              :class="[
              xsOnly ? 'text-subtitle-2 x-small' : 'text-subtitle-1',
              white ? 'black-text font-weight-medium' : 'font-weight-medium']"
              >
                {{getAge(user.birthday)}}y/o
              </h1>
            </v-col>

            <v-col class="d-flex justify-center">
              <v-icon
              :size="windowWidth <= 336 ? '20' : posIconSize"
              :class="white ? 'posIcon grey-icon' : 'white-icon'"
              >
                {{positionIcon(user.position)}}
              </v-icon>
            </v-col>
          </div>
        </v-row>

      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>

      <v-spacer />

      <v-btn
      color="deep-purple darken-2"
      :disabled="!selection"
      @click="sendInvite(), $emit('closeDialog')"
      >
        <span
        :class="['pl-1',
        selection ? 'white--text' : '']"
        >
          Invite
        </span>
        <v-icon
        size="20"
        right
        :color="selection ? 'white' : ''"
        >
          mdi-email-outline
        </v-icon>
      </v-btn>

    </v-card-actions>

  </v-card>
</template>

<script>
/* eslint-disable global-require */
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '../mixins/BreakpointsCond';

export default {
  name: 'PlayerSelection',

  data() {
    return {
      users: [],
      windowWidth: window.innerWidth,
      classes: [],
      selection: null,
    };
  },

  props: {
    reset: {
      type: Boolean,
      required: true,
    },
    white: {
      type: Boolean,
    },
    cardId: {
      type: Number,
      required: true,
    },
  },

  watch: {
    windowWidth(newVal) {
      this.windowWidth = newVal;
    },

    reset(newVal) {
      if (newVal) {
        this.selection = '';
      }
    },
  },

  computed: {
    ...mapGetters({ getUsers: 'users/getUsers' }),

    posIconSize() {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return 30;
      } return 36;
    },

    avatarSize() {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return 36;
      } return 40;
    },
  },

  methods: {
    ...mapMutations({ invitePlayer: 'matches/addPlayer' }),

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

    onResize() {
      this.windowWidth = window.innerWidth;
    },

    select(index) {
      this.selection = index;
      this.classes.push('selected');
    },

    sendInvite() {
      const userSelected = this.users[this.selection - 1];
      const payload = {
        spot: this.cardId,
        isWhite: this.white,
        info: {
          username: userSelected.username,
          picture: userSelected.picture,
        },
      };
      this.invitePlayer(payload);
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  created() {
    this.users = this.getUsers;
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mixins: [BreakpointsCond],
};

</script>

<style scoped>
.white-icon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
  opacity: 50%;
}
.grey-icon {
  /* grey darken-1 */
  filter: invert(49%) sepia(0%) saturate(283%) hue-rotate(143deg) brightness(93%) contrast(92%);
}
.selector {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 16px;
}
.selector::before {
  content: "";
  position:absolute;
  bottom: 0;
  width: 90%;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
}
.selector:hover {
  background: #3F51B5;
  cursor: pointer;
  color: white !important;
}
.selector:hover .posIcon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
.selector:hover .white-icon {
  opacity: 100%;
}
.selected {
  background: #3F51B5;
  pointer-events: none;
  color: white !important;
}
.selected .posIcon {
  /* white */
  filter: invert(99%) sepia(3%) saturate(1032%) hue-rotate(291deg) brightness(122%) contrast(100%);
}
.selected .white-icon {
  opacity: 100%;
}

@media screen and (max-width: 336px) {
  .x-small {
    font-size: 0.8rem !important;
  }
}

@media screen and (max-width: 296px){
  .x-small {
    font-size: 0.65rem !important;
  }
}
</style>
