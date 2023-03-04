import ui from './ui';
import game from './game';

const controller = (() => {
    const initPage = () => {
        ui.renderPage();
    };

    const computerEvent = () => {
        const playerCell = document.querySelectorAll('.cell-player-board');
        const coordinates = game.computerRandomAttack();

        playerCell.forEach((cell) => {
            if (
                Number(cell.getAttribute('data-x')) === coordinates.x &&
                Number(cell.getAttribute('data-y')) === coordinates.y
            ) {
                if (game.isCoordinateFree('player', coordinates.x, coordinates.y)) {
                    if (game.isShipHit('player', coordinates.x, coordinates.y)) {
                        cell.classList.add('hit');
                        computerEvent();
                    } else {
                        cell.classList.add('miss');
                        setTimeout(game.changeTurn(), 500);
                    }
                }
            }
        });
    };

    const playerEvent = () => {
        const computerCell = document.querySelectorAll('.cell-computer-board');
        computerCell.forEach((cell) => {
            cell.addEventListener('click', (event) => {
                if (game.isPlayerTurn()) {
                    const x = event.target.getAttribute('data-x');
                    const y = event.target.getAttribute('data-y');
                    if (game.isCoordinateFree('computer', x, y)) {
                        if (game.isShipHit('computer', x, y)) {
                            event.target.classList.add('hit');
                        } else {
                            event.target.classList.add('miss');
                            game.changeTurn();
                            computerEvent();
                        }
                    }
                }
            });
        });
    };

    return { initPage, playerEvent };
})();

export default controller;
