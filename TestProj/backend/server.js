const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
let cors = require('cors');
var indexRouter = require('./routes');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use(cors());

app.listen(3000, () =>	{
	console.log("Backend Node.js server is running...")
})

module.exports = app;