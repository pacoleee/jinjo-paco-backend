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
}

function updateInstructor(request, response) {

}