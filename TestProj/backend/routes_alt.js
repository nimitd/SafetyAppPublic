// file to handle the routes
// testing from tutorial: https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/


var express = require('express')
var router = express.Router()
var con = require('./db');

router.get('/hello', (req, res) => {
	console.log("Received" + req.body)
	res.json('Returning back some message')
})

router.post('/test_post', (req, res) => {
	var name = req.body.first_name;
	console.log("Received" + name);
	res.json('Returning back some message');
})

router.get("/create_new_user", (req, res) => {
	console.log("Received user creation request!");
	// const values = [ req.body.first_name, 
 //                   req.body.last_name,
 //                   req.body.suid, 
 //                   req.body.phone]
  	con.query(`SELECT * FROM app_data.users;`,
          (q_err, q_res) => {
          if(q_err) return next(q_err);
          console.log("Got back results: " + q_res[0]);
          res.send(q_res)
    })

	// first_name = payload_json.first_name;
	// last_name = payload_json.last_name;
	// suid = payload_json.suid;
	// phone_number = payload_json.phone_number;
	// console.log("Received payload for:" + first_name + " " 
	// 	+ last_name + "with suid " + suid + "and phone # " + phone_number);
	// let insert = "INSERT INTO app_data.users (suid, `first_name`, `last_name`, `phone_number`) VALUES (";
	// let insert_built = insert + suid + "," + first_name + "," + last_name + "," +  phone_number + ");";
 //  	var query = connection.query(insert_built, function(err, result) {});
 //  	res.send(query);
});




module.exports = router;

