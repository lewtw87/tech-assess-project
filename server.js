const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3030,
  morgan = require('morgan');  

/*
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techassess_elearning'
});
 
// connect to database
mc.connect();*/

app.listen(port);

console.log('RESTful API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

var routes = require('./app/routes/appRoutes.js'); //importing route
routes(app); //register the route

module.exports = app;