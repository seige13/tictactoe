/**
 * Create Board Class
 */
module.exports = class Board {

  /**
   * Init
   *
   * @param {int} boardSize
   */
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.board = [];
    this.buildBoard();
    this.movesLeft = Math.pow(boardSize, 2);
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
   * Checks if there are any moves left to be made
   *
   * @return {boolean}
   */
  isWinner() {
    return this.movesLeft === 0;
  }

};