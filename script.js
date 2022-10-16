const grid = document.querySelector('.grid-container');

const gridBlock = document.createElement('div');
gridBlock.classList.add('grid-block');

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        grid.appendChild(gridBlock.cloneNode(true));
    }
}

