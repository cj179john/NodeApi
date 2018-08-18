const { MongoClient } = require('mongodb');
const { database } = require('../config');

const mongoUrl = `mongodb://${database.url}:${database.port}`;
let appDatabase = {};

async function getConnection() {
	try {
		return await MongoClient.connect(mongoUrl);
	} catch (err) {
		return new Error(`Connection error: ${err}`);
	}
}

function getDatabase() {
	appDatabase = getConnection().db(database.name);
}

function getCollection(collectionName) {
	return appDatabase.collection(collectionName);
}

async function getOne(collectionName, query, projection) {
	try {
		return await getCollection(collectionName).findOne(query, projection);
	} catch (e) {
		return new Error(e);
	}
}

async function update(collectionName, query, value) {
	try {
		return await getCollection(collectionName).update(query, value, { upsert: true });
	} catch (e) {
		return new Error(e);
	}
}

module.exports = {
	getConnection,
	getDatabase,
	getOne,
	update,
};
