const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const dbLib = require('../lib/db');

const User = new UserModel(dbLib);
const { secret } = process.env;

module.exports = (req, res, next) => {
	const token = req.get('x-api-key');

	return jwt.verify(token, secret, err => (err ? next(err) : next()));
};
