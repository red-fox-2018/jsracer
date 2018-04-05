"use strict"
const argv = process.argv
function dice(){
  return Math.ceil(Math.random() * 6 + 1)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function print_board(player) {
  var board = '';
  for (var i = 0; i < player.length; i++) {
    board += print_line(player[i], pos[i]) + '\n';
  }
  return board;
}

function print_line(player, pos) {
  var inLine = [];
  for (var i = 0; i < track; i++) {
    inLine.push(' |');
  }
  inLine[pos] = player + '|';
  var disp = inLine.join('');
  return disp;
}

function advanced_player(playPos) {
  playPos = playPos + dice() - 1;
  if (playPos >= track - 1) {
    playPos = track - 1;
    finished(pos, track);
  }
  return playPos;
}

function playerGen(player) {
	var playerName = 'abcdefghijklmnopqrstuvwxyz';
	var playerPlay = '';
	for (var i = 0; i < player; i++) {
		playerPlay += playerName[i];
	}
	return playerPlay;
}

function finished(pos,track) {
  for (var i = 0; i < pos.length; i++) {
    if (pos[i] >= track - 1) {
      return true;
    }
  }
  return false;
}
function winner(player) {
    return `Player  ${player}  is the winner`
}
function reset_board() {
  console.log("\x1B[2J")
}

sleep(1000);
reset_board();
var track = argv[3];
var jmlPlayer = argv[2];
if (jmlPlayer < 2 || jmlPlayer === undefined) {
	console.log('pemain minimal = 2');
} else if (track < 15 || track === undefined) {
	console.log('track minimum = 15');
} else {
	var pos = [];
	var stoper = 0;
	for (var i = 0; i < jmlPlayer; i++) {
		pos.push(0);
	}
	var playerName = playerGen(jmlPlayer);
	console.log(print_board(playerName, track));
	sleep(1000);
	reset_board();
	while (finished(pos, track) === false) {
		for (var i = 0; i < pos.length; i++) {
			pos[i] = advanced_player(pos[i]);
			console.log(print_board(playerName));
			sleep(1000);
			reset_board();
			if (finished(pos, track) === true) {
				console.log(print_board(playerName));
				console.log(winner(playerName[i]));
				break;
			}
		}
	}
}
