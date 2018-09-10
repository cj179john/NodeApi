const { MongoClient } = require('mongodb');
const { database } = require('../config');

const mongoUrl = `mongodb://${database.url}:${database.port}/${database.name}`;

function getDatabase() {
	return new Promise((resolve, reject) => {
		return MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
			if (err) {
				return reject(err);
			}
			return resolve(db);
		});
	});
}

async function getCollection(collectionName) {

	const appDatabase = await getDatabase();
	return appDatabase.collection(collectionName);
}

async function getOne(collectionName, query, projection) {
	try {
		const dbCollection = await getCollection(collectionName);
		return dbCollection.find(query, projection);
	} catch (e) {
		throw new Error(e);
	}
}

async function update(collectionName, query, value) {
	try {
		return await getCollection(collectionName).update(query, value, { upsert: true });
	} catch (e) {
		throw new Error(e);
	}
}

module.exports = {
	getDatabase,
	getOne,
	update,
};
