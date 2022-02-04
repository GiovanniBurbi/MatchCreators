<template>
  <v-card style="margin: 30px auto;"
  max-width="450" min-height="380" rounded="xl" elevation="10">
    <v-window v-model="step">

      <v-window-item :value="1">

        <v-card-title class="justify-end pr-4 pt-8 pb-4"
        style="font-size: 30px;font-weight: 300; color: #3F51B5;">
          <span>Authentication</span>
        </v-card-title>

        <v-card-text class="pb-0 pt-2">
          <v-form ref="login">

            <v-text-field color="indigo" label="Username"
            clearable prepend-icon="mdi-account"
            :rules="[rules.required, rules.noSpaces]">
            </v-text-field>

           <v-text-field :rules="[rules.required, rules.noSpaces]"
            :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPsw ? 'text' : 'password'"
            color="indigo" label="Password" @click:append="showPsw = !showPsw"
            clearable prepend-icon="mdi-lock">
            </v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions class="pt-4">
          <v-btn @click="submitLogin" x-large dark color="indigo" rounded block elevation="2">
            Login
          </v-btn>
        </v-card-actions>

        <v-card-text class="text-center pt-6 pb-8 text-body-2">
          Not registered yet?
          <v-btn small dark color="indigo" text class="px-1 py-1" @click="step++">
          Sign up
          </v-btn>
        </v-card-text>

      </v-window-item>

      <v-window-item :value="2">

        <v-card-title class="justify-start pr-4 pt-8 pb-4"
        style="font-size: 30px;font-weight: 300; color: #3F51B5;">
          <span>Registration</span>
        </v-card-title>

        <v-card-text class="pb-0 pt-2">
          <v-form ref="firstStepReg">

            <v-text-field color="indigo" label="Username"
            clearable prepend-icon="mdi-account" :counter="10"
            :rules="[rules.required, rules.userMax, rules.noSpaces]">
            </v-text-field>

            <v-text-field color="indigo" label="Email"
            clearable prepend-icon="mdi-email"
            :rules="[rules.required, rules.emailFormat, rules.noSpaces]"
            hint="your-email-name@example.com">
            </v-text-field>

            <v-text-field :rules="[rules.required, rules.pswMin, rules.noSpaces]"
            :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPsw ? 'text' : 'password'"
            color="indigo" label="Password" @click:append="showPsw = !showPsw"
            clearable prepend-icon="mdi-lock">
            </v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions class="pt-4">
          <v-btn @click="submitReg" x-large dark color="indigo" rounded block elevation="2">
            Sign up
          </v-btn>
        </v-card-actions>

        <v-card-text class="text-center pt-6 pb-8 text-body-2">
          Already have an account?
          <v-btn small dark color="indigo" text class="px-1 py-1" @click="step--">
            login
          </v-btn>
        </v-card-text>

      </v-window-item>

      <v-window-item :value="3">

        <v-card-title class="justify-start pr-4 pt-8 pb-4"
        style="font-size: 30px;font-weight: 300; color: #3F51B5;">
          <span>Complete your profile</span>
        </v-card-title>

        <v-card-text class="pb-0 pt-4">
          <v-form>

            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
            transition="scale-transition" offset-y min-width="auto">

              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date" label="Birth date"
                prepend-icon="mdi-calendar" color="indigo"
                readonly clearable v-bind="attrs" v-on="on">
                </v-text-field>
              </template>

              <v-date-picker v-model="date" :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).
              getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
              min="1950-01-01" @change="save"
              color="indigo">
              </v-date-picker>

            </v-menu>

            <v-row class="pt-4 pb-6">
            <v-icon class="pl-3">mdi-account</v-icon>
            <h2 class="pt-1 pl-2 font-weight-regular grey--text text--darken-1">Position</h2>
            </v-row>

            <position-field/>

          </v-form>
        </v-card-text>

        <v-card-actions class="pb-4 pt-4">
          <v-btn x-large dark color="indigo" rounded block elevation="2">
            Let's start!
          </v-btn>
        </v-card-actions>

      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import PositionField from './PositionField.vue';

export default {
  name: 'Login',

  components: {
    PositionField,
  },
  data() {
    return {
      step: 1,
      activePicker: null,
      date: null,
      menu: false,
      showPsw: false,
      rules: {
        required: (v) => !!v || 'Required',
        userMax: (v) => v?.length <= 10 || 'Username must be less than 10 characters',
        pswMin: (v) => v?.length >= 8 || 'Password must be at least 8 characters',
        emailFormat: (v) => /.+@.+\...+/.test(v) || 'Email must be valid',
        noSpaces: (v) => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
      },
    };
  },
  watch: {
    menu(val) {
      return val && setTimeout(() => { this.activePicker = 'YEAR'; });
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    submitReg() {
      if (this.$refs.firstStepReg.validate()) {
        this.step += 1;
      }
    },
    submitLogin() {
      if (this.$refs.login.validate()) {
        console.log('ciao');
      }
    },
  },
};
</script>
