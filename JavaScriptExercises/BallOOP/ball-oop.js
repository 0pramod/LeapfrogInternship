var mainDiv = document.getElementById("container");
mainDiv.style.width = "500px";
mainDiv.style.height = "500px";
mainDiv.style.color = "#49c";
mainDiv.style.border = "2px solid black";
mainDiv.style.position = "relative";
mainDiv.style.margin = "10%  auto";
mainDiv.style.background = "white";

class ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.element = document.createElement("div");
    this.element.style.width = this.radius * 2 + "px";
    this.element.style.height = this.radius * 2 + "px";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.position = "absolute";
    this.element.style.borderRadius = "50%";
    this.element.style.background = color;

    mainDiv.appendChild(this.element);
    var direction = 1;
    var move = 0;

    setInterval(() => {
      this.element.style.top = `${move}px`;
      move = move + direction;
      if (move == 0) {
        direction = 1;
      } else if (move == 500 - this.radius * 2) {
        direction = -1;
      }
    }, 10);
  }
}
new ball(120, 10, 25, "black");

new ball(10, 300, 20, "#FF5733 ");
