"use strict"
const argv = process.argv;
var total_player = parseInt(argv[2]);
var line_length = parseInt(argv[3]);
var players = generate_player(total_player);
var playerWon;

if (total_player < 2) {
  return console.log('Jumlah pemain minimal 2');
}

if (line_length < 15) {
  return console.log('Panjang lintasan minimal 15');
}

function dice() {
  let random = Math.floor(Math.random() * 6) + 1;

  return random;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function print_board() {
  reset_board();
  for (let i = 0; i < players.length; i++) {
    console.log(print_line(players[i].name, players[i].position));
  }
  sleep(1000);
}

function generate_player(total_player) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let players = [];

  for (let i = 0; i < alphabet.length; i++) {
    if (i === total_player) {
      break;
    } else {
      players.push({
        name: alphabet[i],
        position: 0
      })
    }
  }

  return players;
}

function print_line(player, pos) {
  let line = [];

  for (let i = 0; i < line_length; i++) {
    if (i === pos) {
      line.push(player)
    } else {
      line.push(' ');
    }
  }

  return line.join('|');
}

function race() {
  let finish = false;

  while (!finish) {
    for (let i = 0; i < players.length; i++) {
      players[i].position = advanced_player(players[i].position);
      print_board();
      finish = finished(players[i].position);
      if (finish) {
        playerWon = players[i].name;
        break;
      }
    }
  }
}

function advanced_player(player) {
  let currentPos = player + dice();

  if (currentPos > line_length - 1) {
    currentPos = line_length - 1;
  }

  return currentPos;
}

function finished(position) {
  if (position === line_length - 1) {
    return true;
  } else {
    return false;
  }
}

function winner() {
  console.log(`Player ${playerWon} is the winner`);
}

function reset_board() {
  console.log("\x1B[2J")
}

print_board();
race();
winner();
