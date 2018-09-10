class User {
	constructor(dbLib) {
		this.lib = dbLib;
		this.collectionName = 'users';
	}

	_getDataFunc(action) {
		return args => this.lib[action].apply(null, [this.collectionName, ...args]);
	}

	getUser(userEmail) {
		return this._getDataFunc('getOne')([{ email: userEmail }]);
	}

	set user(user) {
		return this._getDataFunc('update')([{ email: user.email }, user]);
	}
}

module.exports = User;
