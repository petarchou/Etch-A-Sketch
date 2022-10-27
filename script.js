const grid = document.querySelector('.grid-container');

const gridBlock = document.createElement('div');
gridBlock.classList.add('grid-block');
const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = '#000';
const DEFAULT_MODE = 'color';

let size = DEFAULT_SIZE;
gridBlock.style.width = (100/size) + '%';
gridBlock.style.height = (100/size) + '%';


for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        grid.appendChild(gridBlock.cloneNode(true));
    }
}

//Buttons
const colorModeBtn = document.querySelector('#color-mode');
colorModeBtn.classList.add("active");
const rainbowModeBtn = document.querySelector('#rainbow-mode');
const eraserModeBtn = document.querySelector('#eraser-mode');
const clearGridBtn = document.querySelector('#clear');

colorModeBtn.onclick = (e) => {
    changeBG = colorMode;
    activateButton(e);
};
rainbowModeBtn.onclick = (e) => {
    changeBG = rainbowMode;
    activateButton(e);
};
eraserModeBtn.onclick = (e) => {
    changeBG = eraserMode;
    activateButton(e);
};
clearGridBtn.onclick = () => createGrid(size);


//Active Button
let current_mode = DEFAULT_MODE;
const buttons = document.querySelectorAll('.toggler');
function activateButton(event) {
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}


//this glitches if mouse is released outside the browser window. But is my current best solution.
let mouseDown = [0,0];
document.body.onmousedown = function (event) {
    ++mouseDown[event.button];
}
document.body.onmouseup = function (event) {
    --mouseDown[event.button];
}


const gridElements = document.querySelectorAll('.grid-block');
let changeBG = colorMode;

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
    size = slider.value;
    createGrid(size);
}


//Clear Board Button

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


let current_color = DEFAULT_COLOR;

//Color mode
const colorWheel = document.querySelector('#wheel');
colorWheel.oninput = e => {
    current_color = e.target.value;
}
function colorMode(event) {
    event.target.style.backgroundColor = current_color;
}
//Rainbow mode
function rainbowMode(event) {
    event.target.style.backgroundColor = 'rgba('+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")";
}

//Eraser mode
function eraserMode(event) {
    event.target.style.backgroundColor = 'transparent';
}


//Shading mode - unsuccessful
// const SHADING_STARTER = 'rgba(0,0,0,0.1)';
// function shadingMode(event) {
//
//     }


if(getComputedStyle(document.body).width<=550) {
    const btns = document.querySelector('.grid-container');
    document.body.appendChild(btns);
}