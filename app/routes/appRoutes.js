'use strict';

module.exports = function (app) {

    var questionController = require('../controller/appController.js');

    // todoList Routes
    app.route('/questions')
        .get(questionController.list_questions)
        .post(questionController.create_question);

    app.route('/questions/:questionId')
        .get(questionController.get_question)
        .put(questionController.update_question)
        .delete(questionController.delete_question);

};