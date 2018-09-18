const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('When creating JWT token', () => {
	let sandbox;
	let handler;
	let jwtMock;
	let userModelMock;

	beforeEach(() => {
		sandbox = sinon.createSandbox();

		jwtMock = {
			sign: sandbox.stub(),
		};

		userModelMock = function () {
			return {
				getUser: () => Promise.resolve([{
					password: 'thisistest',
				}]),
			};
		};

		handler = proxyquire('./tokenHandler.js', {
			jsonwebtoken: jwtMock,
			'../models/user': userModelMock,
		});
	});

	afterEach(() => sandbox.restore());

	it('should create token and send back as response', async () => {
		jwtMock.sign.returns('testToken');

		const reqMock = {
			body: {
				email: 'test@test.com',
				password: 'thisistest',
			},
		};
		const resMock = {
			json: sinon.stub(),
		};
		const nextMock = sinon.stub();

		await handler(reqMock, resMock, nextMock);

		sinon.assert.calledWith(resMock.json, {
			success: true,
			message: 'Token generated',
			token: 'testToken',
		});
	});
});
