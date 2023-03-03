import ui from './ui';
import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

const controller = (() => {
    const initPage = () => {
        const ShipOne = Ship(2);
        const ShipTwo = Ship(3);
        const ShipThree = Ship(3);
        const ShipFour = Ship(4);
        const ShipFive = Ship(5);

        const player = Player();
        const computer = Player();
        const playerGameboard = Gameboard();
        const computerGameboard = Gameboard();

        playerGameboard.randomPlaceShip(ShipOne);
        playerGameboard.randomPlaceShip(ShipTwo);
        playerGameboard.randomPlaceShip(ShipThree);
        playerGameboard.randomPlaceShip(ShipThree);
        playerGameboard.randomPlaceShip(ShipFour);
        playerGameboard.randomPlaceShip(ShipFive);

        ui.createHtml();
        ui.addShip(playerGameboard.board);
    };

    return { initPage };
})();

export default controller;
