const { MongoClient } = require('mongodb');

module.exports = () => {
	return new Promise(resolve => {
		MongoClient.connect('mongodb://localhost:27017', (err, client) => {
			const db = client.db('users-list');
			resolve(db);
		});
	});
};