/**
 * @function- to initiate canvas and other elements on the game page
 */
let initaiteGamePlayPage = () => {
  instructions.style.display = "block";
  canvas.style.display = "block";
  scoreBoard1.style.display = "block";
  scoreBoard2.style.display = "block";
  powerMeter.style.display = "block";
};

/**
 * @function - to select game as per the choosen game mode and players type
 * @param {string} gameMode - defines the Selected game mode to play
 * @param {string} playType - defines if the user has selected player vs player or player vs bot
 * @param {function} checkPockets - is assigned the function to check pockets if a carrom is pocketed or not 
 *                                    accourding to the rules for the game mode selected
 * @param {finction} botPossibleMove -is assigned the finction for bot for the  game mode selected
   
 }}
 */
let startGame = () => {
  if (gameMode == "blackAndWhite") {
    if (playType == "playerVsPlayer") {
      checkPockets = checkPocketsForBlackAndWhite;
      botPossibleMove = botPossibleMoveForBlackAndWhite;
      something2();
      players = [player1, player2];
      activePlayer = player1;
      opponent = player2;
      gameLoop = setInterval(game, 1000 / 144);
    } else if (playType == "playerVsBot") {
      checkPockets = checkPocketsForBlackAndWhite;
      botPossibleMove = botPossibleMoveForBlackAndWhite;
      something2();
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
      something2();
      players = [player1, player2];
      activePlayer = player1;
      opponent = player2;
      gameLoop = setInterval(game, 1000 / 144);
    } else if (playType == "playerVsBot") {
      checkPockets = checkPocketsForPointsGame;
      botPossibleMove = botPossibleMoveForPointsGame;
      something2();
      players = [player1, bot];
      activePlayer = player1;
      opponent = bot;
      gameLoop = setInterval(game, 1000 / 144);
    }
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
  player1Name.innerHTML = players[0].playerName + " Score:";
  document.getElementById("score").innerHTML = players[0].score;
  player2Name.innerHTML = players[1].playerName + " Score:";
  document.getElementById("score2").innerHTML = players[1].score;
  powerMeter.value = strikerPower;
}

let initiatePlayerVsPlayer = () => {
  initaiteGamePlayPage();
  playType = "playerVsPlayer";
  startGame();
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
