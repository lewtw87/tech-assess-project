'use strict';

module.exports = function (app) {

    var questionController = require('../controller/questionController.js');
    var userController = require('../controller/userController.js');
    var authController = require('../auth/authController.js');
    var VerifyToken = require('../auth/verifyToken.js');

    // Welcome
    app.get('/', function (req, res) {
        res.json({
            status: 'API for tech assessment',
            message: 'Welcome!',
        });
    });

    // Set default API response
    app.get('/api', function (req, res) {
        res.status(200).send('API works.');
    });

    // For authentication purpose
    app.use('/api/users', userController);
    app.use('/api/auth', authController);

    // Gov Tech Endpoint 1
    app.post('/api/questions', VerifyToken, function(req, res) {
        questionController.create_question(req, res);
    });

    // Gov Tech Endpoint 2
    app.get('/api/questions', VerifyToken, function(req, res) {
        // If user query with ?tag=xxx then query it with tag, else throw error
        if(req.query.tag != undefined)
        {
            questionController.get_question_by_tag(req, res);
        }
        else
        {
            //questionController.list_questions(req, res);
        }
    });

    

    
};