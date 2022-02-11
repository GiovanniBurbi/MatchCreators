<template>
  <v-card
  max-width=430
  rounded="xl"
  elevation="10"
  >
    <v-window v-model="step">

      <v-window-item :value="1">

        <v-card-title
        class="justify-end pr-4 pt-8 pb-4"
        style="font-size: 30px;font-weight: 300; color: 3F51B5;"
        >
          <span>Authentication</span>
        </v-card-title>

        <v-card-text class="pb-0 pt-2">
          <v-form ref="login">

            <v-text-field
            v-model.trim="username"
            color="indigo"
            label="Username"
            clearable prepend-icon="mdi-account"
            :rules="[rules.required, rules.noSpaces]"
            :error-messages=loginError
            @click="resetLoginError"
            >
            </v-text-field>

            <v-text-field
            v-model.trim="password"
            :rules="[rules.required, rules.noSpaces]"
            :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPsw ? 'text' : 'password'"
            @click:append="showPsw = !showPsw"
            :error-messages=loginError
            @click="resetLoginError"
            color="indigo"
            label="Password"
            clearable prepend-icon="mdi-lock"
            >
            </v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions class="pt-4">
          <v-btn
          @click="submitLogin"
          x-large dark
          color="indigo"
          rounded block
          elevation="2"
          >
            Login
          </v-btn>
        </v-card-actions>

        <v-card-text
        class="text-center pt-6 pb-8 text-body-2"
        >
          Not registered yet?
          <v-btn
          small dark
          color="indigo"
          text
          class="px-1 py-1"
          @click="step++"
          >
            Sign up
          </v-btn>
        </v-card-text>

      </v-window-item>

      <v-window-item :value="2">

        <v-card-title
        class="justify-start pr-4 pt-8 pb-4"
        style="font-size: 30px;font-weight: 300; color: 3F51B5;"
        >
          <span>Registration</span>
        </v-card-title>

        <v-card-text class="pb-0 pt-2">
          <v-form ref="firstStepReg">

            <v-text-field
            v-model.trim="username"
            color="indigo"
            label="Username"
            clearable prepend-icon="mdi-account"
            :counter="10"
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
          @click="submitFirstReg"
            x-large dark color="indigo"
            rounded block
            elevation="2"
          >
            Sign up
          </v-btn>
        </v-card-actions>

        <v-card-text
        class="text-center pt-6 pb-8 text-body-2"
        >
          Already have an account?
          <v-btn
          small dark color="indigo"
          text
          class="px-1 py-1"
          @click="step--"
          >
            login
          </v-btn>
        </v-card-text>

      </v-window-item>

      <v-window-item :value="3">

<!-- style="font-size: 30px;font-weight: 300; color:
        #3F51B5;" -->
        <v-card-title
        class="justify-start pr-4 pt-8"
        >
          <h1 class="font-weight-light"
          style="font-size:30px;">Complete your profile</h1>
        </v-card-title>

        <v-card-text class="pb-0">
          <v-form ref="fullReg">

            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >

              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                :value="dateFormatting"
                label="Birth date"
                prepend-icon="mdi-calendar"
                color="indigo"
                readonly clearable
                v-bind="attrs"
                v-on="on"
                :rules="[rules.required]"
                @click:clear="date=null">
                </v-text-field>
              </template>

              <v-date-picker
              v-model="date"
              color="indigo"
              :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).
              getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
              min="1940-01-01"
              @change="menu = false"
              >
              </v-date-picker>

            </v-menu>

            <position-field ref="pos" label="Position" registration="true"></position-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pb-4 pt-6">
          <v-btn
          @click="submitFullReg"
          x-large dark
          color="indigo"
          rounded block
          elevation="2"
          >
            Let's start!
          </v-btn>
        </v-card-actions>

      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { format, parseISO } from 'date-fns';
import PositionField from './PositionField.vue';

export default {
  name: 'Login',

  components: {
    PositionField,
  },

  data() {
    return {
      username: '',
      password: '',
      email: '',
      date: null,

      step: 1,
      activePicker: null,
      menu: false,
      showPsw: false,
      /* rules for validate input in text-fields */
      rules: {
        required: (v) => !!v || 'Required',
        userMax: (v) => v?.length <= 10 || 'Username must be less than 10 characters',
        pswMin: (v) => v?.length >= 8 || 'Password must be at least 8 characters',
        emailFormat: (v) => /.+@.+\...+/.test(v) || 'Email must be valid',
        noSpaces: (v) => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
      },
      loginError: [],
    };
  },

  computed: {
    /* format date */
    dateFormatting() {
      return this.date ? format(parseISO(this.date), 'do MMMM yyyy') : '';
    },
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
    /* save date on text field */
    save(date) {
      this.$refs.menu.save(date);
    },

    resetLoginError() {
      if (this.loginError.length !== 0) {
        this.loginError.pop();
      }
    },

    ...mapActions({ loginAttempt: 'auth/login' }),

    /* submit handlers of all windows */
    submitLogin() {
      if (this.$refs.login.validate()) {
        this.loginAttempt(
          { name: this.username, psw: this.password },
        ).then((val) => {
          if (val) {
            this.$router.push({ name: 'Home' });
            this.$emit('loginSuccess');
          } else {
            this.loginError.push('Invalid access');
          }
        });
      }
    },

    submitFirstReg() {
      if (this.$refs.firstStepReg.validate()) {
        /* switch to window 3 (step=3) */
        this.step += 1;
      }
    },

    ...mapActions({ signup: 'auth/signup' }),
    ...mapMutations({ resetSelection: 'posInputField/setPosSelection' }),

    submitFullReg() {
      const posValid = this.$refs.pos.validate();
      const dateValid = this.$refs.fullReg.validate();
      if (posValid && dateValid) {
        this.position = this.getPos;
        this.signup(
          {
            username: this.username,
            password: this.password,
            email: this.email,
            date: this.date,
            position: this.getPos,
          },
        ).then(() => {
          this.resetSelection('');
          this.$router.push({ name: 'Home' });
          this.$emit('loginSuccess');
        });
      }
    },
  },
};
</script>
