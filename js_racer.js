 "use strict"

function dice(){
	var tambah = Math.floor(Math.random()*3+1)
	return tambah
}
var lar = dice()
console.log(lar);

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function print_board(numberPlayer, lengthBoard, startingLine) {
	var jsPlayer = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var board = []
	var posisi = startingLine
	var obj = [
		{
			Player: 'a',
			posisi: 0
		},
		{
			Player: 'b',
			posisi: 0
		}
		,
		{
			Player: 'c',
			posisi: 0
		}
		,
		{
			Player: 'd',
			posisi: 0
		}
	]
	var winner = ''
		while(winner===''){
		for(var i=0;i<numberPlayer;i++){
			var bar = print_line(obj[i].Player,obj[i].posisi,lengthBoard)
			board.push(bar)
			console.log('ini ', obj[i].Player, ' pos ', obj[i].posisi);
			if (winner==='') {
				if (obj[i].posisi === lengthBoard-1) {
					winner=i
				}
				else{
					obj[i].posisi+=dice()
				}

			}
		}
		sleep(10)
	}
	console.log(obj[winner].Player,'is the winner');
		
}
	
	
console.log(print_board(4,10,0));


function print_line(player, pos, length) {
	var bar = []
	var posi = 0
	for(var i=0;i<length;i++){
		if (i===pos) {
			bar.push(player+'|')
		}
		else{
			bar.push(' | ')
		}
	}
	console.log(bar.join(''));
	//console.log(bar);
	return bar
}
var bar = print_line()
//console.log(line);


function advanced_player(player) {

}

function finished() {

}
function winner() {

}
function reset_board() {
  console.log("\x1B[2J")
}

var proces = process.argv
proces = proces.splice(2)
//console.log(proces);