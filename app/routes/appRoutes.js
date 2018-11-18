'use strict';

module.exports = function (app) {

    const questionController = require('../controller/questionController.js');
    //const userController = require('../controller/userController.js');
    const authController = require('../controller/authController.js');
    const verifyToken = require('../controller/verifyToken.js');

    const validate = require('express-validation');
    const validation = require('../validation/joiValidation.js');

    

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

    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError) return res.status(400).send(JSON.stringify({
            error: true, message: "The body of your request is not valid json."
        }))
    
        res.status(500).send();
    });

    // For authentication purpose
    app.post('/api/auth/login', function(req, res) {
        authController.login(req, res);
    });
    app.post('/api/auth/register', function(req, res) {
        authController.register(req, res);
    });


    // Gov Tech Endpoint 1
    app.post('/api/questions', verifyToken, validate(validation.create_question), function(req, res) {
        questionController.create_question(req, res);
    });

    // Gov Tech Endpoint 2
    app.get('/api/questions', verifyToken, validate(validation.get_question_by_tag), function(req, res) {
        // If user query with ?tag=xxx then query it with tag, else throw error
        questionController.get_question_by_tag(req, res);
        
    });

    // Gov Tech Endpoint 3
    app.post('/api/quiz', verifyToken, validate(validation.create_quiz), function(req, res) {
        questionController.create_quiz(req, res);
        
    });

    
};