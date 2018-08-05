class NeuralNetwork {
  constructor(iNodes, hNodes, oNodes) {
    this.iNodes = iNodes;
    this.hNodes = hNodes;
    this.oNodes = oNodes;

    this.inputVector = new Matrix(iNodes, 1);
    this.weightsOne = new Matrix(hNodes, iNodes);
    this.biasOne = new Matrix(hNodes, 1);
    //Find the hidden nodes.
    this.hiddenNodes = new Matrix(hNodes, 1);
    // this.weightsOne.randomize();
    // this.biasOne.randomize();

    this.weightsTwo = new Matrix(oNodes, hNodes);
    this.biasTwo = new Matrix(oNodes, 1);
    //Find the outputs.
    this.outputVector = new Matrix(oNodes, 1);
  }

  setWeightsOne(matrix) {
    if (
      matrix instanceof Matrix &&
      matrix.rows == this.weightsOne.rows &&
      matrix.cols == this.weightsOne.cols
    ) {
      this.weightsOne.setData(matrix.data);
    }
  }

  getWeightsOne() {
    return this.weightsOne.data;
  }

  setBiasOne(matrix) {
    if (
      matrix instanceof Matrix &&
      matrix.rows == this.biasOne.rows &&
      matrix.cols == this.biasOne.cols
    ) {
      this.biasOne.setData(matrix.data);
    }
  }

  getBiasOne() {
    return this.biasOne.data;
  }

  setWeightsTwo(matrix) {
    if (
      matrix instanceof Matrix &&
      matrix.rows == this.weightsTwo.rows &&
      matrix.cols == this.weightsTwo.cols
    ) {
      this.weightsTwo.setData(matrix.data);
    }
  }

  getWeightsTwo() {
    return this.weightsTwo.data;
  }

  setBiasTwo(matrix) {
    if (
      matrix instanceof Matrix &&
      matrix.rows == this.biasTwo.rows &&
      matrix.cols == this.biasTwo.cols
    ) {
      this.biasTwo.setData(matrix.data);
    }
  }

  getBiasTwo() {
    return this.biasTwo.data;
  }

  feedforward(inputs) {
    if (inputs.length != this.iNodes) {
      return "Number of inputs are not correct.";
    }
    this.inputVector.fromArray(inputs);
    this.findHiddenNodes();
    this.findOutputVector();
  }
  findHiddenNodes() {
    this.hiddenNodes.data = Matrix.multiply(
      this.weightsOne,
      this.inputVector
    ).data;
    this.hiddenNodes.add(this.biasOne);
    this.hiddenNodes.map((e, i, j) => this.activationFunction(e));
  }
  findOutputVector() {
    this.outputVector = Matrix.multiply(this.weightsTwo, this.hiddenNodes);
    this.outputVector.add(this.biasTwo);
    this.outputVector.map((e, i, j) => this.activationFunction(e));
  }
  activationFunction(e) {
    if (e < 0) return 0;
    else return 1;
  }
}
