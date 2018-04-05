"use strict"


function dice(){
  return Math.round(Math.random()*5+1)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayer(jumlahPlayer, trackLength){
  // console.log(jumlahPlayer)
  if(jumlahPlayer < 2 ){
    return 'jumlah player minimal 2'
  }

  var arrObjRace = []
  var namaPemain = ''
  var posisiPemain = 0
  var abjad = 'abcdefghijklmnopqrstuvwxyz'
  for(let i=0; i<jumlahPlayer; i++){
    namaPemain = abjad[i]
    var objRace = {
      playerName: namaPemain,
      playerPos: posisiPemain
    }
    arrObjRace.push(objRace)
  }
  return arrObjRace

}

function print_line(PlayerName, PlayerPosition) {
  var arrTrack = []
  // var trackLength = 30
  for(let i=0; i<trackLength; i++){
    arrTrack.push(' ')
  }
  arrTrack[PlayerPosition] = PlayerName
  return arrTrack.join('|')
}

function print_board(jumlahPlayer, trackLength) {
  var arrObjRace = generatePlayer(jumlahPlayer, trackLength)
  // console.log(arrObjRace)
  for(let i=0; i<arrObjRace.length; i++){
    let printLine = print_line(arrObjRace[i].playerName, arrObjRace[i].playerPos)
    console.log(printLine)
  }
  sleep(1000)
  reset_board()
  // console.log('')

  var flag = false
  while(flag === false){
    for(var j=0; j<arrObjRace.length; j++){
      arrObjRace[j].playerPos += dice()
      let printLine = print_line(arrObjRace[j].playerName, arrObjRace[j].playerPos)
      console.log(printLine)
      if(arrObjRace[j].playerPos >= trackLength){
        flag = true
        console.log(winner(arrObjRace[j].playerName))
      }
    }
    sleep(1000)
    reset_board()
    // console.log(arrObjRace)
    // console.log('')
  }

}

function advanced_player(player) {

}

function finished() {
}

function winner(winner) {
  return `Player ${winner} is the winner`
  // console.log(`Player ${winner} is the winner`)

}

function reset_board() {
  console.log("\x1B[2J")
}

// DRIVER CODE
const argv = process.argv
var jumlahPlayer = argv[2]
var trackLength = argv[3]
// console.log(argv)

// console.log(print_line(jumlahPlayer, trackLength))
// console.log(generatePlayer(jumlahPlayer, trackLength))
console.log(print_board(jumlahPlayer, trackLength))
