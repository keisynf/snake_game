// // Canvas variables
// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");
// const rect = canvas.getBoundingClientRect();

// // Keyboard functions
// function keyDownHandler(e) {
//   if (e.key === "Right" || e.key === "ArrowRight") {
//     rightPressed = true;
//   } else if (e.key === "Left" || e.key === "ArrowLeft") {
//     leftPressed = true;
//   }
// }

// function keyUpHandler(e) {
//   if (e.key === "Right" || e.key === "ArrowRight") {
//     rightPressed = false;
//   } else if (e.key === "Left" || e.key === "ArrowLeft") {
//     leftPressed = false;
//   }
// }

// function touchMoveHandler(e) {
//   const relativeX = e.touches[0].clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     paddle.x = relativeX - paddle.width / 2;
//   }
// }

// class Brick {
//   constructor(x, y, status, color) {
//     this.x = x;
//     this.y = y;
//     this.status = status;
//     this.color = color;
//   }
//   draw() {
//     if (this.status === 1) {
//       ctx.beginPath();
//       ctx.rect(this.x, this.y, brickWidth, brickHeight);
//       ctx.fillStyle = this.color;
//       ctx.fill();
//       ctx.closePath();
//     }
//   }
// }
