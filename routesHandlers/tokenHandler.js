const jwt = require('jsonwebtoken');
const dbLib = require('../lib/db');
const UserModel = require('../models/user');

const User = new UserModel(dbLib);

function _getToken(email) {
	const payload = { email };
	return jwt.sign(payload, process.env.secret, { expiresIn: 14400 });
}

async function _verifyUser(email, password) {
	const user = await User.getUser(email);
	if (!user || user[0].password !== password) {
		throw new Error('Authenticated failed, user not found or password is invalid!');
	}
	return true;
}

function _getPayload(email) {
	return {
		success: true,
		message: 'Token generated',
		token: _getToken(email),
	};
}
async function handler(req, res, next) {
	const { email, password } = req.body;

	try {
		await _verifyUser(email, password);
		return res.json(_getPayload(email));
	} catch (e) {
		return next(new Error(e));
	}
}

module.exports = handler;
