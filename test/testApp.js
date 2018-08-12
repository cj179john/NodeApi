const supertest = require('supertest');
const app = require('../app.js');

process.env.NODE_ENV = 'test';
const agent = supertest(app);

describe('Authentication', () => {
	it('errors if wrong basic auth', (done) => {
		agent.get('/api/v1/entity/customers')
			.auth('incorrect', 'credentials')
			.expect(401, done);
	});

	it('authenticated if correct basic auth', (done) => {
		agent.get('/api/v1/entity/customers')
			.auth('john', 'john')
			.expect(200, done);
  });
});
describe('Entity routes', () => {
	it('200 OK for correct routing', (done) => {
		agent.get('/api/v1/entity/customers')
			.auth('john', 'john')
			.expect(200, done);
	});

	it('incorrect routing', (done) => {
		agent.get('/api/v1/entity/incorrect')
			.auth('john', 'john')
			.expect(500)
			.expect('"entity incorrect is undefined"', done);
  });
});
