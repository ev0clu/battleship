import ui from './ui';

const dragdrop = (() => {
    let dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        if (!this.parentNode.classList.contains('ship-drag-container')) {
            ui.removeShipLocationActive(this.parentNode, this);
        }
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.id);
    }

    function handleDragEnd() {
        this.style.opacity = '1';
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragEnter() {
        this.classList.add('target-cell');
    }

    function handleDragLeave() {
        this.classList.remove('target-cell');
    }

    function handleDrop(e) {
        e.stopPropagation(); // stops the browser from redirecting.

        if (dragSrcEl !== this) {
            this.classList.remove('target-cell');
            const shipID = e.dataTransfer.getData('text/plain');
            const shipNode = document.getElementById(`${shipID}`);

            if (ui.canDropShip(this, shipNode)) {
                this.appendChild(shipNode);
                ui.setShipLocationActive(this, shipNode);
            }
            if (ui.isAllShipDropped()) {
                ui.toggleStartButtonStatus('init');
            }
        }
        return false;
    }

    const handleDragDropEventListener = () => {
        const shipContainer = document.querySelectorAll('.ship-container');
        shipContainer.forEach((ship) => {
            ship.addEventListener('dragstart', handleDragStart);
            ship.addEventListener('dragend', handleDragEnd);
        });
        const cellInitBoard = document.querySelectorAll('.cell-init-board');
        cellInitBoard.forEach((cell) => {
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('dragenter', handleDragEnter);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('drop', handleDrop);
        });
    };

    return { handleDragDropEventListener };
})();

export default dragdrop;
