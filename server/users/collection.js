const connectdb = require('../db');
const { ObjectID } = require('mongodb');
const { MongoClient } = require('mongodb');


function getUsersCollection() {
	return connectdb()
		.then((db) => db.collection('users'));
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

function insertUser(user){
	return getUsersCollection()
		.then(collection => collection.insertOne(user));
}


function updateUser(userId, params) {
	return getUsersCollection()
		.then(collection => collection
			.updateOne(
				// First param - which object to update
				{ _id: ObjectID(userId) },
				// Second param - How to update
				{ $set: params }
			));
}

function deleteUser(userId) {
	return getUsersCollection()
		.then(collection => collection
			.deleteOne({ _id: ObjectID(userId) }))
}


module.exports = {
	getAllUsers,
	getUser,
	insertUser,
	updateUser,
	deleteUser
};
