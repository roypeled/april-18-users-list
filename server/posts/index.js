let posts = require('./posts.json');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

function getPost(id) {
	return posts.find(post => post.id == id);
}

function saveJson(posts) {
	fs.writeFileSync(__dirname + '/posts.json', JSON.stringify(posts));
}

router.get('/', (req, res) => {
	let result = posts;

	if(req.query.userId) {
		result = result.filter(post => post.userId == req.query.userId);
	}

	if(req.query.search) {
		result = result.filter(post => post.body.indexOf(req.query.search) > -1);
	}

	res.send(result);
});

router.post('/', (req, res) => {
	const post = getPost(req.body.id);

	if(!post) {
		posts.push(req.body);
		res.send(req.body);
		saveJson(posts);
	} else {
		res
			.status(400)
			.send(`Post with ID ${req.body.id} already exists`);
	}
});

router.get('/:postId', (req, res) => {
	const post = getPost(req.params.postId);
	if(post) {
		res.send(post);
	} else {
		res
			.status(404)
			.send("post not found!");
	}
});

router.put('/:postId', (req, res) => {
	posts = posts.filter(post => post.id != req.params.postId);
	posts.push(req.body);

	res.send(req.body);
	saveJson(posts);
});

router.delete('/:postId', (req, res) => {
	posts = posts.filter(post => post.id != req.params.postId);

	res.send("OK");
	saveJson(posts);
});

module.exports = router;