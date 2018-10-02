const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users/');
const posts = require('./posts/');
const path = require('path');
const server = express();

server.use(bodyParser.json());

server.use("/api/users/", users);
server.use("/api/posts/", posts);

// users-list/server + ../dist = users-list/dist
const distFolder = path.join(__dirname, '../dist');

server.use(express.static(distFolder));

server.listen(80);
