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

}

function deleteRoom(request, response) {

}

function getRoom(request, response) {

}