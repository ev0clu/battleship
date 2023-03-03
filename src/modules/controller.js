import ui from './ui';
import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

const controller = (() => {
    const initPage = () => {
        ui.createHtml();
    };

    const createShips = () => {
        const ships = [];
        const Carrier = Ship(5);
        const Battleship = Ship(4);
        const Destroyer = Ship(3);
        const Submarine = Ship(3);
        const Patrol = Ship(2);

        ships.push(Carrier, Battleship, Destroyer, Submarine, Patrol);

        return ships;
    };

    const randomShipPlacing = () => {
        const player = Player();
        const computer = Player();
        const playerGameboard = Gameboard();
        const computerGameboard = Gameboard();

        const ships = createShips();

        ships.forEach((ship) => {
            playerGameboard.randomPlaceShip(ship);
        });

        ships.forEach((ship) => {
            computerGameboard.randomPlaceShip(ship);
        });

        ui.addShipToBoard('player', playerGameboard.board);
        ui.addShipToBoard('computer', computerGameboard.board);
    };

    return { initPage, randomShipPlacing };
})();

export default controller;
