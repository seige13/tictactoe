/*

Need to develop how to save to and read from a read from a file.

Research encode json to save and then read the file.

Things that need to be saved:

board
current characters
win condition
number of players
whose turn it was - whose turn it was: turn counter or count objects on the board

parts of project:
> user is prompted to save a file, asking for file name, and saving file
> player can resume from saved game

*/

//15 Feb - start building around already created variables in index.js
const readline = require('readline');
const fs = require('fs');
const path = require('path');

let PLAYERS = 2;
let BOARD_SIZE = 3;
let WIN_SEQUENCE = 3;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//we have to extract the data from the actual game now
//the game variables can be extracted from the initial questions from inquirer
//declare the variables for saving as users answer questions as a "buffer" until players either save or quit
//still need to figure out how to store what was where on the board
let thisGame = {
  players: PLAYERS,
  win_seq: WIN_SEQUENCE,
  size: BOARD_SIZE,
  turnCt: TURN
};

let json = JSON.stringify(thisGame);

//saveFile needs to encode the game into the json object
function saveFile(currentGame) {
  rl.question('Enter file name: ', (fname) => {
    fs.writeFileSync(path.join(__dirname, fname), currentGame)
    rl.close()
  })
}

//loadFile reads and reopens
//call the printGameBoard function through this?
function loadFile() {
  rl.question('Enter file name: ', (fname) => {
    fs.readFile(path.join(__dirname, fname), 'utf-8', (err, data) => {
      if (err) {
        console.error(`An error occurred while opening ${fname}`, err);
      } else {
        var game = JSON.parse(data);
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

//saveFile(json);
loadFile();
