var mainDiv = document.getElementById("container");
mainDiv.style.width = "500px";
mainDiv.style.height = "500px";
mainDiv.style.color = "#49c";
mainDiv.style.border = "2px solid black";
mainDiv.style.position = "relative";
mainDiv.style.margin = "10%  auto";
mainDiv.style.background = "white";

var ball = document.createElement("div");
ball.style.width = "80px";
ball.style.height = "80px";
ball.style.borderRadius = "50%";
ball.style.background = "blue";
ball.style.marginLeft = "210px";
ball.style.position = "absolute";
mainDiv.appendChild(ball);

function up(x) {
  var n = setInterval((u) => {
    ball.style.marginTop = x + "px";
    console.log(x);
    x++;
    if (x == 420) {
      clearInterval(n);
      down(x);
    }
  }, 10);
}

function down(x) {
  var m = setInterval((d) => {
    ball.style.marginTop = x + "px";
    console.log(x);
    x--;
    if (x == 0) {
      clearInterval(m);
      up(x);
    }
  }, 10);
}
up(0);
