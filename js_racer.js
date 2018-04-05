"use strict"
const player = process.argv[2]
const track  = process.argv[3]

print_board()

function dice(){
  let rollDice = Math.floor((Math.random()*3)+1)
  return rollDice
}

function generatePlayer(){
  let alphabet  = 'abcdefghijklmnopqrstuvwxyz'
  let players   = []
  for (var i = 0; i < player; i++){
    let obj = {}
    obj.name = alphabet[i]
    obj.pos  = 0
    players.push(obj)
  }
  return players
}

function print_board() {
  if(player < 2){
    return console.log('Jumlah pemain minimal 2');
  } else {
    if(track < 15){
      return console.log('Panjang lintasan minimal 15');
    }
  }

  let all_players  = generatePlayer()
  let finished = ''


  while(finished === ''){

    for(let i = 0; i < all_players.length; i++){
      let player = all_players[i]
      if(player.pos >= track){

        finished = player.name
        sleep(700)
        console.log(print_line(player.name, track-1));
        return winner(finished);
      } else {
        sleep(700)
        console.log(print_line(player.name, player.pos));
        player.pos = advanced_player(player)
      }
    }
  }

}

function print_line(player, pos) {
  let line = []
  for(let i = 0; i < track; i++){
    if(i == pos){
      line.push(player)
    } else {
      line.push(' ')
    }
  }
  return line.join('|')+'|'
}


function advanced_player(player) {
  let advanced = player.pos + dice()
  return advanced
}

function finished() {

}
function winner(player) {
  console.log(`Player ${player} is the winner!`);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function reset_board() {
  console.log("\x1B[2J")
}
