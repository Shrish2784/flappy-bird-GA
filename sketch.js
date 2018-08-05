let bird;
let canvasWidth = 1200;
let canvasHeight = 700;
let bgImage;
let birdImage;
let jumpSound;
const pipeWidth = 100;
let bgX;
let movementX = -10;
let iPipeX;
let iPipeY;
const dBetweenPipes = 600;
let pipes = [];
let nPipes;
let canvas;
let score;
let pScore;

function preload() {
  bgImage = loadImage("assets/bg_image.png");
  birdImage = loadImage("assets/bird.png");
  jumpSound = loadSound("assets/jump.mp3");
}

function windowResized() {
  let x = (windowWidth - canvasWidth) / 2;
  let y = (windowHeight - canvasHeight) / 2;
  resizeCanvas(canvasWidth, canvasHeight);
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  let x = (windowWidth - canvasWidth) / 2;
  let y = (windowHeight - canvasHeight) / 2;
  canvas.position(x, y);
  bgX = 0;
  iPipeX = canvasWidth;
  bird = new Bird(canvasWidth, canvasHeight, birdImage, jumpSound);
  score = 0;
  nPipes = 5;
  for (let i = 0; i < nPipes; i++) {
    let pipe = new Pipe(
      iPipeX + i * dBetweenPipes,
      movementX,
      canvasWidth,
      canvasHeight,
      pipeWidth
    );
    pipes.push(pipe);
  }

  //Neural Testing.

  // let brain = new NeuralNetwork(2, 2, 1);

  // XOR Problem using neural netwok
  // weights ONE
  // [
  //   [10 10],
  //   [-10 -10]
  // ]
  // bias one
  // [
  //   -5
  //   15
  // ]
  // weights TWO
  // [10 10]
  // bias TWo
  // [-15]

  // let weightsOne = new Matrix(2, 2);
  // weightsOne.setData([[10, 10], [-10, -10]]);
  // brain.setWeightsOne(weightsOne);

  // let biasOne = new Matrix(2, 1);
  // biasOne.setData([[-5], [15]]);
  // brain.setBiasOne(biasOne);

  // let weightsTwo = new Matrix(1, 2);
  // weightsTwo.setData([[10, 10]]);
  // brain.setWeightsTwo(weightsTwo);

  // let biasTwo = new Matrix(1, 1);
  // biasTwo.setData([[-15]]);
  // brain.setBiasTwo(biasTwo);

  // brain.feedforward([1, 0]);
  // console.log("##############INPUT############");
  // console.table(brain.inputVector.data);
  // console.log("##############WEIGHTS_ONE############");
  // console.table(brain.weightsOne.data);
  // console.log("##############BIAS_ONE############");
  // console.table(brain.biasOne.data);
  // console.log("##############HIDDEN_NODES############");
  // console.table(brain.hiddenNodes.data);
  // console.log("##############WEIGHTS_TWO############");
  // console.table(brain.weightsTwo.data);
  // console.log("##############BIAS_TWO############");
  // console.table(brain.biasTwo.data);
  // console.log("################OUTPUT#############");
  // console.table(brain.outputVector.data);

  //Done!
}

function draw() {
  image(bgImage, bgX, 0, canvasWidth, canvasHeight);
  if (bgX < 0) {
    image(bgImage, bgX + canvasWidth, 0, canvasWidth, canvasHeight);
    if (bgX < -canvasWidth) {
      bgX = 0;
    }
  }
  bgX += movementX;
  /*
    Code for GENETIC ALGORITHM goes here.
  */
  bird.update();
  updatePipes();
  checkGame();
  showPipes();
  bird.show();
}

function updatePipes() {
  for (let i = 0; i < nPipes; i++) {
    pipes[i].update();
  }
  if (pipes[0].x <= -100) {
    score += 1;
    let endpipes = pipes.slice(1);
    endpipes.push(pipes[0]);
    pipes = endpipes;
    pipes[pipes.length - 1] = new Pipe(
      pipes[pipes.length - 2].x + dBetweenPipes,
      movementX,
      canvasWidth,
      canvasHeight,
      pipeWidth
    );
    pipes[pipes.length - 1].x = pipes[pipes.length - 2].x + dBetweenPipes;
  }
}

function showPipes() {
  for (let i = 0; i < nPipes; i++) {
    pipes[i].show();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    bird.jump();
    if (!bird.dead) jumpSound.play();
  }
}

function checkGame() {
  let closestPipe = pipes[0];
  if (bird.x >= closestPipe.x && bird.x <= closestPipe.x + closestPipe.width) {
    if (
      bird.y <= closestPipe.y * windowHeight ||
      bird.y >= closestPipe.y * windowHeight + closestPipe.space
    ) {
      gameOver();
    }
  }
  if (bird.y >= windowHeight || bird.y <= 0) {
    gameOver();
  }
}

function gameOver() {
  bird.dead = true;
  movementX = 0;
  for (let i = 0; i < nPipes; i++) {
    pipes[i].movementX = 0;
  }
}
