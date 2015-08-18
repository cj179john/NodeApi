var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');
describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    api.get('/api/v1/entity/customers')
    .auth('incorrect', 'credentials')
    .expect(401, done);
  });

  it('authenticated if correct basic auth', function(done) {
    api.get('/api/v1/entity/customers')
    .auth('john', 'john')
    .expect(200, done);
  });

});
describe('Entity routes', function() {

  it('200 OK for correct routing', function(done) {
    api.get('/api/v1/entity/customers')
    .auth('john', 'john')
    .expect(200, done);
  });

  it('incorrect routing', function(done) {
    api.get('/api/v1/entity/incorrect')
    .auth('john', 'john')
    .expect(500)
    .expect('"entity incorrect is undefined"', done);
  });
});

