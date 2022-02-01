<template>
  <div>
    <v-card style="margin: 30px auto;" max-width="450" min-height="420" rounded="xl" elevation="10">
      <v-card-title class="justify-end pr-4 pt-12 pb-4"
      style="font-size: 30px;font-weight: 300; color: #3F51B5;">
        Authentication
      </v-card-title>
      <v-card-text class="pb-0 pt-2">
        <v-form >
          <v-text-field label="Username"
          clearable prepend-icon="mdi-account">
          </v-text-field>
          <v-text-field label="Password"
          clearable prepend-icon="mdi-lock"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn x-large dark color="indigo" rounded block elevation="2">
          Login
        </v-btn>
      </v-card-actions>
      <v-card-text class="text-center pt-6 text-body-2">
        Not registered yet?
        <v-btn small dark color="indigo" text class="px-1 py-1">
         Sign up
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>
