/**
 * Create Board Class
 */
module.exports = class Board {

  /**
   * Init
   *
   * @param {int} boardSize
   * @param {Array} board
   * @param {int} movesLeft
   */
  constructor(boardSize, board, movesLeft) {
    this.boardSize = boardSize;
    this.board = board || [];
    if (!this.board.length) {
      this.buildBoard()
    }
    this.movesLeft = movesLeft || Math.pow(boardSize, 2);
  }

  /**
   * Builds an initial board
   *
   * @return {array}
   */
  buildBoard() {
    for (let col = 0; col < this.boardSize; col++) {
      let rowValues = [];
      for (let row = 0; row < this.boardSize; row++) {
        rowValues.push('');
      }
      this.board.push(rowValues);
    }
  }

  /**
   * Gets Board Size
   *
   * @return {int}
   */
  getBoardSize() {
    return this.boardSize;
  }

  /**
   * Checks if the move is valid
   *
   * @param {int} row
   * @param {int} col
   * @return {boolean} valid move
   */
  isValidMove(row, col) {
    return this.board[row][col] === '';
  }

  /**
   * Places a piece on the board. Returns false if spot is taken
   * @param row
   * @param col
   * @param userPiece
   */
  placeMove(row, col, userPiece) {
    this.board[row][col] = userPiece;
    this.movesLeft--;
  }


  /**
   * Checks if there is a winner
   *
   * @param col
   * @param row
   * @param player
   * @param seq
   * @return {boolean}
   */
  isWinner(col, row, player, seq) {
    let count;
    let boardSize = this.getBoardSize();

  //check the row
  count = 1; //set count to 1 for the last move
  let left;
  if (col+1-seq >= 0)  left = col+1-seq;
  else  left = 0;
  for (let i = col-1; i >= left; i--) {
    if (board.board[row][i] === player) {
      if (++count === seq)
        return true;
    }
    else
       break;
  }
  let right;
  if (col+seq <= boardSize-1) right = col+seq;
  else  right = boardSize-1;
  for (let i = col+1; i <= right; i++) {
    if (board.board[row][i] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }

  //check the column
  count = 1; //reset count to 1
  let up;
  if (row+1-seq >= 0)  up = row+1-seq;
  else  up = 0;
  for (let i = row-1; i >= up; i--) {
    if (board.board[i][col] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }
  let bottom;
  if (row+seq <= boardSize-1) bottom = row+seq;
  else  bottom = boardSize-1;
  for (let i = row+1; i <= bottom; i++) {
    if (board.board[i][col] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }

  //check upper left to bottom right diagonal
  count = 1; //reset count to 1
  for (let i = col-1, j = row-1; i >= left && j >= up; i--, j--) {
    if (board.board[i][j] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }
  for (let i = col+1, j = row+1; i <= right && j <= bottom; i++, j++) {
    if (board.board[i][j] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }

  //check lower left to upper right diagonal
  count = 1; //reset count to 1
  for (let i = col-1, j = row+1; i >= left && j <= bottom; i--, j++) {
    if (board.board[i][j] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }
  for (let i = col+1, j = row-1; i <= right && j >= up; i++, j--) {
    if (board.board[i][j] === player) {
    if (++count === seq)
      return true;
    }
    else
      break;
  }

    return false;
  }

  /**
   * Checks if there are any moves left to be made
   *
   * @return {boolean}
   */
  isMovesLeft() {
    return this.movesLeft === 0;
  }

};
