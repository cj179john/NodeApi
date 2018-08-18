const supertest = require('supertest');

process.env.NODE_ENV = 'test';

const app = require('../app');

// const agent = supertest(app);
describe('Authentication', () => {
	let server = null;
	let agent = null;

	before(() => {
		server = app.listen();
		agent = supertest(server);
	});


	it('errors if wrong basic auth', (done) => {
		agent.get('/api/v1/entity/customers')
			.auth('incorrect', 'credentials')
			.expect(401)
			.end(done);
	});

	it('authenticated if correct basic auth', (done) => {
		agent.get('/api/v1/entity/customers')
			.auth('john', 'john')
			.expect(200)
			.end(done);
	});

	after((done) => {
		server.close(done);
	});
});

describe('Entity routes', () => {
	let server = null;
	let agent = null;

	before((done) => {
		server = app.listen(done);
		agent = supertest.agent(server);
	});

	it('200 OK for correct routing', (done) => {
		agent.get('/api/v1/entity/customers')
			.auth('john', 'john')
			.expect(200)
			.end(done);
	});

	it('incorrect routing', (done) => {
		agent.get('/api/v1/entity/incorrect')
			.auth('john', 'john')
			.expect(500)
			.expect('"entity incorrect is undefined"')
			.end(done);
	});

	after((done) => {
		server.close();
		console.log('closing server');

		done();
	});
});
