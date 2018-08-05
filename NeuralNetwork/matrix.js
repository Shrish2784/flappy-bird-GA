class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(rows)
      .fill()
      .map(() => Array(cols).fill(1));
  }

  static createMatrixFromArray(arr) {
    return new Matrix(arr.length, 1);
  }

  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
  }

  add(matrix) {
    this.map((e, i, j) => e + matrix.data[i][j]);
  }

  randomize() {
    this.map(() => Math.random() * 2 - 1);
  }

  fromArray(arr) {
    this.map((e, i, j) => arr[i]);
  }

  toArray() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  static multiply(matrixOne, matrixTwo) {
    if (matrixOne instanceof Matrix && matrixTwo instanceof Matrix) {
      if (matrixOne.cols == matrixTwo.rows) {
        let matrix = new Matrix(matrixOne.rows, matrixTwo.cols);
        matrix.map((e, i, j) => {
          let sum = 0;
          for (let k = 0; k < matrixOne.cols; k++) {
            sum += matrixOne.data[i][k] * matrixTwo.data[k][j];
          }
          return sum;
        });
        return matrix;
      }
      // Raise incompatible matrix dimensions.
    }
    // Raise type error.
  }
}
