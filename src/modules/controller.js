import game from './game';
import elementsDOM from './ui/elementsDOM';
import ui from './ui/ui';
import dragdrop from './ui/dragdrop';

const controller = (() => {
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
                        if (game.isShipSunk('player', coordinates.x, coordinates.y)) {
                            ui.markShipAreaToHit('player', game.getGameBoard('player'));
                        }

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
                            if (game.isShipSunk('computer', x, y)) {
                                ui.markShipAreaToHit('computer', game.getGameBoard('computer'));
                            }

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

    const rotateButtonEventListener = () => {
        const rotateButton = document.getElementById('btn-rotate');
        rotateButton.addEventListener('click', () => {
            ui.toggleShipDirection();
        });
    };

    const resetButtonEventListener = () => {
        const resetButton = document.getElementById('btn-reset');
        resetButton.addEventListener('click', () => {
            ui.clearBoard('init');
            dragdrop.handleDragDropEventListener();
            //game.resetGameboards();
        });
    };

    const randomButtonEventListener = () => {
        const randomButton = document.getElementById('btn-random');
        randomButton.addEventListener('click', () => {
            ui.clearBoard('init');
            game.resetGameboards();
            game.generateShipRandomCoordinates('player');
            ui.addShipToBoard('init', game.getGameBoard('player'));
        });
    };

    const startButtonEventListener = () => {
        const startButton = document.getElementById('btn-start');
        startButton.addEventListener('click', () => {
            ui.toggleUI();
            game.generateShipRandomCoordinates('computer');
            ui.addShipToBoard('player', game.getGameBoard('player'));
            ui.addShipToBoard('computer', game.getGameBoard('computer'));
            ui.clearBoard('init');
        });
    };

    const restartButtonEventListener = () => {
        const restartButton = document.getElementById('btn-restart');
        restartButton.addEventListener('click', () => {
            ui.toggleUI();
            ui.setNewGameUI();
            ui.clearBoard('game');
            game.resetGameboards();
        });
    };

    const renderDOM = () => {
        elementsDOM.createUI();
        rotateButtonEventListener();
        resetButtonEventListener();
        randomButtonEventListener();
        startButtonEventListener();
        restartButtonEventListener();
        playerEvent();
        dragdrop.handleDragDropEventListener();
    };

    return { renderDOM };
})();

export default controller;
