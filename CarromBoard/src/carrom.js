function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}
let score = 0;

// striker id = 0
// queen id =1
// black carrom id = 2
// white carrom id = 3

let canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
canvas.style.backgroundImage = 'url("images/2.2.png")';
canvas.style.backgroundSize = "contain";
canvas.style.position = "absolute";
canvas.style.top = "30px";
canvas.style.left = "500px";
canvas.style.border = "20px solid #7eb900";
//canvas.style.borderRadius = "20px";
let strikerPower = 10;

//
player1Active = false;
player2Active = false;

class Player {
  constructor(id, active) {
    this.carromId = id;
    this.active = active;
  }
  update = () => {
    this.active = this.active;
  };
}

let player1 = new Player(2, false);
let player2 = new Player(3, false);

//
const pocketRadius = 30;
const carromRadius = 15;
class Pockets {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = pocketRadius;
  }
  drawPocket = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
  };
}
let drawPockets = () => {
  let pocket1 = new Pockets(20, 20);
  pocket1.drawPocket();
  let pocket2 = new Pockets(580, 20);
  pocket2.drawPocket();
  let pocket3 = new Pockets(580, 580);
  pocket3.drawPocket();
  let pocket4 = new Pockets(20, 580);
  pocket4.drawPocket();
};

class Carrom {
  constructor(id, xPos, yPos, radius, color) {
    //this.type = type;
    this.id = id;
    this.angle = (90 * Math.PI) / 180;
    this.moveAngle = 0;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.mass = radius;

    this.restitution = 0.8;
    this.color = color;
    this.speed = strikerPower;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0; // velocity along x-axis
    this.vy = 0; // velocity along y-axis
  }
  draw = () => {
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    //ctx.rotate(this.angle);
    ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  };
  update = () => {
    //if (Math.abs(this.vy) > 0.5) {
    this.speed = strikerPower;
    this.vx -= this.vx * 0.01;
    this.vy -= this.vy * 0.01;
    this.xPos += this.vx;
    this.yPos += this.vy;
    //}
  };

  //

  //

  checkWallCollision = () => {
    if (this.xPos <= this.radius) {
      this.vx = -this.vx;
      this.xPos = this.radius;
    } else if (this.xPos > canvas.width - 2 * this.radius) {
      this.vx = -this.vx;
      this.xPos = canvas.width - 2 * this.radius;
    }

    if (this.yPos <= 0) {
      this.vy = -this.vy;
      this.yPos = this.radius;
    } else if (this.yPos >= canvas.height - 2 * this.radius) {
      this.vy = -this.vy;
      this.yPos = canvas.height - 2 * this.radius;
    }
  };
}

var whiteCarroms = [
  new Carrom(3, 220, 300, 15, "#f0ffff"),
  new Carrom(3, 260, 300, 15, "#f0ffff"),
  new Carrom(3, 300, 300, 15, "#f0ffff"),
  new Carrom(3, 340, 300, 15, "#f0ffff"),
  new Carrom(3, 390, 300, 15, "#f0ffff"),
];

let queen = new Carrom(1, 300, 260, 15, "red");
var blackCarroms = [
  new Carrom(2, 220, 350, 15, "black"),
  new Carrom(2, 260, 350, 15, "black"),
  new Carrom(2, 300, 350, 15, "black"),
  new Carrom(2, 340, 350, 15, "black"),
  new Carrom(2, 390, 350, 15, "black"),
];

const striker = new Carrom(0, 300, 520, 20, "blue");
var balls = whiteCarroms.concat(blackCarroms, queen, striker);
console.log(balls);

///

checkBallCollision = function () {
  balls.forEach((element) => {
    if (element.color == "blue") {
      ////console.log(element);
    }
    balls.forEach((test) => {
      if (element !== test) {
        var xDiff = test.xPos + test.radius - (element.xPos + element.radius);
        var yDiff = test.yPos + test.radius - (element.yPos + element.radius);
        var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (distance <= test.radius + element.radius) {
          //console.log("collision");

          let vCollision = {
            x: element.xPos - test.xPos,
            y: element.yPos - test.yPos,
          }; // vector of the direction of collision
          let distance = Math.sqrt(
            (element.xPos - test.xPos) * (element.xPos - test.xPos) +
              (element.yPos - test.yPos) * (element.yPos - test.yPos)
          );

          let vCollisionNorm = {
            x: vCollision.x / distance,
            y: vCollision.y / distance,
          };
          let vRelativeVelocity = {
            x: test.vx - element.vx,
            y: test.vy - element.vy,
          };
          let speed =
            vRelativeVelocity.x * vCollisionNorm.x +
            vRelativeVelocity.y * vCollisionNorm.y;

          // to prevent overlap
          if (speed > 0) {
            let impulse = (2 * speed) / (test.mass + element.mass);

            test.vx -=
              impulse * element.mass * vCollisionNorm.x * test.restitution;
            test.vy -=
              impulse * element.mass * vCollisionNorm.y * test.restitution;
            element.vx +=
              impulse * test.mass * vCollisionNorm.x * test.restitution;
            element.vy +=
              impulse * test.mass * vCollisionNorm.y * test.restitution;
          }
        }
      }
    });
  });
};
///

let checkPockets = () => {
  //console.log("in");
  balls.forEach((element) => {
    //pocket1
    if (element.xPos < 2 * pocketRadius && element.yPos < 2 * pocketRadius) {
      console.log("pocket");
      if (element.id != 0) {
        if (element.id != 1) {
          balls = balls.filter((carrom) => carrom != element);
          if (element.id == player1.carromId) score++;
        } else if ((element.id = 1)) {
          let count = countPlayerCarrom(element.id);
          if (count == 0) {
            balls = balls.filter((carrom) => carrom != element);
            score++;
          } else {
            setTimeout(() => {
              (element.xPos = 300), (element.yPos = 300);
            }, 4000);
          }
        }
      }
    }
    if (
      element.xPos < 2 * pocketRadius &&
      element.yPos > canvas.height - 2 * pocketRadius
    ) {
      console.log("pocket");

      if (element.id != 0) {
        if (element.id != 1) {
          balls = balls.filter((carrom) => carrom != element);
          if (element.id == player1.carromId) score++;
        } else if ((element.id = 1)) {
          let count = countPlayerCarrom(element.id);
          if (count == 0) {
            balls = balls.filter((carrom) => carrom != element);
            score++;
          } else {
            setTimeout(() => {
              (element.xPos = 300), (element.yPos = 300);
            }, 4000);
          }
        }
      }
    }
    if (
      element.xPos > canvas.width - 2 * pocketRadius &&
      element.yPos < 2 * pocketRadius
    ) {
      console.log("pocket");

      if (element.id != 0) {
        if (element.id != 1) {
          balls = balls.filter((carrom) => carrom != element);
          if (element.id == player1.carromId) score++;
        } else if ((element.id = 1)) {
          let count = countPlayerCarrom(element.id);
          if (count == 0) {
            balls = balls.filter((carrom) => carrom != element);
            score++;
          } else {
            setTimeout(() => {
              (element.xPos = 300), (element.yPos = 300);
            }, 4000);
          }
        }
      }
    }
    if (
      element.xPos > canvas.width - 2 * pocketRadius &&
      element.yPos > canvas.height - 2 * pocketRadius
    ) {
      console.log("pocket");

      if (element.id != 0) {
        if (element.id != 1) {
          balls = balls.filter((carrom) => carrom != element);
          if (element.id == player1.carromId) score++;
        } else if ((element.id = 1)) {
          let count = countPlayerCarrom(element.id);
          if (count == 0) {
            balls = balls.filter((carrom) => carrom != element);
            score++;
          } else {
            setTimeout(() => {
              (element.xPos = 300), (element.yPos = 300);
            }, 4000);
          }
        }
      }
    }

    //
  });
};

function countPlayerCarrom(id) {
  let playerCarrom = balls.filter((carrom) => carrom.id == id);
  let count = playerCarrom.length;
  return count;
}

canvas.addEventListener("click", (event) => {});

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    if (strikerPower == 20) return;
    strikerPower++;
    console.log(strikerPower);
  }
  if (event.code == "ArrowDown") {
    if (strikerPower == 1) return;
    strikerPower--;
    console.log(strikerPower);
  }
  if (event.code == "ArrowRight") {
    striker.xPos = striker.xPos + 5;
    console.log(striker.xPos);
  }
  if (event.code == "ArrowLeft") {
    striker.xPos = striker.xPos - 5;
    console.log(striker.xPos);
  }
  if (event.code == "KeyA") {
    if (striker.angle < 0) return;
    striker.angle -= (15 * Math.PI) / 180;
    console.log(striker.angle);
  }
  if (event.code == "KeyD") {
    if (striker.angel == Math.PI) return;
    striker.angle += (15 * Math.PI) / 180;
    console.log(striker.angle);
  }
  if (event.code == "Space") {
    strike();
    //console.log(striker.angle);
  }
});

let strike = () => {
  striker.dx = Math.cos(striker.angle);

  striker.dy = Math.sin(striker.angle);
  striker.vx = -striker.dx * striker.speed; // velocity along x-axis
  striker.vy = -striker.dy * striker.speed; // velocity along y-axis

  const myTimeout = setTimeout(changeStrikerPosition, 5000);

  function changeStrikerPosition() {
    striker.xPos = 300;
    striker.yPos = 520;
    striker.angle = (90 * Math.PI) / 180;
  }
  //let motion = setInterval(() => {
  //strikerPower -= 0.1;

  // striker.xPos -= striker.vx;
  // striker.yPos -= striker.vy;

  // if (strikerPower <= 1) {
  //   // clearInterval(motion);
  // }
  //}, 10);
};

function game() {
  document.getElementById("score").innerHTML = score;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPockets();
  checkBallCollision();

  balls.forEach((element) => {
    element.draw();
    //if (Math.abs(element.vx) > 0.2 || Math.abs(element.vy) > 0.2) {
    element.update();
    if (Math.abs(striker.vx) != 0) {
      //console.log(`vx:${striker.vx}`);
    }
    if (Math.abs(striker.vy) != 0) {
      //console.log(`vy:${striker.vy}`);
    }
    //}
    //element.update();
    element.checkWallCollision();
  });
  checkPockets();
}
setInterval(game, 1000 / 144);
