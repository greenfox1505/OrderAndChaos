#!/usr/bin/env node

var guid = require("uuid/v4");

module.exports = function GameLobby(){
	var output = {
		gameID:guid(),
		first:guid(),
		players:[],
		gameObj:null,
	};
	output.players.push(output.first);

	output.gameStart = function(gameStart){
		/*starting the game requires a game object becomes part
		  of the lobby..somehow having figure that far out, but it
		  will probably involve passing commands through the lobby*/
		output.gameObj = gameStart(output);
		//run game event start

		output.gameCommand = function(gameCmd){
			//verify?
			return output.gameObj[gameCmd.cmd](gameCmd.args);
		}

		delete output.gameStart;

	}


	output.playerJoin = function(){
		var newPlayer = guid();
		output.players.push(newPlayer);
		return newPlayer;
	}
	return output;
}



