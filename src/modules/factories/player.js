const Player = () => {
    let isMyTurn = true;

    const changeTurn = () => {
        if (isMyTurn) {
            isMyTurn = false;
        } else {
            isMyTurn = true;
        }
    };

    const randomAttack = (gameboard) => {
        const emptyCoordinates = [];

        gameboard.board.forEach((row) => {
            row.forEach((column) => {
                if (!column.isHit) {
                    emptyCoordinates.push({ x: column.x, y: column.y });
                }
            });
        });
        const randomElement = Math.floor(Math.random() * emptyCoordinates.length);
        return emptyCoordinates[randomElement];
    };

    return {
        get isMyTurn() {
            return isMyTurn;
        },
        changeTurn,
        randomAttack
    };
};

export default Player;
