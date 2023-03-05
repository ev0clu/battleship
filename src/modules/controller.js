import ui from './ui';
import game from './game';

const controller = (() => {
    const restartEvent = () => {
        const restartButton = document.getElementById('btn-restart');
        restartButton.addEventListener('click', () => {
            ui.setNewGameUI();
            game.restartGame();
            game.randomShipPlacing();
        });
    };

    const initPage = () => {
        ui.renderPage();
        restartEvent();
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
                        if (game.isGameOver()) {
                            ui.setGameoverUI('computer');
                        }
                        computerEvent();
                    } else {
                        cell.classList.add('miss');
                        game.changeTurn();
                        ui.changeTurnInformation('player');
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
                    const x = Number(event.target.getAttribute('data-x'));
                    const y = Number(event.target.getAttribute('data-y'));
                    if (game.isCoordinateFree('computer', x, y)) {
                        if (game.isShipHit('computer', x, y)) {
                            event.target.classList.add('hit');
                            game.isShipSunk('computer', x, y);

                            if (game.isGameOver()) {
                                ui.setGameoverUI('player');
                            }
                        } else {
                            event.target.classList.add('miss');
                            game.changeTurn();
                            ui.changeTurnInformation('computer');
                            const promise = new Promise((resolve) => {
                                setTimeout(resolve, 500);
                            });
                            promise.then(() => {
                                computerEvent();
                            });
                        }
                    }
                }
            });
        });
    };

    return { initPage, playerEvent };
})();

export default controller;
