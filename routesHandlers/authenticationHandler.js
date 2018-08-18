// Load required packages
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const data = require('../services/dataService.js');
const logger = require('../logger');

passport.use(new BasicStrategy(
	(requestUsername, requestPassword, callback) => {
		data.getData('users', (err, user) => {
			if (err) {
				return callback(err);
			}
			const userName = user[0].name;
			const userPassword = user[0].password;
			const authenticate = requestUsername === userName && userPassword === requestPassword;
			if (!authenticate) {
				logger.error('authenication failed, credentials miss matched');
				return callback(err);
			}
			return callback(null, user);
		});
	},
));
exports.isAuthenticated = passport.authenticate('basic', { session: false });
