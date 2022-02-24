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
        smAndDown ? 'scrollable-no-bar' : 'scrollable']"
        :style="getHeight">

          <match-cards-group />

        </v-container>

      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import FinderHeader from '@/components/FinderHeader.vue';
import BreakpointsCond from '../mixins/BreakpointsCond';
import MatchCardsGroup from '../components/MatchCardsGroup.vue';

export default {
  name: 'Home',

  data() {
    return {
      filtersOn: false,
      chipsOn: false,
      height: null,
    };
  },

  computed: {
    ...mapGetters({ filters: 'matches/getFilters' }),

    getHeight() {
      return {
        height: `${this.height}vh`,
      };
    },
  },

  watch: {
    /* watch if there are some filters active */
    filters(newVal) {
      if (newVal.length !== 0) {
        if (!this.chipsOn) this.chipsOn = true;
      } else this.chipsOn = false;
    },
    /* Adjust height of cards group based on rendered elements */
    filtersOn(val) {
      if (val) {
        this.height -= 6;
      } else this.height += 6;
    },
    chipsOn(val) {
      if (val) {
        this.height -= 6;
      } else this.height += 6;
    },
    /* While resizing the window it will adapt the height */
    lgAndUp(val) {
      if (val) {
        if (this.filtersOn && this.chipsOn) {
          this.height = 62;
        } else if ((this.chipsOn && !this.filtersOn) || (this.filtersOn && !this.chipsOn)) {
          this.height = 68;
        } else this.height = 74;
      }
    },
    xsOnly(val) {
      if (val) {
        if (this.filtersOn && this.chipsOn) {
          this.height = 66;
        } else if ((this.chipsOn && !this.filtersOn) || (this.filtersOn && !this.chipsOn)) {
          this.height = 72;
        } else this.height = 78;
      }
    },
    mdOnly(val) {
      if (val) {
        if (this.filtersOn && this.chipsOn) {
          this.height = 64;
        } else if ((this.chipsOn && !this.filtersOn) || (this.filtersOn && !this.chipsOn)) {
          this.height = 70;
        } else this.height = 76;
      }
    },
    smOnly(val) {
      if (val) {
        if (this.filtersOn && this.chipsOn) {
          this.height = 64;
        } else if ((this.chipsOn && !this.filtersOn) || (this.filtersOn && !this.chipsOn)) {
          this.height = 70;
        } else this.height = 76;
      }
    },
  },

  mounted() {
    /* when the component is mounted set the height based on viewport */
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.height = 74;
    } else if (this.$vuetify.breakpoint.mdOnly || this.$vuetify.breakpoint.smOnly) {
      this.height = 76;
    } else {
      this.height = 78;
    }
    if (this.chipsOn) this.height -= 6;
  },

  destroyed() {
    /* when component is destroyed clear the filters,
    I can test on mounted if vuex has filters on and adapt the height
    based on that, TODO */
    if (this.chipsOn) this.clearChips();
  },

  methods: {
    ...mapMutations({ clearChips: 'matches/clearFilters' }),
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
.big-one-down {
  height: 68vh;
}
.big-two-down {
  height: 62vh;
}
.medium-one-down {
  height: 70vh;
}
.medium-two-down {
  height: 64vh;
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
