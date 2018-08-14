const collection = require('./collection');
const router = require('express').Router();

router.get('/', (req, res) => {
	collection
		.getAllUsers()
		.then(data => res.send(data));
});

router.post('/', (req, res) => {
	collection
		.insertUser(req.body)
		.then(user => res.send(user));
});

router.get('/:userId', (req, res) => {
	collection
		.getUser(req.params.userId)
		.then(data => res.send(data));
});

router.put('/:userId', (req, res) => {
	collection
		.updateUser(req.params.userId, req.body)
		.then(data => res.send(data));
});

router.delete('/:userId', (req, res) => {
	collection
		.deleteUser(req.params.userId)
		.then(data => res.send(data));
});

module.exports = router;