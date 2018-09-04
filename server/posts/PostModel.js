const db = require('../db');
const { Schema } = require('mongoose');

// Define how a post object in the posts collection
// will look like
const postSchema = new db.Schema({
	title: String,
	body: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

// Create a working model from the schema that
// will change data in our database, on the users
// collection.
const Post = db.model('Post', postSchema);

module.exports = Post;