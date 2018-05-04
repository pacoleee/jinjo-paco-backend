//routes
module.exports = function(app) {
	app.route('/question')
	.post(addQuestion);
	.get(getQuestions);

	app.route('/question/like/:id')
	.put(likeQuestion);

	app.route('/question/answer/:id')
	.put(answerQuestion);
}

var connection = require('../server').connection;

// API functions
function getQuestions(request, response) {
	var roomID = request.body.roomID;

	var query = 'SELECT * FROM Question \
	WHERE roomID = ' +roomID;

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

	var query = 'INSERT INTO Question (question, upvotes, roomID) \
	Values ("' +question +'", "' +roomID +'")';

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

function likeQuestion(request, response) {
	var questionID = request.params.questionID;

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
			response.send(rows);
		}
	});
}

function answerQuestion(request, response) {
	var questionID = request.params.questionID;

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
			response.send(rows);
		}
	});
}