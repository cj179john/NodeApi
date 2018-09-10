const { expect } = require('chai');

const dataService = require('../services/dataService.js');

describe('data service test', () => {
	let usersFixture;

	beforeEach((done) => {
		usersFixture = [{ name: 'test_1' }];
		dataService.users = usersFixture;
		done();
	});
	it('should exists', () => {
		expect(typeof dataService).not.to.equal('undefined');
	});

	it('should get data', (done) => {
		dataService.getData('users', (err, result) => {
			expect(result).to.equal(usersFixture);
		});
		done();
	});

	it('should insert data', (done) => {
		const fixture = { name: 'test_2' };
		dataService.insertData('users', fixture, () => {});
		expect(dataService.users.length).to.equal(2);
		done();
	});
});
