import Ship from '../modules/ship';

describe('Ship', () => {
    let ship = {};
    const size = 3;

    beforeEach(() => {
        ship = new Ship(3);
    });

    test('Ship factory length to be equal with the defined size and not 0', () => {
        expect(ship).toHaveLength(size);
    });
});
