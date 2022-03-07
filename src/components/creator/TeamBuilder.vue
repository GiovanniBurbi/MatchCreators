<template>
  <v-container fluid class="px-0">

    <v-row justify="center">
      <field
      :teamBlack="teamBlack"
      :teamWhite="teamWhite"
      />
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BreakpointsCond from '@/mixins/BreakpointsCond';
import Field from '../teams/Field.vue';

export default {
  name: 'TeamBuilder',

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      teamBlack: 'matches/getTeamBlack',
      teamWhite: 'matches/getTeamWhite',
    }),
  },

  methods: {
    ...mapMutations({ addUser: 'matches/addUser' }),
  },

  components: {
    Field,
  },

  mounted() {
    this.addUser(this.user);
  },

  mixins: [BreakpointsCond],
};
</script>
