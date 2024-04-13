// Canvas variables
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Square Variables
let squaresRowCount = 10;
let size = canvas.width / squaresRowCount;
let x = 0;
let y = 0;
const squareColor1 = "#ffceda";
const squareColor2 = "#febbcf";

// Snake Variables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let fps = 1; // Desired fps
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Keyboard functions
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

class Squares {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
    ctx.closePath();
  }
}

class Snake {
  constructor(x, y, dx, dy, length, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.length = length;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.length * size, size);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.dx === 1) {
      this.x += size;
    } else if (this.dx === -1) {
      this.x -= size;
    } else if (this.dy === 1) {
      this.y += size;
    } else if (this.dy === -1) {
      this.y -= size;
    }
  }
}

// Draw the squares
function drawSquares() {
  for (let i = 0; i < squaresRowCount; i++) {
    for (let j = 0; j < squaresRowCount; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
        let square = new Squares(x, y, size, squareColor1);
        square.draw();
        x += size;
      } else {
        let square = new Squares(x, y, size, squareColor2);
        square.draw();
        x += size;
      }
    }
    x = 0;
    y += size;
  }
  y = 0;
}

drawSquares();

// Draw the snake
let snake = new Snake(0, 0, 1, 0, 3, "#bde0fe");
snake.draw();

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    // Update time
    then = now - (delta % interval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquares();
    snake.update();
    snake.draw();
    requestAnimationFrame(animate);
  }
}

animate();
