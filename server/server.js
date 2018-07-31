const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users/');
const posts = require('./posts/');
const server = express();

server.use(bodyParser.json());

server.use("/api/users/", users);
server.use("/api/posts/", posts);

server.listen(9090);
