<template>
  <v-container fluid class="background">
    <!-- change width based on current viewport -->
    <v-container
    :class="['content',
    {'fullscreen' : smAndDown},
    {'biggerContent' : lgOnly || mdOnly}]"
    >

      <finder-header @filters="filtersOn = !filtersOn"/>

      <v-row align="center" justify="center">
        <!-- adjust container height based on rendered components
        on the page. Without it, cards on last row will not be fully shown
        when filters are open or when there are some chips.
        Need to find a better way to handle this problem -->
        <v-container fluid :class="[
        {'big': (lgAndUp) && (!filtersOn && !chipsOn)},
        {'big-two-down': (lgAndUp) && (filtersOn && chipsOn)},
        {'big-one-down': (lgAndUp) && ((chipsOn && !filtersOn) || filtersOn && !chipsOn)},
        {'medium': (smOnly || mdOnly) && (!filtersOn && !chipsOn)},
        {'medium-two-down': (smOnly || mdOnly) && (filtersOn && chipsOn)},
        {'medium-one-down': (smOnly || mdOnly) &&
        ((chipsOn && !filtersOn) || filtersOn && !chipsOn)},
        {'small': (xsOnly) && (!filtersOn && !chipsOn)},
        {'small-two-down': (xsOnly) && (filtersOn && chipsOn)},
        {'small-one-down': (xsOnly) && ((chipsOn && !filtersOn) || filtersOn && !chipsOn)},
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
  rgba(0, 0, 0, 0.2)), url('../assets/backgrounds/daylight.jpg') no-repeat center center fixed;
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
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollable-no-bar::-webkit-scrollbar {
  display: none;
}
.scrollable {
  overflow-y: auto;
  /* firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #3F51B5;
}
.scrollable::-webkit-scrollbar {
  width: 10px;
}
.scrollable::-webkit-scrollbar-track {
  background: rgba(220, 220, 220, 0.25);
  border-radius: 5px;
}
.scrollable::-webkit-scrollbar-thumb {
  background: #5C6BC0;
  border-radius: 5px;
}
.scrollable::-webkit-scrollbar-thumb:hover {
  background: #3F51B5;
}
.big{
  height: 74vh;
}
.big-one-down {
  height: 68vh;
}
.big-two-down {
  height: 62vh;
}
.medium{
  height: 76vh;
}
.medium-one-down {
  height: 70vh;
}
.medium-two-down {
  height: 64vh;
}
.small{
  height: 78vh;
}
.small-one-down {
  height: 72vh;
}
.small-two-down {
  height: 66vh;
}
@media (max-height: 800px) {
  .scrollable-no-bar {
    height: 64vh;
  }
}
</style>
