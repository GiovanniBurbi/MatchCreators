<template>
  <v-form>

    <v-text-field
    color="deep-purple"
    label="'Filter location'"
    clearable
    >

      <template v-slot:prepend>
        <v-icon
        left
        color="indigo"
        >
          mdi-map-marker-outline
        </v-icon>
      </template>

    </v-text-field>

  </v-form>
</template>
<script>
export default {
  name: 'LocationFilter',
};
</script>
<style scoped>

</style>
