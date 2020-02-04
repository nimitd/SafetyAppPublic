const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'database-3.cjglauiczdmd.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'cs194_safety'
});
connection.connect()
const app = express();


// Testing the return function to the /testAPI fetch call from App.js
// Successfully sends the result of the query written here
app.get("/testAPI", (req, res)	=> {
	console.log("Successfully got a request from phone app!");
	let sql = `SELECT * FROM test_user_data.user_basic;`;
  	var query = connection.query(sql, function(err, result) {
    res.send(result);
  });
});


app.listen(3000, () =>	{
	console.log("Backend Node.js server is running...")
})