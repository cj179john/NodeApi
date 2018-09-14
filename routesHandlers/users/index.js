const { isEmpty } = require('lodash');
const { Router } = require('express');
const UserModel = require('../../models/user');
const dbLib = require('../../lib/db');

const User = new UserModel(dbLib);
const router = new Router();

router.get('/', async (req, res) => {
	const userEmail = req.query.email;

	if (!userEmail) {
		return res.status(404).json('User email missing');
	}

	try {
		let result = await User.getUser(userEmail);
		if (isEmpty(result)) {
			result = 'User not found';
		}
		return res.json(result);
	} catch (e) {
		return res.status(400).json(`Failed to get user: ${e.message}`);
	}
});

module.exports = router;
