'use strict';

var Question = require('../model/appModel.js');

exports.list_questions = function (req, res) {
    Question.getAllQuestions(function (err, question) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', question);
        res.send(question);
    });
};



exports.create_question = function (req, res) {
    var new_question = new Question(req.body);

    //handles null error 
    if (!new_question.question || !new_question.status) {

        res.status(400).send({ error: true, message: 'Please provide question/status' });

    }
    else {

        Task.createQuestion(new_question, function (err, task) {

            if (err)
                res.send(err);
            res.json(task);
        });
    }
};


exports.get_question = function (req, res) {
    Task.getQuestionById(req.params.questionId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_question = function (req, res) {
    Task.updateById(req.params.questionId, new Question(req.body), function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_question = function (req, res) {
    Task.remove(req.params.questionId, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Question successfully deleted' });
    });
};