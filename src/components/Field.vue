<template>
  <v-container fluid :class="['px-0', {'big': smAndUp}, {'small': xsOnly}]"
  style="overflow: hidden;">

    <v-container fluid fill-height class="box">

      <v-img
      :class="['soccer-field', {'field-normal': smAndUp}, {'field-big': xsOnly}]"
      src="../assets/teamCreator/pitch.png"
      >
      </v-img>
      <players-cards-group />
    </v-container>

  </v-container>
</template>

<script>
import BreakpointsCond from '../mixins/BreakpointsCond';
import PlayersCardsGroup from './PlayersCardsGroup.vue';

export default {
  name: 'Field',

  data() {
    return {
      match: {
        id: 1,
        date: '2022-03-01',
        startTime: '10:00',
        endTime: '12:00',
        location: 'Albereta',
        positions: {
          goalkeepers: 2,
          defenders: 3,
          forwards: 4,
        },
      },
    };
  },

  components: {
    PlayersCardsGroup,
  },

  mixins: [BreakpointsCond],
};
</script>

<style scoped>
.big {
  height: 62vh;
}
.small {
  height: 70vh;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.soccer-field {
  position: fixed;
}
.field-normal {
  max-width: 1400px;
}
.field-big {
  max-width: 1450px;
}
@media (max-height: 800px) {
  .field-big {
    height: 60vh;
    max-width: 1100px;
  }
  .box {
    padding-bottom: 60px;
  }
}
</style>
