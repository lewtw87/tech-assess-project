'use strict';

var sql = require('./db.js');

//User object constructor
var User = function (user) {
  this.email = user.email;
  this.password = user.password;
};

User.findByEmail = function findByEmail(email, result) {
  sql.query("SELECT id, email, password FROM users WHERE email = ? ", email, function (err, res) {
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
  sql.query("SELECT id, email, password FROM users WHERE id = ? ", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);

    }
  });
};
User.createUser = function createUser(user, result) {
  sql.query("INSERT INTO users SET ?", user, function (err, res) {

      if (err) {
          console.log("error: ", err);
          result(err, null);
      }
      else {
          console.log(res.insertId);
          result(null, res.insertId);
      }
  });
};