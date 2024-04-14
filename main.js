//* Declare Variables

// Canvas variables
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Square Variables
let squaresRowCount = 15;
let size = canvas.width / squaresRowCount;
let x = 0;
let y = 0;
const squareColor1 = "#ffceda";
const squareColor2 = "#febbcf";
const snakeColor = "#bde0fe";

// Snake Variables
const xStart = 2;
const yStart = 7;
let direction = "right";

//* Class definitions
class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x * size, this.y * size, size, size);
    ctx.fill();
    ctx.closePath();
  }
}

class Snake {
  constructor(segments) {
    this.segments = segments;
  }
  draw() {
    console.log(this.segments);
    this.segments.forEach((segment) => {
      segment.draw();
    });
  }
  move() {
    const head = { ...this.segments[0] };
    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }

    this.segments.unshift(head);
    this.segments.pop();

    console.log(this.segments);
  }
}

//* Draw elements

// Draw background squares
function drawSquares() {
  for (let i = 0; i < squaresRowCount; i++) {
    for (let j = 0; j < squaresRowCount; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
        let square = new Square(x, y, squareColor1);
        square.draw();
        x++;
      } else {
        let square = new Square(x, y, squareColor2);
        square.draw();
        x++;
      }
    }
    x = 0;
    y++;
  }
  y = 0;
}

drawSquares();

console.log(xStart, yStart);
// Draw snake
const snake = new Snake([new Square(xStart, yStart, snakeColor)]);
console.log(snake.segments);

snake.draw();

setInterval(() => {
  snake.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquares();
  snake.draw();
}, 1000);
