"use strict"
let argv = process.argv

function dice(){

    let randomDice = Math.ceil(Math.random()*6)
    
    return randomDice
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayer(player_count) {

  let name = 'abcdefghijklmnopqrstuvwxyz'
  let playerData = []

  for (let i = 0; i < player_count; i++) {
    
    let objPlayer = {}
    objPlayer.name = name[i]
    objPlayer.pos = 0

    playerData.push(objPlayer)
  }

  return playerData
}

function print_board(player_count, lineLength) {
  
  let players = generatePlayer(player_count)
  let board = []
  let finish = ''

  while(!finished(players, lineLength)){

    for(let i=0; i<player_count; i++) {
    
      let player = players[i] // {name: "a", pos: 0}

      if (player.pos < lineLength){

        advanced_player(player)
        let playerLine = print_line(player, lineLength)
        console.log(playerLine);
        board.push(playerLine)

      } else {
        let playerLine = print_line(player, lineLength)
        console.log(playerLine);
        return winner(player.name)

      }
    }
  }

  return board.join('\n') 
}

function print_line(player, lineLength) {

  let line = []

  for(let i=0; i<lineLength; i++) {

    if(player.pos === i) {

      line.push(player.name)
    } else {

      line.push(' ')
    }
  }

  return line.join('|')
}

function advanced_player(player) {
  
  player.pos += dice()
}

function finished(players, lineLength) {
  
  let status = false

  for (let i=0; i<players.length; i++) {
    
    let player = players[i]

    if (player.pos == lineLength) {

      status = true
    }
  }

  return status
}

function winner(player) {
  
  console.log(`Player ${player} is the winner!`)
  process.exit()
}

function reset_board() {
  console.log("\x1B[2J")
}

console.log(print_board(argv[2],argv[3]))
