<template>
  <v-form>

    <v-text-field
    color="deep-purple"
    label="'Filter time'"
    clearable
    >

      <template v-slot:prepend>
        <v-icon
        left
        color="indigo"
        >
          mdi-clock-outline
        </v-icon>
      </template>

    </v-text-field>

  </v-form>
</template>
<script>
export default {
  name: 'TimeFilter',
};
</script>
<style scoped>

</style>
