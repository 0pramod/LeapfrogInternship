var container = document.getElementById("corousel-container");

var imageWrapper = document.getElementById("image-wrapper");

const imageCount = imageWrapper.children.length;
var imageWidth = 300;

for (let i = 0; i < imageCount; i++) {
  imageWrapper.children[i].style.left = `${i * imageWidth}px`;
}
//console.log(imageCount);
//console.log(imageWrapper.getAttribute("width"));

const leftArrow = document.getElementById("arrowLeft");
const rightArrow = document.getElementById("arrowRight");

var getStyle = function (element, style) {
  return parseFloat(window.getComputedStyle(element).getPropertyValue(style));
};

leftArrow.addEventListener("click", previous);

rightArrow.addEventListener("click", next);
//var position = 0;
var currentIndex = 0;
function next() {
  if (currentIndex == imageCount - 1) {
    for (let i = 0; i < imageCount; i++) {
      var position = getStyle(imageWrapper.children[i], "left");
      targetPosition = i * imageWidth;

      imageWrapper.children[i].style.left = `${i * imageWidth}px`;
    }
    revertDot(currentIndex);
    currentIndex = 0;
    activeDot(currentIndex);
  } else {
    for (let i = 0; i < imageCount; i++) {
      var position = getStyle(imageWrapper.children[i], "left");
      targetPosition = position - imageWidth;
      animate(position, targetPosition, i, 1);
      //imageWrapper.children[i].style.left = `${position - imageWidth}px`;
    }
    revertDot(currentIndex);
    currentIndex++;
    activeDot(currentIndex);
  }

  if (currentIndex > imageCount - 1) {
    revertDot(currentIndex);
    currentIndex = 0;
    activeDot(currentIndex);
  }
}

function previous() {
  if (currentIndex == 0) {
    for (let i = 0; i < imageCount; i++) {
      imageWrapper.children[i].style.left =
        -imageWidth * (imageCount - 1) + i * imageWidth + "px";
    }
    revertDot(currentIndex);
    currentIndex = imageCount - 1;
    activeDot(currentIndex);
  } else {
    for (let i = 0; i < imageCount; i++) {
      var position = getStyle(imageWrapper.children[i], "left");
      targetPosition = position + imageWidth;
      animate(position, targetPosition, i, -1);
      //imageWrapper.children[i].style.left = `${position + imageWidth}px`;
    }
    revertDot(currentIndex);
    currentIndex--;
    activeDot(currentIndex);
  }

  if (currentIndex < 0) {
    revertDot(currentIndex);
    currentIndex = imageCount - 1;
    activeDot(currentIndex);
  }
}

//console.log(currentIndex);

function animate(currentPosition, targetPosition, index, direction) {
  x = 1;

  var interval = setInterval(() => {
    imageWrapper.children[index].style.left = `${
      currentPosition - x * direction
    }px`;

    if (x == Math.abs(currentPosition - targetPosition)) {
      clearInterval(interval);
    } else {
      x++;
    }
  }, 10);
}

//create dot container
const dotContainer = document.createElement("div");
dotContainer.id = "carousel-dots-container";
imageWrapper.append(dotContainer);

// add Carousel Dots dynamically
for (let i = 0; i < imageCount; i++) {
  let dot = document.createElement("div");
  dot.setAttribute("class", "carousel-dot");
  dot.style.height = "10px";
  dot.style.width = "10px";
  dot.style.borderRadius = "50%";
  dot.style.display = "inline-block";
  dot.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  dot.style.boxShadow = "1px 1px 2px #000";
  dot.style.margin = "3px";
  dotContainer.append(dot);
  dot.addEventListener("click", () => {
    let selected = i;
    console.log(selected);
    let slideChange = currentIndex - selected;
    if (slideChange > 0) {
      for (let i = slideChange; i != 0; i--) {
        previous();
      }
    } else if (slideChange < 0) {
      for (let i = slideChange; i != 0; i++) {
        next();
      }
    }
  });
}
const dots = Array.from(dotContainer.children);
activeDot(currentIndex);

function revertDot(index) {
  dots[index].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  dots[index].classList.toggle("active");
  //images[index].classList.toggle("active");
}
function activeDot(index) {
  dots[index].style.backgroundColor = "rgba(255, 255, 255, 1)";
  dots[index].classList.toggle("active");
  //images[index].classList.toggle("active");
}
