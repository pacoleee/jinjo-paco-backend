//routes
module.exports = function(app) {
    app.route('/room')
        .post(addRoom)
        .delete(deleteRoom)
        .get(getRoom);
}

var connection = require('../server').connection;

// API functions
function addRoom(request, response) {
	var instructorID = request.body.instructorID;
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

function deleteRoom(request, response) {

}

function getRoom(request, response) {

}