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
      return calcAngleForStrike(
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

      return calcAngleForStrike(dummyX, canvas.height);
    }
  }
  if (queen.yPos > 100) {
    return calcAngleForStrike(queen.xPos, queen.yPos);
  } else {
    if (queen.xPos >= 300) {
      return calcAngleForStrike(
        300 + Math.abs(300 - queen.xPos) / 2,
        canvas.height
      );
    } else {
      return calcAngleForStrike(
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

      return calcAngleForStrike(
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

      return calcAngleForStrike(dummyX, canvas.height);
    }
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

/**
 * @function - to calculate the angle between striker position and passed carrom position
 * @param {number} x - position along x-axis
 * @param {number} y - position along y-axis
 * @returns - angle between carrom and position
 */
let calcAngleForStrike = (x, y) => {
  let angle = Math.atan((y - striker.yPos) / (x - striker.xPos));
  if (angle > 0) {
    return Math.PI + Math.abs(angle);
  } else {
    return 2 * Math.PI - Math.abs(angle);
  }
};
