import Ship from '../modules/ship';

describe('Ship', () => {
    let ship = {};
    const shipSize = 3;

    beforeEach(() => {
        ship = Ship(3);
    });

    // Ship object tests
    test('Ship factory shall be defined as object', () => {
        expect(typeof ship).toBe('object');
    });

    test('Ship factory length shall be equal with shipSize', () => {
        expect(ship).toHaveLength(shipSize);
    });

    // hitArray test
    test('Ship factory shall be hit array to store hits', () => {
        expect(ship.hitArray).toBeDefined();
        expect(Array.isArray(ship.hitArray)).toBeTruthy();
    });

    test('hitArray length shall be equal with shipSize', () => {
        expect(ship.hitArray).toHaveLength(shipSize);
    });

    test('If Ship get no hits, than all values shall be false', () => {
        for (let i = 0; i < shipSize; i++) {
            expect(ship.hitArray[i]).toBeFalsy();
        }
    });

    test('If Ship get hits at index 0, than its value shall be equal with true', () => {
        const hitIndex = 0;
        ship.hit(hitIndex);
        expect(ship.hitArray[hitIndex]).toBeTruthy();
    });

    test('Ship get hits at shipSize-1 index, than it shall be true', () => {
        const hitIndex = shipSize - 1;
        ship.hit(hitIndex);
        expect(ship.hitArray[hitIndex]).toBeTruthy();
    });

    test('Ship get hits at index 0,1,2, than the value shall be treu for each element', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        for (let i = 0; i < shipSize; i++) {
            expect(ship.hitArray[i]).toBeTruthy();
        }
    });

    // isSunk function tests
    test('Ship shall not sunk if the hitArray has element which is false', () => {
        ship.hit(0);
        ship.hit(2);
        expect(ship.isSunk()).toBeFalsy();
    });

    test('Ship shall sunk if the hitArray all elements are equal with true', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBeTruthy();
    });
});
