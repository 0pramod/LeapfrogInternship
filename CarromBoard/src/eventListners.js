/**
 * Event Listeners for different events
 */

canvas.addEventListener("click", (event) => {
  let mousePosition = event.clientX - canvasLeftPosition;
  if (canStrike == false) return;
  if (mousePosition <= 120 || mousePosition >= 480) return;
  striker.xPos = event.clientX - canvasLeftPosition;
});

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
    striker.xPos = striker.xPos + 5;
  }
  if (event.code == "ArrowLeft") {
    if (striker.xPos <= 120) return;
    striker.xPos = striker.xPos - 5;
  }
  if (event.code == "KeyA") {
    if (striker.angle < 0) return;
    striker.angle -= (15 * Math.PI) / 180;
  }
  if (event.code == "KeyD") {
    if (striker.angel == Math.PI) return;
    striker.angle += (15 * Math.PI) / 180;
  }
  if (event.code == "Space") {
    strike();
  }
});
