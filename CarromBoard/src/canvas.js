let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
canvas.style.backgroundImage = 'url("images/2.2.png")';
canvas.style.backgroundSize = "contain";
canvas.style.border = "20px solid brown";
canvas.style.display = "none";

let canvasLeftPosition = screenWidth / 2 - 300;
let canvasTopPosition = 0;
if (screenHeight > 650) {
  canvasTopPosition = (screenHeight - 600) / 2;
  canvas.style.top = canvasTopPosition + "px";
}
canvas.style.left = canvasLeftPosition + "px";
