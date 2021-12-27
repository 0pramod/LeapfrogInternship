class Carousel {
  constructor(containerSelector, config) {
    this.containerName = containerSelector;
    this.container = document.querySelector(containerSelector);
    this.wrapper = this.container.querySelector(".carousel-image-wrapper");
    this.width = window
      .getComputedStyle(this.container)
      .getPropertyValue("width");
    this.height = window
      .getComputedStyle(this.container)
      .getPropertyValue("height");
    this.transitionTime = config.transitionTime;
    this.delayTime = config.delayTime;

    this.index = 0;
    this.images = this.wrapper.getElementsByTagName("img");

    this.rightButton;
    this.leftButton;
    this.dots;
    this.dot = [];

    this.containerStyle();
    this.wrapperStyle();
    this.arrowButtons();
    this.createDots();
    this.dotsStyle();

    // setup autoAnimate
    this.autoAnimate();

    window.addEventListener("resize", () => {
      this.width = window
        .getComputedStyle(this.container)
        .getPropertyValue("width");
      this.height = window
        .getComputedStyle(this.container)
        .getPropertyValue("height");
      this.containerStyle();
      this.wrapperStyle();
      this.arrowButtons();
      this.dotsStyle();
    });
  }

  containerStyle = () => {
    this.container.style.overflow = "hidden";
    this.container.style.position = "relative";
  };

  wrapperStyle = () => {
    this.wrapper.style.minWidth =
      parseFloat(this.width) * (this.images.length + 1) + "px"; // an extra one for margin/padding errors.
    this.wrapper.style.height = this.height;
    this.wrapper.style.position = "absolute";
    this.wrapper.style.left = "-0px";

    for (let j = 0; j < this.images.length; j++) {
      this.images[j].style.width = this.width;
      this.images[j].style.height = this.height;
      this.images[j].style.float = "left";
    }
  };

  createDots = () => {
    this.dots = document.createElement("div");
    this.dotsStyle();

    for (let i = 0; i < this.images.length; i++) {
      const newdot = document.createElement("input");
      newdot.type = "radio";
      newdot.name = "indicator" + this.containerName;
      newdot.value = i;

      newdot.addEventListener("click", () => {
        let prev_index = this.index;
        this.index = parseInt(newdot.value);

        if (prev_index == this.index) return;
        else {
          this.animate();
        }
      });

      this.dot.push(newdot);
      this.dots.appendChild(newdot);
    }
    this.dot[0].checked = true;
    this.container.appendChild(this.dots);
  };

  dotsStyle = () => {
    this.dots.style.position = "absolute";
    this.dots.style.left =
      parseFloat(this.width) / 2 - (this.images.length * 13) / 2 + "px"; // 13 for the sixe of each dot
    this.dots.style.bottom = "0px";
  };

  arrowButtons = () => {
    const styleButton = (button) => {
      button.style.position = "absolute";
      button.style.top = parseFloat(this.height) / 2 - 50 + "px"; // 50 because of the size of the  button
      button.style.backgroundColor = "rgba(0,0,0,0)";
      button.style.border = "none";
      button.style.fontSize = "48px";
      button.style.color = "white";
    };

    // right button
    this.rightButton = document.createElement("button");
    this.rightButton.innerHTML = "&rtri;";
    this.rightButton.style.right = 5 + "px";
    this.rightButton.addEventListener("click", () => this.next());
    styleButton(this.rightButton);
    this.container.appendChild(this.rightButton);

    // left button
    this.leftButton = document.createElement("button");
    this.leftButton.innerHTML = "&ltri;";
    this.leftButton.style.left = 5 + "px";
    this.leftButton.addEventListener("click", () => this.previous());
    styleButton(this.leftButton);
    this.container.appendChild(this.leftButton);
  };

  animate = () => {
    this.wrapper.animate(
      [{ left: -this.index * parseFloat(this.width) + "px" }],
      {
        duration: this.transitionTime * 1000,
        iterations: 1,
        fill: "forwards",
      }
    );
    this.dot[this.index].checked = true;

    clearInterval(this.autoAnimateInterval);
    this.autoAnimate();
  };

  autoAnimate = () => {
    this.autoAnimateInterval = setInterval(() => {
      if (this.index < this.images.length - 1) this.index++;
      else this.index = 0;
      this.animate();
    }, (this.delayTime + this.transitionTime) * 1000);
  };

  next = () => {
    if (this.index < this.images.length - 1) {
      this.index++;
      this.animate();
    } else {
      this.index = 0;
      this.animate();
    }
  };

  previous = () => {
    if (this.index > 0) {
      this.index--;
      this.animate();
    } else {
      this.index = this.images.length - 1;
      this.animate();
    }
  };
}

const carousel1 = new Carousel(".carousel-container-1", {
  transitionTime: 0.5,
  delayTime: 1.5,
});
const carousel2 = new Carousel(".carousel-container-2", {
  transitionTime: 1.5,
  delayTime: 4,
});
