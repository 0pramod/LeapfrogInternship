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


let strike = () => {
  striker.dx = Math.cos(striker.angle);
  striker.dy = Math.sin(striker.angle);
  striker.vx = -striker.dx * striker.speed; // striker velocity along x-axis
  striker.vy = -striker.dy * striker.speed; // striker velocity along y-axis
  canStrike = false;
  arrowStartX = arrowStartY = arrowEndX = arrowEndY = undefined;

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
  powerText.style.display = "none";
  clapSound.play();
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

/**
 * @function - to calculate the angle between striker position and passed position
 *              when striker is on the top side
 * @param {number} x - position along x-axis
 * @param {number} y - position along y-axis
 * @returns - angle between striker and position
 */
let calcAngleForStrike1 = (x, y) => {
  let angle = Math.atan((y - striker.yPos) / (x - striker.xPos));
  if (angle > 0) {
    return Math.PI + Math.abs(angle);
  } else {
    return 2 * Math.PI - Math.abs(angle);
  }
};

/**
 * @function - to calculate the angle between striker position and passed position
 *              when striker is on the bottom side
 * @param {number} x - position along x-axis
 * @param {number} y - position along y-axis
 * @returns - angle between striker and position
 */
let calcAngleForStrike2 = (x, y) => {
  let angle = Math.atan((y - striker.yPos) / (x - striker.xPos));
  if (angle < 0) {
    return Math.PI - Math.abs(angle);
  } else {
    return angle;
  }
};

/**
 * @function - to calculate the distance between pocket and carrom
 * @param {object} pocket - pocket to calculate distance from
 * @param {object} carrom - carrom to calculate distance for
 * @returns - distance between pocket and carrom
 */
let calcDistanceFromPocket = (pocket, carrom) => {
  differenceInXcoordinate = pocket.x - carrom.xPos;
  differenceInYcoordinate = pocket.y - carrom.yPos;
  let distanceFromPocket = Math.sqrt(
    differenceInXcoordinate * differenceInXcoordinate +
      differenceInYcoordinate * differenceInYcoordinate
  );
  return distanceFromPocket;
};


function drawArrow(context, fromx, fromy, tox, toy) {
  context.save();

  const headlen = 10; 
  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);

  // Draw the arrow line
  context.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.strokeStyle = "red"; 
  context.lineWidth = 2;
  context.stroke();

  // Draw the arrow head
  context.beginPath();
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.strokeStyle = "red"; 
  context.fillStyle = "red"; 
  context.lineWidth = 2;
  context.stroke();
  context.fill();

  context.restore();
}

/**
 * Function to restart the game
 * resets all carrom state to initial states
 * resets players changes and restarts the game
 */
let restartGame = () => {
  clearInterval(gameLoop);
  allCarroms = allCarromsInitialStates;
  allCarroms.forEach((element) => {
    element.xPos = element.initialPositionX;
    element.yPos = element.initialPositionY;
    element.vx = element.vy = 0;
  });
  players[0].score = 0;
  players[1].score = 0;
  startGame();
};
