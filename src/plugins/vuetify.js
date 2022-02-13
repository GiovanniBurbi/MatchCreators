import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free/css/all.css';
import PositionIcon from '../icons/PositionIcon.vue';
import BallIcon from '../icons/BallIcon.vue';
import PlayerIcon from '../icons/PlayerIcon.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      'position-icon': {
        component: PositionIcon,
      },
      'ball-icon': {
        component: BallIcon,
      },
      'player-icon': {
        component: PlayerIcon,
      },
    },
    iconfont: 'mdi' || 'fa',
  },
});
