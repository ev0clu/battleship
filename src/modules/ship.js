const Ship = (shipLength) => {
    const length = shipLength;
    const hitArray = [];

    return {
        get length() {
            return length;
        },

        get hitArray() {
            return hitArray;
        }
    };
};

export default Ship;
