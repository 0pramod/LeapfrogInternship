let checkPocketsForCarroms = () => {
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
            console.log("Game over");
            console.log(allCarroms.length);
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

let strike = () => {
  striker.dx = Math.cos(striker.angle);
  striker.dy = Math.sin(striker.angle);
  striker.vx = -striker.dx * striker.speed; // velocity along x-axis
  striker.vy = -striker.dy * striker.speed; // velocity along y-axis
  canStrike = false;
  const myTimeout = setTimeout(changeStrikerPosition, 5000);

  function changeStrikerPosition() {
    console.log(carromPocketd);
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
      console.log(strikerPower);
      console.log("hello");
      setTimeout(strike, 2000);
    }

    // let newStrikerAngle = botPossibleMove();
    // striker.angle = newStrikerAngle;
    // strike();
    canStrike = true;
  }
};
let swapPlayer = () => {
  // let currentPlayerStatus = activePlayer;
  // if (currentPlayer == 1) activePlayer = 2;

  // if (currentPlayer == 2) activePlayer = 1;
  players.forEach((player) => {
    if (player.active == true) {
      player.active = false;
    } else {
      player.active = true;
    }
  });
  console.log(`id: ${players[0].id} and active: ${players[0].active}`);
  currentPlayer();
};

let currentPlayer = () => {
  let activePlayerArray = players.filter((player) => player.active != false);
  activePlayer = activePlayerArray[0];
  let opponentArray = players.filter((player) => player.active != true);
  opponent = opponentArray[0];

  //return activePlayerArray[0];
  //console.log(tt);
};
