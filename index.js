/*

@ Iswanul Umam - Red Fox
@ Start Program: $ node index.js 3 30
*/

let params = process.argv;
const input = params.slice(2);

var character = ['|a', '|b', '|c', '|d', '|e', '|f', '|g', '|h', '|i', '|j', '|k', '|l', '|m', '|n', '|o', '|p', '|q', '|r', '|s', '|t', '|u', '|v', '|w', '|x', '|y', '|z'];
var countStepChar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


console.log(main()); // start runing program

// @ main function, calling other function
function main () {
  // validate input from user
  validateInput(input);
  let totalPlayer = input[0];
  let lengthRace = input[1];
  let currentLayer = generateLayer(totalPlayer, lengthRace);
  
  let counter = 0;
  while (counter < 10) {
    for (let i = 0; i < totalPlayer; i++) {
      delay(50);
      let ramdomDice = dice();
      countStepChar[i] += ramdomDice;
      currentLayer = movePlayer(currentLayer, character[i], ramdomDice);

      console.log("\x1B[2J");
      console.log(printLayer(currentLayer));
      if (countStepChar[i] > lengthRace) {
        return `Player ${character[i][1]} won!\n${printLayer(currentLayer)}`;
      }
    }
    counter++;
  }
}

// ---------------------------------------------------

// @ generate first layer game
function generateLayer(totalPlayer, lengthRace) {
  let board = [];
  // generate layer in array
  for (let i = 0; i < totalPlayer; i++) {
    board[i] = [];
    board[i].push(character[i]);
    for (let j = 0; j <= lengthRace; j++) {
      board[i].push(`| `);
    }
  }
  return board;
}

// @ move one player to next index
function movePlayer(board, player, dice) {
  let indexPlayer = {
    '|a': 0, '|b': 1, '|c': 2, '|d': 3, '|e': 4, '|f': 5, '|g': 6, '|h': 7, '|i': 8, '|j': 9, '|k': 10, '|l': 11, '|m': 12, '|n': 13,
    '|o': 14, '|p': 15, '|q': 16, '|r': 17, '|s': 18, '|t': 19, '|u': 12, '|v': 21, '|w': 22, '|x': 23, '|y': 24, '|z': 25,
  }
  
  let index = indexPlayer[player];
  let race = board[index];
  let curentPost;
  for (let i = 0; i < race.length; i++) {
    if (race[i].trim() == player.trim()) {
      curentPost = i;
    }
  }
  // let nextPost = curentPost + dice;

  let nextPost;
  if (curentPost + dice >= race.length - 1) {
    nextPost = race.length - 1;
  } else {
    nextPost = curentPost + dice;
  }

  // move posisition
  race[nextPost] = player;
  race[curentPost] = '| ';
  board[index] = race;
  return board;
}
// console.log(movePlayer(sampelLayer, '|a', 2));

// ---------------------------------------------------

// @ shake dice value 1 - 6
function dice() {
  return Math.floor(Math.random() * (7 - 1) + 1);
}

// @ delay printing value
function delay (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// @ print layer of game to string format
function printLayer(arrayLayer) {
  // make layer from array
  let allLine  = ``;
  for (let i = 0; i < arrayLayer.length; i++) {
    let line = arrayLayer[i];
    allLine += line.join('');
    allLine += '\n';
  }
  // allLine += "\x1B[2J";
  return allLine;
}

// @ validate input from console
function validateInput (input) {
  if (input.length != 2) {
    console.log('Input yang anda masukan salah!\n');
    console.log('Example: $ node [param 1] [param2]');
    console.log('Example: $ node index.js 2 10\n');
    process.exit(0);
  }
}

// @ check winer player
// function isWinner (board) {
//   for (let row of board) {
//     for (let col of row) {
//       if (col != '| ') {
//         return col;
//       }
//     }
//   }
//   return false;
// }

// console.log(isWinner([['| ', '| ']])); // false
// console.log(isWinner([['| ', '|a']])) // |a