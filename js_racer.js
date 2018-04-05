
function dice(){
 return Math.floor(Math.random()*3)+1
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function print_board(pos,players,line) {
  let board = [] 
  let winner = ''
  for(let key in pos){
    while(winner == ''){
      for (let key in pos) {  
        var step = dice()
        if(pos[key]==0){
          track = print_line(key, pos[key], line)
          board.push(track)
          pos[key] += step
        }
        else{
          if (winner == '') {
            if (pos[key] + step >= line - 1) {
              pos[key] = line - 1
              winner = key
            } else {
              pos[key] += step
            }
          } 
        track = print_line(key, pos[key], line)         
        board.push(track)
        }  
        console.log(track)
      } 
      sleep(500)
      reset_board()
    } 
  } 
  console.log(board.slice(board.length-players).join('\n'))
  console.log('  selamat, ' + winner + '  kamu menang')
}

function print_line(player,pos,line) {
    var lintasan = []
    for (let i = 0; i < line; i++) {
      if (i == pos) {
        lintasan.push(player)
      }
      else {
        lintasan.push(' ')
      }
    }
    return lintasan.join(' | ')
}

function advanced_player(player) {
  var abjad = 'abcdefghijklmnopqrstuvwxyz'
  var players = {}
  for(let i=0;i<player;i++){
    players[abjad[i]] = 0
  }
  return players
}

function reset_board() {
  console.log("\x1B[2J")
}

var announce = process.argv
if (announce.length==2){
  console.log ('masukkan angka pertama, sebagai jumlah player \n \nmasukkan angka kedua, sebagai panjang lintasan')
}else{
  var nilai = announce.slice(2)
  var position = advanced_player(nilai[0])
  var board = print_board(position, nilai[0], nilai[1])
  board
}


// console.log(print_board(nilai[0], nilai[1]))
// console.log(print_board(nilai[0], nilai[1]))
// console.log(print_board(nilai[0], nilai[1]))
