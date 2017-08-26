const settings = require("./settings.json")


var guid = require("uuid/v4")
const express = require('express')
const app = express()

const gameBoard = require("./gameBoard.js")

var Games = {};

// `/index.html`
// `/game.html`
app.use('/', express.static(require("path").join(__dirname, 'static')))


// `/newGame`
app.get('/newGame', function (req, res) {
		
	if( ! req.query.player ){ 
		throw "INVALID PLAYER!"
	}
	
	//creating new game
	var GameUUID = guid()
	Games[GameUUID] = gameBoard({firstPlayer:req.query.player});

	res.send(GameUUID)
})
  
// `/joinGame`
app.get('/joinGame', function (req, res) {
	res.send('Hello joinGame!')//REDIRECT!
})

// `/gameEvent`
app.get('/gameEvent', function (req, res) {
	res.send('Hello gameEvent!')
})


if(settings.debug){
	app.get("/debugData", function (req, res){
		res.send({Games:Games})
	})
}
app.listen(settings.port, function () {
  console.log('Example app listening on port http://localhost:'+settings.port+'!')
})


