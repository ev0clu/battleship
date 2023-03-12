const dragdrop = (() => {
    let dragSrcEl = null;

    const setShipLocationActive = (parentCell, shipCell) => {
        const x = Number(parentCell.getAttribute('data-x'));
        const y = Number(parentCell.getAttribute('data-y'));
        const shipLength = shipCell.getAttribute('data-width');

        if (shipCell.classList.contains('ship-vertical')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x + i}"][data-y="${y}"]`
                );
                cell.classList.add('ship-active-vertical');
            }
        } else if (shipCell.classList.contains('ship-horizontal')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x}"][data-y="${y + i}"]`
                );
                cell.classList.add('ship-active-horizontal');
            }
        }
    };

    const removeShipLocationActive = (parentCell, shipCell) => {
        const x = Number(parentCell.getAttribute('data-x'));
        const y = Number(parentCell.getAttribute('data-y'));
        const shipLength = shipCell.getAttribute('data-width');

        if (parentCell.classList.contains('ship-active-vertical')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x + i}"][data-y="${y}"]`
                );
                cell.classList.remove('ship-active-vertical');
            }
        } else if (parentCell.classList.contains('ship-active-horizontal')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x}"][data-y="${y + i}"]`
                );
                cell.classList.remove('ship-active-horizontal');
            }
        }
    };

    const toggleShipAreaReserved = (x, y) => {
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

    const canDropShip = (x, y, direction, newShip) => {
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
                                if (board[shipUp + i][y + 1].isShip) {
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

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        if (!this.parentNode.classList.contains('ship-drag-container')) {
            removeShipLocationActive(this.parentNode, this);
        }
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.id);
    }

    function handleDragEnd() {
        this.style.opacity = '1';
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragEnter() {
        this.classList.add('target-cell');
    }

    function handleDragLeave() {
        this.classList.remove('target-cell');
    }

    function handleDrop(e) {
        e.stopPropagation(); // stops the browser from redirecting.

        if (dragSrcEl !== this) {
            this.classList.remove('target-cell');
            const targetID = e.dataTransfer.getData('text/plain');
            const target = document.getElementById(`${targetID}`);
            this.appendChild(target);
            setShipLocationActive(this, target);
        }
        return false;
    }

    const handleDragDropEventListener = () => {
        const shipContainer = document.querySelectorAll('.ship-container');
        shipContainer.forEach((ship) => {
            ship.addEventListener('dragstart', handleDragStart);
            ship.addEventListener('dragend', handleDragEnd);
        });
        const cellInitBoard = document.querySelectorAll('.cell-init-board');
        cellInitBoard.forEach((cell) => {
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('dragenter', handleDragEnter);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('drop', handleDrop);
        });
    };

    const handleDragResetEventListener = () => {
        const resetButton = document.getElementById('btn-reset');

        resetButton.addEventListener('click', () => {
            document.location.reload();
        });
    };

    return { handleDragDropEventListener };
})();

export default dragdrop;
