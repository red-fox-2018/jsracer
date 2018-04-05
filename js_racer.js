/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict";

// ==========Play Mode==========
function playMode() {
  while (finnish == false) {
    for (let i = 0; i < arrPlayer.length; i++) {
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

// ==========Inisiasi Player==========
function generate_player(jumlahPlayer, jumlahLintasan) {
  let arrPlayer = [];
  for (let i = 0; i < jumlahPlayer; i++) {
    let playerObj = {};
    let char = String.fromCharCode(i + 65);
    playerObj.name = char;
    playerObj.posisi = 0;
    arrPlayer.push(playerObj);
  }
  return arrPlayer;
}

// ==========Print TrackLine==========
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

// ==========Print Board==========
function print_board() {
  reset_board();
  for (let i = 0; i < arrPlayer.length; i++) {
    console.log(print_line(arrPlayer[i].name, arrPlayer[i].posisi));
  }
  sleep(1000);
}

// ==========Position Player==========
function advanced_player(posisi, dice) {
  let total = posisi + dice;
  if (total > jumlahLintasan - 1) {
    total = jumlahLintasan - 1;
  }
  return total;
}

// ==========Finnish==========
function finished(posisi) {
  if (posisi === jumlahLintasan - 1) {
    return true;
  } else {
    return false;
  }
}

// ==========Display Winner==========
function winner(player, winner) {
  if (winner === true) {
    return console.log(`Player ${player} is the winner!`);
  }
}

// ==========Roll Dice==========
function dice() {
  return Math.floor(Math.random() * 6) + 1;
}

// ==========Reset Board==========
function reset_board() {
  console.log("\x1B[2J");
}

// ==========Time Sleep==========
function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// ==========Input Data Game==========

var argv = process.argv;
var jumlahPlayer = argv[2];
var jumlahLintasan = argv[3];
var hasil;
var finnish = false;
var arrPlayer = generate_player(jumlahPlayer, jumlahLintasan);

if (jumlahPlayer < 2) {
  return console.log('Maaf ! Jumlah pemain JSRacer kurang dari 2!');
} else if (jumlahLintasan < 15) {
  return console.log('Maaf ! Jumlah panjang lintasan JSRacer kurang dari 15!');
}

playMode();
print_board();
winner(hasil, finnish);
