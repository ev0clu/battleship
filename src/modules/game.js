import ui from './ui';
import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

const game = (() => {
    const player = Player();
    const computer = Player();
    const playerGameboard = Gameboard();
    const computerGameboard = Gameboard();

    const initGame = () => {
        player.isMyTurn = true;
        computer.isMyTurn = false;
    };

    const restartGame = () => {
        playerGameboard.resetBoard();
        computerGameboard.resetBoard();
    };

    const isPlayerTurn = () => {
        if (player.isMyTurn) {
            return true;
        }
        return false;
    };

    const changeTurn = () => {
        player.changeTurn();
    };

    const isCoordinateFree = (board, x, y) => {
        if (board === 'player') {
            if (!playerGameboard.board[x][y].isHit) {
                return true;
            }

            return false;
        }
        if (board === 'computer') {
            if (!computerGameboard.board[x][y].isHit) {
                return true;
            }
            return false;
        }
    };

    const isShipHit = (board, x, y) => {
        if (board === 'player') {
            return playerGameboard.receiveAttack(x, y);
        }
        return computerGameboard.receiveAttack(x, y);
    };

    const isGameOver = () => {
        if (playerGameboard.isAllShipsSunk() || computerGameboard.isAllShipsSunk()) {
            return true;
        }
        return false;
    };

    const computerRandomAttack = () => {
        return computer.randomAttack(playerGameboard);
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

    return {
        initGame,
        restartGame,
        isPlayerTurn,
        changeTurn,
        isCoordinateFree,
        isShipHit,
        isGameOver,
        computerRandomAttack,
        randomShipPlacing
    };
})();

export default game;
