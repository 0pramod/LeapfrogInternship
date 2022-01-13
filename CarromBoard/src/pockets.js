/** A class For Pockets
 * @constructor
 * @param {number} x- Position of pocket along the x-axis
 * @param {number} y- Position of pocket along the y-axis
 */

class Pockets {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = pocketRadius;
  }
  drawPocket = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#303030";
    ctx.fill();
    ctx.stroke();
  };
}

let pocket1 = new Pockets(20, 20);
let pocket2 = new Pockets(580, 20);
let pocket3 = new Pockets(580, 580);
let pocket4 = new Pockets(20, 580);

/**Finction to draw pocket */
let drawPockets = () => {
  pocket1.drawPocket();
  pocket2.drawPocket();
  pocket3.drawPocket();
  pocket4.drawPocket();
};

drawPockets();
