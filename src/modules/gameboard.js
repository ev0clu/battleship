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
                    y: j,
                    direction: ''
                };
                board[i].push(object);
            }
        }
    })();

    const resetBoard = () => {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                board[i][j].isShip = false;
                board[i][j].ship = {};
                board[i][j].shipIndex = null;
                board[i][j].isHit = false;
                board[i][j].direction = '';
            }
        }
    };

    const canPlaceShip = (x, y, direction, newShip) => {
        let result = true;
        if (direction === 'vertical') {
            const shipUp = x - 1;
            const shipDown = x + newShip.length;

            if (x >= 0 && x <= boardSize - newShip.length && y >= 0 && y < boardSize) {
                // check if ship placing location is free
                for (let i = 0; i < newShip.length; i++) {
                    if (board[x + i][y].isShip) {
                        result = false;
                        break;
                    }
                }

                if (shipUp >= 0 && shipDown < boardSize) {
                    if (!board[shipUp][y].isShip && !board[shipDown][y].isShip) {
                        for (let i = 0; i <= newShip.length + 1; i++) {
                            if (y - 1 >= 0) {
                                if (board[shipUp + i][y - 1].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                            if (y + 1 < boardSize) {
                                if (board[shipUp + i][y + 1].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipUp === -1) {
                    if (!board[shipDown][y].isShip) {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (y - 1 >= 0) {
                                if (board[i][y - 1].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                            if (y + 1 < boardSize) {
                                if (board[i][y + 1].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipDown === boardSize) {
                    if (!board[shipUp][y].isShip) {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (y - 1 >= 0) {
                                if (board[shipUp + i][y - 1].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                            if (y + 1 < boardSize) {
                                if (board[shipUp][y + 1].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                }
            } else {
                result = false;
            }
        } else if (direction === 'horizontal') {
            const shipLeft = y - 1;
            const shipRight = y + newShip.length;

            if (x >= 0 && x < boardSize && y >= 0 && y <= boardSize - newShip.length) {
                // check if ship placing location is free
                for (let i = 0; i < newShip.length; i++) {
                    if (board[x][y + i].isShip) {
                        result = false;
                        break;
                    }
                }

                if (shipLeft >= 0 && shipRight < boardSize) {
                    if (!board[x][shipLeft].isShip && !board[x][shipRight].isShip) {
                        for (let i = 0; i <= newShip.length + 1; i++) {
                            if (x - 1 >= 0) {
                                if (board[x - 1][shipLeft + i].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                            if (x + 1 < boardSize) {
                                if (board[x + 1][shipLeft + i].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipLeft === -1) {
                    if (!board[x][shipRight].isShip) {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (x - 1 >= 0) {
                                if (board[x - 1][i].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                            if (x + 1 < boardSize) {
                                if (board[x + 1][i].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipRight === boardSize) {
                    if (!board[x][shipLeft].isShip) {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (x - 1 >= 0) {
                                if (board[x - 1][shipLeft + i].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                            if (x + 1 < boardSize) {
                                if (board[x + 1][shipLeft + i].isShip) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
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
            board[x + i][y].direction = 'vertical';
        }
    };

    const placeShipHorizontal = (x, y, newShip) => {
        for (let i = 0; i < newShip.length; i++) {
            board[x][y + i].isShip = true;
            board[x][y + i].ship = newShip;
            board[x][y + i].shipIndex = i;
            board[x][y + i].direction = 'horizontal';
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

    const shipSunk = (x, y) => {
        const index = board[x][y].shipIndex;
        const shipLength = board[x][y].ship.length;

        if (board[x][y].direction === 'vertical') {
            const shipUp = x - index - 1;
            const shipDown = x + shipLength - index;
            if (shipUp >= 0 && shipDown < boardSize) {
                board[shipUp][y].isHit = true;
                board[shipDown][y].isHit = true;
                for (let i = 0; i <= shipLength + 1; i++) {
                    if (y - 1 >= 0) {
                        board[shipUp + i][y - 1].isHit = true;
                    }
                    if (y + 1 < boardSize) {
                        board[shipUp + i][y + 1].isHit = true;
                    }
                }
            }
            if (shipUp < 0) {
                board[shipDown][y].isHit = true;
                for (let i = 0; i < shipLength + 1; i++) {
                    if (y - 1 >= 0) {
                        board[i][y - 1].isHit = true;
                    }
                    if (y + 1 < boardSize) {
                        board[i][y + 1].isHit = true;
                    }
                }
            }
            if (shipDown >= boardSize) {
                board[shipUp][y].isHit = true;
                for (let i = 0; i < shipLength + 1; i++) {
                    if (y - 1 >= 0) {
                        board[shipUp + i][y - 1].isHit = true;
                    }
                    if (y + 1 < boardSize) {
                        board[shipUp + i][y + 1].isHit = true;
                    }
                }
            }
        }

        if (board[x][y].direction === 'horizontal') {
            const shipLeft = y - index - 1;
            const shipRight = y + shipLength - index;
            if (shipLeft >= 0 && shipRight < boardSize) {
                board[x][shipLeft].isHit = true;
                board[x][shipRight].isHit = true;
                for (let i = 0; i <= shipLength + 1; i++) {
                    if (x - 1 >= 0) {
                        board[x - 1][shipLeft + i].isHit = true;
                    }
                    if (x + 1 < boardSize) {
                        board[x + 1][shipLeft + i].isHit = true;
                    }
                }
            }
            if (shipLeft < 0) {
                board[x][shipRight].isHit = true;
                for (let i = 0; i < shipLength + 1; i++) {
                    if (x - 1 >= 0) {
                        board[x - 1][i].isHit = true;
                    }
                    if (x + 1 < boardSize) {
                        board[x + 1][i].isHit = true;
                    }
                }
            }
            if (shipRight >= boardSize) {
                board[x][shipLeft].isHit = true;
                for (let i = 0; i < shipLength + 1; i++) {
                    if (x - 1 >= 0) {
                        board[x - 1][shipLeft + i].isHit = true;
                    }
                    if (x + 1 < boardSize) {
                        board[x + 1][shipLeft + i].isHit = true;
                    }
                }
            }
        }
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
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        return { x, y };
    };

    const randomPlaceShip = (newShip) => {
        const direction = randomDirection();
        let placeShip = false;

        while (!placeShip) {
            const { x, y } = randomCoordinate();
            if (canPlaceShip(x, y, direction, newShip)) {
                if (direction === 'vertical') {
                    placeShipVertical(x, y, newShip);
                } else if (direction === 'horizontal') {
                    placeShipHorizontal(x, y, newShip);
                }
                placeShip = true;
            }
        }
    };

    return {
        get board() {
            return board;
        },
        resetBoard,
        canPlaceShip,
        placeShipVertical,
        placeShipHorizontal,
        receiveAttack,
        shipSunk,
        isAllShipsSunk,
        randomPlaceShip
    };
};

export default Gameboard;
