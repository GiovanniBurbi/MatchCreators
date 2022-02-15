<template>
  <v-container fluid class="background">
    <!-- change width based on current viewport -->
    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >

      <finder-header @filters="filtersOn = !filtersOn"/>

      <v-divider class="mt-4">
      </v-divider>

      <v-row align="center" justify="center" class="mt-1">
        <!-- adjust container height based on rendered components
        on the page. Without it, cards on last row will not be fully shown
        when filters are open or when there are some chips.
        Need to find a better way to handle this problem -->
        <v-container fluid :class="[
        {'filters-xor-chips-on': filtersOn && !chipsOn},
        {'filters-and-chips-on': filtersOn && chipsOn},
        {'filters-xor-chips-on': chipsOn && !filtersOn},
        smAndDown ? 'scrollable-no-bar' : 'scrollable']"
        >

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
      filtersOn: false,
      chipsOn: false,
    };
  },

  computed: {
    ...mapGetters({ filters: 'matches/getFilters' }),
  },

  watch: {
    /* watch if there are some filters active */
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
.biggerContent {
  max-width: 90%;
}
.fullscreen {
  max-width: 100%;
}
.scrollable-no-bar {
  overflow-y: auto;
  height: calc(75vh - 1vw);
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollable-no-bar::-webkit-scrollbar {
  display: none;
}
.scrollable {
  overflow-y: auto;
  height: calc(75vh - 1vw);
  /* firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #3F51B5;
}
.scrollable::-webkit-scrollbar {
  width: 10px;
}
.scrollable::-webkit-scrollbar-track {
  background: rgba(220, 220, 220, 0.1);
  border-radius: 5px;
}
.scrollable::-webkit-scrollbar-thumb {
  background: rgba(63, 81, 181, 0.7);
  border-radius: 5px;
}
.scrollable::-webkit-scrollbar-thumb:hover {
  background: #3F51B5;
}
.filters-xor-chips-on {
  height: calc(68vh - 1vw);
}
.filters-and-chips-on {
  height: calc(62vh - 1vw);
}
</style>
