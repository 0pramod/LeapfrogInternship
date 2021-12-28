var mainDiv = document.getElementById("container");
var boxWidth = 1200;
var boxHeight = 600;
mainDiv.style.width = boxWidth + "px";
mainDiv.style.height = boxHeight + "px";
mainDiv.style.color = "#49c";
mainDiv.style.border = "2px solid black";
mainDiv.style.position = "relative";
mainDiv.style.margin = "1%  1%";
mainDiv.style.background = "white";
const fps = 60;
class ball {
  constructor(color) {
    this.x = getRandomInt(0, boxWidth);
    this.y = getRandomInt(0, boxHeight);
    this.dx = getDirection();
    this.dy = getDirection();
    this.speed = getRandomInt(1, 3);
    this.vx = this.dx * this.speed; // velocity along x-axis
    this.vy = this.dy * this.speed; // velocity along y-axis

    this.restitution = 0.99;

    this.radius = getRandomInt(5, 15);
    this.mass = this.radius;
    this.element = document.createElement("div");
    this.element.style.width = this.radius * 2 + "px";
    this.element.style.height = this.radius * 2 + "px";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.position = "absolute";
    this.element.style.borderRadius = "50%";
    this.element.style.background = color;

    mainDiv.appendChild(this.element);

    setInterval(() => {
      this.x += this.vx;
      this.y += this.vy;
      this.element.style.top = this.y + "px";
      this.element.style.left = this.x + "px";

      this.checkWallCollision();
      this.checkBallCollision();
    }, 1000 / fps);

    this.checkWallCollision = function () {
      if (this.x < 0) {
        this.vx = Math.abs(this.vx) * this.restitution;
        this.x = this.radius;
      } else if (this.x > boxWidth - 2 * this.radius) {
        this.vx = -Math.abs(this.vx) * this.restitution;
        this.x = boxWidth - 2 * this.radius;
      }

      if (this.y < 0) {
        this.vy = Math.abs(this.vy) * this.restitution;
        this.y = this.radius;
      } else if (this.y > boxHeight - 2 * this.radius) {
        this.vy = -Math.abs(this.vy) * this.restitution;
        this.y = boxHeight - 2 * this.radius;
      }
    };
  }

  checkBallCollision = function () {
    balls.forEach((element) => {
      if (element !== this) {
        var xDiff = this.x + this.radius - (element.x + element.radius);
        var yDiff = this.y + this.radius - (element.y + element.radius);
        var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (distance < this.radius + element.radius) {
          let vCollision = { x: element.x - this.x, y: element.y - this.y }; // vector of the direction of collision
          let distance = Math.sqrt(
            (element.x - this.x) * (element.x - this.x) +
              (element.y - this.y) * (element.y - this.y)
          );

          let vCollisionNorm = {
            x: vCollision.x / distance,
            y: vCollision.y / distance,
          }; // noraml vector. need to calculate relative velocity

          let vRelativeVelocity = {
            x: this.vx - element.vx,
            y: this.vy - element.vy,
          }; // relative velocity. differece between the velocities
          let speed =
            vRelativeVelocity.x * vCollisionNorm.x +
            vRelativeVelocity.y * vCollisionNorm.y; // calucate speed. vector * normal gives scalar quantity

          // to prevent overlap
          if (speed > 0) {
            let impulse = (2 * speed) / (this.mass + element.mass); // impulse is the force that produces change in momemtum

            this.vx -=
              impulse * element.mass * vCollisionNorm.x * this.restitution; // multpiply collision vector by impulse of the element
            this.vy -=
              impulse * element.mass * vCollisionNorm.y * this.restitution; // multpiply collision vector by impulse of the element
            element.vx +=
              impulse * this.mass * vCollisionNorm.x * this.restitution; // multpiply collision vector by impulse of the element
            element.vy +=
              impulse * this.mass * vCollisionNorm.y * this.restitution; // multpiply collision vector by impulse of the element
          }
        }
      }
    });
  };
}

var balls = [];
var ballAmount = 100;
for (let i = 0; i < ballAmount; i++) {
  let color = getColor();
  var x = new ball(color);
  balls.push(x);
}
