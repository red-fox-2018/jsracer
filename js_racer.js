"use strict"

let arr = process.argv.splice(2);
if (arr.length === 0) {
    console.log('input panjang lintasan dan jumlah pemain')
    sleep(1000)
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
    let move = Math.ceil(Math.random() * 6)
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

function print_board(player) {
    let players = createPlayer(player)
    for (let i in players) {
        print_line(players[i].name, 0);
    }
    sleep(1000)
    reset_board()

    while (true) {
        for (let i = 0; i < players.length; i++) {
            let pos = advanced_player(players[i].position);
            print_line(players[i].name, pos);
            players[i].position = pos
            if (finished(pos)) {
                for (let j = i+1; j < players.length; j++) {
                    print_line(players[j].name, players[j].position);
                }
                return players[i].name;
            }
        }
        sleep(1000)
        reset_board()
    }
}

function print_line(player, pos) {
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
   return 'Winner is ' + print_board(playerCount)
}

function advanced_player(playerPos) {
    playerPos += dice();
    if (playerPos >= lintasan - 1) {
        playerPos = lintasan - 1;
    }
    return playerPos
}

function reset_board() {
    console.log("\x1B[2J")
}
console.log(winner())