const { MongoClient } = require('mongodb');

function connectMongo(){
	return new Promise(resolve => {
		MongoClient.connect('mongodb://localhost:27017', (err, client) => {
			resolve(client);
		});
	});
}

function connectDB() {
	return connectMongo()
		.then(client => client.db('fed-project'))
}

module.exports = connectDB;