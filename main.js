//* Declare Variables

// Canvas variables
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("scoreCount");
const highScoreElement = document.getElementById("highScoreCount");

// Grid variables
const gridCount = 15;
const size = canvas.width / gridCount;
const squareColor1 = "#ffceda";
const squareColor2 = "#febbcf";

// Snake variables
const snakeColor = "#bde0fe";
let direction = "right";
const x = 3;
const y = Math.ceil(gridCount / 2) - 1;

// Food variables
const foodColor = "#e73668";

// Game variables
let gameStarted = false;
let gameSpeedDelay = 200;
let gameInterval;
let score = 0;
let highScore = 0;

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
  drawScores();
}

class Square {
  constructor(
    x,
    y,
    size,
    color,
    border = false,
    borderColor = "white",
    borderSize = 2
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.border = border;
    this.borderColor = borderColor;
    this.borderSize = borderSize;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    if (this.border) {
      ctx.strokeStyle = "white"; // Set the color of the border
      ctx.lineWidth = 2; // Set the width of the border
      ctx.strokeRect(
        this.x * this.size,
        this.y * this.size,
        this.size,
        this.size
      );
    }
    ctx.closePath();
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
      this.squares[0].color,
      true
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

    if (head.x === food.x && head.y === food.y) {
      food.x = random(0, gridCount - 1);
      food.y = random(0, gridCount - 1);
      clearInterval(gameInterval);
      gameInterval = setInterval(() => {
        snake.moveSnake();
        snake.collisionDetection();
        draw();
      }, gameSpeedDelay);
    } else {
      this.squares.pop();
    }
  }

  collisionDetection() {
    const head = this.squares[0];
    if (
      head.x < 0 ||
      head.x >= gridCount ||
      head.y < 0 ||
      head.y >= gridCount
    ) {
      restartGame();
    } else {
      for (let i = 1; i < this.squares.length; i++) {
        if (head.x === this.squares[i].x && head.y === this.squares[i].y) {
          restartGame();
        }
      }
    }
  }
}

const snake = new Snake([new Square(x, y, size, snakeColor, true)], direction);

const food = new Square(
  random(0, gridCount - 1),
  random(0, gridCount - 1),
  size,
  foodColor,
  true
);

draw();

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if (!gameStarted && e.key === "Enter") {
    startGame();
  } else {
    if (
      (e.key === "Right" || e.key === "ArrowRight") &&
      snake.direction !== "left"
    ) {
      snake.direction = "right";
    } else if (
      (e.key === "Left" || e.key === "ArrowLeft") &&
      snake.direction !== "right"
    ) {
      snake.direction = "left";
    } else if (
      (e.key === "Up" || e.key === "ArrowUp") &&
      snake.direction !== "down"
    ) {
      snake.direction = "up";
    } else if (
      (e.key === "Down" || e.key === "ArrowDown") &&
      snake.direction !== "up"
    ) {
      snake.direction = "down";
    }
  }
}

function startGame() {
  gameStarted = true;
  gameInterval = setInterval(() => {
    snake.moveSnake();
    snake.collisionDetection();
    draw();
  }, gameSpeedDelay);
}

function restartGame() {
  clearInterval(gameInterval);
  snake.squares = [new Square(x, y, size, snakeColor, true)];
  snake.direction = "right";
  gameSpeedDelay = 200;
  gameStarted = false;
  draw();
}

function drawScores() {
  score = snake.squares.length - 1;
  scoreElement.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    highScoreElement.innerHTML = highScore;
  }
}
