const router = require('express').Router({mergeParams: true});
const Comment = require('./CommentsModel');

router.get('/', (req, res) => {
	const { page = 1 } = req.query;

	Comment
		.paginate(
			{ post: req.params.postId },
			{
				page,
				limit: 3,
				populate: ['author'],
			}
		)
		.then(comments => res.send(comments))
		.catch(e => res.status(400).send(e.message));
});

router.post('/', (req, res) => {
	req.body.post = req.params.postId;

	const comment = new Comment(req.body);
	comment.save()
		.then(comment => res.send(comment))
		.catch(e => res.status(400).send(e.message));
});

router.get('/:commentId', (req, res) => {
	Comment.findById(req.params.commentId)
		.populate('author')
		.then(comment => {
			if(comment)
				res.send(comment);
			else
				res.status(404).send("comment not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.put('/:commentId', (req, res) => {
	Comment.findByIdAndUpdate(req.params.commentId, req.body)
		.then(comment => {
			if(comment)
				res.send(comment);
			else
				res.status(404).send("comment not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.delete('/:commentId', (req, res) => {
	Comment.findByIdAndRemove(req.params.commentId)
		.then(comment => {
			if(comment)
				res.send(comment);
			else
				res.status(404).send("comment not found");
		})
		.catch(e => res.status(400).send(e.message));
});

module.exports = router;