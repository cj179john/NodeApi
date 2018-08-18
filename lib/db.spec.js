const rewire = require('rewire');
const assert = require('assert');

process.env.NODE_ENV = 'test';

const db = rewire('./db');

describe('test database service', () => {
	before(() => {
		db.__set__('getConnection', () => ({
			db() {
				return this;
			},
			collection() {
				return true;
			},
		}));
	});

	it('should get connection', () => {
		assert.equal(true, db.getCollection());
	});
});
