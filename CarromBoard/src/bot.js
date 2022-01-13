/** Function for bot to choose which carrom to strike in the game mode Black and White
 * @function
 * @returns- angle for the bot to strike
 */

let botPossibleMoveForBlackAndWhite = () => {
  let playerCarrom = allCarroms.filter((carrom) => carrom.id == bot.carromId);
  let playerCarromsAfterTheLine = playerCarrom.filter(
    (carrom) =>
      carrom.yPos > 100 /** 100 - to prevent from striking below the line */
  );
  let playerCarromsBeforeTheLine = playerCarrom.filter(
    (carrom) => carrom.yPos <= 100
  );
  if (playerCarrom.length != 0) {
    let elementWithShortestDistance;
    let minDistance;
    let shortestDistance = canvas.height;

    if (playerCarromsAfterTheLine.length != 0) {
      playerCarromsAfterTheLine.forEach((element) => {
        let distanceFromPocket3 = calcDistanceFromPocket(pocket3, element);
        let distanceFromPocket4 = calcDistanceFromPocket(pocket4, element);

        distanceFromPocket3 > distanceFromPocket4
          ? (minDistance = distanceFromPocket4)
          : (minDistance = distanceFromPocket3);

        if (shortestDistance > minDistance) {
          shortestDistance = minDistance;
          elementWithShortestDistance = element;
        }
      });
      return calcAngleForStrike1(
        elementWithShortestDistance.xPos,
        elementWithShortestDistance.yPos
      );
    } else {
      let indexOfCarromToStrike = getRandomInt(
        playerCarromsBeforeTheLine.length
      );
      console.log(indexOfCarromToStrike);
      let carromToStrike = playerCarromsBeforeTheLine[indexOfCarromToStrike];
      let dummyX;

      carromToStrike.xPos >= 300
        ? (dummyX = 300 + Math.abs(300 - carromToStrike.xPos) / 2)
        : (dummyX = 300 - Math.abs(300 - carromToStrike.xPos) / 2);

      return calcAngleForStrike1(dummyX, canvas.height);
    }
  }
  if (queen.yPos > 100) {
    return calcAngleForStrike1(queen.xPos, queen.yPos);
  } else {
    if (queen.xPos >= 300) {
      return calcAngleForStrike1(
        300 + Math.abs(300 - queen.xPos) / 2,
        canvas.height
      );
    } else {
      return calcAngleForStrike1(
        300 - Math.abs(300 - queen.xPos) / 2,
        canvas.height
      );
    }
  }
};

/** Function for bot to choose which carrom to strike in the game mode Points Game
 * @function
 * @returns- angle for the bot to strike
 */

let botPossibleMoveForPointsGame = () => {
  let CarromsAfterTheLine = allCarroms.filter((carrom) => carrom.yPos > 100);
  let CarromsBeforeTheLine = allCarroms.filter((carrom) => carrom.yPos <= 100);

  if (allCarroms.length != 1) {
    let elementWithShortestDistance;
    let minDistance;
    let shortestDistance = canvas.height;

    if (CarromsAfterTheLine.length != 0) {
      CarromsAfterTheLine.forEach((element) => {
        let distanceFromPocket3 = calcDistanceFromPocket(pocket3, element);
        let distanceFromPocket4 = calcDistanceFromPocket(pocket4, element);

        distanceFromPocket3 > distanceFromPocket4
          ? (minDistance = distanceFromPocket4)
          : (minDistance = distanceFromPocket3);

        if (shortestDistance > minDistance) {
          shortestDistance = minDistance;
          elementWithShortestDistance = element;
        }
      });

      return calcAngleForStrike1(
        elementWithShortestDistance.xPos,
        elementWithShortestDistance.yPos
      );
    } else {
      if (CarromsBeforeTheLine.length == 0) return;
      let indexOfCarromToStrike = getRandomInt(CarromsBeforeTheLine.length);
      let carromToStrike = CarromsBeforeTheLine[indexOfCarromToStrike];
      let dummyX;

      carromToStrike.xPos >= 300
        ? (dummyX = 300 + Math.abs(300 - carromToStrike.xPos) / 2)
        : (dummyX = 300 - Math.abs(300 - carromToStrike.xPos) / 2);

      return calcAngleForStrike1(dummyX, canvas.height);
    }
  }
};
