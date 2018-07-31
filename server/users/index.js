let users = require('./users.json');
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
	res.send(users);
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
	const user = getUser(req.params.userId);
	if(user) {
		res.send(user);
	} else {
		res
			.status(404)
			.send("User not found!");
	}
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