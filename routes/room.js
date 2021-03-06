//routes
module.exports = function(app) {
    app.route('/room')
        .post(addRoom)
        .get(getRooms);
    app.route('/room/:id')
      .get(getRoom);
}

var connection = require('../server').connection;

// API functions
function addRoom(request, response) {
	var instructorID = request.get("instructorID");
	var roomName = request.body.roomName;

	var query = 'INSERT INTO Room (instructorID, roomName) \
    Values ("' +instructorID +'", "' +roomName +'")';

    connection.query(query, function(error, rows, fields){
    	if(!!error) {
    		console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
     	else {
      		response.send(rows);
     	}
  	});
}

function getRooms(request, response) {
	var instructorID = request.get("instructorID");

	var query = 'SELECT * FROM Room WHERE instructorID = "' +instructorID +'"';

	connection.query(query, function(error, rows, fields){
    	if(!!error) {
    		console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
     	else {
      		response.send(rows);
     	}
  	});
}

function getRoom(request, response) {
	var roomID = request.params.id;

	var query = 'SELECT * FROM Room WHERE roomID = "' +roomID +'"';

	connection.query(query, function(error, rows, fields){
    	if(!!error) {
    		console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
     	else {
      		response.send(rows);
     	}
  	});
}