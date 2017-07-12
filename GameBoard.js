#!/usr/bin/env node


var guid = require("uuid/v4")

module.exports = function(){
	const Order = guid();
	const Chaos = guid();
	var Game = {
		History:()=>History
	};
	var Turn = "Order";
	var Board =
		"      "+"      "+"      "+
		"      "+"      "+"      ";

	var History="";

	function TurnSwap(){//I hate these two turn fuctions. I'm sure there is a better design, but it works...
		if(Turn == "Order")
			return Turn = "Chaos";
		else if (Turn == "Chaos")
			return Turn = "Order";
		else
			throw "BAD TURN!, SWAP"
	}
	function CheckTurn(input){
		if(Turn == "Order")
			return Order == input;
		else if (Turn == "Chaos")
			return Chaos == input;
		else
			throw "BAD TURN!, CHECK!"
	}

	function GameEvent(input){//check for victory, return last board, etc
	}

	Game.Board = () => {return{Turn:Turn,Board:Board}};
	Game.FormattedBoard = () => {
		var out = Turn + "'s turn:\n";
		var lines = Board.match(/.{1,6}/g);
		for( i in lines ){
			out = out + "|"+ lines[i] + "|\n";
		}
		return out;
	};

	//## Move({move,pos,ID})
	//Returns a fail if ID doesn't match the correct next user.
	//Otherwise returns true and causes a game event to be called.
	Game.Move =(input) => {
		console.log(input);
		//validate move
		if( Board[input.pos] != " ")
		{
			throw "Invalid Location!";
		}
		if( !(input.move == "X" || input.move =="O")){
			throw "Invalid Move!"
		}
		if( !CheckTurn(input.ID)){
			throw "Not your turn!"
		}
		//add move to board and swap turn
		console.log("switch '" + Board[input.pos] + "' for '" + input.move + "' at " + input.pos);
		Board = Board.substr(0,input.pos) +  input.move[0] + Board.substr(input.pos+1)
		TurnSwap();

		History = History +  input.move + input.pos + ","

		//trigger game event
		//check for victory,
		//TODO
	}


	return { Order:Order,Chaos:Chaos,Game:Game}

}

//# Game Logic

//The game object is created with 2 random user IDs.

//Constructor returns:

//```js
//{
	//Order:{{Order_GUID}},
	//Chaos:{{Chaos_GUID}},
	//Game:{{GameControl}}//object to hold callbacks
//}
//```

//## Board()

//```js
//{
	//Board://string of 36 chars of  "_"s, "X"s, and "O"s.
	//Turn://either "Order" or "Chaos"
//}
//```

//## MoveHistory()

//A complete move history as comma seperated list.

//"OX33,CO22,OX32", etc


//## Events

//### Move Occured

//Returns the board and the current player's turn.

//### Game Start

//Calls on Game Start.

//### Game End

////Calls on game end. Returns the winner.
