import github from '../../assets/images/github-logo.png';

const elementsDOM = (() => {
    const createHeader = () => {
        const header = document.createElement('header');

        const headerTitle = document.createElement('h1');
        headerTitle.textContent = 'BATTLESHIP';

        header.appendChild(headerTitle);

        return header;
    };

    const createBoard = (id, boardSize) => {
        const boardContainer = document.createElement('div');
        boardContainer.id = id;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const gridCell = document.createElement('div');
                gridCell.setAttribute('class', `cell-${id}`);
                gridCell.setAttribute('data-x', `${i}`);
                gridCell.setAttribute('data-y', `${j}`);
                boardContainer.appendChild(gridCell);
            }
        }

        return boardContainer;
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

    const createShip = (id, length) => {
        const ship = document.createElement('div');
        ship.setAttribute('id', `${id}`);
        ship.setAttribute('class', 'ship-container ship-horizontal');
        ship.setAttribute('draggable', true);
        ship.setAttribute('data-width', `${length}`);

        for (let i = 0; i < length; i++) {
            const shipCell = document.createElement('div');
            shipCell.setAttribute('class', `cell-ship`);
            ship.appendChild(shipCell);
        }

        return ship;
    };

    const createShipContainer = () => {
        const shipContainer = document.createElement('div');
        shipContainer.setAttribute('class', 'ship-drag-container');

        shipContainer.append(
            createShip('carrier', 5),
            createShip('battleship', 4),
            createShip('destroyer', 3),
            createShip('submarine', 3),
            createShip('patrol', 2)
        );

        return shipContainer;
    };

    const resetShipContainer = () => {
        const shipContainer = document.querySelector('.ship-drag-container');
        shipContainer.textContent = '';

        shipContainer.append(
            createShip('carrier', 5),
            createShip('battleship', 4),
            createShip('destroyer', 3),
            createShip('submarine', 3),
            createShip('patrol', 2)
        );
    };

    const createRotateButton = () => {
        const rotateButton = document.createElement('button');
        rotateButton.id = 'btn-rotate';
        rotateButton.textContent = 'Rotate';

        return rotateButton;
    };

    const createInitShipContainer = () => {
        const shipChoosingContainer = document.createElement('div');
        shipChoosingContainer.id = 'init-ship-container';

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

    const createInitBoardContainer = () => {
        const placingBoardContainer = document.createElement('div');
        placingBoardContainer.id = 'init-board-container';

        placingBoardContainer.append(createBoard('init-board', 10), createButtonContainer());

        return placingBoardContainer;
    };

    const resetInitBoard = () => {
        const initBoardContainer = document.getElementById('init-board-container');
        initBoardContainer.removeChild(initBoardContainer.firstChild);

        initBoardContainer.insertBefore(
            createBoard('init-board', 10),
            initBoardContainer.firstChild
        );
    };

    const createInitUI = () => {
        const content = document.createElement('div');
        content.classList.add('content-init');

        content.append(createInitShipContainer(), createInitBoardContainer());

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

    const createUI = () => {
        const body = document.querySelector('body');
        body.append(createHeader(), createMain(), createFooter());

        const gameUI = document.querySelector('.content-game');
        gameUI.classList.add('inactive');
    };

    return {
        createUI,
        resetShipContainer,
        resetInitBoard
    };
})();

export default elementsDOM;
