var mainDiv = document.getElementById("container");
mainDiv.style.width = "500px";
mainDiv.style.height = "500px";
mainDiv.style.color = "#49c";
mainDiv.style.border = "2px solid black";
mainDiv.style.position = "relative";
mainDiv.style.margin = "10%  auto";
mainDiv.style.background = "white";

var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 100, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 100 },
  { x: 400, y: 400 },
];

function dots(positions) {
  for (let i = 0; i < points.length; i++) {
    x = positions[i]["x"] + "px";
    y = positions[i]["y"] + "px";

    const points = document.createElement("div");
    points.style.width = "12px";
    points.style.height = "12px";
    points.style.borderRadius = "50%";
    points.style.background = "black";
    points.style.position = "absolute";
    points.style.top = x;
    points.style.left = y;
    mainDiv.appendChild(points);

    points.onclick = function (event) {
      event.target.style.width = "15px";
      event.target.style.height = "15px";
      event.target.style.background = "red";
    };
  }
}

dots(points);
