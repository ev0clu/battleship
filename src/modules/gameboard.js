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
                // check ship location
                for (let i = 0; i < newShip.length; i++) {
                    if (board[x + i][y].isShip) {
                        result = false;
                        break;
                    }
                }
                //  ________
                // |X?      |
                // |X?      |
                // |??      |
                // |        |
                //  ¨¨¨¨¨¨¨¨
                if (x === 0 && y === 0) {
                    if (board[x + newShip.length][y].isShip) {
                        result = false;
                    } else {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x + i][y + 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // | ?X?    |
                // | ?X?    |
                // | ???    |
                // |        |
                //  ¨¨¨¨¨¨¨¨
                if (x === 0 && y > 0 && y < 9) {
                    if (board[x + newShip.length][y].isShip) {
                        result = false;
                    } else {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x + i][y - 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x + i][y + 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // |      ?X|
                // |      ?X|
                // |      ??|
                // |        |
                //  ¨¨¨¨¨¨¨¨
                if (x === 0 && y === 9) {
                    if (board[x + newShip.length][y].isShip) {
                        result = false;
                    } else {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x + i][y - 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // |??      |
                // |X?      |
                // |X?      |
                // |??      |
                //  ¨¨¨¨¨¨¨¨
                if (x > 0 && x < boardSize - newShip.length && y === 0) {
                    if (board[x - 1][y].isShip || board[x + newShip.length][y].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x + i][y + 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // | ???    |
                // | ?X?    |
                // | ?X?    |
                // | ???    |
                //  ¨¨¨¨¨¨¨¨
                if (x > 0 && x < boardSize - newShip.length && y > 0 && y < 9) {
                    if (board[x - 1][y].isShip || board[x + newShip.length][y].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x + i][y - 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x + i][y + 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |      ??|
                // |      ?X|
                // |      ?X|
                // |      ??|
                //  ¨¨¨¨¨¨¨¨
                if (x > 0 && x < boardSize - newShip.length && y === 9) {
                    if (board[x - 1][y].isShip || board[x + newShip.length][y].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x + i][y - 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |        |
                // |??      |
                // |X?      |
                // |X?      |
                //  ¨¨¨¨¨¨¨¨
                if (x === boardSize - newShip.length && y === 0) {
                    if (board[x - 1][y].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x + i][y + 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |        |
                // |   ???  |
                // |   ?X?  |
                // |   ?X?  |
                //  ¨¨¨¨¨¨¨¨
                if (x === boardSize - newShip.length && y > 0 && y < 9) {
                    if (board[x - 1][y].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x + i][y - 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x + i][y + 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |        |
                // |      ??|
                // |      ?X|
                // |      ?X|
                //  ¨¨¨¨¨¨¨¨
                if (x === boardSize - newShip.length && y === 9) {
                    if (board[x - 1][y].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x + i][y - 1].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
            } else {
                result = false;
            }
        } else if (direction === 'horizontal') {
            if (y <= boardSize - newShip.length) {
                // check if ship placing location is free
                for (let i = 0; i < newShip.length; i++) {
                    if (board[x][y + i].isShip) {
                        result = false;
                        break;
                    }
                }
                //  ________
                // |XX?     |
                // |???     |
                // |        |
                //  ¨¨¨¨¨¨¨¨
                if (x === 0 && y === 0) {
                    if (board[x][y + newShip.length].isShip) {
                        result = false;
                    } else {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x + 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // |?XX?    |
                // |????    |
                // |        |
                //  ¨¨¨¨¨¨¨¨
                if (x === 0 && y > 0 && y < boardSize - newShip.length) {
                    if (board[x][y - 1].isShip || board[x][y + newShip.length].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x + 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // |     ?XX|
                // |     ???|
                // |        |
                //  ¨¨¨¨¨¨¨¨
                if (x === 0 && y === boardSize - newShip.length) {
                    if (board[x][y - 1].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x + 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // |???     |
                // |XX?     |
                // |???     |
                //  ¨¨¨¨¨¨¨¨
                if (x > 0 && x < 9 && y === 0) {
                    if (board[x][y + newShip.length].isShip) {
                        result = false;
                    } else {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x - 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x + 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }
                //  ________
                // | ????   |
                // | ?XX?   |
                // | ????   |
                //  ¨¨¨¨¨¨¨¨
                if (x > 0 && x < 9 && y > 0 && y < boardSize - newShip.length) {
                    if (board[x][y - 1].isShip || board[x][y + newShip.length].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x - 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x + 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |     ???|
                // |     ?XX|
                // |     ???|
                //  ¨¨¨¨¨¨¨¨
                if (x > 0 && x < 9 && y === boardSize - newShip.length) {
                    if (board[x][y - 1].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x - 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x + 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |        |
                // |???     |
                // |XX?     |
                //  ¨¨¨¨¨¨¨¨
                if (x === 9 && y === 0) {
                    if (board[x][y + newShip.length].isShip) {
                        result = false;
                    } else {
                        for (let i = 0; i < newShip.length + 1; i++) {
                            if (board[x - 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |        |
                // |  ????  |
                // |  ?XX?  |
                //  ¨¨¨¨¨¨¨¨
                if (x === 9 && y > 0 && y < boardSize - newShip.length) {
                    if (board[x][y - 1].isShip || board[x][y + newShip.length].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length + 1; i++) {
                            if (board[x - 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
                    }
                }

                //  ________
                // |        |
                // |     ???|
                // |     ?XX|
                //  ¨¨¨¨¨¨¨¨
                if (x === 9 && y === boardSize - newShip.length) {
                    if (board[x][y - 1].isShip) {
                        result = false;
                    } else {
                        for (let i = -1; i < newShip.length; i++) {
                            if (board[x - 1][y + i].isShip) {
                                result = false;
                                break;
                            }
                        }
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
        canPlaceShip,
        placeShipVertical,
        placeShipHorizontal,
        receiveAttack,
        isAllShipsSunk,
        randomPlaceShip
    };
};

export default Gameboard;
