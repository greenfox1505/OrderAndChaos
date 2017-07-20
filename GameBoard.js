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
			throw new Error("BAD TURN!, SWAP")
	}
	function CheckTurn(input){
		if(Turn == "Order")
			return Order == input;
		else if (Turn == "Chaos")
			return Chaos == input;
		else
			throw new Error("BAD TURN!, CHECK!")
	}

	Game.onMove = ()=>{}
	Game.onEnd = ()=>{}
	function GameEvent(Type,input){//check for victory, return last board, etc
		//this is broken. this works, but it could be so much better.
		if(Type == "Move"){
			Game.onMove(input);
			//check for win
		}
		else if(Type == "End"){
			Game.onEnd();
		}
		else{
			throw new Error("BAD EVENT TYPE");
		}
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

	Game.CheckWin = ()=>{
		//vert wins
		for( var x = 0; x < 6; x++){//TODO: this could be made way faster by checking middle 4 and then XOR sides. I'll fix it later if it's an issue
			for( var y = 0; y < 2; y++){
				if(
					(Board[x+(y+0)*6] == "X" &&
					Board[x+(y+1)*6] == "X" &&
					Board[x+(y+2)*6] == "X" &&
					Board[x+(y+3)*6] == "X" &&
					Board[x+(y+4)*6] == "X") ||
					(Board[x+(y+0)*6] == "O" &&
					Board[x+(y+1)*6] == "O" &&
					Board[x+(y+2)*6] == "O" &&
					Board[x+(y+3)*6] == "O" &&
					Board[x+(y+4)*6] == "O"))
						return "Order";
			}
		}
		//horz wins
		for( var y = 0; y < 6; y++){
			for( var x = 0 ; x < 2; x++){
				if(
					(Board[y*6+x+0] == "X" &&
					Board[y*6+x+0] == "X" &&
					Board[y*6+x+0] == "X" &&
					Board[y*6+x+0] == "X" &&
					Board[y*6+x+0] == "X") ||
					(Board[y*6+x+0] == "O" &&
					Board[y*6+x+1] == "O" &&
					Board[y*6+x+2] == "O" &&
					Board[y*6+x+3] == "O" &&
					Board[y*6+x+4] == "O"))
					return "Order";
			}
		}
		//diag wins
		//fullBoard
		if(!Board.match(" ")){
			return "Chaos";
		}
		//no win
		return false;
	}

	//## Move({move,pos,ID})
	//Returns a fail if ID doesn't match the correct next user.
	//Otherwise returns true and causes a game event to be called.
	Game.Move =(input) => {
		//console.log(input);
		//validate move
		if( Board[input.pos] != " ")
		{
			throw new Error("Invalid Location!");
		}
		if( !(input.move == "X" || input.move =="O")){
			throw new Error("Invalid Move!")
		}
		if( !CheckTurn(input.ID)){
			throw new Error("Not your turn!")
		}
		//add move to board and swap turn
		//console.log("switch '" + Board[input.pos] + "' for '" + input.move + "' at " + input.pos);
		Board = Board.substr(0,input.pos) +  input.move[0] + Board.substr(input.pos+1)
		TurnSwap();

		History = History +  input.move + input.pos + ","

		//trigger game event
		GameEvent("Move",input);
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
