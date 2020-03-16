// file to handle the routes
// testing from tutorial: https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/


var express = require('express')
var router = express.Router()
var con = require('./db');
var drone = require('./drone')

const jwt = require('jsonwebtoken');
const colors = require('./colors');
const CHANNEL_ID = 'ck9tuUkzlzPvEaG0'
const CHANNEL_SECRET = 'DIlVYq9b0cudM1kHxazqU3daZXPhkxuM'


router.post('/test_post_harrison', (req, res) => {
	var name = req.body.first_name;
	console.log("Received" + name);
	res.json('Returning back some message');
})

router.post('/hello', (req, res) => {
	console.log("Received")
	res.json('Returning back some message')
})

router.get('/harrison', (req, res) => {
	console.log("Querying user data!");
  	con.query(`SELECT * FROM app_data.users;`,
          (q_err, q_res) => {
          if(q_err) return next(q_err);
          res.send(q_res)
    })
})

router.post('/test_post', (req, res) => {
	var name = req.body.first_name;
	console.log("Received" + name);
	res.json('Returning back some message');
})

router.get("/get_all_users", (req, res) => {
	console.log("Querying user data!");
  	con.query(`SELECT * FROM app_data.users;`,
          (q_err, q_res) => {
          if(q_err) return next(q_err);
          res.send(q_res)
    })
})

router.post('/send_prelim_user_data', (req, res, callback) => {
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var suid = req.body.suid;
	var dorm = req.body.dorm;
	const values = [[ req.body.first_name, 
                   req.body.last_name,
                   req.body.suid, 
                   req.body.dorm]];
	var sql_insert = "INSERT INTO app_data.users(first_name, last_name, suid, residence) VALUES ?";
	console.log(sql_insert)
	con.query(sql_insert, [values], (q_err, q_res) => {
        if(q_err){
        	if (q_err.code == 'ER_DUP_ENTRY' || q_err.errno == 1062) {
          		console.log("Duplicate error caught");
          		res.status(401).send("Duplicate user error!");
        	}
		}
        else	{
	        console.log(q_res)
	        res.send(q_res)
      	}
    })
})



router.post('/publish_event', (req, res, callback) => {
	console.log("IN PUBLISH EVENTS!!!!")
	const values = [[ req.body.event_title, 
                   req.body.sober_contact_name,
                   req.body.sober_contact_phone, 
                   req.body.sober_contact_role,
                   req.body.community,
                   req.body.location,
                   ]];
	var sql_insert = "INSERT INTO app_data.events(event_title, sober_contact_name, sober_contact_phone, sober_contact_role, community, location) VALUES ?";
	console.log(sql_insert)
	con.query(sql_insert, [values], (q_err, q_res) => {
        if(q_err){
        	if (q_err.code == 'ER_DUP_ENTRY' || q_err.errno == 1062) {
          		console.log("Duplicate error caught");
          		res.status(401).send("Duplicate user error!");
        	}
		}
        else	{
	        console.log(q_res)
	        res.send(q_res)
      	}
    })
})








router.post('/get_resource_data', (req, res) => {
	// var name = req.body.name;
	// var phonenumber = req.body.phone_num;
	// var email = req.body.email;
	// var description = req.body.
	// console.log("Received User for: " + name + suid + dorm);
	console.log("IN ROUTER FUNCTION");
	query = 'SELECT * FROM app_data.resources;';
	console.log("QUERY: ", query);
	con.query(query,
          (q_err, q_res) => {
          if(q_err) return res.send(q_err);
          console.log("after sequel error")
          console.log(q_res)
          res.send(q_res)
    })
})




router.post('/get_event_data', (req, res) => {
	// var name = req.body.name;
	// var phonenumber = req.body.phone_num;
	// var email = req.body.email;
	// var description = req.body.
	// console.log("Received User for: " + name + suid + dorm);
	console.log("IN ROUTER FUNCTION");
	query = 'SELECT * FROM app_data.events;';
	console.log("QUERY: ", query);
	con.query(query,
          (q_err, q_res) => {
          if(q_err) return res.send(q_err);
          console.log("after sequel error")
          console.log(q_res)
          res.send(q_res)
    })
})




router.post('/updatePhoneNumber', (req, res, callback) => {
	var phone_number = req.body.phonenumber;
	var suid = req.body.suid;
	var sql_update = "UPDATE app_data.users SET `phone_number` = '" + phone_number + "' WHERE `suid` = '" + suid + "';";
	console.log(sql_update)
	con.query(sql_update, (q_err, q_res) => {
        if(q_err){
        	res.send('Some Error')
		}
        else	{
	        console.log(q_res)
	        res.send(q_res)
      	}
    })
})

router.post('/auth', (req, res, callback) => {
	console.log("GOT AUTH REQ")
	const {clientId, name} = req.body;
	if (!clientId || clientId.length < 1) {
		console.log("ERROR 1")
		res.status(400).send('Invalid ID');
	}

	if (!name || name.length < 1) {
		console.log("ERROR 2")
		res.status(400).send('Invalid name');
	}
	const token = jwt.sign({
		client: clientId,
		channel: drone.CHANNEL_ID,
		permissions: {
			"^observable-locations$": {
				publish: true,
				subscribe: true,
				history: 50,
			}
		},
		data: {
			name,
			color: colors.get()
		},
		exp: Math.floor(Date.now() / 1000) + 60 * 3 // expire in 3 minutes
	}, drone.CHANNEL_SECRET);
	console.log(token)
	res.send(token);
})

router.post('/profile_mount', (req, res) => {
	var suid = req.body.suid;
	console.log("Received: " + suid);
	con.query("SELECT first_name, last_name, phone_number, community FROM app_data.users as u LEFT JOIN app_data.memberships as c ON u.suid = c.suid WHERE u.suid ='" + suid + "'",
		(q_err, q_res) => {
          //if(q_err) return next(q_err);
          res.send(q_res);
      })
	//res.json('Returning back some message');
})

router.post('/get_communities', (req, res) => {
	var suid = req.body.suid;
	console.log("Received: " + suid);
	con.query("SELECT comm_name FROM app_data.communities",
		(q_err, q_res) => {
          //if(q_err) return next(q_err);
          //console.log("here");
          //console.log(q_res);
          res.send(q_res);
          //console.log("here2");
      })
	//res.json('Returning back some message');
})


router.post('/join_community', (req, res) => {
	var suid = req.body.suid;
	var community = req.body.community;

	con.query("INSERT INTO app_data.memberships (community, suid) VALUES ('" + community + "', '" + suid + "');",
		(q_err, q_res) => {
          //if(q_err) return next(q_err);
          //console.log("here");
          //console.log(q_res);
          res.send(q_res);
          //console.log("here2");
      })
	//res.json('Returning back some message');
})

router.post('/make_community', (req, res) => {
	var suid = req.body.suid;
	var communityName = req.body.comm_name;

	console.log("here1");

	console.log("Received Make Suid: " + suid);
	console.log("Received Make Comm: " + communityName);

	con.query("INSERT INTO app_data.memberships (community, suid, user_type) VALUES ('" + communityName + "', '" + suid + "', 'admin');",
		(q_err, q_res) => {
          //if(q_err) return next(q_err);
          //console.log("here");
          //console.log(q_res);
          //res.send(q_res);
          //console.log("here2");
      })
	con.query("INSERT INTO app_data.communities (comm_name) VALUE ('" + communityName +"');",
		(q_err, q_res) => {
          //if(q_err) return next(q_err);
          //console.log("here");
          //console.log(q_res);
          res.send(q_res);
          //console.log("here2");
      })
	//res.json('Returning back some message');
})

router.post('/update_profile', (req, res) => {
	var suid = req.body.suid;
	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var phonenumber = req.body.phone_number;

	console.log(firstName);

	con.query("UPDATE app_data.users SET first_name= '" + firstName + "', last_name= '" + lastName + "', phone_number ='" + phonenumber + "' WHERE (suid= '" + suid + "');",
		(q_err, q_res) => {
          //if(q_err) return next(q_err);
          //console.log("here");
          //console.log(q_res);
          res.send(q_res);
          //console.log("here2");
      })
	//res.json('Returning back some message');
})









module.exports = router;

