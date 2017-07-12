#!/usr/bin/env node

var newGame = require("./GameBoard.js")

var game = newGame();

console.log(game);

var isGUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i


var test = {
	Order:(game.Order.match(isGUID) != null),
	Chaos:(game.Chaos.match(isGUID) != null),
	Board1:(game.Game.Board()),
	Board2:(game.Game.FormattedBoard())
}
console.log(JSON.stringify(test));

//console.log(`{"Order":true,"Chaos":true,"Board1":{"Turn":"Order","Board":"                                    "},"Board2":"      \\n      \\n      \\n      \\n      \\n      \\n"}` == JSON.stringify(test))


var o = game.Order
var c = game.Chaos
var g = game.Game

console.log(g.FormattedBoard());
g.Move({move:"O",pos:20,ID:o});
g.Move({move:"O",pos:21,ID:c});
g.Move({move:"O",pos:22,ID:o});
g.Move({move:"X",pos:23,ID:c});
console.log(g.FormattedBoard());

console.log(g.History())
