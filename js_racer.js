function dice(range){//mengenerate angka random sampai batas yang dimasukkan pada parameter
  return Math.floor(Math.random()*range)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function participants(totalPlayer) { // outputnya adalah list pemain dalam sebuah array, dan posisinya
  let huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let hasil = []
  for (var i = 0; i < totalPlayer; i++) {
    hasil.push([])
    hasil[i].push(0)
    hasil[i].push(huruf[dice(huruf.length)])
  }
  debugger
  return hasil //[[A,0],[B,0]]
}
function reset_board() {
  console.log("\x1B[2J")
}

function startRacing(totalPlayer,trackDist) {
  var condition = true
  var participantsInitial = participants(totalPlayer)//[[A,0],[B,0]]
  let partInit = participantsInitial.slice()
  function print_board(totalPlayer,trackDist) {
    if (condition === true) {
      for (var row = 0; row < totalPlayer; row++) { //print per row
        let track = []
        for (var pos = 0; pos < trackDist; pos++) {// print per character
          if (pos == 0) {
            track.push(participantsInitial[row][1])
            track.push('|')
          } else {
            track.push(' ')
            track.push('|')
          }
        }
        console.log(track.join(''));
        debugger
      }
      condition = false
    } else {
      for (var row = 0; row < totalPlayer; row++) { //print per row
        let track = []
        let newPos = dice(Math.round(6))
        while (newPos === 0) {
          newPos = dice(Math.round(6))
        }
        participantsInitial[row][0] += newPos
        let batas = false
        if (participantsInitial[row][0] >= trackDist) {
          participantsInitial[row][0] = trackDist-1
          batas = true
        }
        for (var pos = 0; pos < trackDist; pos++) {// print per character
          if (pos == participantsInitial[row][0]) {
            if (batas === true) {
              track.push(' ')
              track.push('|')
              track.push(participantsInitial[row][1])
            } else {
              track.push(participantsInitial[row][1])
              track.push('|')
            }
          } else {
            track.push(' ')
            track.push('|')
          }
        }
        console.log(track.join(''));
      }
    }
    return
  }
  while(partInit[partInit.length-1][0] < trackDist-1) {
    partInit.sort()
    print_board(totalPlayer,trackDist);
    if (partInit[partInit.length-1][0] < trackDist - 1) {
      sleep(1000)
      reset_board()
    }
  }
  console.log(`Player ${partInit[partInit.length-1][1]} is the winner`);
  return
}

let argv = process.argv
startRacing(argv[2],argv[3])
