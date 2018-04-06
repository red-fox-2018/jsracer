"use strict"

function rollDice(){
  return Math.floor(Math.random() * 6)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayer(player, pos) {
  var arrayPlayer = [];
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f'];
  for (var i = 0; i < player; i++) {
    var obj = {};
    obj.player = alphabet[i];
    obj.position = 0;
    arrayPlayer.push(obj);
  }
  return arrayPlayer;
}

function print_line(playerName, playerPosition, panjang) {
  var arrLine = [];
  // var playerList = generatePlayer(player);
  // var pos = playerList[0].position;

  for (var i = 0; i <= panjang; i++) {

    if (i === playerPosition) {
      arrLine.push(playerName)
    } else {
      arrLine.push('_')
    }
  }

  // arrLine[playerPosition] = playerName
  console.log(arrLine.join('|'));

}

function print_board(totalPlayer, panjang) {
  var pemain = generatePlayer(totalPlayer);

 //  [ { player: 'a', position: 0 },
 // { player: 'b', position: 0 },
 // { player: 'c', position: 0 } ]


  for (var i = 0; i < pemain.length; i++) {
    let playerName = pemain[i].player
    let pos = pemain[i].position

    print_line(playerName, pos, panjang)
  }

  // if(continuePlay(pemain, panjang)) {
  //   advanced_player(totalPlayer, panjang, pemain);
  //   reset_board()
  //   sleep(500);
  // } else {
  //   console.log('finished');
  // }

  advanced_player(totalPlayer, panjang, pemain)

}

function advanced_player(totalPlayer, panjang, pemain) {
  // totalPlayer = 3
  // panjang = 20

  // pemain
  //  [ { player: 'a', position: 0 },
  // { player: 'b', position: 0 },
  // { player: 'c', position: 0 } ]

  let status = continuePlay(pemain, panjang);


  for(let i=0; i<pemain.length; i++) {
    if (status == true) {
      let dice = rollDice();
      pemain[i].position += dice
      if (pemain[i].position >= panjang) {
        // status = false;
        pemain[i].position = panjang
        break;
      }
    }
    // console.log("=====> ", pemain[i]);
    let playerName = pemain[i].player
    let playerPosition = pemain[i].position

    print_line(playerName, playerPosition, panjang)
  }

  if (status == false) {
    console.log(`pemenangnya adalah ${winner(pemain)}`)
  }else  {
    sleep(1000);
    reset_board();
    advanced_player(totalPlayer, panjang, pemain)
  }
}

function continuePlay(pemain, panjang) {
  let status = true;
  for (var i = 0 ; i < pemain.length; i++) {
    if (pemain[i].position >= panjang) {
      // pemain[i].position = 13
      // console.log(i);
      // console.log(pemain);
      // console.log(pemain[i].position, panjang);
      status = false
    }
  }
  return status;
}

function winner(pemain) {
  // var pemain = generatePlayer(player);
  var winner = ''
  for (var i = 0; i < pemain.length; i++) {
    if (pemain[i].position >= trackLength) {
      winner = pemain[i].player;
    }
  }
  return winner;
}

function reset_board() {
  console.log("\x1B[2J")
}

// =========================================================

var argv = process.argv
var totalPlayer = argv[2];
var trackLength = Number(argv[3])

// ronde 1

print_board(totalPlayer, trackLength);
// console.log(print_line('a', 0, trackLength));

// console.log(advanced_player(player));
// sleep(500);
// reset_board()



// while(finished(player) == true) {

// }
// console.log(winner());

// console.log(generatePlayer(player));
// console.log(print_line(player));
// console.log(print_board(player));
// console.log(advanced_player(player));
