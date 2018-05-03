//routes
module.exports = function(app) {
    app.route('/question')
        .post(addQuestion);

    app.route('/question/like')
    	.post(likeQuestion);

    app.route('/question/answer')
    	.post(answerQuestion);
}

var connection = require('../server').connection;

// API functions
function addQuestion(request, response) {

}

function likeQuestion(request, response) {

}

function answerQuestion(request, response) {
	
}