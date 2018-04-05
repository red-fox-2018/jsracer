"use strict"

function dice(){
  let dadu = Math.floor(Math.random()*6)+1
  return dadu
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayer(pemain){
  let name = 'abcdefghijklmnopqrstuvwxyz'

  let listPemain = []
  for(let i=0;i<pemain;i++){
    listPemain.push({name: name[i],position: 0})
  }

  return listPemain
}

function print_board(arr_players, lintasan) {
  let finish = false
  
  for(let l = 0; l < arr_players.length; l++){
    print_line(arr_players[l].name, arr_players[0].position, lintasan)
  }
  sleep(1000);
  reset_board();
  while (finish==false) {

    for (let i = 0; i < arr_players.length; i++) {
      arr_players[i].position = rollDice(arr_players[i].position, lintasan);
      
      print_line(arr_players[i].name, arr_players[i].position, lintasan)
      
      finish = finished(arr_players[i].position, lintasan);
      if (finish==true) {
        for(let j = i+1; j < arr_players.length; j++){
          print_line(arr_players[i].name, arr_players[i].position, lintasan)
        }
        return winner(arr_players[i].name)
      }

    }
    sleep(1000);
    reset_board();
  }
}

function rollDice(cekDadu, lintasan){
  let currentPos = cekDadu + dice()

  if (currentPos > lintasan-1) {
    currentPos = lintasan-1;
  }

  return currentPos
}

function print_line(player, pos, lintasan) {
  let line = [];

  for (let i = 0; i < lintasan; i++) {
    if (i === pos) {
      line.push(player)
    } else {
      line.push(' ');
    }
  }

  console.log(line.join('|'))
}

function finished(position, lintasan) {
  if (position == lintasan-1) {
    return true;
  } else {
    return false;
  }
}

function winner(menang) {
  return `Player ${menang.toUpperCase()} is the winner`;
}

function reset_board() {
  console.log("\x1B[2J")
}


var input = process.argv.splice(2)
//console.log(input.length)
if(input.length==2){
  var pemain = input[0];
  var lintasan = input[1];
  var arr_players = generatePlayer(pemain)

  console.log(print_board(arr_players, lintasan))
}else{
  console.log("Masukkan Jumlah Pemain dan Panjang Lintasan")
}
