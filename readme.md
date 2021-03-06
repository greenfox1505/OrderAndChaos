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


## API outline: 


* Create Game
* List Games
* Join Game
* Current Board
* Move
* Wait For Move

## /

Static files.

## /newGame

creates a new game, connects the player as Order

```
	{gameID:GUID,order:GUID}
```

## /joinGame/:gameID

Joins an existing game as Chaos.

Returns Chaos's GUID.

If called after Chaos has connected once, returns error.

## /game/:GAME/:PLAYER

Returns Board

## game/:GAME/:PLAYER/move/:LOC/:COLOR

Returns Board if valid move. Else returns error.

## game/:GAME/:PLAYER/poll

Turn Polling. Returns board when turn is completed, or keep alive

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


./GameBoard.js

# Technical Flow

Load page, click "new game". background loads: `/newGame?player=$(PlayerUUID)`

`/newGame` creates game, returns GameUUID, client redirects to: `/game.html?id=$(GameUUID)&player=$(PlayerUUID)`

`/game.html` reads URL params, requests `/gameEvent?id=$(GameUUID)` data. Holds until player2 is generated. Player2 URL `/joinGame?id=$(GameUUID)`.

`/joinGame?id=$(GameUUID)` generates UUID for player2, redirects to `/game.html?id=$(GameUUID)&player=$(PlayerUUID)`

Once game has started, events are passed through `/gameEvent?id=$(GameUUID)`. Players pass moves through push requests on this url.


`/index.html`
`/game.html`
`/newGame`
`/joinGame.html`
`/gameEvent`
