var argv = process.argv

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

function randomize(){
    var random=Math.ceil(Math.random()*7)
    return random
}

function generatePlayer(totalPlayer){
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    var playerList=[]
    for (var i=0; i<totalPlayer; i++){
        var obj={
            name: alphabet[i],
            position: 0
        }
        playerList.push(obj)
    }
    return playerList
}

function print_board(totalPlayer, length){
    var playerList=generatePlayer(totalPlayer)
    while(!finished(playerList, length)){
        let board = []
        for(let p=0; p<playerList.length; p++){
            let player = playerList[p]
            if(!finished(playerList, length)){
                advance_player(player,length)
            }
                let line = print_line(player ,length)
                board.push(line)
        } 
        
        console.log(board.join("\n"))
        sleep(1000)
        reset_board()
    }
}

function advance_player(player,length){
    var step=randomize()
    player.position+=step
    if(player.position>=length-1){
        player.position=length
    }
    return player
}
// playerList = [{name: "a", position: 0},{name: "b", position: 0}, {name: "c", position: 0} ]

function finished(playerList, length){
    let finished = false
    for( var i=0; i<playerList.length; i++){
        var playerPos=playerList[i]["position"]
        if(playerPos>length-1){
            finished = true
        }
    }
    return finished
}

//true false doang
// function finished(playerList, length){
    
//     for( var i=0; i<playerList.length; i++){
//         var playerPos=playerList[i]["position"]
//         console.log('-----position', playerPos)
//         if(playerPos>length-1){
//             return true
//         }else{
//             return false
//         }
//     }    
// }

//function print_line ini buat dipanggil di fuction print_board,buat 
function print_line(player, length){
    let line = []
    for(var j=0; j<=length ; j++){
        if(j == player.position){
            line.push(player.name)
        }else{
            line.push(" ")
        }
    }
    return line.join(" | ")
}

function reset_board() {
    console.log("\x1B[2J")
}


print_board(3, 10)




