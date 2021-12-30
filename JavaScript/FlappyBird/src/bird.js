const container = document.getElementById("container");
const canvas = document.getElementById("box");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
canvas.style.backgroundImage = 'url("images/background.png")';
canvas.style.backgroundSize = "cover";

const birdWidth = 30;
const birdHeight = 30;
var x = 10;
var y = 0;
const fallSpeed = 2;
const pipeSpeed = 10;
var yDirection = 1;
var birdPositionY = 0;
jump = false;
var pipePositionX = canvas.width;
let minGap = 100;
let maxGap = 250;

var score = 0;
var highScore = 0;
collision = false;

//
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  function birdDown(y) {
    var birdMotion = setInterval(() => {
      const bird = new Image();
      bird.src = "images/bird.png";
      bird.onload = function () {
        ctx.clearRect(x, y, birdWidth, birdHeight);
        y += 1 + fallSpeed;
        birdPositionY = y;
        ctx.drawImage(bird, x, y, birdWidth, birdHeight);
        if (y >= canvas.height - birdHeight) {
          collision = true;
          if (score > highScore) highScore = score;
          document.getElementById("your-score").innerHTML = score;

          document.getElementById("restart").style.display = "block";
          document.getElementById("score-card").style.display = "none";
          clearInterval(birdMotion);
        }
        if (jump == true) {
          clearInterval(birdMotion);
          birdUp(y);
        }
        if (collision == true) {
          clearInterval(birdMotion);
          score = 0;
        }
      };
    }, 10);
  }
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      jump = true;
    }
  });

  if (collision != true) {
    function birdUp(y) {
      let max = y - birdWidth * 2.5;
      var birdMotionUp = setInterval(() => {
        const bird = new Image();
        bird.src = "images/bird.png";
        bird.onload = function () {
          ctx.clearRect(x, y, birdWidth, birdHeight);
          y += -1;
          birdPositionY = y;
          ctx.drawImage(bird, x, y, birdWidth, birdHeight);
          if (y <= 20 || y <= max) {
            clearInterval(birdMotionUp);
            jump = false;
            birdDown(y);
          }
        };
      }, 10);
    }
    birdDown(y);

    function pipes() {
      gap = randomInteger(minGap, maxGap);
      topPipeHeight = randomInteger(100, 250);
      let drawPipes = setInterval(() => {
        const pipeBottom = new Image();
        pipeBottom.src = "images/pipeup.png";
        const pipeTop = new Image();
        pipeTop.src = "images/pipedown.png";

        ctx.clearRect(pipePositionX, 0, birdWidth, canvas.height);
        if (pipePositionX <= -birdWidth) {
          pipePositionX = canvas.width;
          gap = randomInteger(minGap, maxGap);
          topPipeHeight = randomInteger(100, 250);
          score++;
          if (score > highScore) highScore = score;
          document.getElementById("score").innerHTML = score;
        } else {
          pipePositionX = pipePositionX - pipeSpeed;
        }

        //collision
        if (pipePositionX <= birdWidth && pipePositionX >= 0) {
          //console.log("pipe");
          if (
            birdPositionY <= topPipeHeight ||
            birdPositionY >= gap + topPipeHeight
          ) {
            //console.log("collision");
            collision = true;
            document.getElementById("your-score").innerHTML = score;
            score = 0;
            clearInterval(drawPipes);
            pipePositionX = canvas.width;

            document.getElementById("restart").style.display = "block";
            document.getElementById("score-card").style.display = "none";
          }
        }
        //

        pipeTop.onload = function () {
          ctx.drawImage(pipeTop, pipePositionX, 0, birdWidth, topPipeHeight);
        };
        pipeBottom.onload = function () {
          ctx.drawImage(
            pipeBottom,
            pipePositionX,
            topPipeHeight + gap,
            birdWidth,
            canvas.height
          );
        };
      }, 1000 / 60);
    }
    pipes();
  }
  var restart = document.getElementById("restart-button");
  restart.addEventListener("click", () => restartGame());

  function restartGame() {
    document.getElementById("restart").style.display = "none";
    document.getElementById("score-card").style.display = "block";
    console.log("testing");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collision = false;
    score = 0;
    birdDown(0);
    pipes();
  }
}
console.log(highScore);

var start = document.getElementById("start-button");
start.addEventListener("click", () => startGame());

function startGame() {
  document.getElementById("start").style.display = "none";
  game();
  document.getElementById("score-card").style.display = "block";
}
