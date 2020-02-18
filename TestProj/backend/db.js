const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'database-3.cjglauiczdmd.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'cs194_safety'
});
connection.connect();

module.exports = connection