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

    const getGameBoard = (board) => {
        if (board === 'player') {
            return playerGameboard.board;
        }
        if (board === 'computer') {
            return computerGameboard.board;
        }
    };

    const resetGameboards = () => {
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

    const isShipSunk = (board, x, y) => {
        if (board === 'player') {
            if (playerGameboard.board[x][y].ship.isSunk()) {
                playerGameboard.shipSunk(x, y);
                return true;
            }
        } else if (board === 'computer') {
            if (computerGameboard.board[x][y].ship.isSunk()) {
                computerGameboard.shipSunk(x, y);
                return true;
            }
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

    const generateShipRandomCoordinates = (board) => {
        if (board === 'player') {
            const playerShips = createShips();

            playerShips.forEach((ship) => {
                playerGameboard.randomPlaceShip(ship);
            });
        }
        if (board === 'computer') {
            const computerShips = createShips();

            computerShips.forEach((ship) => {
                computerGameboard.randomPlaceShip(ship);
            });
        }
    };

    return {
        initGame,
        getGameBoard,
        resetGameboards,
        isPlayerTurn,
        changeTurn,
        isCoordinateFree,
        isShipHit,
        isGameOver,
        computerRandomAttack,
        generateShipRandomCoordinates,
        isShipSunk
    };
})();

export default game;
