/**
 * @function- to initiate canvas and other elements on the game page
 */
let initaiteGamePlayPage = () => {
  instructions.style.display = "block";
  canvas.style.display = "block";
  scoreBoard1.style.display = "block";
  scoreBoard2.style.display = "block";
  powerMeter.style.display = "block";
  powerText.style.display = "block";
  btnHolder.style.display = "block";
  document.getElementById(
    "displayGameMode"
  ).innerHTML = `Game Mode: ${gameMode}`;
};

/**
 * @function - to select game as per the choosen game mode and players type
 * @param {string} gameMode - defines the Selected game mode to play
 * @param {string} playType - defines if the user has selected player vs player or player vs bot
 * @param {function} checkPockets - is assigned the function to check pockets if a carrom is pocketed or not
 *                                    accourding to the rules for the game mode selected
 * @param {finction} botPossibleMove -is assigned the finction for bot for the  game mode selected
 */
let startGame = () => {
  if (gameMode == "blackAndWhite") {
    if (playType == "playerVsPlayer") {
      checkPockets = checkPocketsForBlackAndWhite;
      botPossibleMove = botPossibleMoveForBlackAndWhite;
      changeStyleOfElements();
      players = [player1, player2];
      activePlayer = player1;
      opponent = player2;
      gameLoop = setInterval(game, 1000 / 144);
    } else if (playType == "playerVsBot") {
      checkPockets = checkPocketsForBlackAndWhite;
      botPossibleMove = botPossibleMoveForBlackAndWhite;
      changeStyleOfElements();
      players = [player1, bot];
      activePlayer = player1;
      opponent = bot;
      gameLoop = setInterval(game, 1000 / 144);
    }
  }

  if (gameMode == "pointsGame") {
    if (playType == "playerVsPlayer") {
      checkPockets = checkPocketsForPointsGame;
      botPossibleMove = botPossibleMoveForPointsGame;
      changeStyleOfElements();
      players = [player1, player2];
      activePlayer = player1;
      opponent = player2;
      gameLoop = setInterval(game, 1000 / 144);
    } else if (playType == "playerVsBot") {
      checkPockets = checkPocketsForPointsGame;
      botPossibleMove = botPossibleMoveForPointsGame;
      changeStyleOfElements();
      players = [player1, bot];
      activePlayer = player1;
      opponent = bot;
      gameLoop = setInterval(game, 1000 / 144);
    }
    document.getElementById("carromColor1").style.display = "none";
    document.getElementById("carromColor2").style.display = "none";
  }
};

/**
 * @function - starts the game/ is looped in a an interval
 */
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPockets();
  checkCarromCollision();
  allCarroms.forEach((element) => {
    element.draw();
    element.update();
    element.checkWallCollision();
  });
  checkPockets();

  // Draw the arrow if the positions are set
  if (arrowStartX !== undefined && arrowStartY !== undefined && arrowEndX !== undefined && arrowEndY !== undefined) {
    drawArrow(ctx, arrowStartX, arrowStartY, arrowEndX, arrowEndY);
  }

  player1Name.innerHTML = players[0].playerName + " Score:";
  document.getElementById("score").innerHTML = players[0].score;
  player2Name.innerHTML = players[1].playerName + " Score:";
  document.getElementById("score2").innerHTML = players[1].score;
  powerMeter.value = strikerPower;
}

let initiatePlayerVsPlayer = () => {

const playerNameModal = document.getElementById("playerNameModal");
const player1NameInput = document.getElementById("firstPlayerName");
const player2NameInput = document.getElementById("secondPlayerName");
const enterNamesButton = document.getElementById("enterNamesButton");
playerNameModal.style.display = "flex";


enterNamesButton.onclick = () => {
  const player1Name = player1NameInput.value.trim() || "Player1"; // Default to "Player1" if no name is entered
  const player2Name = player2NameInput.value.trim() || "Player2"; // Default to "Player2" if no name is entered

  // Update the player names
  player1.playerName = player1Name;
  player2.playerName = player2Name;

  // Hide the modal
  playerNameModal.style.display = "none";
    initaiteGamePlayPage();
  playType = "playerVsPlayer";
  startGame();
};
};
let initiatePlayerVsBot = () => {
  initaiteGamePlayPage();
  playType = "playerVsBot";
  startGame();
};

let vsPlayer = document.getElementById("vsPlayer");
let vsBot = document.getElementById("vsBot");
vsPlayer.onclick = initiatePlayerVsPlayer;
vsBot.onclick = initiatePlayerVsBot;
