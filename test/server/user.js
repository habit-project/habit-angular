var should = require('should'); 
var assert = require('assert');
var app = require('../../server.js').app;
var request = require('supertest');

describe('Routing', function(){
  /*before(function(done) {
    // In our tests we use the test db
    setTimeout(function(){
      done();
    }, 500);
    
  });*/
  var testUser = {};
  describe('User API Routing', function() {

    it('should create a new user with post', function(done) {
      request(app)
      .post('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.should.have.property("name");
        res.body.should.have.property("email");
        testUser = res.body;
        done();
      });
    });
    it('should list all users', function(done) {
        request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.body.length.should.be.above(0);
          res.body.should.containEql(testUser);
          done();
        });
    });

    it('should get user by id', function(done) {
      request(app)
      .get('/api/users/' + testUser._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.should.containEql(testUser);
        done();
      });
    });

    it('should update user by id', function(done) {
      var testUserJSON = {
        'email':'test@test.com',
        'name':'Test Guy'
      };
      request(app)
      .put('/api/users/' + testUser._id)
      .send(testUserJSON)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.should.containEql(testUserJSON);
        done();
      });
    });
    
    it('should delete user by id', function(done) {
      request(app)
      .delete('/api/users/' + testUser._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.should.containEql({message: "User successfully deleted"});
        request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.body.should.not.containEql(testUser);
          done();
        });
      });
    });
  });
});