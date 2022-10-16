const grid = document.querySelector('.grid-container');

const gridBlock = document.createElement('div');
gridBlock.classList.add('grid-block');

let size = 100;
gridBlock.style.width = (100/size) + 'vw';
gridBlock.style.height = (90/size) + 'vh';

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        grid.appendChild(gridBlock.cloneNode(true));
    }
}

//this glitches if mouse is released outside the browser window. But is my current best solution.
let mouseDown = [0,0];
document.body.onmousedown = function (event) {
    ++mouseDown[event.button];
    console.log(mouseDown[0]);
}
document.body.onmouseup = function (event) {
    --mouseDown[event.button];
    console.log(mouseDown[0]);
}


const gridElements = document.querySelectorAll('.grid-block');

const changeBG = event => event.target.style.backgroundColor = 'red';

function addListeners(element) {
    element.addEventListener('mouseover',
        event1 => {
        if(mouseDown[0] ===1)changeBG(event1)
        });
}

gridElements.forEach(addListeners);
