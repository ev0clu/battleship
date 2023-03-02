const Gameboard = () => {
    const board = [];
    const boardSize = 10;

    (function initBoard() {
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                const object = {
                    isShip: false,
                    ship: {},
                    shipIndex: null,
                    isHit: false,
                    x: i,
                    y: j
                };
                board[i].push(object);
            }
        }
    })();

    const canPlaceShip = (x, y, direction, newShip) => {
        let result = true;

        if (direction === 'vertical') {
            if (x <= boardSize - newShip.length) {
                for (let i = 0; i < newShip.length; i++) {
                    if (board[x + i][y].isShip) {
                        result = false;
                        break;
                    }
                }
            } else {
                result = false;
            }
        } else if (direction === 'horizontal') {
            if (y <= boardSize - newShip.length) {
                for (let i = 0; i < newShip.length; i++) {
                    if (board[x][y + i].isShip) {
                        result = false;
                        break;
                    }
                }
            } else {
                result = false;
            }
        }
        return result;
    };

    const placeShipVertical = (x, y, newShip) => {
        for (let i = 0; i < newShip.length; i++) {
            board[x + i][y].isShip = true;
            board[x + i][y].ship = newShip;
            board[x + i][y].shipIndex = i;
        }
    };

    const placeShipHorizontal = (x, y, newShip) => {
        for (let i = 0; i < newShip.length; i++) {
            board[x][y + i].isShip = true;
            board[x][y + i].ship = newShip;
            board[x][y + i].shipIndex = i;
        }
    };

    const receiveAttack = (x, y) => {
        if (board[x][y].isShip === true) {
            board[x][y].ship.hit(board[x][y].shipIndex);
            board[x][y].isHit = true;
            return true;
        }
        board[x][y].isHit = true;
        return false;
    };

    const isAllShipsSunk = () => {
        const shipArray = [];
        board.forEach((row) => {
            row.forEach((column) => {
                if (column.isShip) {
                    shipArray.push(column.ship.isSunk());
                }
            });
        });

        if (shipArray.some((isSunk) => isSunk === false)) {
            return false;
        }

        return true;
    };

    const randomDirection = () => {
        return Math.random() < 0.5 ? 'vertical' : 'horizontal';
    };

    const randomCoordinate = () => {
        const xPos = Math.floor(Math.random() * 10);
        const yPos = Math.floor(Math.random() * 10);

        return { xPos, yPos };
    };

    const randomPlaceShip = (newShip) => {
        const direction = randomDirection();
        let placeShip = false;
        let x = 0;
        let y = 0;

        while (!placeShip) {
            const { xPos, yPos } = randomCoordinate();
            if (canPlaceShip(xPos, yPos, direction, newShip)) {
                x = xPos;
                y = yPos;
                placeShip = true;
            }
        }
        return { x, y };
    };

    return {
        get board() {
            return board;
        },
        canPlaceShip,
        placeShipVertical,
        placeShipHorizontal,
        receiveAttack,
        isAllShipsSunk,
        randomPlaceShip
    };
};

export default Gameboard;
