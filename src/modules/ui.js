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
                gridCell.setAttribute('class', 'cell');
                gridCell.setAttribute('data-x', `${i}`);
                gridCell.setAttribute('data-y', `${j}`);
                gameBoardContainer.appendChild(gridCell);
            }
        }

        return gameBoardContainer;
    };

    const createTurnInformaion = () => {
        const turnInfo = document.createElement('div');
        turnInfo.id = 'turn-info';
        turnInfo.textContent = 'Your turn';

        return turnInfo;
    };

    const createMiddleContainer = () => {
        const middleContainer = document.createElement('div');
        middleContainer.id = 'middle-container';

        middleContainer.appendChild(createTurnInformaion());

        return middleContainer;
    };

    const createMain = () => {
        const main = document.createElement('main');

        const content = document.createElement('div');
        content.id = 'content';

        content.append(
            createBoard('player-board', 10),
            createMiddleContainer(),
            createBoard('computer-board', 10)
        );
        main.appendChild(content);

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

    const createHtml = () => {
        const body = document.querySelector('body');
        body.append(createHeader(), createMain(), createFooter());
    };

    return { createHtml };
})();

export default ui;
