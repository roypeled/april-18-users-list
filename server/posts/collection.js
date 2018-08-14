const connectdb = require('../db');
const { ObjectID } = require('mongodb');


function getPostsCollection() {
	return connectdb()
		.then((db) => db.collection('posts'));
}

function getAllPosts(filter = {}) {
	return getPostsCollection()
		.then((collection) => {
			return collection.find(filter).toArray();
		});
}

function getPost(id) {
	return getPostsCollection()
		.then((collection) => {
			return collection.findOne({ _id: ObjectID(id) });
		});
}


function insertPost(post){
	return getPostsCollection()
		.then(collection => collection.insertOne(post));
}


function updatePost(postId, params) {
	return getPostsCollection()
		.then(collection => collection
			.updateOne(
				// First param - which object to update
				{ _id: ObjectID(postId) },
				// Second param - How to update
				{ $set: params }
			));
}

function deletePost(postId) {
	return getPostsCollection()
		.then(collection => collection
			.deleteOne({ _id: ObjectID(postId) }))
}


module.exports = {
	getAllPosts,
	getPost,
	insertPost,
	updatePost,
	deletePost
};
