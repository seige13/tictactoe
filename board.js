/**
 * Create Board Class
 */
module.exports = class Board {

  /**
   * Init
   *
   * @param {int} boardSize
   * @param {int} numberOfPlayers
   * @param {Array} board
   * @param {int} movesLeft
   */
  constructor(boardSize, numberOfPlayers, board, movesLeft) {
    this.boardSize = boardSize;
    this.board = board || [];
    if (!this.board.length) {
      this.buildBoard()
    }
    this.movesLeft = movesLeft || Math.pow(boardSize, 2);
    this.numberOfPlayers = numberOfPlayers || 2;
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
  isWinner(row, col, player, seq) {
    let count;
    let boardSize = this.getBoardSize();

  //check the row
  count = 1; //set count to 1 for the last move
  let left;
  if (col+1-seq >= 0)  left = col+1-seq;
  else  left = 0;
  for (let i = col-1; i >= left; i--) {
    if (this.board[row][i] === player) {
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
    if (this.board[row][i] === player) {
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
    if (this.board[i][col] === player) {
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
    if (this.board[i][col] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }

  //check upper left to bottom right diagonal
  count = 1; //reset count to 1
  for (let i = col-1, j = row-1; i >= left && j >= up; i--, j--) {
    if (this.board[i][j] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }
  for (let i = col+1, j = row+1; i <= right && j <= bottom; i++, j++) {
    if (this.board[i][j] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }

  //check lower left to upper right diagonal
  count = 1; //reset count to 1
  for (let i = col-1, j = row+1; i >= left && j <= bottom; i--, j++) {
    if (this.board[i][j] === player) {
      if (++count === seq)
        return true;
    }
    else
      break;
  }
  for (let i = col+1, j = row-1; i <= right && j >= up; i++, j--) {
    if (this.board[i][j] === player) {
    if (++count === seq)
      return true;
    }
    else
      break;
  }

    return false;
  }

  // /**
  //  * Checks if there is a winner in the current board
  //  *
  //  * @param {string} player
  //  * @param {int} winSequence
  //  * @return {boolean}
  //  */
  // isWinner(player, winSequence) {
  //   let isWinner = false;
  //   let boardSize = this.getBoardSize();
  //   let turns = Math.pow(this.boardSize, 2) - this.movesLeft;

  //   // Game cannot be won yet since there aren't enough turns
  //   if (turns >= (winSequence * this.numberOfPlayers) - 1) {
  //     // @TODO Diagonal check
  //     let diagonalArray = this.board.map((value, index) => value[0 + index]);
  //     if (this.isWinnerInArray(diagonalArray, player, winSequence)) {
  //       return true;
  //     }

  //     let reverseDiagonalArray = this.board.map((value, index) => value[boardSize - 1 - index]);
  //     if (this.isWinnerInArray(reverseDiagonalArray, player, winSequence)) {
  //       return true;
  //     }

  //     // rows and columns
  //     for (let i = 0; i <= boardSize - 1; i++) {
  //       let currentRow = this.board[i];
  //       let currentColumn = this.board.map(value => value[i]);

  //       // row
  //       if (currentRow.indexOf(player) > -1) {
  //         if (this.isWinnerInArray(currentRow, player, winSequence)) {
  //           return true;
  //         }
  //       }

  //       // column
  //       if (currentColumn.indexOf(player) > -1) {
  //         if (this.isWinnerInArray(currentColumn, player, winSequence)) {
  //           return true;
  //         }
  //       }
  //     }
  //     return isWinner;
  //   }

  //   return isWinner;
  // }

  /**
   * Checks if there are any moves left to be made
   *
   * @return {boolean}
   */
  isMovesLeft() {
    return this.movesLeft === 0;
  }

  /**
   * Checks if player character exists in array with winSequence number of times
   *
   * @param currentArray
   * @param player
   * @param winSequence
   * @return {boolean}
   */
  isWinnerInArray(currentArray, player, winSequence) {
    let consecutiveMoves = 1;
    let firstIndex = currentArray.indexOf(player) > 0 ? currentArray.indexOf(player) : 1;

    for (let j = firstIndex; j <= this.getBoardSize() - 1; j++) {
      if (currentArray[j] === player && currentArray[j] === currentArray[j - 1]) {
        consecutiveMoves++;

        if (consecutiveMoves === winSequence) {
          return true;
        }
      } else {
        consecutiveMoves = 1;
      }
    }

    return false;
  }

};
