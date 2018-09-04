const router = require('express').Router();
const Post = require('./PostModel');
const comments = require('./comments');

router.get('/', (req, res) => {
	const { userId, query } = req.query;

	const filter = {};

	if (userId) filter.author = userId;
	if (query){
		const rgx = new RegExp(query, "i");
		filter.$or = [
			{ body: rgx },
			{ title: rgx },
		];
	}

	Post.find(filter)
		.populate('author')
		.then(posts => res.send(posts))
		.catch(e => res.status(400).send(e.message));
});

router.post('/', (req, res) => {
	const post = new Post(req.body);
	post.save()
		.then(post => res.send(post))
		.catch(e => res.status(400).send(e.message));
});

router.get('/:postId', (req, res) => {
	Post.findById(req.params.postId)
		.populate('author')
		.then(post => {
			if(post)
				res.send(post);
			else
				res.status(404).send("Post not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.put('/:postId', (req, res) => {
	Post.findByIdAndUpdate(req.params.postId, req.body)
		.then(post => {
			if(post)
				res.send(post);
			else
				res.status(404).send("Post not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.delete('/:postId', (req, res) => {
	Post.findByIdAndRemove(req.params.postId)
		.then(post => {
			if(post)
				res.send(post);
			else
				res.status(404).send("Post not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.use('/:postId/comments', comments);

module.exports = router;