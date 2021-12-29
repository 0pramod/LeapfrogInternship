const carWidth = 100;
const carHeight = 120;
const canvas = document.getElementById("box");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = window.innerHeight;
canvas.style.border = "solid 2px";

let score = 0;
let possibleXPositions = [50, 250, 450];
let possibleYPositions = [-100, -300, -400];
let speed = 5;

let playerCarPositionX = 250;
let playerCarPositionY = canvas.height - 150;

var gameOver;

function drawRoad() {
  const road = new Image();
  road.src = "images/theroad.jpg";
  ctx.drawImage(road, 0, y - canvas.height, canvas.width, canvas.height * 2);
  const moveRoad = () => {
    y += speed;
    if (y >= canvas.height) y = 0;
  };
  if (gameOver != true) moveRoad();
}

class obstacle {
  constructor(y, laneIndex) {
    this.x = getRandomElement(possibleXPositions);
    this.y = y;
    this.laneIndex = laneIndex;
    this.ctx = ctx;
  }
  draw = () => {
    const obstacle = new Image();
    obstacle.src = "images/truck.png";

    ctx.drawImage(obstacle, this.x, this.y, carWidth, carHeight);
    this.y += speed;
  };
  move = () => {
    this.y++;
    if (this.y > canvas.height) {
      this.y = getRandomElement(possibleYPositions);
      this.x = getRandomElement(possibleXPositions);
      score++;
    }
    document.getElementById("score").innerHTML = score;
  };

  checkCollision = () => {
    cars.forEach((element) => {
      if (element.x == playerCarPositionX && element.y > canvas.height - 250) {
        document.getElementById("text").innerHTML = "collision";
        document.getElementById("your-score").innerHTML = score;
        element.y = getRandomElement(possibleYPositions);
        score = 0;
        gameOver = true;
        document.getElementById("restart").style.display = "block";
      }
    });
  };
}

var cars = [];
for (let i = 0; i < 3; i++) {
  y = getRandomElement(possibleYPositions);
  cars.push(new obstacle(y));
}

function drawPlayer() {
  const playerCar = new Image();
  playerCar.src = "images/car.png";
  ctx.drawImage(
    playerCar,
    playerCarPositionX,
    playerCarPositionY,
    carWidth,
    carHeight
  );
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    if (playerCarPositionX == 250 || playerCarPositionX == 450) {
      playerCarPositionX -= 200;
    }
  }

  if (e.code === "ArrowRight" && playerCarPositionX < 450) {
    playerCarPositionX += 200;
  }
});

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawPlayer();
  for (let i = 0; i < cars.length; i++) {
    cars[i].move();
    cars[i].draw();
    cars[i].checkCollision();
  }
  if (gameOver != true) {
    requestAnimationFrame(gameLoop);
  }
};

var start = document.getElementById("start-button");
start.addEventListener("click", () => startGame());

var restart = document.getElementById("restart-button");
restart.addEventListener("click", () => restartGame());

function startGame() {
  document.getElementById("start").style.display = "none";
  gameOver = false;
  gameLoop();
}
function restartGame() {
  document.getElementById("restart").style.display = "none";
  gameOver = false;
  gameLoop();
}
