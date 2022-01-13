/**Function to check if a carrom is pocketed following the rules of the game mode Black and White
 * @param {number} activePlayerCarromCount - number of active users carrom on the board
 * @param {object} addCarromForFoul - object of a carrom to be added on the board in case of foul
 */
let checkPocketsForBlackAndWhite = () => {
  allCarroms.forEach((element) => {
    if (
      (element.xPos < 2 * pocketRadius && element.yPos < 2 * pocketRadius) ||
      (element.xPos < 2 * pocketRadius &&
        element.yPos > canvas.height - 2 * pocketRadius) ||
      (element.xPos > canvas.width - 2 * pocketRadius &&
        element.yPos < 2 * pocketRadius) ||
      (element.xPos > canvas.width - 2 * pocketRadius &&
        element.yPos > canvas.height - 2 * pocketRadius)
    ) {
      let activePlayerCarromCount = countPlayerCarrom(activePlayer.carromId);
      if (element.id != 0) {
        if (element.id != 1) {
          allCarroms = allCarroms.filter((carrom) => carrom != element);
          if (element.id == activePlayer.carromId) {
            activePlayer.score++;
            carromPocketd++;
          }
          if (element.id == opponent.carromId) {
            opponent.score++;
            if (activePlayerCarromCount != 5) {
              activePlayer.score--;
              let addCarromForFoul = new Carrom(
                activePlayer.carromId,
                300,
                300,
                carromRadius,
                activePlayer.carromColor
              );
              //console.log("foul");
              setTimeout(() => {
                allCarroms.push(addCarromForFoul);
              }, 4000);
            }
          }
        } else if ((element.id = 1)) {
          if (activePlayerCarromCount == 0) {
            allCarroms = allCarroms.filter((carrom) => carrom != element);
            activePlayer.score++;
            //console.log("Game over");
            setTimeout(() => {
              gameOver();
            }, 1000);
            carromPocketd++;
          } else {
            carromPocketd++;
            let holdQueen = element;
            allCarroms = allCarroms.filter((carrom) => carrom != element);

            setTimeout(() => {
              holdQueen.vx = 0;
              holdQueen.vy = 0;
              holdQueen.xPos = 300;
              holdQueen.yPos = 300;
              allCarroms.push(holdQueen);
            }, 4000);
          }
        }
      } else {
        let holdStriker = element;
        allCarroms = allCarroms.filter((carrom) => carrom != element);
        carromPocketd = 0;
        setTimeout(() => {
          holdStriker.vx = 0;
          holdStriker.vy = 0;
          allCarroms.push(holdStriker);
        }, 5000);
      }
    }
  });
};

/**Function to check if a carrom is pocketed following the rules of the game mode Points Game
 */
let checkPocketsForPointsGame = () => {
  allCarroms.forEach((element) => {
    if (
      (element.xPos < 2 * pocketRadius && element.yPos < 2 * pocketRadius) ||
      (element.xPos < 2 * pocketRadius &&
        element.yPos > canvas.height - 2 * pocketRadius) ||
      (element.xPos > canvas.width - 2 * pocketRadius &&
        element.yPos < 2 * pocketRadius) ||
      (element.xPos > canvas.width - 2 * pocketRadius &&
        element.yPos > canvas.height - 2 * pocketRadius)
    ) {
      if (element.id != 0) {
        if (element.id != 1) {
          allCarroms = allCarroms.filter((carrom) => carrom != element);
          element.id == 2
            ? (activePlayer.score += 5)
            : (activePlayer.score += 10);

          carromPocketd++;
        } else if ((element.id = 1)) {
          if (allCarroms.length == 2) {
            allCarroms = allCarroms.filter((carrom) => carrom != element);
            activePlayer.score += 20;
            //console.log("Game over");
            setTimeout(() => {
              gameOver();
            }, 1000);
            carromPocketd++;
          } else {
            carromPocketd++;
            let holdQueen = element;
            allCarroms = allCarroms.filter((carrom) => carrom != element);

            setTimeout(() => {
              holdQueen.vx = 0;
              holdQueen.vy = 0;
              holdQueen.xPos = 300;
              holdQueen.yPos = 300;
              allCarroms.push(holdQueen);
            }, 4000);
          }
        }
      } else {
        let holdStriker = element;
        allCarroms = allCarroms.filter((carrom) => carrom != element);
        carromPocketd = 0;
        setTimeout(() => {
          holdStriker.vx = 0;
          holdStriker.vy = 0;
          allCarroms.push(holdStriker);
        }, 5000);
      }
    }
  });
};

/**
 * @function
 * @param {number} id - id of the carrom to be counted
 * @returns - number of carrom of the given id on the board
 */
function countPlayerCarrom(id) {
  let playerCarrom = allCarroms.filter((carrom) => carrom.id == id);
  let count = playerCarrom.length;
  return count;
}

/**
 * Function to generate striking conditions for the striker and strike
 */
let strike = () => {
  striker.dx = Math.cos(striker.angle);
  striker.dy = Math.sin(striker.angle);
  striker.vx = -striker.dx * striker.speed; // striker velocity along x-axis
  striker.vy = -striker.dy * striker.speed; // striker velocity along y-axis
  canStrike = false;
  const myTimeout = setTimeout(changeStrikerPosition, 5000);
};

/**
 * Function that changes striker position after every turn in context of the active player and Bot
 */
function changeStrikerPosition() {
  if (carromPocketd === 0) swapPlayer();
  carromPocketd = 0;

  if (activePlayer.id == 2) {
    striker.xPos = 300;
    striker.yPos = 80;
    striker.angle = (270 * Math.PI) / 180;
  }
  if (activePlayer.id == 1) {
    striker.xPos = 300;
    striker.yPos = 520;
    striker.angle = (90 * Math.PI) / 180;
  }
  strikerPower = 10;
  if (activePlayer.isBot == true) {
    let newStrikerAngle = botPossibleMove();
    striker.angle = newStrikerAngle;
    strikerPower = getRandomIntInRange(5, 18);
    setTimeout(strike, 2000);
  }
  canStrike = true;
}

/**
 * Function to change the player active status
 */
let swapPlayer = () => {
  players.forEach((player) => {
    if (player.active == true) {
      player.active = false;
    } else {
      player.active = true;
    }
  });
  currentPlayer();
};

/**
 * Function that assigns player as active or opponent
 */
let currentPlayer = () => {
  let activePlayerArray = players.filter((player) => player.active != false);
  activePlayer = activePlayerArray[0];
  let opponentArray = players.filter((player) => player.active != true);
  opponent = opponentArray[0];
};

/**
 *  Function to end the game
 */
let gameOver = () => {
  clearInterval(gameLoop);
  canvas.style.opacity = "0.1";
  winner.innerHTML = checkWinner();
  popUpForGameOver.style.display = "block";
  powerMeter.style.display = "none";
};

/**
 * Function to check who is the winner
 * @returns {string} - Winner Name
 */
let checkWinner = () => {
  let gameWinner;
  players[0].score > players[1].score
    ? (gameWinner = players[0].playerName)
    : (gameWinner = players[1].playerName);
  return gameWinner + " Won";
};
