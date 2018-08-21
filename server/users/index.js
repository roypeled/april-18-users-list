const router = require('express').Router();
const User = require('./UserModel');

router.get('/', (req, res) => {
	User.find({})
		.then(users => res.send(users))
		.catch(e => res.status(400).send(e.message));
});

router.post('/', (req, res) => {
	const user = new User(req.body);
	user.save()
		.then(user => res.send(user))
		.catch(e => res.status(400).send(e.message));
});

router.get('/:userId', (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			if(user)
				res.send(user);
			else
				res.status(404).send("User not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.put('/:userId', (req, res) => {
	User.findByIdAndUpdate(req.params.userId, req.body)
		.then(user => {
			if(user)
				res.send(user);
			else
				res.status(404).send("User not found");
		})
		.catch(e => res.status(400).send(e.message));
});

router.delete('/:userId', (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then(user => {
			if(user)
				res.send(user);
			else
				res.status(404).send("User not found");
		})
		.catch(e => res.status(400).send(e.message));
});

module.exports = router;
