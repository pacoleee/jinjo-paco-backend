//routes
module.exports = function(app) {
	app.route('/question')
	.post(addQuestion);
	
	app.route('/question/like/:questionID')
	.put(likeQuestion);

	app.route('/question/answer/:questionID')
	.put(answerQuestion);

	app.route('/question/:roomID')
	.get(getQuestions);
}

var connection = require('../server').connection;
var io = require('../server').io;
var clientConnections = require('../server').clientConnections;

// API functions
function getQuestions(request, response) {
	var roomID = request.params.roomID

	var query = 'SELECT * FROM Question \
	WHERE roomID = ' +roomID + ' ORDER BY isAnswered, upvotes DESC'

	connection.query(query, function(error, rows, fields){
		if(!!error) {
			console.log('Error in the query\n');
			response.status(422);
			response.send('422 Unprocessable Entity');
			return;
		} else {
			response.send(rows);
		}
	});
}

function addQuestion(request, response) {
	var question = request.body.question;
	var roomID = request.body.roomID;

	var query = 'INSERT INTO Question (question, upvotes, roomID, isAnswered) \
	Values ("' +question +'", "' +"0" +'", "' +roomID +'", "' +"0" +'")';

	connection.query(query, function(error, rows, fields){
		if(!!error) {
			console.log('Error in the query\n');
			response.status(422);
			response.send('422 Unprocessable Entity');
			return;
		} else {
			var roomConnections = clientConnections[roomID];
			for(var socket in roomConnections) {
				io.to(socket.id).emit('refresh questions', '');
			}
			response.send(rows);
		}
	});
}

function likeQuestion(request, response) {
	var questionID = request.params.questionID;
	var roomID = request.body.roomID;

	var query = 'UPDATE Question \
	SET upvotes = upvotes + 1 \
	WHERE questionID = ' +questionID;

	connection.query(query, function(error, rows, fields){
		if(!!error) {
			console.log('Error in the query\n');
			response.status(422);
			response.send('422 Unprocessable Entity');
			return;
		} else {
			var roomConnections = clientConnections[roomID];
			for(var socket in roomConnections) {
				io.to(socket.id).emit('refresh questions', '');
			}
			response.send(rows);
		}
	});
}

function answerQuestion(request, response) {
	var questionID = request.params.questionID;
	var roomID = request.body.roomID;

	var query = 'UPDATE Question \
	SET isAnswered = 1 \
	WHERE questionID = ' +questionID;

	connection.query(query, function(error, rows, fields){
		if(!!error) {
			console.log('Error in the query\n');
			response.status(422);
			response.send('422 Unprocessable Entity');
			return;
		} else {
			var roomConnections = clientConnections[roomID];
			for(var socket in roomConnections) {
				io.to(socket.id).emit('refresh questions', '');
			}
			response.send(rows);
		}
	});
}