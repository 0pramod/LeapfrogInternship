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
      if (element.id != strikerCarromId) {
        if (element.id != queenCarromId) {
          allCarroms = allCarroms.filter((carrom) => carrom != element);
          if (element.id == activePlayer.carromId) {
            activePlayer.score++;
            scoreSound.play();
            carromPocketd++;
          }
          if (element.id == opponent.carromId) {
            opponent.score++;
            foulSound.play();
            if (activePlayerCarromCount != 5) {
              activePlayer.score--;
              let addCarromForFoul = new Carrom(
                activePlayer.carromId,
                300,
                300,
                carromRadius,
                activePlayer.carromColor
              );
              //foul
              setTimeout(() => {
                allCarroms.push(addCarromForFoul);
              }, 4000);
            }
          }
        } else if ((element.id = queenCarromId)) {
          if (activePlayerCarromCount == 0) {
            allCarroms = allCarroms.filter((carrom) => carrom != element);
            activePlayer.score++;
            scoreSound.play();
            //game over
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
        foulSound.play();
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
      if (element.id != strikerCarromId) {
        if (element.id != queenCarromId) {
          allCarroms = allCarroms.filter((carrom) => carrom != element);
          element.id == blackCarromId
            ? (activePlayer.score += 5)
            : (activePlayer.score += 10);

          scoreSound.play();
          carromPocketd++;
        } else if ((element.id = queenCarromId)) {
          if (allCarroms.length == 2) {
            allCarroms = allCarroms.filter((carrom) => carrom != element);
            activePlayer.score += 20;
            scoreSound.play();
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
        foulSound.play();
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
