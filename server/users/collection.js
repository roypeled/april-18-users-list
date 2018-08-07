const connectdb = require('../db');
const { ObjectID } = require('mongodb');

function getUsersCollection() {
	return connectdb()
		.then((db) => {
			return db.collection('users');
		});
}

function getAllUsers() {
	return getUsersCollection()
		.then((collection) => {
			return collection.find({}).toArray();
		});
}

function getUser(id) {
	return getUsersCollection()
		.then((collection) => {
			return collection.findOne({ _id: ObjectID(id) });
		});
}

module.exports = {
	getAllUsers,
	getUser
};
