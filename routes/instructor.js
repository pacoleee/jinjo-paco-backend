//routes
module.exports = function(app) {
  app.route('/instructor')
  .post(addInstructor)
  .put(updatePassword)

  app.route('/instructor/login')
  .post(loginInstructor);
}

var connection = require('../server').connection;

// API functions
function addInstructor(request, response) {
	var email = request.body.email;
	var password = request.body.password;

	var query = 'INSERT INTO Instructor (email, password) \
  Values ("' +email +'", "' +password +'")';

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

function updatePassword(request, response) {
	var email = request.body.email;
  var oldPassword = request.body.oldPassword;
  var newPassword = request.body.newPassword;


  var selectQuery = 'SELECT * FROM Instructor \
  WHERE email ="' +email +'" AND password = "' +oldPassword +'"';

  var updateQuery = 'UPDATE Instructor \
  Set password="' +newPassword +'" \
  WHERE email = "' +email +'"';

  connection.query(selectQuery, function(error, rows, fields){
    if(!!error) {
      console.log('Error in the query\n');
      response.status(422);
      response.send('422 Unprocessable Entity');
      return;
    } else {
      connection.query(updateQuery, function(error, rows, fields){
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
  });
}

function loginInstructor(request, response) {
  var email = request.body.email;
  var password = request.body.password;

  var query = 'SELECT * FROM Instructor \
  WHERE email ="' +email +'" AND password = "' +password +'"';

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