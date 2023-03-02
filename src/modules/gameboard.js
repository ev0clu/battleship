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

    return {
        get board() {
            return board;
        },
        canPlaceShip,
        placeShipVertical,
        placeShipHorizontal,
        receiveAttack,
        isAllShipsSunk
    };
};

export default Gameboard;
