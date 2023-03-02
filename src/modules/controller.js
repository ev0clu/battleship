import ui from './ui';
import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

const controller = (() => {
    const initPage = () => {
        const player = Player();
        const computer = Player();
        const playerGameboard = Gameboard();
        const computerGameboard = Gameboard();
        ui.createHtml();
    };

    return { initPage };
})();

export default controller;
