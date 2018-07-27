//include
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json());
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var clientConnections = {};

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Cs304funfunfun',
	database: 'jinjo'
});

connection.connect(function(err) {
	if (err){
		console.log('Error connecting to database\n');
	 	throw err;
	}
});

// Socket IO

io.on('connection', function(socket){
	socket.on('joining room', (roomID) => {
      	console.log('Joining Room :', roomID);
      	if(!clientConnections.hasOwnProperty(roomID)) {
      		clientConnections[roomID] = [socket];
      	} else {
      		clientConnections[roomID].push[socket];
      	}
   	});

   	socket.on('disconnect', (roomID) => {
   		console.log('user disconnected');
   		if(clientConnections.hasOwnProperty(roomID)) {
   			var room = clientConnections[roomID];
    		room.splice(room.indexOf(socket), 1);	
    	}
  	});
});

exports.connection = connection;
exports.io = io;
exports.clientConnections = clientConnections;

//init routes
require('./routes/instructor')(app); 
require('./routes/room')(app);
require('./routes/question')(app);

//start server
server.listen(8080, function () {
  console.log('Running on port 8080...')
});