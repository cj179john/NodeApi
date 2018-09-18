const { MongoClient } = require('mongodb');
const { database } = require('../config');

const mongoUrl = `mongodb://${database.url}:${database.port}`;

function getDatabase() {
	return new Promise(
		(resolve, reject) => MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
			if (err) {
				return reject(err);
			}
			return resolve(client.db(database.name));
		}),
	);
}

async function getCollection(collectionName) {
	const appDatabase = await getDatabase();
	return appDatabase.collection(collectionName);
}

async function getOne(collectionName, query, projection) {
	const dbCollection = await getCollection(collectionName);
	const result = await dbCollection.find(query, projection);
	return result.toArray();
}

async function update(collectionName, query, value) {
	const result = await getCollection(collectionName).update(query, value, { upsert: true });
	return result;
}

module.exports = {
	getDatabase,
	getOne,
	update,
};
