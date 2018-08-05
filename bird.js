class Bird {
  constructor(width, height, birdImage) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = 40;
    this.y = this.canvasHeight / 2;
    this.birdImage = birdImage;
    this.acceleration = 1;
    this.lift = 30;
    this.resistance = 0.9;
    this.velocity = 0;
    this.dead = false;
  }

  update() {
    if (!this.dead) {
      this.velocity += this.acceleration;
      this.velocity *= this.resistance;
      this.y += this.velocity;
    }
  }

  show() {
    fill(255);
    noStroke();
    image(this.birdImage, this.x, this.y, 100, 100);
    // if (!this.dead) {

    // }
  }

  jump() {
    this.velocity -= this.lift;
  }
}
