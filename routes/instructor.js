//routes
module.exports = function(app) {
    app.route('/instructor')
        .post(addInstructor)
        .put(updateInstructor);
}

var connection = require('../server').connection;

// API functions
function addInstructor(request, response) {
	var email = request.body.email;
	var password = request.body.password;

	var query = 'INSERT INTO Instructor (email, password) \
    Values ("' +email +'", "' +password +'")';

    console.log(query);

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

function updateInstructor(request, response) {

}