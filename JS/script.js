const canvas = document.getElementById('canvas');
const colorPicker = document.querySelector('#color-picker');
const resetCanvas = document.querySelector('#rest-canvas');



//? ==== context
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight
canvas.width = (window.innerWidth - 300);
ctx.strokeStyle = 'black';

// ===
let lastX = 0;
let lastY = 0;
let isDrawing = false;

/**
 * Draw to the canvas
 */
function draw(e) {
    if (!isDrawing) return;

    // console.log(e);
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
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    
})
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


colorPicker.addEventListener('input', changePenColor);
colorPicker.addEventListener('change', changePenColor);
resetCanvas.addEventListener('click', () => ctx.reset());