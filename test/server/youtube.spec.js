var should = require('should'); 
var assert = require('assert');
var app = require('../../server.js').app;
var request = require('supertest');

var testUser = request.agent(app);


describe('Routing', function(){
  /*before(function(done) {
    // In our tests we use the test db
    setTimeout(function(){
      done();
    }, 1200);
    
  });*/
  
  describe('Youtube Playlist Retrieval', function() {

    it('should authenticate a user', function(done) {
      testUser
      .post('/auth/local')
      .send({
          email: 'avidredertest@gmail.com',
          password: 'MatrixRunner1'
        })
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should refresh an old token', function(done){
      var oldToken = testUser.googleToken;
      testUser
      .get('/ytrefreshtoken')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.googleToken.should.not.equal(oldToken);
        done();
      });
    });

    it('should retrieve playlists from youtube', function(done) {
      testUser
      .get('/ytplaylists')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.playlists.length.should.equal(1);
        res.body._id.should.equal("55b7e13c5f04d601ec5bbb23");
        done();
      });
    });

    it('should retrieve playlists from the db', function(done) {
      testUser
      .get('/localytplaylists')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.playlists.length.should.equal(1);
        res.body._id.should.equal("55b7e13c5f04d601ec5bbb23");
        done();
      });
    });
  });

  describe('Youtube Subscription Retrieval', function() {
    it('should retrieve subscriptions from youtube', function(done) {
      this.timeout(5000);
      testUser
      .get('/ytsubscriptions')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        //console.log(res.body);
        res.body.subscriptions.length.should.equal(1);
        res.body._id.should.equal("55b7e1a1b36b468eec91244c");
        done();
      });
    });

    it('should retrieve subscriptions from the db', function(done) {
      testUser
      .get('/localytsubscriptions')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.body.subscriptions.length.should.equal(1);
        res.body._id.should.equal("55b7e1a1b36b468eec91244c");
        done();
      });
    });

    it('should log a user out', function(done) {
      testUser
      .get('/logout')
      .expect(302)
      .end(function(err, res){
        if (err) {
          throw err;
        }
        res.header['location'].should.equal('/');
        done();
      });
    });

  });
});
