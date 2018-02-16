let Board = require('./board');

const inquirer = require('inquirer');

const MAX_PLAYERS = 26;
const MIN_PLAYERS = 2;

const MAX_BOARD_SIZE = 999;
const MIN_BOARD_SIZE = 3;

const PLAYERS_CHAR = 'XOABCDEFGHIJKLMNPQRSTUVWYZ';

let PLAYERS = 2;
let BOARD_SIZE = 3;
let WIN_SEQUENCE = 3;

let isGameWon = false;

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
    PLAYERS = parseInt(answers.numberOfUsers);
    WIN_SEQUENCE = parseInt(answers.winSequence);

    if (isWinningPossible()) {
      playGame();
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
        rowString = rowString.concat(`${row + 1} `);
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
 * Play tic tac toe game
 */
function playGame() {
  let currentBoard = new Board(BOARD_SIZE);
  console.log(printGameBoard(currentBoard));
  userTurn(0, currentBoard);
}

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


/**
 * Recursive function for single user's turn
 *
 * @param {int} turn
 * @param board
 */
function userTurn(turn, board) {

  if (!board.isWinner()) {
    let player = turn % PLAYERS;
    let playerCharacter = PLAYERS_CHAR.charAt(player);

    let question = [
      {
        type: 'input',
        name: 'usersMove',
        message: `Player ${player + 1} (${playerCharacter}): Where would you like to make a move? (column row) `,
        validate: function (value) {
          let regex = `^[1-${+BOARD_SIZE}]\\s[1-${+BOARD_SIZE}]`;
          let found = value.match(regex);
          if (!found) {
            return `Please enter a valid move in the format: 1 ${BOARD_SIZE}`;
          }

          if (!board.isValidMove(value.charAt(0) - 1, value.charAt(2) - 1)) {
            return `Please enter a move that is not already taken`;
          }

          return true;
        }
      }];

    inquirer.prompt(question).then(answer => {
      let row = answer.usersMove.charAt(0) - 1;
      let col = answer.usersMove.charAt(2) - 1;
      isGameWon = checkIfWin(playerCharacter, WIN_SEQUENCE, col, row);
      board.placeMove(row, col, playerCharacter);
      printGameBoard(board);
      userTurn(turn + 1, board);
    }).catch(reason => {
      console.log(reason);
    });
  } else {
    console.log('There are no more valid moves!');
  }

}

/**
 * Print a cell with the specified content
 *
 * @param {string} content
 * @returns {string}
 */
function printCell(content) {
  return content === '' ? '   ' : ` ${content} `;
}

/**
 * Creates the top row of the game board
 *
 * @param {int} board_size
 * @return {string}
 */
function createNumberedRow(board_size) {
  let rowString = '  ';
  for (let i = 1; i <= board_size; i++) {
    rowString = rowString.concat(` ${i}  `);
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
  let partition = '  ';
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
          },
          {
            name: 'Quit',
            value: 'quit'
          }
        ]
      }
    ])
    .then(answers => {
      switch (answers.game) {
        case 'resume':
          resumeGame();
          break;
        case 'quit':
          quitGame();
          break;
        default:
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
  rl.question('Enter file name: ', (fname) => {
    fs.readFile(path.join(__dirname, fname), 'utf-8', (err, data) => {
      if (err) {
        console.error(`An error occurred while opening ${fname}`, err);
      } else {
        var game = JSON.parse(data);
        //needs to be updated to rebuild the board and pick up the game
        console.log(game.players);
        console.log(game.win_seq);
        console.log(game.size);
        var whoseTurn = (game.turnCt % game.players) + 1;
        console.log(`It's player ${whoseTurn}'s turn`); //can be designed to show marking instead
      }
    })
    rl.close()
  })
}
}

/**
 * Quits current game
 */
function quitGame() {
  console.log('Quiting game...');
}

//run the game
initializeGame();
