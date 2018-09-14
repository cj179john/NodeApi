const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.get('x-api-key');

	return jwt.verify(token, process.env.secret, err => (err ? next(err) : next()));
};
