const Ship = (shipLength) => {
    const length = shipLength;
    const hitArray = [];

    (function populateHitArray() {
        for (let i = 0; i < length; i++) {
            hitArray[i] = false;
        }
    })();

    const hit = (index) => {
        hitArray[index] = true;
    };

    const isSunk = () => {
        return hitArray.every((index) => index === true);
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
