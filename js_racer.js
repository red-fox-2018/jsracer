"use strict"

var argv = process.argv
var player = Number(argv[2])
var track = Number(argv[3])

function dice(){
 var random = Math.floor(Math.random() * (7 - 1) + 1)
 return random
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

var players = []
function generatePlayer(player) {
  for(var i = 0; i < player; i++) {
    var playersInfo = {}
    playersInfo.name = String.fromCharCode(i+97)
    playersInfo.pos = 0
    players.push(playersInfo)
  }
}

generatePlayer(player)

function print_board(track, pos, players) {
 var trackBoard = []
 for(var i = 0; i < track; i++) {
   if(i === pos) {
     trackBoard.push(players)
   } else {
     trackBoard.push(' ')
   }
 }
 return trackBoard.join('|')
}

function print_line() {
  for(var i = 0; i < players.length; i++) {
    console.log(print_board(track, players[i].pos, players[i].name))
  }
}

print_line()

function advanced_player() {
  if(player < 2) {
    console.log('player minimal 2');
  }
  if(track < 15) {
    console.log('panjang track minimal 15');
  }

  var name = ''
  var win = false
  while(win === false) {
    for(var i = 0; i < players.length; i++) {
      if(!win) {
        players[i].pos += dice()
      }
      if(finished(players[i].pos)) {
        win = true
        players[i].pos = track-1
        name += players[i].name
      }
      console.log(print_board(track, players[i].pos, players[i].name))
    }
    sleep(3000);
    reset_board();
  }
  console.log(winner(name));
}

function finished(pos) {
  if(pos >= track-1) {
    // pos = track-1
    return true
  }
}

function winner(name) {
  return 'The winner is ' + name
}

function reset_board() {
  console.log("\x1B[2J")
}

advanced_player()
