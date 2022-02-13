<template>
  <v-container fluid class="background">

    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >
      <finder-header @filters="adjust = !adjust"/>

      <v-divider class="mt-4" style="border-color: black !important; opacity: 30%;"></v-divider>

      <v-row align="center" justify="center" class="mt-1">

        <v-container fluid
        :class="['scrollable full-size', {'filtersOn': adjust}]">

          <match-cards-group />

        </v-container>

      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import FinderHeader from '@/components/FinderHeader.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';
import MatchCardsGroup from '../components/MatchCardsGroup.vue';

export default {
  name: 'Home',

  data() {
    return {
      adjust: false,
      chipsOn: false,
    };
  },

  computed: {
    ...mapGetters({ filters: 'filters/getFilters' }),
  },

  watch: {
    filters(newVal) {
      if (newVal.length !== 0) {
        if (!this.chipsOn) this.chipsOn = true;
      } else this.chipsOn = false;
    },
  },

  components: {
    FinderHeader,
    MatchCardsGroup,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.background {
  height: calc(100vh - 64px);
  background:linear-gradient(to bottom,rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.2)), url('../assets/daylight.jpg') no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
}
.content {
  margin-top: 60px;
  max-width: 80%;
}
.fullscreen {
  max-width: 100%;
}
.biggerContent {
  max-width: 90%;
}
.scrollable {
  overflow-y: auto;
  height: calc(720px - 2vw);
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollable::-webkit-scrollbar {
  display: none;
}
.filtersOn {
  height: calc(670px - 3vw);
}
</style>
