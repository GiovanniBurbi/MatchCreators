<template>
  <v-card :dark="teamSelected === 'black'">
    <v-card-title class="deep-purple darken-3">
      <h1
      class="text-h5 font-weight-bold white--text"
      >
        Select a Player
      </h1>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text
    :class="['px-2', teamSelected === 'black' ? 'scroll-black' : 'scroll-white']"
    :style="xsOnly ? 'height:320px' : 'height: 400px;'"
    >
      <v-container fluid class="pt-4 pb-0">

        <div v-if="loading">
          <v-row justify="center" v-for="i in 8" :key="i">
            <v-skeleton-loader
            width="100%"
            type="list-item-avatar-two-line, divider" />
          </v-row>
        </div>

        <v-slide-y-transition>
          <div v-if="!loading">
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
                  <v-avatar :size="windowWidth <= 336 ? 24 : avatarSize" class="avatar-contrast">
                    <img :src="getPicture(user.picture)">
                  </v-avatar>
                </v-col>

                <v-col class="d-flex justify-center">
                  <h1
                  :class="[
                  xsOnly ? 'text-subtitle-2 x-small' : 'text-subtitle-1',
                  teamSelected === 'white' ?
                  'black-text font-weight-medium' : 'font-weight-medium']"
                  >
                    {{user.username}}
                  </h1>
                </v-col>

                <v-col class="d-flex justify-center">
                  <h1
                  :class="[
                  xsOnly ? 'text-subtitle-2 x-small' : 'text-subtitle-1',
                  teamSelected === 'white' ?
                  'black-text font-weight-medium' : 'font-weight-medium']"
                  >
                    {{getAge(user.birthday)}}y/o
                  </h1>
                </v-col>

                <v-col class="d-flex justify-center">
                  <v-icon
                  :size="windowWidth <= 336 ? '20' : posIconSize"
                  :class="teamSelected === 'white' ? 'posIcon icon-grey' : 'icon-white'"
                  >
                    {{positionIcon(user.position)}}
                  </v-icon>
                </v-col>

              </div>

            </v-row>
          </div>
        </v-slide-y-transition>

      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>

      <v-spacer />

      <v-slide-x-reverse-transition>

        <h1
        v-if="error"
        :class="['red--text pr-2',
        xsOnly ? 'text-body-2' : 'text-subtitle-2']"
        >
          Player already present
        </h1>

      </v-slide-x-reverse-transition>

      <v-btn
      color="deep-purple darken-2"
      :small="xsOnly"
      :class="error ? 'shake' : ''"
      :disabled="!selection"
      @click="sendInvite()"
      >
        <span
        v-if="!xsOnly"
        :class="['pl-1',
        selection ? 'white--text' : '']"
        >
          Invite
        </span>
        <v-icon
        :size="xsOnly ? 24 : 20"
        :right="!xsOnly"
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import DataHelper from '@/mixins/DataHelper';

export default {
  name: 'PlayerSelection',

  data() {
    return {
      windowWidth: window.innerWidth,
      classes: [],
      selection: null,
      error: false,
    };
  },

  computed: {
    ...mapGetters({
      users: 'users/getUsers',
      loading: 'users/getLoading',
      teamSelected: 'matches/getTeamSelected',
      invitationDialog: 'matches/getInvitationDialog',
    }),

    posIconSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 30;
      return 36;
    },

    avatarSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 36;
      return 40;
    },
  },

  watch: {
    windowWidth(newVal) {
      this.windowWidth = newVal;
    },

    invitationDialog(newVal) {
      if (!newVal) {
        this.selection = '';
        this.error = false;
        document.getElementsByClassName('scrollable')[0].scrollTop = 0;
      }
    },
  },

  methods: {
    ...mapMutations({
      invitePlayer: 'matches/addPlayer',
      setInvitationDialog: 'matches/setInvitationDialog',
    }),
    ...mapActions({
      validateAddition: 'matches/inviteValidation',
      fetchUsers: 'users/fetchAllUsers',
    }),

    getPicture(path) {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`@/${path}`);
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    },

    select(index) {
      this.selection = index;
      this.classes.push('selected');
      if (this.error) this.error = false;
    },

    sendInvite() {
      const userSelected = this.users[this.selection - 1];
      /* maybe is better to do this operation here instead of calling a
      vuex actions. */
      this.validateAddition(userSelected.id).then((val) => {
        if (val) {
          this.invitePlayer(userSelected);
          this.setInvitationDialog(false);
        } else this.error = true;
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  created() {
    this.fetchUsers();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mixins: [BreakpointsCond, DataHelper],
};

</script>

<style scoped>
.icon-white {
  /* in app.vue there is the color definition,
  this adds a scoped property: opacity when user is not hovered */
  opacity: 50%;
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
.selector:hover .icon-white {
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
.selected .icon-white {
  opacity: 100%;
}
.avatar-contrast {
  filter: contrast(130%) brightness(70%) saturate(90%);
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}
/* Track */
.scroll-black::-webkit-scrollbar-track {
  background: #424242;
  border-radius: 16px;

}
/* Handle */
.scroll-black::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
}
/* Handle on hover */
.scroll-black::-webkit-scrollbar-thumb:hover {
  background: white;
}

.scroll-white::-webkit-scrollbar-track {
  background: rgba(100, 100, 100, 0.6);
  border-radius: 16px;
}
.scroll-white::-webkit-scrollbar-thumb {
  background: #626262;
  border-radius: 16px;
}
.scroll-white::-webkit-scrollbar-thumb:hover {
  background: #424242;
}

/* shake on error animation */
.shake {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  animation-delay: 350ms;
}
@keyframes shake {
  10% {
    transform: translate3d(-1px, 0, 0);
  }
  20% {
    transform: translate3d(1px, 0, 0);
  }
  30% {
    transform: translate3d(-1px, 0, 0);
  }
  40% {
    transform: translate3d(1px, 0, 0);
  }
  50% {
    transform: translate3d(-1px, 0, 0);
  }
  60% {
    transform: translate3d(1px, 0, 0);
  }
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
