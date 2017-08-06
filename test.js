#!/usr/bin/env node

var newGame = require("./GameBoard.js")

var game = newGame();


var o = game.Order
var c = game.Chaos
var g = game.Game

g.onMove= (m)=>{
	console.log("ON MOVE!")
	console.log(m);
	console.log(g.FormattedBoard());
}

console.log(g.FormattedBoard());
g.Move({move:"O",pos:20,ID:o});
g.Move({move:"O",pos:21,ID:c});
g.Move({move:"O",pos:22,ID:o});
g.Move({move:"X",pos:23,ID:c});
g.Move({move:"O",pos:19,ID:o});
g.Move({move:"X",pos:18,ID:c});

g.Move({move:"X",pos:0,ID:o});
g.Move({move:"X",pos:6,ID:c});
g.Move({move:"X",pos:12,ID:o});
console.log("WIN:",g.CheckWin())
g.Move({move:"X",pos:24,ID:c});


var fail = true;
try{
g.Move({move:"X",pos:24,ID:c});
}
catch(n){
	console.log("expected error!");
	fail=false;
}
if(fail)throw new Error("ABOVE ERROR FAIL!")

console.log("WIN:",g.CheckWin());

["X","O"].forEach((M)=>{for(var i = 0; i < 12; i++){
	var GAME = newGame();
	var o = GAME.Order;
	var c = GAME.Chaos;
	var g = GAME.Game;
	g.Move({move:M,pos:i,ID:o});
	g.Move({move:M,pos:i+6,ID:c});
	g.Move({move:M,pos:i+12,ID:o});
	g.Move({move:M,pos:i+18,ID:c});
	console.log("WIN:",g.CheckWin())
	g.Move({move:M,pos:i+24,ID:o});
	console.log(g.FormattedBoard());
	console.log("WIN:",g.CheckWin(),"\n===")
}});
["X","O"].forEach((M)=>{ //incomplete coverage. probably ok
for(var i = 0; i < 12; i++){
	var GAME = newGame();
	var o = GAME.Order;
	var c = GAME.Chaos;
	var g = GAME.Game;
	g.Move({move:M,pos:i,ID:o});
	g.Move({move:M,pos:i+1,ID:c});
	g.Move({move:M,pos:i+2,ID:o});
	g.Move({move:M,pos:i+3,ID:c});
	console.log("WIN:",g.CheckWin());
	g.Move({move:M,pos:i+4,ID:o});
	console.log(g.FormattedBoard());
	console.log("WIN:",g.CheckWin(),"\n===");
}
})





var GameLobby = require("./gameLobby.js")

var game = GameLobby();

var player1 = game.first;
var player2 = game.playerJoin();

console.log(game);

function testGame(inputData){
	if(inputData.players.length !=2 ){throw "INCORRECT PLAYERS"};
	console.log("test game created with", inputData);
	var output = {
		start:function(players){
			output.players = players;
		},
		testCmd:function(args){return "testCmd called with '" + args + "'";},
		Order:inputData.players[0],
		Chaos:inputData.players[1]
	}
	return output;
}


game.gameStart(testGame);
console.log(game.gameCommand({cmd:"testCmd",args:"COMMAND ARGS!"}))

console.log(game)


