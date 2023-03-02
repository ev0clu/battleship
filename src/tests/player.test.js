import Player from '../modules/player';
import Gameboard from '../modules/gameboard';

describe('Player', () => {
    let player = {};
    const shipSize = 3;

    beforeEach(() => {
        player = Player();
    });

    // Player object tests
    test('Player factory shall be defined as object', () => {
        expect(typeof player).toBe('object');
    });

    // isMyTurn function tests
    test('Current turn shall be player turn as default', () => {
        expect(player.isMyTurn).toBeTruthy();
    });

    test('Current turn shall be computer turn', () => {
        player.changeTurn();
        expect(player.isMyTurn).toBeFalsy();
    });

    test('Current turn shall be player turn, after 2 turns', () => {
        player.changeTurn();
        expect(player.isMyTurn).toBeFalsy();
        player.changeTurn();
        expect(player.isMyTurn).toBeTruthy();
    });

    // randomAttack function tests
    test('randomAttack shall give valid coordinates', () => {
        const boardSize = 10;
        const gameboard = Gameboard();
        const coordinates = player.randomAttack(gameboard);
        expect(coordinates.x).toBeLessThanOrEqual(boardSize);
        expect(coordinates.y).toBeLessThanOrEqual(boardSize);
    });

    test('randomAttack shall not give coordinates which are already hit', () => {
        const boardSize = 10;
        const gameboard = Gameboard();
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                gameboard.board[i][j].isHit = true;
            }
        }

        gameboard.board[9][8].isHit = false;

        const coordinates = player.randomAttack(gameboard);
        expect(coordinates.x).toEqual(9);
        expect(coordinates.y).toEqual(8);
    });
});
