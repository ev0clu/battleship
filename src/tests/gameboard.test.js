import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Gameboard', () => {
    let gameboard = {};

    beforeEach(() => {
        gameboard = Gameboard();
    });

    // Gameboard tests
    test('Gameboard factory shall be defined as object', () => {
        expect(typeof gameboard).toBe('object');
    });

    test('Gameboard shall be 10 rows', () => {
        expect(gameboard.board).toHaveLength(10);
    });

    test('Gameboard shall be 10 columns', () => {
        for (let i = 0; i < 10; i++) {
            expect(gameboard.board[i]).toHaveLength(10);
        }
    });

    test('Gameboard cells shall be initialized with objects which has default value isShip: false', () => {
        const boardSize = 10;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                expect(gameboard.board[i][j].isShip).toEqual(false);
                expect(gameboard.board[i][j].ship).toEqual({});
                expect(gameboard.board[i][j].shipIndex).toEqual(null);
                expect(gameboard.board[i][j].isHit).toEqual(false);
                expect(gameboard.board[i][j].x).toEqual(i);
                expect(gameboard.board[i][j].y).toEqual(j);
            }
        }
    });

    test('Gameboard cells shall be return the x,y coordinates correctly', () => {
        expect(gameboard.board[0][5].x).toEqual(0);
        expect(gameboard.board[3][9].y).toEqual(9);

        expect(gameboard.board[7][0].x).toEqual(7);
        expect(gameboard.board[6][2].y).toEqual(2);

        expect(gameboard.board[1][9].x).toEqual(1);
        expect(gameboard.board[9][5].y).toEqual(5);
    });

    // canPlaceShip function tests
    // Vertical
    test('Vertical Ship with length 2 shall be put at x = 8, y = 0.', () => {
        const x = 8;
        const y = 0;
        const direction = 'vertical';
        const ship = Ship(2);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeTruthy();
    });

    test('Vertical Ship with length 2 shall not be put at x = 9, y = 0.', () => {
        const x = 9;
        const y = 0;
        const direction = 'vertical';
        const ship = Ship(2);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeFalsy();
    });

    test('Vertical Ship with length 5 shall be put at x = 5, y = 0.', () => {
        const x = 5;
        const y = 0;
        const direction = 'vertical';
        const ship = Ship(5);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeTruthy();
    });

    test('Vertical Ship with length 5 shall not be put at x = 6, y = 0.', () => {
        const x = 6;
        const y = 0;
        const direction = 'vertical';
        const ship = Ship(5);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeFalsy();
    });

    test('Vertical Ship with length 5 shall not be put at any location, if a ship is already took that place', () => {
        const x = 0;
        const y = 0;
        const direction = 'vertical';
        const ship = Ship(5);
        for (let i = x; i < 6; i++) {
            gameboard.board[i][y].isShip = true;
            expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeFalsy();
        }
    });

    // canPlaceShip function tests
    // Horizontal
    test('Horizontal Ship with length 2 shall be put at x = 9, y = 8.', () => {
        const x = 9;
        const y = 8;
        const direction = 'horizontal';
        const ship = Ship(2);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeTruthy();
    });

    test('Horizontal Ship with length 2 shall not be put at x = 9, y = 9.', () => {
        const x = 9;
        const y = 9;
        const direction = 'horizontal';
        const ship = Ship(2);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeFalsy();
    });

    test('Horizontal Ship with length 5 shall be put at x = 5, y = 5.', () => {
        const x = 5;
        const y = 5;
        const direction = 'horizontal';
        const ship = Ship(5);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeTruthy();
    });

    test('Horizontal Ship with length 5 shall not be put at x = 5, y = 6.', () => {
        const x = 5;
        const y = 6;
        const direction = 'horizontal';
        const ship = Ship(5);

        expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeFalsy();
    });

    test('Horizontal Ship with length 5 shall not be put at any location, if a ship is already took that place', () => {
        const x = 0;
        const y = 0;
        const direction = 'horizontal';
        const ship = Ship(5);
        for (let i = x; i < ship.length; i++) {
            gameboard.board[i][y].isShip = true;
            expect(gameboard.canPlaceShip(x, y, direction, ship)).toBeFalsy();
        }
    });

    // placeShipVertical function tests
    test('Vertical Ship with length 3 shall be put at x = 0, y = 0. The coordinates which belong to it shall be true and coordinates which out of it shall be false', () => {
        const x = 0;
        const y = 0;
        const ship = Ship(3);
        gameboard.placeShipVertical(x, y, ship);
        for (let i = 0; i < ship.length; i++) {
            expect(gameboard.board[x + i][y]).toBeTruthy();
        }
        for (let i = ship.length; i < gameboard.length; i++) {
            expect(gameboard.board[i][y]).toBeFalsy();
        }
    });

    test('Vertical Ship with length 5 shall be put at x = 4, y = 9. The coordinates which belong to it shall be true and coordinates which out of it shall be false', () => {
        const x = 4; // last row
        const y = 9;
        const ship = Ship(5);
        gameboard.placeShipVertical(x, y, ship);
        for (let i = 0; i < ship.length; i++) {
            expect(gameboard.board[x + i][y]).toBeTruthy();
        }
        for (let i = ship.length; i < gameboard.length; i++) {
            expect(gameboard.board[i][y]).toBeFalsy();
        }
    });

    // placeShipHorizontal function tests
    test('Horizontal Ship with length 3 shall be put at x = 0, y = 0. The coordinates which belong to it shall be true and coordinates which out of it shall be false', () => {
        const x = 0;
        const y = 0;
        const ship = Ship(3);
        gameboard.placeShipHorizontal(x, y, ship);
        for (let i = 0; i < ship.length; i++) {
            expect(gameboard.board[x][y + i]).toBeTruthy();
        }
        for (let i = ship.length; i < gameboard.length; i++) {
            expect(gameboard.board[x][i]).toBeFalsy();
        }
    });

    test('Horizontal Ship with length 5 shall be put at x = 9, y = 4. The coordinates which belong to it shall be true and coordinates which out of it shall be false', () => {
        const x = 9; // last row
        const y = 4;
        const ship = Ship(5);
        gameboard.placeShipHorizontal(x, y, ship);
        for (let i = 0; i < ship.length; i++) {
            expect(gameboard.board[x][y + i]).toBeTruthy();
        }
        for (let i = ship.length; i < gameboard.length; i++) {
            expect(gameboard.board[x][i]).toBeFalsy();
        }
    });

    // receiveAttack function tests
    test('receiveAttack shall be false if the coordinates do not containt ship', () => {
        const xPos = 5;
        const yPos = 5;
        gameboard.board[xPos][yPos].isShip = false;
        expect(gameboard.receiveAttack(xPos, yPos)).toBeFalsy();
    });

    test('receiveAttack shall be true, if the coordinates containt vertical ship, otherwise its false', () => {
        const xPos = 6;
        const yPos = 9;
        const ship = Ship(3);
        gameboard.placeShipVertical(xPos, yPos, ship);
        expect(gameboard.receiveAttack(xPos - 1, yPos)).toBeFalsy();

        expect(gameboard.board[xPos][yPos].ship.hitArray[0]).toBeFalsy();
        expect(gameboard.receiveAttack(xPos, yPos)).toBeTruthy();
        expect(gameboard.board[xPos][yPos].ship.hitArray[0]).toBeTruthy();

        expect(gameboard.board[xPos + 1][yPos].ship.hitArray[1]).toBeFalsy();
        expect(gameboard.receiveAttack(xPos + 1, yPos)).toBeTruthy();
        expect(gameboard.board[xPos + 1][yPos].ship.hitArray[1]).toBeTruthy();

        expect(gameboard.board[xPos + 2][yPos].ship.hitArray[2]).toBeFalsy();
        expect(gameboard.receiveAttack(xPos + 2, yPos)).toBeTruthy();
        expect(gameboard.board[xPos + 2][yPos].ship.hitArray[2]).toBeTruthy();
        expect(gameboard.receiveAttack(xPos + 3, yPos)).toBeFalsy();
    });

    test('receiveAttack shall be true, if the coordinates containt horizontal ship, otherwise its false', () => {
        const xPos = 5;
        const yPos = 5;
        const ship = Ship(3);
        gameboard.placeShipHorizontal(xPos, yPos, ship);
        expect(gameboard.receiveAttack(xPos, yPos - 1)).toBeFalsy();

        expect(gameboard.board[xPos][yPos].ship.hitArray[0]).toBeFalsy();
        expect(gameboard.receiveAttack(xPos, yPos)).toBeTruthy();
        expect(gameboard.board[xPos][yPos].ship.hitArray[0]).toBeTruthy();

        expect(gameboard.board[xPos][yPos + 1].ship.hitArray[1]).toBeFalsy();
        expect(gameboard.receiveAttack(xPos, yPos + 1)).toBeTruthy();
        expect(gameboard.board[xPos][yPos + 1].ship.hitArray[1]).toBeTruthy();

        expect(gameboard.board[xPos][yPos + 2].ship.hitArray[2]).toBeFalsy();
        expect(gameboard.receiveAttack(xPos, yPos + 2)).toBeTruthy();
        expect(gameboard.board[xPos][yPos + 2].ship.hitArray[2]).toBeTruthy();
        expect(gameboard.receiveAttack(xPos, yPos + 3)).toBeFalsy();
    });

    test('receiveAttack shall be set isHit = true if the function is invoked', () => {
        const xPos = 5;
        const yPos = 5;
        const ship = Ship(3);
        gameboard.placeShipHorizontal(xPos, yPos, ship);
        expect(gameboard.board[xPos][yPos].isHit).toBeFalsy();
        gameboard.receiveAttack(xPos, yPos);
        expect(gameboard.board[xPos][yPos].isHit).toBeTruthy();
    });

    // isAllShipSunk function tests
    test('isAllShipSunk shall be true if the ship has been sunk', () => {
        const xPos = 5;
        const yPos = 5;
        const shipOne = Ship(2);
        gameboard.placeShipHorizontal(xPos, yPos, shipOne);

        gameboard.receiveAttack(xPos, yPos);
        gameboard.receiveAttack(xPos, yPos + 1);

        expect(gameboard.isAllShipsSunk()).toBeTruthy();
    });

    test('isAllShipSunk shall be true if every ships have been sunk', () => {
        const xPos = 5;
        const yPos = 5;
        const shipOne = Ship(2);
        const shipTwo = Ship(3);
        const shipThree = Ship(4);
        const shipFour = Ship(5);
        gameboard.placeShipHorizontal(xPos, yPos, shipOne);
        gameboard.placeShipHorizontal(xPos + 1, yPos, shipTwo);
        gameboard.placeShipHorizontal(xPos + 2, yPos, shipThree);
        gameboard.placeShipHorizontal(xPos + 3, yPos, shipFour);
        for (let i = 0; i < shipOne.length; i++) {
            gameboard.receiveAttack(xPos, yPos + i);
        }
        for (let i = 0; i < shipTwo.length; i++) {
            gameboard.receiveAttack(xPos + 1, yPos + i);
        }
        for (let i = 0; i < shipThree.length; i++) {
            gameboard.receiveAttack(xPos + 2, yPos + i);
        }
        for (let i = 0; i < shipFour.length; i++) {
            gameboard.receiveAttack(xPos + 3, yPos + i);
        }

        expect(gameboard.isAllShipsSunk()).toBeTruthy();
    });

    test('isAllShipSunk shall be false if min. 1 ship has been min 1. unsunk item', () => {
        const xPos = 5;
        const yPos = 5;
        const shipOne = Ship(2);
        gameboard.placeShipHorizontal(xPos, yPos, shipOne);
        gameboard.receiveAttack(xPos, yPos + 1);

        expect(gameboard.isAllShipsSunk()).toBeFalsy();
    });

    // randomPlaceShip function tests
    test('randomPlaceShip return x,y shall be between 0...9', () => {
        const ship = Ship(2);

        const { x, y } = gameboard.randomPlaceShip(ship);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(9);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(9);
    });

    test('randomPlaceShip return x,y shall be valid coordinate', () => {
        const ship = Ship(2);
        const boardSize = 10;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                gameboard.board[i][j].isShip = true;
            }
        }
        gameboard.board[0][0].isShip = false;
        gameboard.board[0][1].isShip = false;
        gameboard.board[1][0].isShip = false;
        gameboard.board[1][1].isShip = false;
        const { x, y } = gameboard.randomPlaceShip(ship);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(1);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(1);
    });
});
