function setGrid(size) {
    // Clear the board first of all its inner divs before composing a new grid.
    clearBoard(board);

    // Calculate the width of each box so it will lay on a perfect square grid.
    // This will be used inside the loop to apply as absolute values for width and height style.
    const boxWidth = (((1 / size) * 100).toFixed(4)) + '%';

    // Loop to create the grid based on the size parameter provided.
    // Parent container has the flexbox layout and will wrap the boxes accordingly.
    for (let i = 0; i < size**2; i++) {
        const square = document.createElement('div');
        square.style.border = ".1px solid rgb(230,230,230)";
        square.style.width = boxWidth;
        square.style.height = boxWidth;
        square.classList.add('box');
        board.appendChild(square);
    }

    // Iterate all inner divs to create event listener.
    setGridEvent(writeMode[0]); 
}

// Helper function to remove inner divs before composing a new grid.
function clearBoard(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Everytime a new grid is composed, this function is invoked to create event listeners for each inner divs.
function setGridEvent(mode) {
    const squares = document.querySelectorAll('.box')
    
    squares.forEach(function(item){
        item.addEventListener('mousemove', function(e){
            if (isClicked) {
                if (mode === 'color'){
                    e.currentTarget.style.backgroundColor = penColor;
                } else if (mode === 'erase') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                } else {
                    e.currentTarget.style.backgroundColor = makeRandomColor();
                }                
            }   
        })
    })
}

// Helper function to generate random color value for 'Rainbow' mode.
function makeRandomColor() {
    const arr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let result = '#';

    for (let i = 0; i < 6; i++) {
        result += arr[Math.floor(Math.random() * arr.length)];
    }
    return result;
}

// Sets style to the mode button that is clicked (color, rainbow, erase).
function activateModeClicked(eventObj) {
    color.classList.remove('active');
    rainbow.classList.remove('active');
    eraser.classList.remove('active');
    eventObj.currentTarget.classList.add('active');
}

// Global constant variables representing the page objects that needs to be referenced.
const board = document.querySelector('#board');
const slider = document.querySelector('#gridsize')
const sliderDisplay = document.querySelector('#gridsize-display')
const color = document.querySelector('#color')
const pen = document.querySelector('#pen')
const rainbow = document.querySelector('#rainbow')
const eraser = document.querySelector('#eraser')
const clear = document.querySelector('#clear')

const writeMode = ['color', 'rainbow', 'erase']
let isClicked = false;
let gridSize = 0;
let penColor = '#000000';

board.addEventListener('mousedown', () => isClicked = true)
board.addEventListener('mouseup', () => isClicked = false)

gridSize = slider.value;
sliderDisplay.innerText = `${gridSize} x ${gridSize}`;
setGrid(gridSize)

// Slider listeners. Final value will change the grid size.
slider.addEventListener('input', e => {
    sliderDisplay.innerText = `${e.currentTarget.value} x ${e.currentTarget.value}`;
})

slider.addEventListener('change', e => {
    gridSize = e.currentTarget.value;
    setGrid(gridSize)
})

color.addEventListener('click', e => {
    setGridEvent(writeMode[0]);
    activateModeClicked(e);
})

pen.addEventListener('change', e => {
    penColor = e.currentTarget.value;
})

eraser.addEventListener('click', e => {
    setGridEvent(writeMode[2]);
    activateModeClicked(e);
})

rainbow.addEventListener('click', e => {
    setGridEvent(writeMode[1]);
    activateModeClicked(e);
})

clear.addEventListener('click', () => {
    const squares = board.querySelectorAll('.box')

    squares.forEach( item => {
        item.style.backgroundColor = 'transparent';
    })
})


