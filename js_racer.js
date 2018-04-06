"use strict"

function dice(){
  let diceNum = Math.floor(Math.random() * (6) + 1);
  return diceNum;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayers(playerNum, playerList) {
  let arr_players = [];
  for (var i = 0; i < playerNum; i++) {
    let obj = {};
    let selectedPlayerIdx = Math.floor(Math.random() * playerList.length);
    obj.name = playerList[selectedPlayerIdx];
    obj.pos = 0;
    playerList.splice(selectedPlayerIdx, 1);
    arr_players.push(obj);
  }
  return arr_players
}

function print_board() {
  let arr_players = generatePlayers(totalPlayer, playerAvailable);
  while(finished(arr_players, trackLength) !== true) {
    for (let i = 0; i < arr_players.length; i++) {
      let line = print_line(arr_players[i].name, arr_players[i].pos, trackLength)
      // console.log(arr_players[i]);
      advanced_player(arr_players[i]);
      // console.log(arr_players[i]);
      // arr_players[i].pos += dice()
      // console.log('sebelum if\n', arr_players);
      if (arr_players[i].pos >= trackLength - 1) {
        console.log('---masuk kondisi menang---');
        console.log('----pos menang----', arr_players[i].pos);
        arr_players[i].pos = trackLength - 1;
        let winnerLine = print_line(arr_players[i].name, arr_players[i].pos, trackLength)
        // console.log('----line menang ---', line);
        console.log('----arr i----', arr_players[i]);
        console.log(winnerLine.join('|'));
        for (var j = i + 1; j < arr_players.length; j++) {
          console.log('---masuk for---');
          console.log('----', arr_players[j]);
          let loseLine = print_line(arr_players[j].name, arr_players[j].pos, trackLength)
          console.log(loseLine.join('|'));

          // arr_players[j]
        }
        // console.log('masuk loop');
        // console.log(arr_players);

        return winner(arr_players[i]);
      } else {
        console.log(line.join('|'))
      }
    }
    console.log('\n');
  }
  // return winner(arr_players);
}

function print_line(playerName, pos, trackLength) {
  let arrOfEachPlayer = [];
  for (var i = 0; i < trackLength; i++) {
    if (i === pos) {
      arrOfEachPlayer.push(playerName);
    } else {
      arrOfEachPlayer.push(' ');
    }
  }
  return arrOfEachPlayer;
}

function advanced_player(player) {
  // console.log(player);
  return player.pos += dice();
}

function finished(players, trackLength) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].pos >= trackLength - 1) {
      return true;
    }
  }
  return false;
}
function winner(player) {
  // console.log(players);
  // console.log(trackLength);
  console.log('WINNER IS ' + player.name);
  // for (let i = 0; i < players.length; i++) {
  //   console.log(players[i]);
  //   if (players[i].pos > trackLength - 1) {
  //     players[i].pos = trackLength - 1;
  //   }
  //   let line = print_line(players[i].name, players[i].pos, trackLength)
  //   console.log(line.join('|'))
  // }
}
function reset_board() {
  console.log("\x1B[2J")
}


var race = process.argv.splice(2);
var trackLength = Number(race[1]);
var totalPlayer = Number(race[0]);

// print_board()
var playerAvailable = ['A', 'B', 'C', 'D', 'E', 'F'];
// generatePlayers(totalPlayer, playerAvailable);
var readyPlayer = [ { name: 'A', pos: 0 }, { name: 'F', pos: 0 } ]
// console.log(readyPlayer);
print_board();

// 1. generate player nya otomatis generatePlayers()
// var pos = dice();
// console.log(print_line(player, dice()));
// print_line(player, )
