const Ship = (shipLength) => {
    const length = shipLength;
    const hitArray = [];

    (function populateHitArray() {
        for (let i = 0; i < length; i++) {
            hitArray[i] = 0;
        }
    })();

    const hit = (index) => {
        if (index < length) {
            hitArray[index] = 1;
        }
    };

    const isSunk = () => {
        return hitArray.every((index) => index === 1);
    };

    return {
        get length() {
            return length;
        },

        get hitArray() {
            return hitArray;
        },
        hit,
        isSunk
    };
};

export default Ship;
