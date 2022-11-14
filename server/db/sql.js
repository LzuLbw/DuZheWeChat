var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '19960422ZM',
	database: 'ry-vue'
});
module.exports = connection;