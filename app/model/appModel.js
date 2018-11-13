'use strict';

var sql = require('./db.js');

//Task object constructor
var Question = function (question) {
    this.question = question.question;
};

Question.createQuestion = function createQuestion(newQuestion, result) {
    sql.query("INSERT INTO questions set ?", newQuestion, function (err, res) {

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
Question.getQuestionById = function getQuestion(questionId, result) {
    sql.query("Select id, question from questions where id = ? ", questionId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Question.getAllQuestions = function getAllQuestions(result) {
    sql.query("Select * from questions", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('questions : ', res);

            result(null, res);
        }
    });
};
Question.updateById = function (id, question, result) {
    sql.query("UPDATE questions SET question = ? WHERE id = ?", [question.question, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Question.remove = function (id, result) {
    sql.query("DELETE FROM questions WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Question;