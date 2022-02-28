import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free/css/all.css';
import PositionIcon from '../icons/PositionIcon.vue';
import BallIcon from '../icons/BallIcon.vue';
import PlayerIcon from '../icons/PlayerIcon.vue';
import GoalkeeperIcon from '../icons/GoalkeeperIcon.vue';
import DefenderIcon from '../icons/DefenderIcon.vue';
import ForwardIcon from '../icons/ForwardIcon.vue';
import FinderIcon from '../icons/FinderIcon.vue';
import CreatorIcon from '../icons/CreatorIcon.vue';

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
      'goalkeeper-icon': {
        component: GoalkeeperIcon,
      },
      'defender-icon': {
        component: DefenderIcon,
      },
      'forward-icon': {
        component: ForwardIcon,
      },
      'finder-icon': {
        component: FinderIcon,
      },
      'creator-icon': {
        component: CreatorIcon,
      },
    },
    iconfont: 'mdi' || 'fa',
  },
});
