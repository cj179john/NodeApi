module.exports = function dataService() {
	return {
		customers: [{
			id: '1',
			balance: 100,
		}, {
			id: '2',
			balance: 200,
		}],
		users: [{
			id: '1',
			name: 'john',
			password: 'john',
		}],
		getData(entity, callback) {
			let error;

			if (typeof this[entity] === 'undefined') {
				error = `entity ${entity} is undefined`;
			}

			return callback(error, this[entity]);
		},
		insertData(entity, data, callback) {
			let error;
			const dataEntity = this[entity];
			if (typeof dataEntity === 'undefined') {
				error = `entity ${entity} is undefined`;
			} else {
				dataEntity.push(data);
			}
			return callback(error, true);
		},
	};
};
