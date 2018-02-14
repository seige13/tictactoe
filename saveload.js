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

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let game = {
  players: 2,
  win_seq: 3,
  size: 3
};

let json = JSON.stringify(game);

function saveFile(currentGame) {
  rl.question('Enter file name: ', (fname) => {
    fs.writeFileSync(path.join(__dirname, fname), currentGame)
    rl.close()
  })
}

function loadFile() {
  rl.question('Enter file name: ', (fname) => {
    fs.readFile(path.join(__dirname, fname), 'utf-8', (err, data) => {
      if (err) {
        console.error(`An error occurred while opening ${fname}`, err);
      } else {
        console.log(data);
      }
    })
    rl.close()
  })
}

loadFile();
