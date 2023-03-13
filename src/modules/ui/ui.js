import elementsDOM from './elementsDOM';

const ui = (() => {
    const showWinnerInformaion = (winner) => {
        const winnerInfo = document.getElementById('winner-info');
        winnerInfo.textContent = winner;
    };

    const toggleCursorStatus = () => {
        const computerBoard = document.getElementById('computer-board');
        computerBoard.classList.toggle('board-inactive');
    };

    const toggleRestartButton = () => {
        const restartButton = document.getElementById('btn-restart');
        restartButton.classList.toggle('btn-restart-inactive');
    };

    const toggleShipDirection = () => {
        const shipDragContainer = document.querySelector('.ship-drag-container');

        if (shipDragContainer.classList.contains('drag-container-horizontal')) {
            shipDragContainer.classList.remove('drag-container-horizontal');
            shipDragContainer.classList.add('drag-container-vertical');
            for (let i = 0; i < shipDragContainer.childNodes.length; i++) {
                shipDragContainer.children[i].classList.remove('ship-horizontal');
                shipDragContainer.children[i].classList.add('ship-vertical');
            }
        } else if (shipDragContainer.classList.contains('drag-container-vertical')) {
            shipDragContainer.classList.remove('drag-container-vertical');
            shipDragContainer.classList.add('drag-container-horizontal');
            for (let i = 0; i < shipDragContainer.childNodes.length; i++) {
                shipDragContainer.children[i].classList.remove('ship-vertical');
                shipDragContainer.children[i].classList.add('ship-horizontal');
            }
        }
    };

    const addShipToBoard = (boardSelector, board) => {
        const cellPlayerBoard = document.querySelectorAll('.cell-player-board');
        const cellComputerBoard = document.querySelectorAll('.cell-computer-board');
        const cellInitBoard = document.querySelectorAll('.cell-init-board');
        let cell = '';

        if (boardSelector === 'player') {
            cell = cellPlayerBoard;
        } else if (boardSelector === 'computer') {
            cell = cellComputerBoard;
        } else if (boardSelector === 'init') {
            cell = cellInitBoard;
        }

        board.forEach((row) => {
            row.forEach((column) => {
                if (column.isShip) {
                    for (let i = 0; i < cell.length; i++) {
                        if (
                            Number(cell[i].getAttribute('data-x')) === column.x &&
                            Number(cell[i].getAttribute('data-y')) === column.y
                        ) {
                            cell[i].classList.add('ship');
                            break;
                        }
                    }
                }
            });
        });
    };

    const markShipAreaToHit = (boardSelector, board) => {
        const cellPlayerBoard = document.querySelectorAll('.cell-player-board');
        const cellComputerBoard = document.querySelectorAll('.cell-computer-board');
        let cell = '';

        if (boardSelector === 'player') {
            cell = cellPlayerBoard;
        } else if (boardSelector === 'computer') {
            cell = cellComputerBoard;
        }
        board.forEach((row) => {
            row.forEach((column) => {
                if (!column.isShip && column.isHit) {
                    for (let i = 0; i < cell.length; i++) {
                        if (
                            Number(cell[i].getAttribute('data-x')) === column.x &&
                            Number(cell[i].getAttribute('data-y')) === column.y
                        ) {
                            cell[i].classList.add('miss');
                            break;
                        }
                    }
                }
            });
        });
    };

    const changeTurnInformation = (turn) => {
        const turnInfo = document.getElementById('turn-info');
        turnInfo.textContent = '';
        if (turn === 'player') {
            turnInfo.textContent = 'Your Turn';
        } else if (turn === 'computer') {
            turnInfo.textContent = 'Computer Turn';
        } else if (turn === 'over') {
            turnInfo.textContent = 'Game Over';
        }
    };

    const setGameoverUI = (winner) => {
        changeTurnInformation('over');
        if (winner === 'player') {
            showWinnerInformaion('You won!');
        } else {
            showWinnerInformaion('Computer won!');
        }
        toggleRestartButton();
        toggleCursorStatus();
    };

    const resetShipContainer = () => {
        const shipContainer = document.querySelector('.ship-drag-container');
        shipContainer.textContent = '';

        if (shipContainer.classList.contains('drag-container-vertical')) {
            shipContainer.classList.remove('drag-container-vertical');
            shipContainer.classList.add('drag-container-horizontal');
        }

        shipContainer.append(
            elementsDOM.createShip('carrier', 5),
            elementsDOM.createShip('battleship', 4),
            elementsDOM.createShip('destroyer', 3),
            elementsDOM.createShip('submarine', 3),
            elementsDOM.createShip('patrol', 2)
        );
    };

    const resetInitBoard = () => {
        const initBoardContainer = document.getElementById('init-board-container');
        initBoardContainer.removeChild(initBoardContainer.firstChild);

        initBoardContainer.insertBefore(
            elementsDOM.createBoard('init-board', 10),
            initBoardContainer.firstChild
        );
    };

    const emptyShipDragContainer = () => {
        const shipDragContainer = document.querySelector('.ship-drag-container');
        shipDragContainer.textContent = '';
    };

    const clearBoard = (board) => {
        if (board === 'init') {
            resetInitBoard();
            resetShipContainer();
        }
        if (board === 'game') {
            const cellPlayerBoard = document.querySelectorAll('.cell-player-board');
            const cellComputerBoard = document.querySelectorAll('.cell-computer-board');

            cellPlayerBoard.forEach((cell) => {
                if (cell.classList.contains('ship')) {
                    cell.classList.remove('ship');
                }
                if (cell.classList.contains('hit')) {
                    cell.classList.remove('hit');
                }
                if (cell.classList.contains('miss')) {
                    cell.classList.remove('miss');
                }
            });

            cellComputerBoard.forEach((cell) => {
                if (cell.classList.contains('ship')) {
                    cell.classList.remove('ship');
                }
                if (cell.classList.contains('hit')) {
                    cell.classList.remove('hit');
                }
                if (cell.classList.contains('miss')) {
                    cell.classList.remove('miss');
                }
            });
        }
    };

    const isAllShipDropped = () => {
        const shipDragContainer = document.querySelector('.ship-drag-container');

        if (shipDragContainer.childNodes.length === 0) {
            return true;
        }

        return false;
    };

    const toggleStartButtonStatus = (reason) => {
        const startButton = document.getElementById('btn-start');

        if (reason === 'game') {
            startButton.setAttribute('class', 'start-inactive');
        } else if (reason === 'init') {
            if (isAllShipDropped()) {
                startButton.classList.remove('start-inactive');
                startButton.classList.add('start-active');
            } else {
                startButton.classList.remove('start-active');
                startButton.classList.add('start-inactive');
            }
        }
    };

    const setNewGameUI = () => {
        toggleRestartButton();
        toggleCursorStatus();
        toggleStartButtonStatus('game');
        clearBoard('game');
        changeTurnInformation('player');
        showWinnerInformaion('');
    };

    const toggleUI = () => {
        const gameUI = document.querySelector('.content-game');
        const initUI = document.querySelector('.content-init');

        gameUI.classList.toggle('inactive');
        initUI.classList.toggle('inactive');
    };

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

    return {
        toggleUI,
        addShipToBoard,
        changeTurnInformation,
        setGameoverUI,
        clearBoard,
        setNewGameUI,
        markShipAreaToHit,
        toggleShipDirection,
        setShipLocationActive,
        removeShipLocationActive,
        canDropShip,
        isAllShipDropped,
        emptyShipDragContainer,
        toggleStartButtonStatus
    };
})();

export default ui;
