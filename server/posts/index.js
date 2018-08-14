let collection = require('./collection');
const router = require('express').Router();
const { ObjectID } = require('mongodb');

router.get('/', (req, res) => {
	const filter = {};

	if(req.query.userId)
		filter.userId = ObjectID(req.query.userId);

	if(req.query.search)
		filter.body = { $regex: new RegExp(req.query.search) };

	collection
		.getAllPosts(filter)
		.then(posts => res.send(posts));
});

router.post('/', (req, res) => {
	collection
		.insertPost(req.body)
		.then(user => res.send(user));
});

router.get('/:postId', (req, res) => {
	collection
		.getPost(req.params.postId)
		.then(post => res.send(post));
});

router.put('/:postId', (req, res) => {
	collection
		.updatePost(req.params.postId, req.body)
		.then(data => res.send(data));
});

router.delete('/:postId', (req, res) => {
	collection
		.deletePost(req.params.postId)
		.then(data => res.send(data));
});

module.exports = router;