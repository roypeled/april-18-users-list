const mongoose = require('mongoose');

let mongo = 'mongodb://localhost:27017/fed-mongoose';

if(process.env.MONGO) {
	mongo = process.env.MONGO;
}

mongoose.connect(mongo);

module.exports = mongoose;