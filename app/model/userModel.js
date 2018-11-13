'use strict';

var sql = require('./db.js');

//User object constructor
var User = function (user) {
  this.email = user.email;
};

User.findByEmail = function findByEmail(email, result) {
  sql.query("Select id, email, password from users where email = ? ", email, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);

    }
  });
};

User.findById = function findById(userId, result) {
  sql.query("Select id, email, password from users where id = ? ", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);

    }
  });
};