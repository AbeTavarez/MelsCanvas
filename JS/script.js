
const canvas = document.getElementById('canvas');
const colorPicker = document.querySelector('#color-picker');
const resetCanvas = document.querySelector('#rest-canvas');
const body = document.querySelector('body');
const colorsHistoryContainer = document.querySelector('.colors-history-container');


// ==== Tools
const pen = document.querySelector('.fa-pen');
const paintBrush = document.querySelector('.fa-paintbrush');
const eraser = document.querySelector('.fa-eraser');

//? ==== context
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight
canvas.width = (window.innerWidth - 300);
ctx.strokeStyle = 'black';

//* === Variables =====
let lastX = 0;
let lastY = 0;
let selectedTool = 'pencil';
let isDrawing = false;
let isErasing = false;
const colorsHistory = [];

/**
 * Draw to the canvas
 */
function draw(e) {
    if (selectedTool !== 'pencil' || !isDrawing) return;

    document.body.style.cursor = 'crosshair'
    
    // console.log(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX; 
    lastY = e.offsetY;
}

function erase(e) {
    //TODO: erase drawing
    if (selectedTool !== 'eraser' || !isErasing) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rbg(2555, 2555, 255, 1)';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX; 
    lastY = e.offsetY;
}

/**
 * Change Pen Color
 */
function changePenColor() {
    ctx.strokeStyle = this.value;
    renderColorsHistory()
}


//? ==========  Events Listeners

// === Draw
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    
});

// === Erase
canvas.addEventListener('mousemove', erase);
canvas.addEventListener('mousedown', () => isErasing = true);

// === Changes isDrawing State
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


colorPicker.addEventListener('input', changePenColor);
colorPicker.addEventListener('change', changePenColor);
// add new selected color to colorsHistory
colorPicker.addEventListener('change', updateColorsArray);
resetCanvas.addEventListener('click', () => ctx.reset());
body.addEventListener('mouseup', function() {
    this.style.cursor = '';
});

// === Tools
pen.addEventListener('click', () => selectedTool = 'pencil');
paintBrush.addEventListener('click', () => selectedTool = 'paintbrush');
eraser.addEventListener('click', () => selectedTool = 'eraser');

// ======

/**
 * Render Color History Squares and adds event lister for changing the color
 */
export function renderColorsHistory(colorsHistory = []) {
    colorsHistoryContainer.innerHTML = '';
    colorsHistory.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('square-div');
        div.style.backgroundColor = color;
        colorsHistoryContainer.appendChild(div)
    });
    const colorHistorySquares = document.querySelectorAll('.square-div');
    colorHistorySquares.forEach(sq => sq.addEventListener('click', function() {
        console.log(this);
        ctx.strokeStyle = this.style.backgroundColor
    }));
  }
  
  /**
   * Update Colors Array
   */
  export function updateColorsArray() {
      colorsHistory.unshift(this.value);
      console.log(colorsHistory);
      renderColorsHistory(colorsHistory);
  }