<template>
  <v-card
  :width="xsOnly ? null : 390"
  class="login-card"
  rounded="xl"
  elevation="10"
  >
    <v-window v-model="step" touchless>

      <v-window-item :value="1">

        <v-card-title
        class="justify-end font-weight-light text-h5 pr-5"
        >
          <span>Authentication</span>
        </v-card-title>

        <v-card-text class="pb-0">
          <v-form ref="login">

            <v-text-field
            v-model.trim="username"
            color="indigo"
            label="Username"
            clearable prepend-icon="mdi-account"
            :rules="[rules.required, rules.noSpaces]"
            :error-messages=loginErrorMsg
            @click="resetLoginErrorMsg"
            >
            </v-text-field>

            <v-text-field
            v-model.trim="password"
            :rules="[rules.required, rules.noSpaces]"
            :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPsw ? 'text' : 'password'"
            @click:append="showPsw = !showPsw"
            :error-messages=loginErrorMsg
            @click="resetLoginErrorMsg"
            color="indigo"
            label="Password"
            clearable prepend-icon="mdi-lock"
            >
            </v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions class="pt-4">
          <v-btn
          x-large dark
          color="indigo"
          rounded
          block
          @click="submitLogin"
          :loading="loading"
          >
            Login
          </v-btn>
        </v-card-actions>

        <v-row
        justify="center"
        class="py-8"
        >
          <div class="d-inline-flex align-center">
            <h1 class="text-body-2">Not registered yet?</h1>
            <v-btn
            dark
            text
            x-small
            color="indigo"
            class="pl-2"
            @click="step++"
            >
              <span
              style="padding-top:2px"
              class="text-decoration-underline"
              >
                Sign up
              </span>
            </v-btn>
          </div>
        </v-row>

      </v-window-item>

      <v-window-item :value="2">

        <v-card-title
        class="justify-start font-weight-light text-h5 pl-5"
        >
          <span>Registration</span>
        </v-card-title>

        <v-card-text class="pb-0">
          <v-form ref="firstStepReg">

            <v-text-field
            v-model.trim="username"
            color="indigo"
            label="Username"
            clearable prepend-icon="mdi-account"
            :counter="8"
            :rules="[rules.required, rules.noSpaces, rules.userMax]">
            </v-text-field>

            <v-text-field
            v-model.trim="email"
            color="indigo"
            label="Email"
            clearable prepend-icon="mdi-email"
            :rules="[rules.required, rules.noSpaces,rules.emailFormat]"
            hint="your-email-name@example.com">
            </v-text-field>

            <v-text-field
            v-model.trim="password"
            :rules="[rules.required, rules.noSpaces, rules.pswMin]"
            :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPsw ? 'text' : 'password'"
            color="indigo" label="Password"
            @click:append="showPsw = !showPsw"
            clearable
            prepend-icon="mdi-lock"
            >
            </v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions class="pt-4">
          <v-btn
          @click="$refs.firstStepReg.validate() ? step++ : null"
            x-large dark color="indigo"
            rounded block
            elevation="2"
          >
            Next
          </v-btn>
        </v-card-actions>

        <v-row
        justify="center"
        class="py-8"
        >
          <div class="d-inline-flex align-center">
            <h1 class="text-body-2">Already have an account?</h1>
            <v-btn
            dark
            text
            x-small
            color="indigo"
            class="pl-2"
            @click="step--"
            >
              <span
              class="text-decoration-underline"
              style="padding-top:2px;"
              >
                Login
              </span>
            </v-btn>
          </div>
        </v-row>

      </v-window-item>

      <v-window-item :value="3">

        <v-card-title
        class="justify-start text-size font-weight-light"
        >
          <span>Complete your profile</span>
        </v-card-title>

        <v-card-text class="pb-0">
          <v-form ref="fullReg">

            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            :nudge-top="18"
            >

              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                :value="dateNoDay"
                label="Birth date"
                prepend-icon="mdi-calendar"
                color="indigo"
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
                :rules="[rules.required]"
                @click:clear="date=null">
                </v-text-field>
              </template>

              <v-date-picker
              v-model="date"
              color="indigo"
              :width="xsOnly ? 220 : 280"
              :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).
              getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
              min="1940-01-01"
              @change="menu = false"
              >
              </v-date-picker>

            </v-menu>

            <position-field ref="pos" label="Position" />
          </v-form>
        </v-card-text>

        <v-card-actions class="pb-4 pt-0">
          <v-btn
          x-large
          dark
          color="indigo"
          rounded
          block
          @click="submitFullReg"
          :loading="loading"
          >
            Let's start!
          </v-btn>
        </v-card-actions>

      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import DataHelper from '@/mixins/DataHelper';
import PositionField from '../inputFields/PositionField.vue';

export default {
  name: 'Login',

  components: {
    PositionField,
  },

  data() {
    return {
      step: 1,
      username: '',
      password: '',
      email: '',
      date: null,
      activePicker: null,
      menu: false,
      showPsw: false,
      loginErrorMsg: [],
      loading: false,
    };
  },

  computed: {
    /* getter current position selection */
    ...mapGetters({ getPos: 'posInputField/getPosSelection' }),
  },

  watch: {
    /* open menu on year selection when click on text-field */
    menu(val) {
      return val && setTimeout(() => { this.activePicker = 'YEAR'; });
    },
  },

  methods: {
    ...mapActions({
      loginAttempt: 'auth/login',
      signup: 'auth/signup',
    }),

    save(date) {
      this.$refs.menu.save(date);
    },

    resetLoginErrorMsg() {
      if (this.loginErrorMsg.length !== 0) {
        this.loginErrorMsg.pop();
      }
    },

    /* submit handlers of all windows */

    submitLogin() {
      /* validate form compilation based on rules defined in mixin */
      if (this.$refs.login.validate()) {
        this.loading = true;
        /* wait for the login attempt response and then choice the course of action */
        this.loginAttempt(
          { name: this.username, psw: this.password },
        ).then((val) => {
          if (val) {
            this.$router.push({ name: 'Finder' });
          } else {
            this.loginErrorMsg.push('Invalid access');
          }
          this.loading = false;
        });
      }
    },

    submitFullReg() {
      /* validate the vuetify form and simulate validation with the
      custom pos input field */
      const posValid = this.$refs.pos.validate();
      const dateValid = this.$refs.fullReg.validate();
      if (posValid && dateValid) {
        this.loading = true;
        this.signup(
          {
            username: this.username,
            password: this.password,
            email: this.email,
            birthday: this.date,
            position: this.getPos,
          },
        ).then(() => {
          this.loading = false;
          this.$router.push({ name: 'Finder' });
        });
      }
    },
  },

  mixins: [BreakpointsCond, DataHelper],

};
</script>

<style scoped>
.text-size {
  font-size: 1.5rem;
}
.login-card {
  margin: 0 10px 0
}

@media screen and (max-width: 295px) {
  .text-size {
    font-size: 1.25rem;
  }
}
</style>
