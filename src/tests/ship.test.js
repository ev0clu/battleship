import Ship from '../modules/ship';

describe('Ship', () => {
    let ship = {};
    const shipSize = 3;

    beforeEach(() => {
        ship = new Ship(3);
    });

    // Ship object test
    test('Ship factory has to be defined as object', () => {
        expect(typeof ship).toBe('object');
    });

    test('Ship factory length has to be equal with the defined size', () => {
        expect(ship).toHaveLength(shipSize);
    });

    // hitArray test
    test('Ship factory has hit array to store hits', () => {
        expect(ship.hitArray).toBeDefined();
        expect(Array.isArray(ship.hitArray)).toBeTruthy();
    });

    test('hitArray length has to be the same with shipSize', () => {
        expect(ship.hitArray).toHaveLength(shipSize);
    });

    test('Ship get no hits, than all values have to be equal with 0', () => {
        for (let i = 0; i < shipSize; i++) {
            expect(ship.hitArray[i]).toEqual(0);
        }
    });

    test('Ship get hits at index 0, than its value has to be equal with 1', () => {
        const hitIndex = 0;
        ship.hit(hitIndex);
        expect(ship.hitArray[hitIndex]).toEqual(1);
    });

    test('Ship get hits at shipSize-1 index, than it has to be equal with 1', () => {
        const hitIndex = shipSize - 1;
        ship.hit(hitIndex);
        expect(ship.hitArray[hitIndex]).toEqual(1);
    });

    test('Ship get hits at index 0,1,2, than the value has to be 1 for each element', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        for (let i = 0; i < shipSize; i++) {
            expect(ship.hitArray[i]).toEqual(1);
        }
    });

    test('Ship cannot get hits more than its size: 0 hit', () => {
        const hitIndex = shipSize;
        ship.hit(hitIndex);
        expect(ship.hitArray[hitIndex]).toBeUndefined();
    });

    test('Ship cannot get hits if it is already shrunk', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        const hitIndex = shipSize;
        ship.hit(hitIndex);
        expect(ship.hitArray[hitIndex]).toBeUndefined();
    });

    // isSunk test
    test('Ship is not sunk if the hitArray has element which is not 1', () => {
        ship.hit(0);
        ship.hit(2);
        expect(ship.isSunk()).toBeFalsy();
    });

    test('Ship is not sunk if the hitArray has element which is not 1, and the  current hit is out of its size', () => {
        ship.hit(0);
        ship.hit(2);
        const hitIndex = shipSize;
        ship.hit(hitIndex);
        expect(ship.isSunk()).toBeFalsy();
    });

    test('Ship is sunk if the hitArray every elements are hit', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBeTruthy();
    });
});
