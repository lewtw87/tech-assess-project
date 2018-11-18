const db = require('../db.js');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

let regDetails = {
    'email': 'lewtw87@gmail.com',
    'password': 'alvinlew'
}
let accessToken;
  

describe('Users', function() {
    before(function (done) {
        db.Users.destroy({where: { email: 'lewtw87@gmail.com'}})
            .then(function () {
                done(null);
            });
    });

    describe('/api/auth/register', function () {
        it('should register user.', function (done) {
            chai.request(app)
                .post('/api/auth/register')
                .send(regDetails)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('token'); 

                    accessToken = res.body.token; 
                    done();
                });
        });
    });

    describe('/api/auth/register', function () {
        it('should not register user with repeated email.', function (done) {
            chai.request(app)
                .post('/api/auth/register')
                .send(regDetails)
                .end((err, res) => {
                    res.should.have.status(400); 
                    done();
                });
        });
    });

    describe('/api/auth/login', function () {
        it('should get a valid token for user.', function (done) {
            chai.request(app)
                .post('/api/auth/login')
                .send(regDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token'); 
                    
                    accessToken = res.body.token;
                    done();
                })
        });
    });
});
    
describe('Questions', () => {

    before(function(done) {
        db.Questions.destroy({where: 
            { question: ['What percentage of the earth is covered by water?', 'Why is the sky blue?']}
            })
            .then(function () {
                done(null);
            });
    });
    
    //End point 1
    describe('POST Question /api/questions', () => {
        it('should create a question.', (done) => {
            chai.request(app)
            .post('/api/questions')
            .set('x-access-token', accessToken)
            .send({
                'question': 'What percentage of the earth is covered by water?',
                'tags': ['science', 'physics', 'easy']
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('id'); 
                done();
            });
        });

        it('should create a question with previously created tags.', (done) => {
            chai.request(app)
            .post('/api/questions')
            .set('x-access-token', accessToken)
            .send({
                'question': 'Why is the sky blue?',
                'tags': ['science', 'physics', 'hard']
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('id'); 
                done();
            });
        });

        it('should not create a question without question.', (done) => {
            chai.request(app)
            .post('/api/questions')
            .set('x-access-token', accessToken)
            .send({
                'tags': ['science', 'physics', 'easy']
            })
            .end((err, res) => {
                res.should.have.status(400); 
                done();
            });
        });

        it('should not create a question without tags.', (done) => {
            chai.request(app)
            .post('/api/questions')
            .set('x-access-token', accessToken)
            .send({
                'question': 'What is the boiling point of water?'
            })
            .end((err, res) => {
                res.should.have.status(400); 
                done();
            });
        });
    });

    //End point 2
    describe('GET Question /api/questions', () => {
        it('should return error without tag parameter.', (done) => {
            chai.request(app)
            .get('/api/questions')
            .set('x-access-token', accessToken)
            .end((err, res) => {
                res.should.have.status(400); 
                done();
            });
        });

        it('should get all the questions matching all the tags.', (done) => {
            chai.request(app)
            .get('/api/questions?tag=easy&tag=science&tag=physics')
            .set('x-access-token', accessToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('questions'); 
                done();
            });
        });

        
    });

    //End point 3
    describe('POST Quiz /api/quiz', () => {
        it('should return error without questions parameter.', (done) => {
            chai.request(app)
                .post('/api/quiz')
                .set('x-access-token', accessToken)
                .send({
                    "length": 3
                })
                .end((err, res) => {
                    res.should.have.status(400); 
                    done();
                });
        });

        it('should return error without length parameter.', (done) => {
            chai.request(app)
                .post('/api/quiz')
                .set('x-access-token', accessToken)
                .send({
                    "questions": [
                        {"id": 1, "weight": 1},
                        {"id": 2, "weight": 1.5},
                        {"id": 3, "weight": 1},
                        {"id": 4, "weight": 1},
                        {"id": 5, "weight": 2}
                    ]
                })
                .end((err, res) => {
                    res.should.have.status(400); 
                    done();
                });
        });

        it('should return error if length parameter bigger than length of questions parameter.', (done) => {
            chai.request(app)
                .post('/api/quiz')
                .set('x-access-token', accessToken)
                .send({
                    "questions": [
                        {"id": 1, "weight": 1},
                        {"id": 2, "weight": 1.5},
                        {"id": 3, "weight": 1},
                        {"id": 4, "weight": 1},
                        {"id": 5, "weight": 2}
                    ],
                    "length": 6
                })
                .end((err, res) => {
                    res.should.have.status(400); 
                    done();
                });
        });

        it('should get random quiz result matching the length of the parameter.', (done) => {
            chai.request(app)
                .post('/api/quiz')
                .set('x-access-token', accessToken)
                .send({
                    "questions": [
                        {"id": 1, "weight": 1},
                        {"id": 2, "weight": 1.5},
                        {"id": 3, "weight": 1},
                        {"id": 4, "weight": 1},
                        {"id": 5, "weight": 2}
                    ],
                    "length": 3
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('questions'); 
                    res.body.questions.length.should.be.eq(3);
                    done();
                });
        });
    });


});