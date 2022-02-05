import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import PositionIcon from '@/components/PositionIcon.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      'position-icon': {
        component: PositionIcon,
      },
    },
  },
});
