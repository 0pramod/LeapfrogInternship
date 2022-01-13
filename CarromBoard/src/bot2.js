/// bot

let botPossibleMoveForPointsGame = () => {
  //let playerCarrom = allCarroms.filter((carrom) => carrom.id == bot.carromId);
  let CarromsAfterTheLine = allCarroms.filter((carrom) => carrom.yPos > 100);
  let CarromsBeforeTheLine = allCarroms.filter((carrom) => carrom.yPos <= 100);

  if (allCarroms.length != 1) {
    //let holdElement;
    let finalElement;
    let minDistance;
    let finalDistance = 800;

    if (CarromsAfterTheLine.length != 0) {
      CarromsAfterTheLine.forEach((element) => {
        let distanceFromPocket3 = calcDistanceFromPocket(pocket3, element);
        let distanceFromPocket4 = calcDistanceFromPocket(pocket4, element);

        distanceFromPocket3 > distanceFromPocket4
          ? (minDistance = distanceFromPocket4)
          : (minDistance = distanceFromPocket3);
        //console.log(`mindistance1:${minDistance}`);

        // finalDistance > minDistance
        //   ? (finalDistance = minDistance)
        //   : (finalDistance = finalDistance);

        if (finalDistance > minDistance) {
          finalDistance = minDistance;
          finalElement = element;
        }
      });

      //finalElement.color = "green";

      return calcAngleForStrike(finalElement.xPos, finalElement.yPos);
    } else {
      if (CarromsBeforeTheLine.length == 0) return;
      let indexOfCarromToStrike = getRandomInt(CarromsBeforeTheLine.length);
      //console.log(indexOfCarromToStrike);
      let carromToStrike = CarromsBeforeTheLine[indexOfCarromToStrike];
      let dummyX;

      carromToStrike.xPos >= 300
        ? (dummyX = 300 + Math.abs(300 - carromToStrike.xPos) / 2)
        : (dummyX = 300 - Math.abs(300 - carromToStrike.xPos) / 2);

      return calcAngleForStrike(dummyX, canvas.height);
    }
  }
  //   if (queen.yPos > 100) {
  //     return calcAngleForStrike(queen.xPos, queen.yPos);
  //   } else {
  //     if (queen.xPos >= 300) {
  //       return calcAngleForStrike(
  //         300 + Math.abs(300 - queen.xPos) / 2,
  //         canvas.height
  //       );
  //     } else {
  //       return calcAngleForStrike(
  //         300 - Math.abs(300 - queen.xPos) / 2,
  //         canvas.height
  //       );
  //     }
  //   }
};

let calcDistanceFromPocket = (pocket, carrom) => {
  differenceInXcoordinate = pocket.x - carrom.xPos;
  differenceInYcoordinate = pocket.y - carrom.yPos;
  let distanceFromPocket = Math.sqrt(
    differenceInXcoordinate * differenceInXcoordinate +
      differenceInYcoordinate * differenceInYcoordinate
  );
  return distanceFromPocket;
};

let calcAngleForStrike = (x, y) => {
  let angle = Math.atan((y - striker.yPos) / (x - striker.xPos));

  console.log(`Angle in radian=${angle}`);

  console.log(`Angle in degree=${(angle * 180) / Math.PI}`);
  console.log(`AngleUpdated=${Math.PI + angle}`);
  // return 1.5 * Math.PI - angle;
  if (angle > 0) {
    return Math.PI + Math.abs(angle);
  } else {
    return 2 * Math.PI - Math.abs(angle);
  }
};
