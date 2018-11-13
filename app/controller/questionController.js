'use strict';

var Question = require('../model/questionModel.js');

//Gov Tech Endpoint 1
exports.create_question = function (req, res) {
    var new_question = new Question(req.body);

    //handles null error 
    if (!new_question.question) {
        res.status(400).send({ error: true, message: 'Please provide question text' });
    }
    else {

        Question.createQuestion(new_question, function (err, question) {

            if (err)
                res.send(err);
            res.json(question);
        });
    }
};


//Gov Tech Endpoint 2
exports.get_question_by_tag = function (req, res) {
    Question.getQuestionByTag(req.query.tag, function (err, tag) {
        if (err)
            res.send(err);

        var jsonResult = {
            questions: tag
        }    
        res.json(jsonResult);
    });
};

exports.list_questions = function (req, res) {
    Question.getAllQuestions(function (err, question) {
        if (err)
            res.send(err);

        res.send(question);
    });
};

exports.get_question_by_id = function (req, res) {
    Question.getQuestionById(req.params.questionId, function (err, question) {
        if (err)
            res.send(err);
        res.json(question);
    });
};




exports.update_question = function (req, res) {
    Question.updateById(req.params.questionId, new Question(req.body), function (err, question) {
        if (err)
            res.send(err);
        res.json(question);
    });
};

exports.delete_question = function (req, res) {
    Question.remove(req.params.questionId, function (err, question) {
        if (err)
            res.send(err);
        res.json({ message: 'Question successfully deleted' });
    });
};