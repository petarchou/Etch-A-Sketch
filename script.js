const grid = document.querySelector('.grid-container');

const gridBlock = document.createElement('div');
gridBlock.classList.add('grid-block');

let size = 20;
gridBlock.style.width = (100/size) + '%';
gridBlock.style.height = (100/size) + '%';


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
const changeBG = event => event.target.style.backgroundColor = 'rgba('+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")";

function addListeners(element) {
    element.addEventListener('mouseover',
        event1 => {
        if(mouseDown[0] ===1)changeBG(event1)
        });
    element.addEventListener('mousedown', event =>
    {if(event.buttons===1)changeBG(event)});
}
gridElements.forEach(addListeners);

//Generate Slider Value (used for grid size)
let slider = document.getElementById('grid-slider');
let sliderVal = document.getElementById('range-value');
sliderVal.innerHTML = slider.value;
slider.oninput = function () {
    sliderVal.innerHTML = slider.value;
}
//Change grid when slider is released
slider.onmouseup = function () {
    createGrid(slider.value);
}


//Clear Board Button
const button = document.querySelector('.grid-button');
button.onclick = () => createGrid(size);
//Clear Board func
function createGrid(newSize) {
    const gridElements = document.querySelectorAll('.grid-block');
    gridElements.forEach(element => element.remove());
    gridBlock.style.width = (100/newSize) + '%';
    gridBlock.style.height = (100/newSize) + '%';


    for (let i = 0; i < newSize; i++) {
        for (let j = 0; j < newSize; j++) {
            grid.appendChild(gridBlock.cloneNode(true));
        }
    }
    const newElements = document.querySelectorAll('.grid-block');
    newElements.forEach(addListeners);
}