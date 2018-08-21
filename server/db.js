const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fed-mongoose');

module.exports = mongoose;