const db = require('../db.js');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const should = chai.should();
const expect = chai.expect;


chai.use(chaiHttp);
//Our parent block
describe('Questions', () => {
    /*beforeEach((done) => { //Before each test we empty the database
        db.Questions.remove({}, (err) => {
            done();
        });
    });*/
        
    describe('/GET question by tag', () => {
        
        it('it should GET all the questions matching all the tags', (done) => {
            chai.request(app)
            .get('/api/questions')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        // GET - Invalid path
        it('should return Not Found', (done) => { 
            chai.request(app)
            .get('/INVALID_PATH')
            .then(function(res) {
                throw new Error('Path not exists!');
            })
            .catch(function(err) {
                expect(err).to.have.status(404);
            });
        });
    });


});