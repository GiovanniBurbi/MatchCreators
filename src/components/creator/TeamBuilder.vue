<template>
  <v-container fluid class="px-0">

    <v-row justify="center">
      <field
      :reset="reset"
      :teamBlack="teamBlack"
      :teamWhite="teamWhite"
      :builder="true"
      />
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import Field from '../teams/Field.vue';

export default {
  name: 'TeamBuilder',

  computed: {
    ...mapGetters({ getUser: 'auth/getUser' }),
    ...mapGetters({ teamBlack: 'matches/getTeamBlack' }),
    ...mapGetters({ teamWhite: 'matches/getTeamWhite' }),
  },

  props: {
    reset: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    Field,
  },

  mounted() {
    const user = this.getUser;
    this.addUser(user);
  },

  created() {
    /* Refactor, it should do it only if it is not already done. only the first time.
    Another component should do it right before is needed */
    this.fetchAllUsers();
  },

  methods: {
    ...mapActions({ fetchAllUsers: 'users/fetchAllUsers' }),
    ...mapMutations({ addUser: 'matches/addUser' }),
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.text-size {
  font-size: 2rem;
}
.text-small {
  font-size: 1.6rem;
}
</style>
