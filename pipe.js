class Pipe {
  constructor(x, movementX, canvasWidth, canvasHeight, pipewidth) {
    this.x = x;
    // this.pos = this.getPos();
    // this.y = this.getY();
    this.space = this.getSpace();
    this.y = Math.random() * 0.7;
    this.width = pipewidth;
    this.movementX = movementX;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update() {
    this.x += this.movementX;
  }

  getSpace() {
    return Math.random() * 200 + 300;
  }

  // getPos() {
  //   let pos;
  //   let i = Math.random();
  //   if (i > 0.7) {
  //     let j = Math.random();
  //     if (j > 0.5) {
  //       pos = "up";
  //     } else {
  //       pos = "down";
  //     }
  //   } else {
  //     pos = "both";
  //   }
  //   return pos;
  // }

  // getY() {
  //   let y;
  //   if (this.pos === "up") {
  //     y = Math.random() * 50 + 10;
  //   } else if (this.pos === "down") {
  //     y = Math.random() * 60 + 40;
  //   } else {
  //     y = Math.random() * 40 + 10;
  //   }
  //   return y / 100;
  // }

  // getY_temp() {
  //   // let y1 = Math.random() * 70;
  //   // let y2 = Math.random() * 40 + 60;
  //   // return {
  //   //   y1: y1 / 100,
  //   //   y2: y2 / 100
  //   // };
  //   return Math.random() * 0.7;
  // }

  show() {
    let c = color(50, 100, 50);
    fill(c);
    rect(this.x, 0, this.width, this.y * this.canvasHeight);
    rect(
      this.x,
      this.y * this.canvasHeight + this.space,
      this.width,
      this.canvasHeight - (this.y * this.canvasHeight + this.space)
    );
  }
}
