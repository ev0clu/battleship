import './assets/reset.css';
import './assets/style.css';
import controller from './modules/controller';
import game from './modules/game';

controller.initPage();
game.randomShipPlacing();
controller.playerEvent();
