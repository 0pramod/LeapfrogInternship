let scoreBoard1 = document.getElementById("scoreboard1");
let scoreBoard2 = document.getElementById("scoreboard2");
scoreBoard1.style.left = "50px";
scoreBoard1.style.top = "50px";
scoreBoard1.style.display = "none";
scoreBoard2.style.right = "50px";
scoreBoard2.style.top = "50px";
scoreBoard2.style.display = "none";

let body = document.body;
body.style.background = 'url("images/cbb.jpg")';

let page = document.getElementsByClassName("page");
let page1 = document.getElementsByClassName("page1");
let page2 = document.getElementsByClassName("page2");

let activateGameModeBlackAndWhite = () => {
  gameMode = "blackAndWhite";
  for (let i = 0; i < 3; i++) {
    page1[i].style.display = "none";
    page2[i].style.display = "block";
  }
};
let activateGameModePointsGame = () => {
  gameMode = "pointsGame";
  for (let i = 0; i < 3; i++) {
    page1[i].style.display = "none";
    page2[i].style.display = "block";
  }
};

let something2 = () => {
  for (let i = 0; i < 3; i++) {
    page2[i].style.display = "none";
  }
  body.style.background = 'url("images/blackboard.jpg")';
  page[0].style.display = "none";
};

let gameModeBlackAndWhite = document.getElementById("blackAndWhite");
let gameModePointsGame = document.getElementById("pointsGame");
gameModeBlackAndWhite.onclick = activateGameModeBlackAndWhite;
gameModePointsGame.onclick = activateGameModePointsGame;

let powerMeter = document.getElementById("powerMeter");

powerMeter.style.left = canvasLeftPosition - 150 + "px";
powerMeter.style.top = canvasTopPosition + canvas.height / 2 + "px";

let popUps = document.getElementById("display");
popUps.style.left = canvasLeftPosition + 100 + "px";
popUps.style.top = canvasTopPosition + 200 + "px";

let popUpForGameOver = document.getElementById("popUpForGameOver");
popUpForGameOver.style.left = canvasLeftPosition + 120 + "px";
popUpForGameOver.style.top = canvasTopPosition + 220 + "px";

let winner = document.getElementById("winnerName");

let player1Name = document.getElementById("player1Name");
let player2Name = document.getElementById("player2Name");

let instructions = document.getElementById("instructions");
instructions.style.left = canvasLeftPosition - 100 + "px";
instructions.style.top = canvasTopPosition + "px";

let changeDisplayToNone = () => {
  instructions.style.display = "none";
};
let continueBtn = document.getElementById("continue");
continueBtn.onclick = changeDisplayToNone;
