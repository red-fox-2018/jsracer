"use strict"

let arr = process.argv.splice(2);
if (arr.length === 0) {
    console.log('input panjang lintasan dan jumlah pemain')
    // break;
}
let lintasan = arr[0];
let playerCount = arr[1];

function createPlayer(player) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let players = []
    for (let i = 0; i < player; i++) {
        players.push({ name: alphabet[i].toUpperCase(), position: 0 })
    }
    return players
}

function dice() {
    let move = Math.floor(Math.random() * 6) + 1
    return move
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function print_board(player, lintasan) {
    let players = createPlayer(player)
    let akhir = false;
    for (let i in players) {
        print_line(players[i].name, 0, lintasan);
    }
    sleep(1000)
    reset_board()

    while (akhir == false) {
        for (let i = 0; i < players.length; i++) {
            players[i].position = players[i].position + dice();
            if (players[i].position >= lintasan - 1) {
                players[i].position = lintasan - 1;
            }
            print_line(players[i].name, players[i].position, lintasan);
            if (finished(players[i].position)) {
                for (let j = i+1; j < players.length; j++) {
                    print_line(players[j].name, players[j].position, lintasan);
                }
                return players[i].name;
            }
        }
        sleep(1000)
        reset_board()
    }
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

function finished(position) {
    if (position == lintasan - 1) {
        return true;
    } else {
        return false;
    }
}

function winner() {
   return 'Winner is ' + print_board(playerCount, lintasan)
}

function advanced_player(player) {
}

function reset_board() {
    console.log("\x1B[2J")
}
console.log(winner())