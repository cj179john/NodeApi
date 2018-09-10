const rewire = require('rewire');
const { deepEqual, throws } = require('assert');

describe('test User model', () => {
	const userFixture = {
		email: 'test@test.org',
		password: 'test',
	};

	const User = rewire('./user');

	it('should get a user with user email', () => {
		const userModel = new User({
			getOne: () => userFixture,
		});

		deepEqual(userFixture, userModel.getUser('test@test.org'));
	});

	it('should throw error', () => {
		const errorFixture = new Error('user not found');

		const userModel = new User({
			getOne: () => {
				throw errorFixture;
			},
		});

		throws(
			() => userModel.getUser('failed'),
			Error,
		);
	});
});
