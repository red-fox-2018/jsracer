"use strict"

function dice(){
 	return Math.floor(Math.random()*6);
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function generatePlayers(jumlahPlayer) {
	var alfabet='abcdefghijklmnopqrstuvwxyz'
	var arrPeserta=[];
	for(var i=0;i<jumlahPlayer;i++){
		var dataPeserta={};
		dataPeserta.playerName=alfabet[i];
		dataPeserta.pos=0;
		arrPeserta.push(dataPeserta);
	}

	// [{
	// 	name: 'A',
	// 	pos: 0
	// }]
	return arrPeserta;
}

function print_board() {
//loop dari printLine
	var x=player.length;
	var isFirst  = true
	var winner = ''
	let playerPos = 0;

	while(winner===''){
		for(var i=0;i<player.length;i++){
			//if(x != 5) {
			if(isFirst){
				console.log(print_line(player[i].playerName, playerPos));
			}else{
				dice=Math.floor(Math.random()*trackLength);  // 5
				// player[i].pos += dice;  // 8

				if(winner === '') {
					if(player[i].pos + dice >=trackLength-1 ){
						player[i].pos = trackLength-1  
						winner = player[i].playerName
						
					}else {
						player[i].pos += dice;
						
					}
				}

				let current_playerPos = player[i].pos; //13
				
				console.log(print_line(player[i].playerName, current_playerPos));
			}		
		//	}	
		}
		isFirst = false
		console.log("====================");
		//x--;	
	}
	console.log("pemenang: " + winner);
}

// var playerPos=process.argv;
// playerPos=playerPos.splice(2);

function print_line(playerName, pos) {
	var arr =[];
	for(var i=0;i<trackLength;i++){
		if(pos===i){
			arr.push(playerName);	
		} else {
			arr.push(' | ');	
		}	
		
	}
	var arrJoin=arr.join('');
	return arrJoin;		
}
	
	


function advanced_player(player) {
//cek langkah
}

function finished() {

}
function winner() {

}
function reset_board() {
  console.log("\x1B[2J")
}

//print_line("A",3,5);
//generatePlayers(3);


var x=process.argv;
var trackLength=x[3];
var player=generatePlayers(x[2]);

print_board();

//console.log(print_line(player.))
//console.log(generatePlayers(3));