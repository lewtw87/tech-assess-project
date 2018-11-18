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
        it('should register user', function (done) {
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

    describe('/api/auth/login', function () {
        it('should get a valid token for user', function (done) {
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

let questionDetails = {
    'question': 'What is the boiling point of water?',
    'tags': ['science', 'physics', 'easy']
}
    
describe('Questions', () => {
    before(function(done) {
        db.Questions.destroy({where: { question: 'What is the boiling point of water?'}})
            .then(function () {
                done(null);
            });
    });
        
    describe('/api/questions', () => {
        it('it should create question', (done) => {
            chai.request(app)
            .post('/api/questions')
            .set('x-access-token', accessToken)
            .send(questionDetails)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('array');
                res.body.should.have.property('id'); 
                done();
            });
        });

        it('it should GET all the questions matching all the tags', (done) => {
            chai.request(app)
            .get('/api/questions?tag=easy')
            .set('x-access-token', accessToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('questions'); 
                done();
            });
        });

        
    });


});