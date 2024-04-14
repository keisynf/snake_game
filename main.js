//* Declare Variables

// Canvas variables
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Grid variables
const gridCount = 16;
const size = canvas.width / gridCount;
const squareColor1 = "#ffceda";
const squareColor2 = "#febbcf";

// Snake variables
const snakeColor = "#bde0fe";
let direction = "right";
const x = 0;
const y = 8;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBackground() {
  let x = 0;
  let y = 0;
  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
        const square = new Square(x, y, size, squareColor1);
        square.draw();
        x++;
      } else {
        const square = new Square(x, y, size, squareColor2);
        square.draw();
        x++;
      }
    }
    x = 0;
    y++;
  }
  y = 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  snake.draw();
  food.draw();
}

class Square {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}

class Snake {
  constructor(squares, direction) {
    this.squares = squares;
    this.direction = direction;
  }
  draw() {
    this.squares.forEach((square) => {
      square.draw();
    });
  }
  moveSnake() {
    const head = new Square(
      this.squares[0].x,
      this.squares[0].y,
      this.squares[0].size,
      this.squares[0].color
    );

    switch (this.direction) {
      case "right":
        head.x++;
        break;
      case "left":
        head.x--;
        break;
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
    }

    this.squares.unshift(head);
    this.squares.pop();
  }
}

const snake = new Snake([new Square(x, y, size, snakeColor)], direction);

const food = new Square(
  random(0, gridCount - 1),
  random(0, gridCount - 1),
  size,
  "red"
);

draw();

setInterval(() => {
  snake.moveSnake();
  draw();
}, 200);
