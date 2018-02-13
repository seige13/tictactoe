const readline = require('readline');
const _ = require('underscore');

let PLAYERS = 2;
let BOARD_SIZE = 3;
const WIN_SEQUENCE = 3;

const MAX_PLAYERS = 26;
const MIN_PLAYERS = 2;

const MAX_BOARD_SIZE = 999;
const MIN_BOARD_SIZE = 3;

const NOUGHT = 'O';
const CROSS = 'X';

let board = [
  [], [], [],
  [], [], [],
  [], [], []
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Asks the user questions
 */
function promptUser() {
  rl.question('How many users are playing the game? ', (usersAnswer) => {
    if (Number.isInteger(parseInt(usersAnswer)) && (parseInt(usersAnswer) >= MIN_PLAYERS) && (parseInt(usersAnswer) <= MAX_PLAYERS)) {
      PLAYERS = parseInt(usersAnswer);

      rl.question('How big is the game? ', (answer) => {
        if (Number.isInteger(parseInt(answer)) && (parseInt(answer) >= MIN_BOARD_SIZE) && (parseInt(answer) <= MAX_BOARD_SIZE)) {
          BOARD_SIZE = parseInt(answer);
          console.log(`Size of the game: ${BOARD_SIZE}`);
        } else {
          console.log(`Sorry ${answer} is not a valid board size.`);
        }

        rl.close();

        if (isWinningPossible()) {
          console.log(drawGameBoard(board, BOARD_SIZE));
        } else {
          console.log(`Sorry this game is impossible to win.`);
        }
      });
    } else {
      console.log(`Sorry ${usersAnswer} is not a valid number of players.`);
      rl.close();
    }
  });
}

/**
 * Draws tic tac toe game board
 *
 * @param board
 * @param board_size
 */
function drawGameBoard(board, board_size) {
  let horizontalPartition = createHorizontalPartition(board_size);

  for (let row = 0; row < board_size; ++row) {
    let rowString = '';
    for (let col = 0; col < board_size; ++col) {
      rowString = rowString.concat(printCell(board[row][col])); // print each of the cells
      if (col !== board_size - 1) {
        rowString = rowString.concat("|");   // print vertical partition
      }
    }
    console.log(rowString);
    if (row !== board_size - 1) {
      console.log(horizontalPartition); // print horizontal partition
    }
  }
  console.log('\n');
}

/**
 * Print a cell with the specified "content"
 *
 * @param content
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
 * Creates horizontal partition based on the size of the board
 *
 * @param width
 * @returns {string}
 */
function createHorizontalPartition(width) {
  let partition = '';
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
  promptUser();
}

/**
 * Checks if winning is possible
 *
 * @returns {boolean}
 */
function isWinningPossible() {
  return true;
}

//run the game
initializeGame();

