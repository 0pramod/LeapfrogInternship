/** function to check collision between carroms and update their parameters
 *@param {number} xDiff- hold the difference along the x-asis between carroms
 *@param {number} yDiff- hold the difference along the y-asis between carroms
 *@param {number} distance- distance between carroms
 *@param {number} vCollision- vector of the direction of collision
 *@param {number} vCollisionNorm- normal vector
 *@param {number} vRelativeVelocity- relative Velocity
 */
let checkCarromCollision = () => {
  allCarroms.forEach((element) => {
    allCarroms.forEach((test) => {
      if (element !== test) {
        var xDiff = test.xPos - element.xPos;
        var yDiff = test.yPos - element.yPos;
        var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        if (distance <= test.radius + element.radius) {
          let vCollision = {
            x: element.xPos - test.xPos,
            y: element.yPos - test.yPos,
          };
          let distance = Math.sqrt(
            (element.xPos - test.xPos) * (element.xPos - test.xPos) +
              (element.yPos - test.yPos) * (element.yPos - test.yPos)
          );
          let vCollisionNorm = {
            x: vCollision.x / distance,
            y: vCollision.y / distance,
          };
          let vRelativeVelocity = {
            x: test.vx - element.vx,
            y: test.vy - element.vy,
          };
          let speed =
            vRelativeVelocity.x * vCollisionNorm.x +
            vRelativeVelocity.y * vCollisionNorm.y;

          // to prevent overlap
          if (speed > 0) {
            let impulse = (2 * speed) / (test.mass + element.mass);

            test.vx -=
              impulse * element.mass * vCollisionNorm.x * test.restitution;
            test.vy -=
              impulse * element.mass * vCollisionNorm.y * test.restitution;
            element.vx +=
              impulse * test.mass * vCollisionNorm.x * test.restitution;
            element.vy +=
              impulse * test.mass * vCollisionNorm.y * test.restitution;
          }
        }
      }
    });
  });
};
