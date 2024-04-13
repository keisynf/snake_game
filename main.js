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
