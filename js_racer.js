"use strict"
const argv = process.argv
const player = argv[2]
const line = +(argv[3])

console.log(validation(player, line));

function validation(players, line) {

  if (players < 2) {
    return `Minimum players is 2 !`
  } else if (line < 15) {
    return `Track is too short !`
  } else {
    return advanced_player(player);
  }

}

function generatePlayer(player, pos) {

  const players = []
  const alphabet = `abcdefghijklmnopqrstuvwxyz`

  for (var i = 0; i < player; i++) {

    let obj = {
      name : alphabet[i],
      position : pos
    }

    players.push(obj)

  }

  return  players

}

function dice(){

  return Math.ceil(Math.random() * 3)

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function print_board(players) {

  for (var i = 0; i < players.length; i++) {

    console.log(print_line(players[i]));

  }

  return ``

}

function print_line(players) {

  let track = ``

  for (var i = 0; i < line+1; i++) {

    if (i == players.position) {

      track += `${players.name}|`

    } else {

      track += ` |`

    }

  }

  return track

}

function advanced_player(player) {

  let players = generatePlayer(player, 0)

  let finish = false

  for (var i = 0; finish == false; i++) {

    for (var j = 0; j < players.length; j++) {

      sleep(500)
      reset_board()

      let myDice = dice()

      players[j].position += myDice

      if (players[j].position >= line) {

        players[j].position = line

      }

      console.log(print_board(players));

      if (finished(players[j], line)) {

        finish = true

        return winner(players[j].name)

        break ;

      }

    }

  }

}

function finished(player, pos) {

  if (player.position == pos) {

    return true

  }

  return false

}
function winner(player) {

  return `Player ${player} is the winner`

}
function reset_board() {
  console.log("\x1B[2J")
}
