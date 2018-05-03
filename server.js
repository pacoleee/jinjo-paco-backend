//include
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

app.use(bodyParser.json());

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

exports.connection = connection;

//init routes
require('./routes/instructor')(app); 
require('./routes/room')(app);
require('./routes/question')(app);

//start server
app.listen(8080, function () {
  console.log('Running on port 8080...')
});