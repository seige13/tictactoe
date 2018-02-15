let Board = require('./board');

// let checkWin = require('./checkWin');

const inquirer = require('inquirer');

const MAX_PLAYERS = 26;
const MIN_PLAYERS = 2;

const MAX_BOARD_SIZE = 999;
const MIN_BOARD_SIZE = 3;

const NOUGHT = 'O';
const CROSS = 'X';

let PLAYERS = 2;
let BOARD_SIZE = 3;
let WIN_SEQUENCE = 3;

/**
 * Asks the user questions
 */
function newGame() {

  let questions = [
    {
      type: 'input',
      name: 'numberOfUsers',
      message: "How many users are playing the game? ",
      validate: function (value) {
        if (Number.isInteger(parseInt(value)) && (parseInt(value) >= MIN_PLAYERS) && (parseInt(value) <= MAX_PLAYERS)) {
          return true;
        }

        return `Please enter a valid number of users (${MIN_PLAYERS} - ${MAX_PLAYERS})`;
      }
    },
    {
      type: 'input',
      name: 'boardSize',
      message: "How big is the game? ",
      validate: function (value) {
        if (Number.isInteger(parseInt(value)) && (parseInt(value) >= MIN_BOARD_SIZE) && (parseInt(value) <= MAX_BOARD_SIZE)) {
          return true;
        }

        return `Please enter a valid board size (${MIN_BOARD_SIZE} - ${MAX_BOARD_SIZE})`;
      }
    },
    {
      type: 'input',
      name: 'winSequence',
      message: "How many consecutive symbols for a win? ",
      validate: function (value) {
        if (Number.isInteger(parseInt(value)) && (parseInt(value) >= MIN_BOARD_SIZE) && (parseInt(value) <= MAX_BOARD_SIZE)) {
          return true;
        }

        return `Please enter a valid win sequence (${MIN_BOARD_SIZE} - ${MAX_BOARD_SIZE})`;
      }
    }
  ];

  inquirer.prompt(questions).then(answers => {
    BOARD_SIZE = parseInt(answers.boardSize);
    PLAYERS = parseInt(answers.numberofUsers);
    WIN_SEQUENCE = parseInt(answers.winSequence);

    if (isWinningPossible()) {
      console.log(printGameBoard(new Board(BOARD_SIZE)));
    } else {
      console.log(`Sorry this game is impossible to win.`);
    }
  }).catch(reason => {
    console.log(reason);
  });
}

/**
 * Draws tic tac toe game board
 *
 * @param {Board} board
 */
function printGameBoard(board) {
  let board_size = board.getBoardSize();

  for (let row = 0; row < board_size; ++row) {
    let rowString = '';
    for (let col = 0; col <= board_size; ++col) {

      if (col === 0) {
        // first column number
        // rowString = rowString.concat(`${row + 1} `);
        if (row < 9)
          rowString = rowString.concat(`${row + 1}  `);
        else if (row < 99)
          rowString = rowString.concat(`${row + 1} `);
        else
          rowString = rowString.concat(`${row + 1}`);
        // top row
        if (row === 0) {
          console.log(createNumberedRow(board_size));
        }
      } else {
        // print each of the cells
        rowString = rowString.concat(printCell(board.board[row][col - 1]));
        if (col !== board_size) {
          // print vertical partition
          rowString = rowString.concat("|");
        }
      }
    }

    console.log(rowString);
    if (row !== board_size - 1) {
      // print horizontal partition
      console.log(createHorizontalPartition(board_size));
    }
  }
  console.log('\n');
}

/**
 * Print a cell with the specified content
 *
 * @param {string} content
 * @returns {string}
 */
function printCell(content) {
  switch (content) {
    case NOUGHT:
      return " O ";
    case CROSS:
      return " X ";
    default:
      return "   ";
  }
}

/**
 * Creates the top row of the game board
 *
 * @param {int} board_size
 * @return {string}
 */
function createNumberedRow(board_size) {
  // let rowString = '  ';
  let rowString = '   ';
  for (let i = 1; i <= board_size; i++) {
    // rowString = rowString.concat(` ${i}  `);
    if (i < 10)
      rowString = rowString.concat(` ${i}  `);
    else if (i < 100)
      rowString = rowString.concat(` ${i} `);
    else
      rowString = rowString.concat(` ${i}`);
  }

  return rowString;
}

/**
 * Creates horizontal partition based on the size of the board
 *
 * @param {int} width
 * @returns {string}
 */
function createHorizontalPartition(width) {
  // let partition = '  ';
  let partition = '   ';
  let col = '---+';

  for (let i = 0; i < width; i++) {
    if (i !== width - 1) {
      partition = partition.concat(col);
    } else {
      partition = partition.concat(col.substring(0, col.length - 1));
    }
  }

  return partition;
}

/**
 * Start the tic tac toe game
 */
function initializeGame() {
  console.log('Welcome to Tic Tac Toe for CS-570! \n');

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'game',
        message: 'What do you want to do?',
        choices: [
          {
            name: 'Start a new game',
            value: 'new'
          },
          {
            name: 'Resume a game',
            value: 'resume'
          }
        ]
      }
    ])
    .then(answers => {
      if (answers.game === 'resume') {
        resumeGame();
      } else {
        newGame();
      }
    });
}

/**
 * Checks if winning is possible
 *
 * @returns {boolean}
 */
function isWinningPossible() {
  return WIN_SEQUENCE <= BOARD_SIZE;
}

/**
 * Resume game from file
 */
function resumeGame() {
  console.log('Resuming game from file... \n');
}

//run the game
initializeGame();



// let board = new Board(3);
// let board_size = board.getBoardSize();
// console.log(board_size);

// board.board[0][0] = 'A';
// // board.board[1][1] = 'A';
// board.board[2][2] = 'A';


/**
 * check if the user won the game after the last move
 * 
 * @param {string} player
 * @param {int} seq - win sequence count
 * @param {int} col - column number of last move
 * @param {int} row - row number of last move
 * 
 * @returns {boolean} 
 */
function checkIfWin(player, seq, col, row) {
  let count;
  let boardSize = board.getBoardSize();

  //check the row
  count = 1; //set count to 1 for the last move
  let left;
  if (col+1-seq >= 0)  left = col+1-seq;
  else  left = 0;
  for (let i = col-1; i >= left; i--) {
    if (board.board[row][i] === player)
      if (++count === seq)
        return true;
    else
      break;
  }
  let right;
  if (col+seq <= boardSize-1) right = col+seq;
  else  right = boardSize-1;
  for (let i = col+1; i <= right; i++) {
    if (board.board[row][i] === player)
      if (++count === seq)
        return true;
      else
        break;
  }

  //check the column
  count = 1; //reset count to 1
  let up;
  if (row+1-seq >= 0)  up = row+1-seq;
  else  up = 0;
  for (let i = row-1; i >= up; i--) {
    if (board.board[i][col] === player)
      if (++count === seq)
        return true;
    else
      break;
  }
  let bottom;
  if (row+seq <= boardSize-1) bottom = row+seq;
  else  bottom = boardSize-1;
  for (let i = row+1; i <= bottom; i++) {
    if (board.board[i][col] === player)
      if (++count === seq)
        return true;
      else
        break;
  }

  //check upper left to bottom right diagonal
  count = 1; //reset count to 1
  for (let i = col-1, j = row-1; i >= left && j >= up; i--, j--) {
    if (board.board[i][j] === player)
      if (++count === seq)
        return true;
      else
        break;
  }
  for (let i = col+1, j = row+1; i <= right && j <= bottom; i++, j++) {
    if (board.board[i][j] === player)
    if (++count === seq)
      return true;
    else
      break;
  }

  //check lower left to upper right diagonal
  count = 1; //reset count to 1
  for (let i = col-1, j = row+1; i >= left && j <= bottom; i--, j++) {
    if (board.board[i][j] === player)
      if (++count === seq)
        return true;
      else
        break;
  }
  for (let i = col+1, j = row-1; i <= right && j >= up; i++, j--) {
    if (board.board[i][j] === player)
    if (++count === seq)
      return true;
    else
      break;
  }


  return false;
}

// console.log(board);
// console.log(checkWin(board,'A',3,1,1));
