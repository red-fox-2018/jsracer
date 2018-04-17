"use strict"
const argv = process.argv
var pemain = Number(argv[2])
var lengthline = Number(argv[3])
var game = generatePlayer(pemain)
var playerWon;


function dice() {
  return Math.floor((Math.random() * 6) + 1)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function generatePlayer(pemain) {
  let charPlayer = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let dataPlayer = []

  for (var i = 0; i < pemain; i++) {
    let objData = {
      name: charPlayer[i],
      pos: 0
    }
    dataPlayer.push(objData)
  }
  return dataPlayer
}


function print_board() {
  reset_board()
  for (var i = 0; i < game.length; i++) {
    console.log(print_line(game[i].name, game[i].pos));

  }
sleep(1000)
}




function print_line(player, pos) {
  let track = []

  for (let i = 0; i < lengthline; i++) {
    if (i === pos) {
      track.push(player)
    } else {
      track.push(' ')
    }
  }

  let result = track.join('|')
  return result
}



function play() {
  let status = false

  while (!status) {
    for (var i = 0; i < game.length; i++) {
      game[i].pos = advanced_player(game[i].pos)
      print_board()
      status = finished(game[i].pos)
      if (status) {
        playerWon = game[i].name;
        break;
      }
    }
  }
}

function advanced_player(player) {

  let currentPos = player + dice();
  if (currentPos > lengthline - 1) {
    currentPos = lengthline - 1;
  }
  return currentPos;
}


function finished(position) {
  if (position == lengthline - 1) {
    return true
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
play();
winner();
