import github from '../assets/images/github-logo.png';

const ui = (() => {
    const createHeader = () => {
        const header = document.createElement('header');

        const headerTitle = document.createElement('h1');
        headerTitle.textContent = 'BATTLESHIP';

        header.appendChild(headerTitle);

        return header;
    };

    const createBoard = (id, boardSize) => {
        const gameBoardContainer = document.createElement('div');
        gameBoardContainer.id = id;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const gridCell = document.createElement('div');
                gridCell.setAttribute('class', `cell-${id}`);
                gridCell.setAttribute('data-x', `${i}`);
                gridCell.setAttribute('data-y', `${j}`);
                gameBoardContainer.appendChild(gridCell);
            }
        }

        return gameBoardContainer;
    };

    const showWinnerInformaion = (winner) => {
        const winnerInfo = document.getElementById('winner-info');
        winnerInfo.textContent = winner;

        return winnerInfo;
    };

    const createWinnerInformaion = () => {
        const winnerInfo = document.createElement('div');
        winnerInfo.id = 'winner-info';

        return winnerInfo;
    };

    const createTurnInformaion = () => {
        const turnInfo = document.createElement('div');
        turnInfo.id = 'turn-info';
        turnInfo.textContent = 'Your turn';

        return turnInfo;
    };

    const toggleCursorStatus = () => {
        const computerBoard = document.getElementById('computer-board');
        computerBoard.classList.toggle('board-inactive');
    };

    const toggleRestartButton = () => {
        const restartButton = document.getElementById('btn-restart');
        restartButton.classList.toggle('btn-restart-inactive');
    };

    const createRestartButton = () => {
        const restartButton = document.createElement('button');
        restartButton.id = 'btn-restart';
        restartButton.classList.add('btn-restart-inactive');
        restartButton.textContent = 'Restart';

        return restartButton;
    };

    const createMiddleContainer = () => {
        const middleContainer = document.createElement('div');
        middleContainer.id = 'middle-container';

        middleContainer.append(
            createWinnerInformaion(),
            createTurnInformaion(),
            createRestartButton()
        );

        return middleContainer;
    };

    const createGameUI = () => {
        const content = document.createElement('div');
        content.classList.add('content-game');

        content.append(
            createBoard('player-board', 10),
            createMiddleContainer(),
            createBoard('computer-board', 10)
        );

        return content;
    };

    const createShipContainer = () => {
        const shipContainer = document.createElement('div');
        shipContainer.id = 'ship-container';

        return shipContainer;
    };

    const createRotateButton = () => {
        const rotateButton = document.createElement('button');
        rotateButton.id = 'btn-rotate';
        rotateButton.textContent = 'Rotate';

        return rotateButton;
    };

    const createShipChoosingContainer = () => {
        const shipChoosingContainer = document.createElement('div');
        shipChoosingContainer.id = 'ship-choosing-container';

        shipChoosingContainer.append(createShipContainer(), createRotateButton());

        return shipChoosingContainer;
    };

    const createResetButton = () => {
        const resetButton = document.createElement('button');
        resetButton.id = 'btn-reset';
        resetButton.textContent = 'Reset';

        return resetButton;
    };

    const createRandomButton = () => {
        const randomButton = document.createElement('button');
        randomButton.id = 'btn-random';
        randomButton.textContent = 'Random';

        return randomButton;
    };

    const createStartButton = () => {
        const startButton = document.createElement('button');
        startButton.id = 'btn-start';
        startButton.textContent = 'Start';

        return startButton;
    };

    const createButtonContainer = () => {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'button-container';

        buttonContainer.append(createResetButton(), createRandomButton(), createStartButton());

        return buttonContainer;
    };

    const createShipPlacingBoardContainer = () => {
        const placingBoardContainer = document.createElement('div');
        placingBoardContainer.id = 'ship-container';

        placingBoardContainer.append(createBoard('init-board', 10), createButtonContainer());

        return placingBoardContainer;
    };

    const createInitUI = () => {
        const content = document.createElement('div');
        content.classList.add('content-init');

        content.append(createShipChoosingContainer(), createShipPlacingBoardContainer());

        return content;
    };

    const createMain = () => {
        const main = document.createElement('main');

        main.append(createGameUI(), createInitUI());

        return main;
    };

    const createFooterText = () => {
        const paragraph = document.createElement('p');
        const currentDate = new Date().getFullYear();
        paragraph.textContent = `Copyright © Laszlo Kis ${currentDate}`;

        return paragraph;
    };

    const createFooterRefLink = () => {
        const link = document.createElement('a');
        link.classList.add('reflink');
        link.href = 'https://github.com/ev0clu';
        link.target = '_blank';

        const image = document.createElement('img');
        image.classList.add('github-img');
        image.src = github;
        image.alt = 'Github logo';

        link.appendChild(image);

        return link;
    };

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.append(createFooterText(), createFooterRefLink());

        return footer;
    };

    const addShipToGameBoard = (boardSelector, board) => {
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

    const createInitPage = () => {
        const body = document.querySelector('body');
        body.append(createHeader(), createMain(), createFooter());

        const gameUI = document.querySelector('.content-game');
        gameUI.classList.add('inactive');
    };

    return {
        createInitPage,
        toggleUI,
        addShipToGameBoard,
        changeTurnInformation,
        setGameoverUI,
        clearBoard,
        setNewGameUI,
        markShipAreaToHit
    };
})();

export default ui;
