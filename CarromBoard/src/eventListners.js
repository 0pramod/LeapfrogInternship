document.addEventListener("keydown", (event) => {
  if (canStrike == false) return;
  if (event.code === "ArrowUp") {
    if (strikerPower == 20) return;
    strikerPower++;
  }
  if (event.code == "ArrowDown") {
    if (strikerPower == 1) return;
    strikerPower--;
  }
  if (event.code == "ArrowRight") {
    if (striker.xPos >= 480) return;
    striker.xPos = striker.xPos + 10;
  }
  if (event.code == "ArrowLeft") {
    if (striker.xPos <= 120) return;
    striker.xPos = striker.xPos - 10;
  }
  if (event.code == "Space") {
    strike();
    hitSound.play();
  }
});

let arrowStartX, arrowStartY, arrowEndX, arrowEndY;

canvas.addEventListener("click", (event) => {
  let mousePositionX =
    event.clientX - canvasLeftPosition - 20;
  let mousePositionY = event.clientY - canvasTopPosition - 20;
  if (canStrike == false) return;
  if (striker.yPos > 500) {
    /** 500- to represent striker position at the bottom side */
    if (mousePositionY < 500) {
      clickSound.play();
      striker.angle = calcAngleForStrike2(mousePositionX, mousePositionY);
      arrowStartX = striker.xPos;
      arrowStartY = striker.yPos;
      arrowEndX = mousePositionX;
      arrowEndY = mousePositionY
    }
  }
  if (striker.yPos < 100) {
    /** 100- to represent striker position at the top side */
    if (mousePositionY > 100) {
      clickSound.play();
      striker.angle = calcAngleForStrike1(mousePositionX, mousePositionY);
      arrowStartX = striker.xPos;
      arrowStartY = striker.yPos;
      arrowEndX = mousePositionX;
      arrowEndY = mousePositionY;
    }
  }
});

const restartBtn = document.getElementById("restart");
const restartBtn1 = document.getElementById("restart1");

restartBtn.addEventListener("click", (event) => {
  restartGame();
  popUpForGameOver.style.display = "none";
  canvas.style.opacity = "1";
  powerMeter.style.display = "block";
});
restartBtn1.addEventListener("click", (event) => {
  restartGame();
});
