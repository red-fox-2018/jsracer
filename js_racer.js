"use strict"
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
//-----bagian generate board keseluruhan
function print_board(number,length) {
  let max = 0;
  let icon = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let playericon = {};
  for(let i=0;i<number;i++){
    playericon[icon[i]] = 0;
  }


  let winner = ''
  while(winner == ''){
    let board = [];
    for(let i in playericon){

      if(playericon[i]==0){
        let line = print_line(i,playericon[i],length);
        playericon[i]+=advanced_player(playericon[i]);
        board.push(line);
      }
      else{

        let move = advanced_player(playericon[i])

        if(winner == '') {
          if(playericon[i] + move >= length-1) {
            playericon[i] = length - 1
            winner = i
          } else {
            playericon[i] += move
          }  
        }

        let line = print_line(i,playericon[i],length);
        board.push(line);
      }
    }
    console.log(board);
    sleep();
    reset_board();
  }
  console.log(winner+' The Winner !!!');
}
//-----------------------------------------------------

//-------bagian untuk generate lintasa
function print_line(player,pos,length) {
  let line = []
    for(let j=0;j<length;j++){
      if(j === pos){
        line.push(player)
      }
      else if(j==length-1){
        line.push('$')
      }
      else{
        line.push(' ')
      }
    }
    return line.join(' | ');
}
//----------------------------------------------

//------bagian merandom nilai untuk gerak player
function advanced_player(player){
  let position = player;
  let move = 0;
  move = Math.floor(Math.random() * 6);
  while (move === 0) {
    move = Math.floor(Math.random() * 6)
  }
  return move;
}
//----------------------------------------------
function reset_board() {
  console.log()
}

let apply = process.argv.splice(2);
let board = print_board(apply[0],apply[1]);
