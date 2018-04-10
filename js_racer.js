/*jshint esversion:6*/
const argv = process.argv;

let lineLength = Number(argv[3]);
let players = generatePlayer(argv[2]);
let status = false;

function dice() {
  return Math.ceil(Math.random() * 6);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayer(totalPlayer) {
  let playerCode = 'abcdefghijk';
  var arr_players = [];
  for (let i = 0; i < totalPlayer; i++) {
    var objectData = {};
    objectData.name = playerCode[i];
    objectData.position = 0;
    arr_players.push(objectData);
  }
  return arr_players;
}

function print_board(totalPlayer,lineLength) { //3, 10 ==> [{A, 0}, {B, 0}, {C,0}]
  reset_board();
  for(let i = 0 ; i <totalPlayer.length;i++){
    if (!status) {
      totalPlayer[i].position = advanced_player(totalPlayer[i]);
    }
    let playerName = totalPlayer[i].name;

    console.log(print_line(playerName,totalPlayer[i].position));
  }
}


function print_line(playerName, position) { //A, 0
  // var totalTrek = [];
  var trek = [];
  for (let i = 0; i <= lineLength ; i++) { //10
    // console.log("iiiiii: ", i);
    if (i === position) {
      trek.push(playerName + '|');
    } else {
      trek.push(' |');
    }
    // totalTrek.push(trek);
    // console.log(trek);
  }
  // console.log(trek);
  return trek.join('');
}

function advanced_player(player) {
  let posisiNow = player.position + dice();
  if(posisiNow >= lineLength){
    status = true;
   return lineLength;
 }else{
   return posisiNow;
 }
}

function finished(player, line) {
  for(let i = 0 ; i < player.length ; i++){
    if(player[i].position >= line){
      status = true;
      return true;
    }
  }

  return false;
}

function winner(player,line) {
  for(let i = 0 ; i < player.length ; i++){
    if(player[i].position >= line){
      console.log('The Winner Is : ' + player[i].name);
    }
  }
}

function reset_board(){
  console.log("\x1B[2J");
}


while(!finished(players, lineLength)){
  sleep(1000);
  print_board(players,lineLength);
  // advanced_player(players);
  // finished(players,lineLength);
}
winner(players,lineLength);
