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
        const shipContainer = document.querySelectorAll('.ship-container');

        shipDragContainer.classList.toggle('drag-container-toggle');

        shipContainer.forEach((element) => {
            element.classList.toggle('ship-container-toggle');
        });
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

    const clearBoard = (board) => {
        if (board === 'init') {
            const cellInitBoard = document.querySelectorAll('.cell-init-board');

            cellInitBoard.forEach((cell) => {
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

    const setNewGameUI = () => {
        toggleRestartButton();
        toggleCursorStatus();
        clearBoard();
        changeTurnInformation('player');
        showWinnerInformaion('');
    };

    const toggleUI = () => {
        const gameUI = document.querySelector('.content-game');
        const initUI = document.querySelector('.content-init');

        gameUI.classList.toggle('inactive');
        initUI.classList.toggle('inactive');
    };

    return {
        toggleUI,
        addShipToBoard,
        changeTurnInformation,
        setGameoverUI,
        clearBoard,
        setNewGameUI,
        markShipAreaToHit,
        toggleShipDirection
    };
})();

export default ui;
