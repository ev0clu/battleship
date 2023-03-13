const dragdrop = (() => {
    let dragSrcEl = null;

    const setShipLocationActive = (parentNode, shipNode) => {
        const x = Number(parentNode.getAttribute('data-x'));
        const y = Number(parentNode.getAttribute('data-y'));
        const shipLength = Number(shipNode.getAttribute('data-width'));

        if (shipNode.classList.contains('ship-vertical')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x + i}"][data-y="${y}"]`
                );
                cell.classList.add('ship-active-vertical');
            }
        } else if (shipNode.classList.contains('ship-horizontal')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x}"][data-y="${y + i}"]`
                );
                cell.classList.add('ship-active-horizontal');
            }
        }
    };

    const removeShipLocationActive = (parentNode, shipNode) => {
        const x = Number(parentNode.getAttribute('data-x'));
        const y = Number(parentNode.getAttribute('data-y'));
        const shipLength = Number(shipNode.getAttribute('data-width'));

        if (parentNode.classList.contains('ship-active-vertical')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x + i}"][data-y="${y}"]`
                );
                cell.classList.remove('ship-active-vertical');
            }
        } else if (parentNode.classList.contains('ship-active-horizontal')) {
            for (let i = 0; i < shipLength; i++) {
                const cell = document.querySelector(
                    `.cell-init-board[data-x="${x}"][data-y="${y + i}"]`
                );
                cell.classList.remove('ship-active-horizontal');
            }
        }
    };

    const canDropShip = (parentNode, shipNode) => {
        const x = Number(parentNode.getAttribute('data-x'));
        const y = Number(parentNode.getAttribute('data-y'));
        const shipLength = Number(shipNode.getAttribute('data-width'));
        let direction = '';
        const boardSize = 10;

        if (shipNode.classList.contains('ship-horizontal')) {
            direction = 'horizontal';
        } else if (shipNode.classList.contains('ship-vertical')) {
            direction = 'vertical';
        }

        let result = true;
        if (direction === 'vertical') {
            const shipUp = x - 1;
            const shipDown = x + shipLength;

            if (x >= 0 && x <= boardSize - shipLength && y >= 0 && y < boardSize) {
                // check if ship placing location is free
                for (let i = 0; i < shipLength; i++) {
                    const cell = document.querySelector(
                        `.cell-init-board[data-x="${x + i}"][data-y="${y}"]`
                    );
                    if (
                        cell.classList.contains('ship-active-vertical') ||
                        cell.classList.contains('ship-active-horizontal')
                    ) {
                        result = false;
                        break;
                    }
                }

                if (shipUp >= 0 && shipDown < boardSize) {
                    const cellUp = document.querySelector(
                        `.cell-init-board[data-x="${shipUp}"][data-y="${y}"]`
                    );
                    const cellDown = document.querySelector(
                        `.cell-init-board[data-x="${shipDown}"][data-y="${y}"]`
                    );
                    if (
                        !cellUp.classList.contains('ship-active-vertical') &&
                        !cellDown.classList.contains('ship-active-vertical') &&
                        !cellUp.classList.contains('ship-active-horizontal') &&
                        !cellDown.classList.contains('ship-active-horizontal')
                    ) {
                        for (let i = 0; i <= shipLength + 1; i++) {
                            if (y - 1 >= 0) {
                                const cellLeftSweep = document.querySelector(
                                    `.cell-init-board[data-x="${shipUp + i}"][data-y="${y - 1}"]`
                                );
                                if (
                                    cellLeftSweep.classList.contains('ship-active-vertical') ||
                                    cellLeftSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                            if (y + 1 < boardSize) {
                                const cellRightSweep = document.querySelector(
                                    `.cell-init-board[data-x="${shipUp + i}"][data-y="${y + 1}"]`
                                );
                                if (
                                    cellRightSweep.classList.contains('ship-active-vertical') ||
                                    cellRightSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipUp === -1) {
                    const cellDown = document.querySelector(
                        `.cell-init-board[data-x="${shipDown}"][data-y="${y}"]`
                    );
                    if (
                        !cellDown.classList.contains('ship-active-vertical') &&
                        !cellDown.classList.contains('ship-active-horizontal')
                    ) {
                        for (let i = 0; i < shipLength + 1; i++) {
                            if (y - 1 >= 0) {
                                const cellLeftSweep = document.querySelector(
                                    `.cell-init-board[data-x="${i}"][data-y="${y - 1}"]`
                                );
                                if (
                                    cellLeftSweep.classList.contains('ship-active-vertical') ||
                                    cellLeftSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                            if (y + 1 < boardSize) {
                                const cellRightSweep = document.querySelector(
                                    `.cell-init-board[data-x="${i}"][data-y="${y + 1}"]`
                                );
                                if (
                                    cellRightSweep.classList.contains('ship-active-vertical') ||
                                    cellRightSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipDown === boardSize) {
                    const cellUp = document.querySelector(
                        `.cell-init-board[data-x="${shipUp}"][data-y="${y}"]`
                    );
                    if (
                        !cellUp.classList.contains('ship-active-vertical') &&
                        !cellUp.classList.contains('ship-active-horizontal')
                    ) {
                        for (let i = 0; i < shipLength + 1; i++) {
                            if (y - 1 >= 0) {
                                const cellLeftSweep = document.querySelector(
                                    `.cell-init-board[data-x="${shipUp + i}"][data-y="${y - 1}"]`
                                );
                                if (
                                    cellLeftSweep.classList.contains('ship-active-vertical') ||
                                    cellLeftSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                            if (y + 1 < boardSize) {
                                const cellRightSweep = document.querySelector(
                                    `.cell-init-board[data-x="${shipUp + i}"][data-y="${y + 1}"]`
                                );
                                if (
                                    cellRightSweep.classList.contains('ship-active-vertical') ||
                                    cellRightSweep.classList.contains('ship-active-horizontal')
                                ) {
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
            const shipRight = y + shipLength;

            if (x >= 0 && x < boardSize && y >= 0 && y <= boardSize - shipLength) {
                // check if ship placing location is free
                for (let i = 0; i < shipLength; i++) {
                    const cell = document.querySelector(
                        `.cell-init-board[data-x="${x}"][data-y="${y + i}"]`
                    );
                    if (
                        cell.classList.contains('ship-active-vertical') ||
                        cell.classList.contains('ship-active-horizontal')
                    ) {
                        result = false;
                        break;
                    }
                }

                if (shipLeft >= 0 && shipRight < boardSize) {
                    const cellLeft = document.querySelector(
                        `.cell-init-board[data-x="${x}"][data-y="${shipLeft}"]`
                    );
                    const cellRight = document.querySelector(
                        `.cell-init-board[data-x="${x}"][data-y="${shipRight}"]`
                    );
                    if (
                        !cellLeft.classList.contains('ship-active-vertical') &&
                        !cellRight.classList.contains('ship-active-vertical') &&
                        !cellLeft.classList.contains('ship-active-horizontal') &&
                        !cellRight.classList.contains('ship-active-horizontal')
                    ) {
                        for (let i = 0; i <= shipLength + 1; i++) {
                            if (x - 1 >= 0) {
                                const cellUpSweep = document.querySelector(
                                    `.cell-init-board[data-x="${x - 1}"][data-y="${shipLeft + i}"]`
                                );
                                if (
                                    cellUpSweep.classList.contains('ship-active-vertical') ||
                                    cellUpSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                            if (x + 1 < boardSize) {
                                const cellDownSweep = document.querySelector(
                                    `.cell-init-board[data-x="${x + 1}"][data-y="${shipLeft + i}"]`
                                );
                                if (
                                    cellDownSweep.classList.contains('ship-active-vertical') ||
                                    cellDownSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipLeft === -1) {
                    const cellRight = document.querySelector(
                        `.cell-init-board[data-x="${x}"][data-y="${shipRight}"]`
                    );
                    if (
                        !cellRight.classList.contains('ship-active-vertical') &&
                        !cellRight.classList.contains('ship-active-horizontal')
                    ) {
                        for (let i = 0; i < shipLength + 1; i++) {
                            if (x - 1 >= 0) {
                                const cellUpSweep = document.querySelector(
                                    `.cell-init-board[data-x="${x - 1}"][data-y="${i}"]`
                                );
                                if (
                                    cellUpSweep.classList.contains('ship-active-vertical') ||
                                    cellUpSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                            if (x + 1 < boardSize) {
                                const cellDownSweep = document.querySelector(
                                    `.cell-init-board[data-x="${x + 1}"][data-y="${i}"]`
                                );
                                if (
                                    cellDownSweep.classList.contains('ship-active-vertical') ||
                                    cellDownSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        result = false;
                    }
                } else if (shipRight === boardSize) {
                    const cellLeft = document.querySelector(
                        `.cell-init-board[data-x="${x}"][data-y="${shipLeft}"]`
                    );
                    if (
                        !cellLeft.classList.contains('ship-active-vertical') &&
                        !cellLeft.classList.contains('ship-active-horizontal')
                    ) {
                        for (let i = 0; i < shipLength + 1; i++) {
                            if (x - 1 >= 0) {
                                const cellUpSweep = document.querySelector(
                                    `.cell-init-board[data-x="${x - 1}"][data-y="${shipLeft + i}"]`
                                );
                                if (
                                    cellUpSweep.classList.contains('ship-active-vertical') ||
                                    cellUpSweep.classList.contains('ship-active-horizontal')
                                ) {
                                    result = false;
                                    break;
                                }
                            }
                            if (x + 1 < boardSize) {
                                const cellDownSweep = document.querySelector(
                                    `.cell-init-board[data-x="${x + 1}"][data-y="${shipLeft + i}"]`
                                );
                                if (
                                    cellDownSweep.classList.contains('ship-active-vertical') ||
                                    cellDownSweep.classList.contains('ship-active-horizontal')
                                ) {
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
            const shipID = e.dataTransfer.getData('text/plain');
            const shipNode = document.getElementById(`${shipID}`);

            if (canDropShip(this, shipNode)) {
                this.appendChild(shipNode);
                setShipLocationActive(this, shipNode);
            }
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
