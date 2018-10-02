const express = require('express');
const path = require('path');
const server = express();

// users-list/server + ../dist
const distFolder = path.join(__dirname, './assets');

server.use(express.static(distFolder));

server.listen(9090);
