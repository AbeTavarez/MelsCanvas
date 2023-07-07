const canvas = document.getElementById('canvas');
console.dir(canvas);
// context
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight
canvas.width = window.innerWidth;
ctx.strokeStyle = 'black';

// ===
let lastX = 0;
let lastY = 0;
let isDrawing = false;


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

console.log(canvas);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    
})
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);