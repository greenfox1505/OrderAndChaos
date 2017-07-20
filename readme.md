# Order and Chaos Game.

Simple Order/Chaos Online Multiplayer Game.

# Game Rules

The board is 6 by 6 boxes. Players pick either Order or Chaos. Order 
goes first.

Either player may place an X or O.

Order's goal is to create a single line of 5 matching boxes, either a 
line of Xs or Os.

Chaos's goal is mearly to block Order.

Order wins when a line of 5 Xs or Os exist. Chaos wins when the board is
full without filling the board.

# Player sequnce

A player starts a game by opening the website and chosing to start a new
game. They are given an option to make the game public or give someone
the Chaos link.

A player joins a game by opening the website and seeing a list of active 
games. Chosing one places them.

# Network Endpoints

All turn responces come via long polling. If a player is doesn't move 
for more than 5 minutes, the game is closed resulting in a victory for
the other player.

## /

Static files.

## /newGame

returns 

## /publicGame

## /game/:GAME/:PLAYER

Returns Board

## game/:GAME/:PLAYER/move/:LOC/:COLOR

Returns Board if valid move. Else returns error.

## game/:GAME/:PLAYER/poll

Turn Polling. Returns board when turn is completed.

# Game Logic

The game object is created with 2 random user IDs.

Constructor returns:

```js
{
	Order:{{Order_GUID}},
	Chaos:{{Chaos_GUID}},
	Game:{{GameControl}}//object to hold callbacks
}
```

## Board()

```js
{
	Board://string of 36 chars of  "_"s, "X"s, and "O"s.
	Turn://either "Order" or "Chaos"
}
```

## MoveHistory()

A complete move history as comma seperated list.

"OX33,CO22,OX32", etc

## Move({move,pos,ID})

Returns a fail if ID doesn't match the correct next user.

Otherwise returns true and causes a game event to be called.

## Events

### Move Occured

Returns the board and the current player's turn.

### Game Start

Calls on Game Start.

### Game End

Calls on game end. Returns the winner.



/*
Create Game
Join Game
List Games
?List My Games
Move
Current Board
Wait For Move

*/
