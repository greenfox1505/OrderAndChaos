# Game State Sequence

A turn based game is effectively a state machine. These are the states.

## Game Start

Player1 creates the game, gets shifted to another page, holds at GameStart status.

Player2 can join, gets redirected to same page as Player1 but with other args.

## Turns

Game state is current player's turn.

## Game End

Game End. Triggered at win or timeout. Discard web data after 1 day.




# Game Events

Game event that cause state changes.

## Lobby_Start

When the first player joins, a lobby object is created, returns player ID and lobby ID, redirects to lobby.

Now in Pending Players state.

## Player_Joined

Player Joins. If there is space in the game, creates player ID, redirects to URL containing game ID and player ID. Player logs in with both.

If player diconnects, reports back and removes them.(?maybe?)

## Game_Start

When all players are connected, Player1 must click Game_Start, throwing all players into the game, creates game, returns event to all players that redirect to game page. 

## Game_Turns

Lobby become game controller. All turns pass through the lobby and if you go out of turn it rejects the message.




