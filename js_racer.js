/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict";

var argv = process.argv;
var jumlahPlayer = argv[2];
var jumlahLintasan = argv[3];

function generate_player(jumlahPlayer, jumlahLintasan) {
  if (jumlahPlayer < 2) {
    console.log('Maaf ! Jumlah pemain JSRacer kurang dari 2!');
  } else if (jumlahLintasan < 15) {
    console.log('Maaf ! Jumlah panjang lintasan JSRacer kurang dari 15!');
  } else {
    var arrPlayer = [];
    for (var i = 0; i < jumlahPlayer; i++) {
      var playerObj = {};
      var char = String.fromCharCode(i + 97);
      playerObj.name = char;
      playerObj.posisi = 0;
      arrPlayer.push(playerObj);
    }
  }
  return arrPlayer;
}

function play() {
  var hasil;
  var finnish = false;
  while (finnish == false) {
    let arrPlayer = generate_player(jumlahPlayer, jumlahLintasan);
    for (var i = 0; i < arrPlayer.length; i++) {
      arrPlayer[i].posisi = advanced_player(arrPlayer[i].posisi, dice());
      print_board();
      finnish = finished(arrPlayer[i].posisi);
      if (finnish === true) {
        hasil = arrPlayer[i].name;
        i = arrPlayer.length + 1;
      }
    }
  }
}

function print_line(player, pos) {
  let arrLine = [];
  for (let i = 0; i <= jumlahLintasan; i++) {
    if (i === pos) {
      arrLine.push(player);
    } else {
      arrLine.push(' ');
    }
  }
  return arrLine.join('|');
}

function print_board() {
  let arrPlayer = generate_player(jumlahPlayer, jumlahLintasan);
  reset_board();
  for (let i = 0; i < arrPlayer.length; i++) {
    console.log(print_line(arrPlayer[i].name, arrPlayer[i].posisi));
  }
  sleep(1000);
}


function advanced_player(posisi, dice) {
  let total = posisi + dice;
  if (total > jumlahLintasan - 1) {
    total = jumlahLintasan - 1;
  }
  return total;
}

function finished(posisi) {
  if (posisi === jumlahLintasan - 1) {
    return true;
  } else {
    return false;
  }
}

function winner(player, winner) {
  if (winner === true) {
    return `Player ${player} is the winner!`;
  }
}

function reset_board() {
  console.log("\x1B[2J");
}

function dice() {
  return Math.floor(Math.random() * 6) + 1;
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

let player = generate_player(argv[2], argv[3]);
print_board();
play();
console.log(winner(hasil, finnish));
