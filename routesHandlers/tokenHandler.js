const jwt = require('jsonwebtoken');
const dbLib = require('../lib/db');
const UserModel = require('../models/user');

const User = new UserModel(dbLib);

function _getToken(email) {
	const payload = { email };
	return jwt.sign(payload, process.env.secret, { expiresIn: 14400 });
}

async function handler(req, res, next) {
	const { email, password } = req.body;

	try {
		const user = await User.getUser(email);
		if (!user || user.password !== password) {
			return next(new Error('Authenticated failed, user not found or password is invalid!'));
		}

		return res.json({
			success: true,
			message: 'Token generated',
			token: _getToken(email),
		});
	} catch (e) {
		return next(new Error(e));
	}
}

module.exports = handler;
