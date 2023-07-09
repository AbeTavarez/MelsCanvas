const canvas = document.getElementById('canvas');
const colorPicker = document.querySelector('#color-picker');
const resetCanvas = document.querySelector('#rest-canvas');
const body = document.querySelector('body');

// ==== Tools
const pen = document.querySelector('.fa-pen');
const paintBrush = document.querySelector('.fa-paintbrush');
const eraser = document.querySelector('.fa-eraser');

//? ==== context
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight
canvas.width = (window.innerWidth - 300);
ctx.strokeStyle = 'black';

// ===
let lastX = 0;
let lastY = 0;
let selectedTool = 'pencil';
let isDrawing = false;
let isErasing = false;

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
    console.log('erasing');
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
    console.log('change');
    ctx.strokeStyle = this.value;
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

// ===
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


colorPicker.addEventListener('input', changePenColor);
colorPicker.addEventListener('change', changePenColor);
resetCanvas.addEventListener('click', () => ctx.reset());
body.addEventListener('mouseup', function() {
    this.style.cursor = '';
});

// === Tools
pen.addEventListener('click', () => selectedTool = 'pencil');
paintBrush.addEventListener('click', () => selectedTool = 'paintbrush');
eraser.addEventListener('click', () => selectedTool = 'eraser');