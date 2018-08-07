let users = require('./users.json');
const collection = require('./collection');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

function getUser(id) {
	return users.find(user => user.id == id);
}

function saveJson(users) {
	fs.writeFileSync(__dirname + '/users.json', JSON.stringify(users));
}

router.get('/', (req, res) => {
	collection
		.getAllUsers()
		.then(data => res.send(data));
});

router.post('/', (req, res) => {
	const user = getUser(req.body.id);

	if(!user) {
		users.push(req.body);
		res.send(req.body);
		saveJson(users);
	} else {
		res
			.status(400)
			.send(`User with ID ${req.body.id} already exists`);
	}
});

router.get('/:userId', (req, res) => {
	collection
		.getUser(req.params.userId)
		.then(data => res.send(data))
});

router.put('/:userId', (req, res) => {
	users = users.filter(user => user.id != req.params.userId);
	users.push(req.body);

	res.send(req.body);
	saveJson(users);
});

router.delete('/:userId', (req, res) => {
	users = users.filter(user => user.id != req.params.userId);

	res.send("OK");
	saveJson(users);
});

module.exports = router;