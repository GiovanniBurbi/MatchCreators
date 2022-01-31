<template>
  <v-content class="background">
    <h1 style ="text-shadow: 0 0 2px black;padding-bottom: 80px; padding-top: 80px"
        class="display-3 white--text text-center font-weight-bold"
      >
        MatchCreators
      </h1>
    <v-container class="login-form">
      <div class=background-form>
        <v-row justify="end" dense>
          <h1 style ="text-shadow: 0 0 3px black" class="white--text pr-5">Authentication</h1>
        </v-row>
        <v-row justify="center" dense>
          <v-icon style="text-shadow: 0 0 1px black"
          class="pb-8 pr-1" large color="white">mdi-account</v-icon>
          <v-col cols="10">
            <v-form>
              <v-text-field
                solo
                label="Username"
              >
              </v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-icon style="text-shadow: 0 0 1px black"
          class="pb-8 pr-1" large color="white">mdi-lock</v-icon>
          <v-col cols="10">
            <v-form>
              <v-text-field
                solo
                label="Password"
              >
              </v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-btn class="login-btn" height="40" block rounded large dark color="indigo">
              Login</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <span class="info-switch">Not registered yet?</span>
        </v-row>
        <v-row justify="center">
          <v-btn rounded small dark color="indigo">Sign up</v-btn>
        </v-row>
      </div>
    </v-container>
  </v-content>
</template>
<script>
export default {
  name: 'Login',

  data() {
    return {};
  },
};
</script>
<style scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    90deg,
    #673ab7 33.33%,
    #7e57c2 33.33%,
    #7e57c2 66.66%,
    #9575cd 66.66%,
    #9575cd 99.99%
  );
}
.v-text-field >>> label {
  font-size: 1.5em;
}
.v-text-field >>> input {
  font-size: 1.5em;
}
.login-form {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  /* padding-top: 100px; */
  padding: 30px;
  border-radius: 10px;
  border: 0.1rem solid white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07),
              0 2px 4px rgba(0,0,0,0.07),
              0 4px 8px rgba(0,0,0,0.07),
              0 8px 16px rgba(0,0,0,0.07),
              0 16px 32px rgba(0,0,0,0.07),
              0 32px 64px rgba(0,0,0,0.07);
  background-color: rgba(255, 255, 255, 0.100);
}
.info-switch {
  color: white;
  font-size: 1.2em;
  padding-bottom: 5px;
}
.login-btn {
  margin-top: -30px;
  margin-bottom: 20px;
}
.v-row >>> {
  border-spacing: 0 0.5rem;
}
.background-form {
  align-self: center;
  justify-self: center;
  margin: 0 auto;
}
</style>
