/** A class for Carroms in the game
 * @constructor - to create carroms
 * @param {number} id- identifer for the type of carrom
 * @param {number} xPos- the position of carrom along ther x-axis
 * @param {number} yPos- the position of carrom along ther y-axis
 * @param {string} color- defines the color of the carrom
 * @function draw -used to draw carroms
 * @function update -used to update the carroms positions diuring the game
 * @function checkWallCollision - checks carrom collision with the walls of the carrom board
 */
class Carrom {
  constructor(id, xPos, yPos, radius, color) {
    this.initialPositionX = xPos;
    this.initialPositionY = yPos;
    this.id = id;
    this.angle = (90 * Math.PI) / 180;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = this.mass = radius;
    this.restitution = 0.8;
    this.color = color;
    this.speed = strikerPower;
    this.dx = 0; //to determine direction along x-axis
    this.dy = 0; //to determine direction along y-axis
    this.vx = 0; // velocity along x-axis
    this.vy = 0; // velocity along y-axis
  }
  draw = () => {
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  };

  update = () => {
    this.speed = strikerPower;
    this.vx -= this.vx * 0.01; // to factor in friction
    this.vy -= this.vy * 0.01;
    this.xPos += this.vx;
    this.yPos += this.vy;
  };
  checkWallCollision = () => {
    if (this.xPos <= this.radius) {
      this.vx = -this.vx;
      this.xPos = this.radius;
    } else if (this.xPos > canvas.width - this.radius) {
      this.vx = -this.vx;
      this.xPos = canvas.width - this.radius;
    }

    if (this.yPos <= this.radius) {
      this.vy = -this.vy;
      this.yPos = this.radius;
    } else if (this.yPos >= canvas.height - this.radius) {
      this.vy = -this.vy;
      this.yPos = canvas.height - this.radius;
    }
  };
}

var whiteCarroms = [
  new Carrom(whiteCarromId, 220, 280, 15, "#f0ffff"),
  new Carrom(whiteCarromId, 260, 280, 15, "#f0ffff"),
  new Carrom(whiteCarromId, 300, 260, 15, "#f0ffff"),
  new Carrom(whiteCarromId, 340, 280, 15, "#f0ffff"),
  new Carrom(whiteCarromId, 390, 280, 15, "#f0ffff"),
];

let queen = new Carrom(queenCarromId, 300, 300, 15, "red");
var blackCarroms = [
  new Carrom(blackCarromId, 220, 320, 15, "black"),
  new Carrom(blackCarromId, 260, 320, 15, "black"),
  new Carrom(blackCarromId, 300, 350, 15, "black"),
  new Carrom(blackCarromId, 340, 320, 15, "black"),
  new Carrom(blackCarromId, 390, 320, 15, "black"),
];

const striker = new Carrom(strikerCarromId, 300, 520, 20, "blue");
let allCarromsInitialStates = whiteCarroms.concat(blackCarroms, queen, striker); // holds all carroms initial states
var allCarroms = whiteCarroms.concat(blackCarroms, queen, striker); // list of carrom with frequent updates throughout the game
